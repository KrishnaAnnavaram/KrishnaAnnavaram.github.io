#!/usr/bin/env node
/**
 * GitHub → portfolio synchronisation.
 *
 * Fetches repository metadata for the configured account, normalises it, and
 * writes a snapshot to `data/generated/github.json`. That snapshot is committed
 * to the repository and read at build time, which means:
 *
 *   - the site stays fully static (`output: 'export'`), no runtime API calls,
 *   - a GitHub outage at build time cannot break a deploy,
 *   - the data that shipped is auditable in git history.
 *
 * Editorial policy lives in `data/projects.ts`, not here. This script's only
 * job is to report what GitHub currently says. It never decides what is shown.
 *
 * Safety: private repositories are EXCLUDED by default. This snapshot is
 * committed to a public repository, so including a private repo would publish
 * its name, description and topics. Opt in per-repo with SYNC_INCLUDE_PRIVATE.
 *
 * Usage:
 *   node scripts/sync-github.mjs                 # unauthenticated (60 req/hr)
 *   GITHUB_TOKEN=… node scripts/sync-github.mjs  # authenticated (5000 req/hr)
 *
 * Env:
 *   GITHUB_TOKEN            optional; raises rate limit and allows private reads
 *   SYNC_INCLUDE_PRIVATE    comma-separated repo names to include despite being private
 *   SYNC_USER               defaults to KrishnaAnnavaram
 */

import { writeFile, readFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_FILE = resolve(ROOT, 'data/generated/github.json')

const USER = process.env.SYNC_USER || 'KrishnaAnnavaram'
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || ''
const INCLUDE_PRIVATE = (process.env.SYNC_INCLUDE_PRIVATE || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

/** README bytes kept per repo. Enough for the assistant to retrieve against. */
const README_BUDGET = 24_000

const API = 'https://api.github.com'

/* ─────────────────────────────────────────────────────────────────────────
   HTTP
   ───────────────────────────────────────────────────────────────────────── */

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': `${USER}-portfolio-sync`,
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
}

let requestCount = 0

async function gh(path, { raw = false, allow404 = false } = {}) {
  const url = path.startsWith('http') ? path : `${API}${path}`
  requestCount++

  const res = await fetch(url, {
    headers: raw ? { ...headers, Accept: 'application/vnd.github.raw' } : headers,
  })

  if (res.status === 404 && allow404) return null

  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get('x-ratelimit-reset')
    const when = reset ? new Date(Number(reset) * 1000).toISOString() : 'unknown'
    throw new Error(`Rate limited by GitHub (resets ${when}). Set GITHUB_TOKEN to raise the limit.`)
  }

  if (!res.ok) {
    throw new Error(`GitHub ${res.status} ${res.statusText} for ${url}`)
  }

  return raw ? res.text() : res.json()
}

/* ─────────────────────────────────────────────────────────────────────────
   Normalisation
   ───────────────────────────────────────────────────────────────────────── */

/**
 * Strips the decoration that makes a README unreadable as plain text: badge
 * images, HTML wrappers, anchors, and the table-of-contents block that several
 * of these repos open with. What is left is prose a retrieval index can use.
 */
function readmeToText(md) {
  if (!md) return ''

  let text = md
    // fenced code blocks — keep mermaid (it is architecture), drop the rest
    .replace(/```(?!mermaid)[\s\S]*?```/g, ' ')
    // badge and inline images
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    // html tags
    .replace(/<[^>]+>/g, ' ')
    // links → their text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // heading markers, emphasis, table pipes
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>]/g, '')
    .replace(/^\s*\|/gm, ' ')
    .replace(/\|/g, ' · ')
    .replace(/^[-=]{3,}$/gm, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  if (text.length > README_BUDGET) {
    text = `${text.slice(0, README_BUDGET).replace(/\s+\S*$/, '')}…`
  }
  return text
}

/** Extracts mermaid diagram sources so case studies can render real architecture. */
function extractMermaid(md) {
  if (!md) return []
  const out = []
  const re = /```mermaid\s*\n([\s\S]*?)```/g
  let m
  while ((m = re.exec(md)) !== null) {
    const src = m[1].trim()
    if (src.length > 40 && src.length < 4000) out.push(src)
  }
  return out.slice(0, 3)
}

/** First meaningful paragraph — the repo's own one-line pitch. */
function leadParagraph(text) {
  if (!text) return ''
  for (const block of text.split('\n\n')) {
    const line = block.replace(/\s+/g, ' ').trim()
    if (line.length > 60 && !/^(table of contents|contents)/i.test(line)) {
      return line.length > 400 ? `${line.slice(0, 400).replace(/\s+\S*$/, '')}…` : line
    }
  }
  return ''
}

async function fetchRepoDetail(repo) {
  const [languages, readmeRaw, commits] = await Promise.all([
    gh(`/repos/${repo.full_name}/languages`, { allow404: true }).catch(() => null),
    gh(`/repos/${repo.full_name}/readme`, { raw: true, allow404: true }).catch(() => null),
    gh(`/repos/${repo.full_name}/commits?per_page=1`, { allow404: true }).catch(() => null),
  ])

  const readmeText = readmeToText(readmeRaw)
  const langBytes = languages || {}
  const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0) || 1

  return {
    name: repo.name,
    fullName: repo.full_name,
    url: repo.html_url,
    homepage: repo.homepage || null,
    description: repo.description || null,
    private: repo.private,
    archived: repo.archived,
    fork: repo.fork,
    defaultBranch: repo.default_branch,
    license: repo.license?.spdx_id || null,
    topics: repo.topics || [],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    sizeKb: repo.size,
    createdAt: repo.created_at,
    pushedAt: repo.pushed_at,
    languages: Object.entries(langBytes)
      .map(([name, bytes]) => ({
        name,
        bytes,
        share: Math.round((bytes / totalBytes) * 1000) / 10,
      }))
      .sort((a, b) => b.bytes - a.bytes),
    primaryLanguage: repo.language || null,
    lastCommit: Array.isArray(commits) && commits[0]
      ? {
          sha: commits[0].sha.slice(0, 7),
          message: (commits[0].commit?.message || '').split('\n')[0].slice(0, 160),
          date: commits[0].commit?.author?.date || null,
          url: commits[0].html_url,
        }
      : null,
    readmeLead: leadParagraph(readmeText),
    readmeText,
    mermaid: extractMermaid(readmeRaw),
  }
}

/* ─────────────────────────────────────────────────────────────────────────
   Main
   ───────────────────────────────────────────────────────────────────────── */

async function main() {
  const started = Date.now()
  console.log(`→ syncing GitHub for ${USER}${TOKEN ? ' (authenticated)' : ' (anonymous)'}`)

  // Authenticated requests can list private repos; anonymous ones cannot.
  const listPath = TOKEN
    ? `/user/repos?per_page=100&affiliation=owner&sort=pushed`
    : `/users/${USER}/repos?per_page=100&sort=pushed`

  let repos = await gh(listPath)
  repos = repos.filter((r) => r.owner?.login?.toLowerCase() === USER.toLowerCase())

  const skippedPrivate = []
  repos = repos.filter((r) => {
    if (!r.private) return true
    if (INCLUDE_PRIVATE.includes(r.name)) return true
    skippedPrivate.push(r.name)
    return false
  })

  console.log(`  ${repos.length} repositories to describe`)
  if (skippedPrivate.length) {
    console.log(`  skipped ${skippedPrivate.length} private: ${skippedPrivate.join(', ')}`)
  }

  const detailed = []
  for (const repo of repos) {
    try {
      detailed.push(await fetchRepoDetail(repo))
      process.stdout.write('.')
    } catch (err) {
      console.warn(`\n  ! ${repo.name}: ${err.message}`)
    }
  }
  process.stdout.write('\n')

  if (detailed.length === 0) {
    throw new Error('No repositories were described — refusing to write an empty snapshot.')
  }

  detailed.sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt))

  const snapshot = {
    $schema: 'https://krishnaannavaram.github.io/schemas/github-snapshot.json',
    user: USER,
    syncedAt: new Date().toISOString(),
    repoCount: detailed.length,
    skippedPrivate,
    repos: detailed,
  }

  // Compare ignoring syncedAt, so an unchanged sync produces no commit noise.
  let previous = null
  if (existsSync(OUT_FILE)) {
    try {
      previous = JSON.parse(await readFile(OUT_FILE, 'utf8'))
    } catch {
      /* corrupt snapshot is treated as absent */
    }
  }
  const stable = (s) => JSON.stringify({ ...s, syncedAt: null }, null, 2)
  const changed = !previous || stable(previous) !== stable(snapshot)

  await mkdir(dirname(OUT_FILE), { recursive: true })
  if (changed) {
    await writeFile(OUT_FILE, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')
  }

  const secs = ((Date.now() - started) / 1000).toFixed(1)
  console.log(
    `✓ ${detailed.length} repos, ${requestCount} API calls, ${secs}s — ${
      changed ? 'snapshot updated' : 'no change'
    }`
  )

  // Consumed by the workflow to decide whether to commit.
  if (process.env.GITHUB_OUTPUT) {
    const { appendFile } = await import('node:fs/promises')
    await appendFile(process.env.GITHUB_OUTPUT, `changed=${changed}\n`)
  }
}

main().catch((err) => {
  console.error(`✗ sync failed: ${err.message}`)
  console.error('  The committed snapshot is left untouched; the site will build from it.')
  process.exit(1)
})
