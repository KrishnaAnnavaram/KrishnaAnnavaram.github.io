import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Retriever, tokenize } from '@/lib/assistant/retrieval'
import type { KnowledgeIndex } from '@/lib/assistant/types'

/**
 * The assistant's contract is narrow and worth defending with tests:
 * it answers only from indexed passages, it cites every one, and when nothing
 * clears the relevance floor it declines instead of guessing.
 *
 * These run against the real index, so a content change that breaks a
 * question the site advertises will fail the build rather than ship.
 */

const index: KnowledgeIndex = JSON.parse(
  readFileSync(resolve(__dirname, '../../public/ai/knowledge.json'), 'utf8')
)
const retriever = new Retriever(index)

describe('tokenize', () => {
  it('drops stop words and lowercases', () => {
    expect(tokenize('What IS the Architecture')).toEqual(['architecture'])
  })

  it('keeps technical tokens that punctuation would otherwise split', () => {
    expect(tokenize('C++ and .NET and node.js')).toContain('c++')
    expect(tokenize('gpt-4 model')).toContain('gpt-4')
  })

  it.each([
    ['agents', 'agent'],
    ['stages', 'stage'],
    ['pipelines', 'pipeline'],
    ['embeddings', 'embedding'],
    ['findings', 'finding'],
    ['diagrams', 'diagram'],
    ['policies', 'policy'],
    ['harnesses', 'harness'],
  ])('stems %s to the same token as %s', (plural, singular) => {
    expect(tokenize(plural)).toEqual(tokenize(singular))
  })

  it('never stems a word to something shorter than its own singular', () => {
    // The original stemmer stripped 'es' and 'ing' unconditionally, splitting
    // "pipeline"/"pipelines" into two posting lists. These are the words that
    // actually occur in this corpus, so a regression here is a search defect.
    for (const w of ['stage', 'pipeline', 'embedding', 'finding', 'process', 'analysis', 'status', 'corpus']) {
      expect(tokenize(w), `"${w}" should stem to itself`).toEqual([w])
    }
  })

  it('is idempotent — stemming a stem changes nothing', () => {
    const words = [
      'agents', 'stages', 'pipelines', 'embeddings', 'findings', 'processes',
      'policies', 'harnesses', 'diagrams', 'systems', 'requirements', 'tests',
    ]
    for (const w of words) {
      const once = tokenize(w)[0]
      expect(tokenize(once)[0], `stem(stem("${w}")) drifted`).toBe(once)
    }
  })

  it('returns nothing for a query made entirely of stop words', () => {
    expect(tokenize('what is the')).toEqual([])
  })
})

describe('grounding', () => {
  it('every indexed passage carries a source with a destination', () => {
    for (const chunk of index.chunks) {
      expect(chunk.source.title, `chunk ${chunk.id} has no source title`).toBeTruthy()
      expect(chunk.source.href, `chunk ${chunk.id} has no href`).toBeTruthy()
    }
  })

  it('every internal source href is a real route, not a guess', () => {
    const routes = new Set([
      '/',
      '/about/',
      '/projects/',
      '/experience/',
      '/research/',
      '/writing/',
      '/contact/',
      '/work/',
    ])
    for (const chunk of index.chunks) {
      const { href, external } = chunk.source
      if (external) continue
      const known =
        routes.has(href) || href.startsWith('/projects/') || href.startsWith('/work/') || href.startsWith('/writing/')
      expect(known, `chunk ${chunk.id} points at an unknown route: ${href}`).toBe(true)
    }
  })

  it('passages are returned verbatim, never rewritten', () => {
    // Checks the returned object is the indexed one, not a copy that some
    // intermediate step could have altered.
    const byId = new Map(index.chunks.map((c) => [c.id, c]))
    for (const q of ['bootshift', 'statute', 'how do I get in touch', 'MCP gateway']) {
      for (const { chunk } of retriever.answer(q).passages) {
        expect(byId.get(chunk.id)?.text).toBe(chunk.text)
      }
    }
  })

  it('the skills inventory never outranks a passage about real work', () => {
    // Listing a tool is not evidence of depth in it. A question about a
    // technology should reach the work before it reaches the inventory.
    const answer = retriever.answer('what has he built with MCP')
    expect(answer.passages[0].chunk.source.kind).not.toBe('skills')
  })
})

describe('refusal', () => {
  const outOfScope = [
    'what is the capital of France',
    'write me a poem about databases',
    'how much does he charge per hour',
    'what is his favourite restaurant in Denton',
    'what is his visa status',
    'quantum chromodynamics lattice gauge',
    'does he have a security clearance',
    'what is his salary expectation',
    'what are his notice period requirements',
  ]

  it.each(outOfScope)('declines rather than guessing: %s', (query) => {
    const answer = retriever.answer(query)
    expect(answer.confidence).toBe('none')
    expect(answer.passages).toHaveLength(0)
    expect(answer.lead).toMatch(/don't have|only answer/i)
  })

  it('offers suggestions when it declines', () => {
    const answer = retriever.answer('what is the capital of France')
    expect(answer.didYouMean?.length).toBeGreaterThan(0)
  })

  it('handles an empty query without throwing', () => {
    expect(retriever.answer('').confidence).toBe('none')
    expect(retriever.answer('   ').confidence).toBe('none')
  })

  /**
   * The harder case, and the one the first version of this suite avoided:
   * questions that are out of scope but share vocabulary with the corpus.
   * A lexical retriever genuinely matches "Microsoft" in a certifications list
   * and "Google" in "Google Cloud". It cannot refuse these, and pretending
   * otherwise would be the dishonest fix — so the requirement is that it must
   * not present them as answers.
   *
   * Not covered, deliberately: a single-token query naming an entity that does
   * appear ("Amazon" → the AWS certification). One high-IDF term over a
   * one-term query scores well by construction, and no threshold fixes that
   * without breaking real one-word questions. What protects the reader there
   * is the passage itself — it arrives under a "Certifications" heading with a
   * link, which does not read as an employment claim.
   */
  it.each([
    'Who is the CEO of Microsoft?',
    'Tell me about his time at Google',
    'what did he build at Netflix',
  ])('never labels a lexical coincidence as grounded: %s', (query) => {
    const answer = retriever.answer(query)
    expect(answer.confidence).not.toBe('grounded')
    if (answer.confidence === 'partial') {
      expect(answer.lead).toMatch(/nothing here answers that directly/i)
      expect(answer.lead).toMatch(/may not be relevant/i)
    }
  })

  it('the lead sentence never introduces a fact of its own', () => {
    // Only two lead templates exist. Both are checked here, because the lead is
    // the one piece of assembled prose in the system and therefore the only
    // place a false statement could originate.
    const leads = new Set<string>()
    for (const q of [...outOfScope, 'bootshift', 'statute architecture', 'Tell me about his time at Google']) {
      leads.add(retriever.answer(q).lead)
    }
    for (const lead of leads) {
      expect(lead).toMatch(
        /^(From .+:|Nothing here answers that directly\..+|I don't have anything in the portfolio.+)$/s
      )
    }
  })
})

describe('retrieval quality', () => {
  it('answers every question the UI advertises', () => {
    for (const suggestion of index.suggestions) {
      const answer = retriever.answer(suggestion)
      expect(answer.confidence, `advertised question returned nothing: "${suggestion}"`).not.toBe(
        'none'
      )
      expect(answer.sources.length).toBeGreaterThan(0)
    }
  })

  it.each([
    ['which projects use multi-agent architectures', /gateway|bootshift|decisionforge/i],
    ['explain the bootshift architecture', /bootshift/i],
    ['what does he know about MCP', /mcp|gateway/i],
    ['legacy modernisation work', /bootshift|statute|complexity/i],
    ['reverse engineering', /statute/i],
    ['how do I contact him', /contact/i],
    ['where is the resume', /contact|about/i],
    ['what is he working on now', /focus|about|virtusa/i],
  ])('routes "%s" to a relevant source', (query, pattern) => {
    const answer = retriever.answer(query)
    expect(answer.confidence).not.toBe('none')
    const titles = answer.sources.map((s) => s.title).join(' | ')
    const headings = answer.passages.map((p) => p.chunk.heading).join(' | ')
    expect(`${titles} ${headings}`).toMatch(pattern)
  })

  it('expands domain vocabulary — "agents" reaches multi-agent content', () => {
    const answer = retriever.answer('agents')
    expect(answer.confidence).not.toBe('none')
  })

  it('ranks a direct name match above an incidental mention', () => {
    const answer = retriever.answer('statute')
    expect(answer.passages[0].chunk.heading.toLowerCase()).toContain('statute')
  })

  it('deduplicates sources across passages', () => {
    const answer = retriever.answer('bootshift architecture and evidence')
    const hrefs = answer.sources.map((s) => s.href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  it('is deterministic — the same query twice gives the same answer', () => {
    const a = retriever.answer('what is statute')
    const b = retriever.answer('what is statute')
    expect(a.passages.map((p) => p.chunk.id)).toEqual(b.passages.map((p) => p.chunk.id))
  })
})

describe('index integrity', () => {
  it('has a meaningful number of passages', () => {
    expect(index.chunks.length).toBeGreaterThan(40)
  })

  it('uses unique ids', () => {
    const ids = index.chunks.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('stays small enough to fetch on demand', () => {
    const bytes = Buffer.byteLength(JSON.stringify(index))
    expect(bytes).toBeLessThan(400_000)
  })

  it('does not leak a phone number', () => {
    // Email is published deliberately; the phone number is not.
    const corpus = JSON.stringify(index)
    expect(corpus).not.toMatch(/\+1\s?9725|972-957/)
  })
})
