import { describe, expect, it } from 'vitest'
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, join, extname } from 'node:path'

/**
 * Scans the built output for things that should not ship.
 *
 * This exists because a check of the *source* is not enough. The phone number
 * was never rendered by any component, so nothing in the source looked wrong —
 * but `profile` is imported by client components, so the whole object was
 * bundled into the layout chunk and served on every page. Invisible to a
 * reader, trivially scrapable by anyone opening the JavaScript.
 *
 * So the assertion is made against `out/`: whatever actually gets published.
 *
 * Skipped when `out/` is absent, so `npm test` works before a build. CI always
 * builds first, so it always runs there.
 */

const OUT = resolve(__dirname, '../../out')
const TEXT = new Set(['.html', '.js', '.json', '.css', '.txt', '.xml', '.map', '.webmanifest'])

function textFiles(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      textFiles(path, acc)
    } else if (TEXT.has(extname(name).toLowerCase())) {
      acc.push(path)
    }
  }
  return acc
}

const built = existsSync(OUT)

describe.skipIf(!built)('nothing sensitive reaches the published output', () => {
  const files = built ? textFiles(OUT) : []

  /** Each entry: what it is, and how to recognise it. */
  const FORBIDDEN: [label: string, pattern: RegExp][] = [
    ['a phone number', /\+?1?[\s.-]?\(?972\)?[\s.-]?957[\s.-]?7974/],
    ['an OpenAI-style key', /\bsk-[A-Za-z0-9]{32,}\b/],
    ['an Anthropic key', /\bsk-ant-[A-Za-z0-9_-]{20,}/],
    ['an AWS access key id', /\bAKIA[0-9A-Z]{16}\b/],
    ['a GitHub token', /\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}\b/],
    ['a fine-grained GitHub token', /\bgithub_pat_[A-Za-z0-9_]{50,}\b/],
    ['a Slack token', /\bxox[baprs]-[A-Za-z0-9-]{10,}/],
    ['a private key block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
    ['a Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/],
  ]

  it.each(FORBIDDEN)('does not publish %s', (label, pattern) => {
    const hits: string[] = []
    for (const file of files) {
      const body = readFileSync(file, 'utf8')
      if (pattern.test(body)) hits.push(file.slice(OUT.length + 1))
    }
    expect(hits, `${label} found in: ${hits.join(', ')}`).toEqual([])
  })

  it('publishes the email deliberately, so the contact route still works', () => {
    // The inverse check: confirming the scan above is actually reading files
    // that contain real content, rather than passing on an empty read.
    const withEmail = files.filter((f) =>
      readFileSync(f, 'utf8').includes('annavaramkrishna@gmail.com')
    )
    expect(withEmail.length).toBeGreaterThan(0)
  })

  it('scanned a meaningful number of files', () => {
    expect(files.length).toBeGreaterThan(30)
  })
})
