import snapshot from '@/data/generated/github.json'
import { projects, visibleProjects, type Project } from '@/data/projects'

/**
 * Joins the editorial registry to the GitHub snapshot.
 *
 * The join is deliberately forgiving in one direction and strict in the other:
 *
 *   - A project whose repo has been renamed or deleted still renders. It loses
 *     its live metadata and keeps its narrative. The page does not break.
 *   - A repo with no registry entry is never shown. GitHub cannot publish to
 *     the portfolio on its own; a human decides what appears.
 *
 * That asymmetry is the whole point of having two layers. GitHub is the source
 * of truth for what exists; this site is the source of truth for what is said.
 */

export interface RepoLanguage {
  name: string
  bytes: number
  share: number
}

export interface RepoMeta {
  name: string
  fullName: string
  url: string
  homepage: string | null
  description: string | null
  archived: boolean
  defaultBranch: string
  license: string | null
  topics: string[]
  stars: number
  forks: number
  createdAt: string
  pushedAt: string
  languages: RepoLanguage[]
  primaryLanguage: string | null
  lastCommit: {
    sha: string
    message: string
    date: string | null
    url: string
  } | null
  readmeLead: string
  readmeText: string
}

interface Snapshot {
  user: string
  syncedAt: string
  repoCount: number
  skippedPrivate: string[]
  repos: RepoMeta[]
}

const data = snapshot as unknown as Snapshot

const byName = new Map(data.repos.map((r) => [r.name.toLowerCase(), r]))

export function getRepo(name?: string): RepoMeta | undefined {
  return name ? byName.get(name.toLowerCase()) : undefined
}

export interface ProjectWithRepo extends Project {
  /** Undefined when the repo is private, renamed, deleted, or sync has not run. */
  github?: RepoMeta
}

export function withRepo(project: Project): ProjectWithRepo {
  return { ...project, github: getRepo(project.repo) }
}

export const allProjects: ProjectWithRepo[] = visibleProjects.map(withRepo)

export const featured: ProjectWithRepo[] = allProjects.filter((p) => p.status === 'featured')

export function getProjectWithRepo(slug: string): ProjectWithRepo | undefined {
  const p = projects.find((x) => x.slug === slug)
  return p ? withRepo(p) : undefined
}

/* ─────────────────────────────────────────────────────────────────────────
   GitHub activity — derived, never asserted
   ───────────────────────────────────────────────────────────────────────── */

export interface ActivitySummary {
  syncedAt: string
  repoCount: number
  /** Repos ordered by most recent push, limited to ones the registry shows. */
  recent: RepoMeta[]
  /** Aggregate language share across shown repos, largest first. */
  languages: RepoLanguage[]
  /** True when the snapshot is old enough that the page should say so. */
  stale: boolean
}

const STALE_AFTER_DAYS = 10

export function activitySummary(limit = 6): ActivitySummary {
  const shown = new Set(
    visibleProjects.map((p) => p.repo?.toLowerCase()).filter(Boolean) as string[]
  )

  const recent = data.repos
    .filter((r) => shown.has(r.name.toLowerCase()))
    .sort((a, b) => +new Date(b.pushedAt) - +new Date(a.pushedAt))
    .slice(0, limit)

  const totals = new Map<string, number>()
  for (const repo of data.repos) {
    if (!shown.has(repo.name.toLowerCase())) continue
    for (const lang of repo.languages) {
      totals.set(lang.name, (totals.get(lang.name) ?? 0) + lang.bytes)
    }
  }
  const grand = [...totals.values()].reduce((a, b) => a + b, 0) || 1
  const languages = [...totals.entries()]
    .map(([name, bytes]) => ({
      name,
      bytes,
      share: Math.round((bytes / grand) * 1000) / 10,
    }))
    .sort((a, b) => b.bytes - a.bytes)

  const ageDays = (Date.now() - +new Date(data.syncedAt)) / 86_400_000

  return {
    syncedAt: data.syncedAt,
    repoCount: data.repoCount,
    recent,
    languages,
    stale: ageDays > STALE_AFTER_DAYS,
  }
}

/* ─────────────────────────────────────────────────────────────────────────
   Unified explorer feed

   Repo-backed systems and employment case studies are different kinds of
   evidence, but a visitor looking for "his agentic work" should not have to
   know which section it lives in. One feed covers both; each row says which
   kind it is and links to wherever that case study already lives, so no
   content is duplicated and no existing URL moves.
   ───────────────────────────────────────────────────────────────────────── */

import { caseStudies } from '@/data/work'
import { DOMAINS, type DomainId } from '@/data/projects'

export interface ExplorerFeedItem {
  slug: string
  name: string
  tagline: string
  year: string
  featured: boolean
  href?: string
  external?: boolean
  context: string
  domains: { id: string; label: string }[]
  stack: string[]
  repoUrl?: string
  language?: string | null
  pushedAt?: string
}

/** Maps an employment case study's discipline onto the shared taxonomy. */
const ENGAGEMENT_DOMAINS: Record<string, DomainId[]> = {
  'clinical-decision-support-graph-rag': ['rag', 'multi-agent', 'mcp', 'nlp', 'cloud-mlops'],
  'academic-research-assistant': ['rag', 'nlp', 'evaluation'],
  'incentive-compensation-pipelines': ['machine-learning', 'data-engineering', 'cloud-mlops'],
  'resume-job-matching': ['nlp', 'machine-learning'],
}

export function explorerFeed(): ExplorerFeedItem[] {
  const systems: ExplorerFeedItem[] = allProjects.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    year: p.year,
    featured: p.status === 'featured',
    href: p.problem ? `/projects/${p.slug}/` : p.github?.url,
    external: !p.problem,
    context: 'Repository',
    domains: p.domains.map((id) => ({ id, label: DOMAINS[id] })),
    stack: p.stack,
    repoUrl: p.github?.url,
    language: p.github?.primaryLanguage ?? null,
    pushedAt: p.github?.pushedAt,
  }))

  const engagements: ExplorerFeedItem[] = caseStudies.map((c) => ({
    slug: c.slug,
    name: c.title,
    tagline: c.summary,
    year: c.year,
    featured: false, // repo-backed systems carry the featured band
    href: `/work/${c.slug}/`,
    external: false,
    context: c.context,
    domains: (ENGAGEMENT_DOMAINS[c.slug] ?? []).map((id) => ({ id, label: DOMAINS[id] })),
    stack: c.stack,
    language: null,
  }))

  return [...systems, ...engagements]
}

/** Domain facets across the whole feed, not just the repo registry. */
export function feedDomains(): { id: string; label: string; count: number }[] {
  const counts = new Map<string, { label: string; count: number }>()
  for (const item of explorerFeed()) {
    for (const d of item.domains) {
      const cur = counts.get(d.id)
      counts.set(d.id, { label: d.label, count: (cur?.count ?? 0) + 1 })
    }
  }
  return (Object.keys(DOMAINS) as DomainId[])
    .filter((id) => counts.has(id))
    .map((id) => ({ id, label: counts.get(id)!.label, count: counts.get(id)!.count }))
}

/** Relative time, for "pushed 3 days ago". Deterministic given a reference. */
export function relativeTime(iso: string, now = Date.now()): string {
  const diff = now - +new Date(iso)
  const day = 86_400_000
  if (diff < day) return 'today'
  const days = Math.floor(diff / day)
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`
  const years = Math.floor(months / 12)
  return `${years} year${years === 1 ? '' : 's'} ago`
}
