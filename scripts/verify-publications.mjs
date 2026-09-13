#!/usr/bin/env node
/**
 * Verifies every publication entry against the PDF it links to.
 *
 * This exists because an earlier version of the site listed 23 "supervised
 * project" entries whose titles and abstracts described work that was not in
 * the documents they linked to. Of those 23, one contained the author's
 * surname and two had a title matching the linked document. They were removed.
 *
 * Two checks per entry, both run against the PDF's own extracted text:
 *   1. the author's surname appears in the document
 *   2. the entry's title matches the document's title
 *
 * PDF text extraction inserts spaces inside words, so both comparisons are
 * made against a squashed, lowercased, alphanumeric-only form.
 *
 *   node scripts/verify-publications.mjs
 *
 * Exits non-zero if any entry fails, so it can gate a release.
 */

import { readFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { inflateSync } from 'node:zlib'
import { resolve, basename } from 'node:path'

const SURNAME = 'annavaram'
const REPORTS = resolve(process.cwd(), 'public/reports')
const SOURCE = resolve(process.cwd(), 'data/publications.ts')

/**
 * Pulls readable text out of a PDF's flate-compressed content streams.
 *
 * Deliberately crude — enough to check that a surname and a title are present,
 * not a parser. The one subtlety: a naive search for "stream" also hits
 * "endstream", so the opening keyword is matched as a whole token followed by
 * its newline.
 */
function pdfText(buffer, limit = 6000) {
  const raw = buffer.toString('latin1')
  const opener = /[^e]stream\r?\n/g
  const out = []
  let m

  while ((m = opener.exec(raw)) !== null) {
    const start = m.index + m[0].length
    const end = raw.indexOf('endstream', start)
    if (end === -1) break

    let decoded
    try {
      decoded = inflateSync(Buffer.from(raw.slice(start, end), 'latin1')).toString('latin1')
    } catch {
      continue
    }

    const pieces = decoded.match(/\((?:\\.|[^()\\])*\)/g)
    if (pieces) out.push(pieces.join(' ').replace(/[()\\]/g, ' '))
    if (out.join(' ').length > limit) break
  }

  return out.join(' ').slice(0, limit)
}

const squash = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

const source = await readFile(SOURCE, 'utf8')
const entries = [
  ...source.matchAll(
    /\{\s*id:\s*'([^']+)',\s*title:\s*'((?:[^'\\]|\\.)*)',[\s\S]*?type:\s*'([^']+)',[\s\S]*?url:\s*'([^']*)'/g
  ),
].map((m) => ({ id: m[1], title: m[2], type: m[3], url: m[4] }))

if (entries.length === 0) {
  console.error('✗ parsed no entries — the regex and the data file have drifted apart')
  process.exit(1)
}

const failures = []
const referenced = new Set()

for (const entry of entries) {
  const file = entry.url.split('/').pop()
  referenced.add(file)
  const path = resolve(REPORTS, file)

  if (!existsSync(path)) {
    failures.push(`${entry.id}: linked file is missing (${file})`)
    continue
  }

  const text = squash(pdfText(await readFile(path)))

  if (!text.includes(SURNAME)) {
    failures.push(`${entry.id}: surname does not appear in ${file}`)
  }

  const words = entry.title
    .replace(/[^A-Za-z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 6)
  const hits = words.filter((w) => text.includes(squash(w))).length
  if (words.length && hits < Math.max(2, words.length - 2)) {
    failures.push(`${entry.id}: title matches ${hits}/${words.length} words in ${file}`)
  }
}

/* An orphaned report is other people's coursework left in a public directory. */
const orphans = (await readdir(REPORTS)).filter((f) => !referenced.has(f))
for (const f of orphans) {
  failures.push(`${basename(f)}: present in public/reports but referenced by nothing`)
}

console.log(`checked ${entries.length} entries against ${referenced.size} reports`)
if (failures.length === 0) {
  console.log('✓ every entry names its author and matches its document')
  process.exit(0)
}

console.error(`\n✗ ${failures.length} problem(s):`)
for (const f of failures) console.error(`  ${f}`)
process.exit(1)
