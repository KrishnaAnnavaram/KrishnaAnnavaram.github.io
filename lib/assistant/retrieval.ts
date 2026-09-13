/**
 * Retrieval for the portfolio assistant.
 *
 * BM25 over the knowledge index, with three additions that matter for this
 * corpus specifically:
 *
 *   1. A domain synonym map. A visitor types "agents"; the corpus says
 *      "multi-agent", "orchestration", "LangGraph". Without expansion the
 *      most relevant passages simply do not match.
 *   2. Field boosts on headings and curated keywords, so a chunk about
 *      Bootshift outranks a chunk that merely mentions it in passing.
 *   3. A floor. Below it, the assistant says it does not know rather than
 *      returning the least-bad match. This is the whole point: a grounded
 *      system must be able to decline.
 *
 * There is no model in this path. Answers are assembled from retrieved text
 * verbatim, so the assistant cannot state anything the portfolio does not
 * already say. That is a deliberate architectural choice, not a limitation of
 * hosting — see docs/ARCHITECTURE.md.
 */

import type { Answer, Chunk, KnowledgeIndex, RetrievedChunk, Source } from './types'

/* ─────────────────────────────────────────────────────────────────────────
   Tokenisation
   ───────────────────────────────────────────────────────────────────────── */

const STOP = new Set([
  'a','an','and','are','as','at','be','been','but','by','can','did','do','does','for','from',
  'had','has','have','he','her','him','his','how','i','if','in','into','is','it','its','me',
  'of','on','or','she','so','some','than','that','the','their','them','then','there',
  'these','they','this','to','was','we','were','what','when','where','which','who','why','will',
  'with','you','your','about','any','also','more','most','such','tell',
  'give','know','krishna','krishnas','done','much','many',
  // Function words that are rare enough in this corpus to earn a misleadingly
  // high IDF. "per" matching "per-edge" is what motivated this list.
  'per','me','my','him','his','her','our','us','am','being','could','would','should',
  'may','might','must','very','just','only','even','still','via','upon','against',
  'during','before','after','above','below','again','once','both','few','other','same','too',
])

/**
 * Plurals only, and it must be idempotent: stem(stem(w)) === stem(w).
 *
 * The previous version stripped 'ing' and 'es' unconditionally, which split the
 * corpus's most common technical nouns across two posting lists — "pipeline"
 * and "pipelines" stemmed to `pipeline` and `pipelin`, "stage"/"stages" to
 * `stage`/`stag`, "embedding"/"embeddings" to `embedd`/`embedding`. A query for
 * "pipelines" then missed every chunk that said "pipeline".
 *
 * Gerund stripping is gone entirely. Losing the "building"/"build" link costs
 * far less than splitting the nouns this corpus is actually about.
 */
function stem(word: string): string {
  if (word.length <= 3) return word
  // policies → policy
  if (word.endsWith('ies') && word.length > 4) return `${word.slice(0, -3)}y`
  // batches, boxes, analyses → batch, box, analys
  if (/(?:s|x|z|ch|sh)es$/.test(word)) return word.slice(0, -2)
  // stages → stage  (drop only the 's', keeping the silent 'e')
  if (word.endsWith('es') && word.length > 4) return word.slice(0, -1)
  // Latin-ish singulars already end in 's': analysis, basis, corpus, status.
  if (/(?:sis|us)$/.test(word)) return word
  // agents → agent, but never process → proces
  if (word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1)
  return word
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    // Strip diacritics first, so a visitor typing "résumé" reaches the same
    // token as the corpus's "resume". Without this the accented form is torn
    // into fragments and matches nothing.
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9+#./-]+/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem)
}

/* ─────────────────────────────────────────────────────────────────────────
   Domain vocabulary

   Maps how a visitor talks to how the corpus is written. Each entry expands a
   query term into additional terms; it never removes the original.
   ───────────────────────────────────────────────────────────────────────── */

const SYNONYMS: Record<string, string[]> = {
  agent: ['agentic', 'multi-agent', 'orchestration', 'langgraph', 'a2a', 'autonomous'],
  agentic: ['agent', 'multi-agent', 'orchestration', 'langgraph', 'autonomous'],
  rag: ['retrieval', 'retrieval-augmented', 'grounding', 'grounded', 'vector', 'embedding', 'faiss', 'qdrant'],
  retrieval: ['rag', 'search', 'vector', 'embedding', 'index', 'bm25', 'faiss', 'qdrant'],
  mcp: ['model-context-protocol', 'gateway', 'tool', 'server'],
  llm: ['language-model', 'gpt', 'model', 'generative', 'genai'],
  genai: ['generative', 'llm', 'language-model'],
  eval: ['evaluation', 'measure', 'benchmark', 'accuracy', 'test', 'validation'],
  evaluate: ['evaluation', 'eval', 'measure', 'benchmark', 'accuracy', 'validation', 'test'],
  evaluation: ['eval', 'measure', 'benchmark', 'accuracy', 'validation', 'test'],
  measure: ['evaluation', 'metric', 'benchmark', 'evidence', 'method'],
  production: ['deployed', 'deploy', 'shipped', 'operational', 'live', 'limitation'],
  limitation: ['cannot', 'caveat', 'gap', 'known', 'weakness', 'production'],
  legacy: ['modernization', 'modernisation', 'migration', 'cobol', 'plsql', 'mainframe', 'reverse-engineering'],
  migration: ['migrate', 'modernization', 'upgrade', 'bootshift', 'legacy', 'transformation'],
  'reverse-engineering': ['reverse', 'statute', 'brd', 'plsql', 'decompile', 'analysis'],
  resume: ['cv', 'résumé', 'curriculum'],
  cv: ['resume', 'résumé'],
  contact: ['email', 'reach', 'hire', 'hiring', 'message'],
  hire: ['contact', 'hiring', 'available', 'availability', 'role', 'opportunity'],
  job: ['role', 'position', 'work', 'experience', 'employment'],
  experience: ['work', 'role', 'employment', 'career', 'job'],
  stack: ['technology', 'tech', 'tools', 'skills', 'framework'],
  skill: ['technology', 'stack', 'tools', 'expertise'],
  architecture: ['design', 'system', 'pipeline', 'diagram', 'structure'],
  project: ['work', 'system', 'build', 'repository', 'repo', 'case-study'],
  repo: ['repository', 'github', 'project', 'code', 'source'],
  now: ['current', 'currently', 'today', 'latest', 'recent'],
  current: ['now', 'currently', 'latest', 'recent', 'focus'],
  python: ['fastapi', 'pandas'],
  java: ['spring', 'springboot', 'maven'],
  spring: ['springboot', 'java', 'bootshift', 'migration'],
  cost: ['token', 'latency', 'budget', 'spend', 'performance'],
}

function expand(terms: string[]): { all: string[]; original: Set<string> } {
  const original = new Set(terms)
  const all = new Set(terms)
  for (const term of terms) {
    for (const syn of SYNONYMS[term] ?? []) {
      for (const t of tokenize(syn)) all.add(t)
    }
  }
  return { all: [...all], original }
}

/* ─────────────────────────────────────────────────────────────────────────
   BM25
   ───────────────────────────────────────────────────────────────────────── */

const K1 = 1.4
const B = 0.72
/**
 * Below this, the assistant declines rather than guessing.
 *
 * The score is normalised per query term before it meets this floor. An
 * unnormalised BM25 sum grows with query length, so a long question about
 * something the site does not cover could clear an absolute threshold purely by
 * having more words in it — and the same arithmetic decided whether an answer
 * was labelled "grounded". Both are now length-independent.
 *
 * Calibrated against twelve questions the site can answer (lowest legitimate
 * score 2.19) and ten it cannot (highest 2.52). Those ranges OVERLAP, and no
 * threshold separates them, because a lexical retriever genuinely does match
 * "Microsoft" in a certifications list and "Google" in "Google Cloud". The
 * floor is therefore set to let real questions through, and a weak match is
 * labelled as one rather than presented as an answer. Pretending a single
 * number could separate relevance from coincidence would be the dishonest
 * option here.
 */
const SCORE_FLOOR = 2.0

/**
 * How hard a partial match is penalised.
 *
 * BM25 rewards a rare term heavily, which is usually right and is exactly
 * wrong for an incidental word: a question about hourly rates matched one
 * chunk on "per" alone and scored well above the floor. Scaling by coverage
 * close to linearly means a chunk that answers one third of the question
 * cannot outrank the floor on the strength of a single lucky term.
 */
const COVERAGE_EXPONENT = 0.9

interface Prepared {
  chunk: Chunk
  /** term → frequency, over text + heading + keywords. */
  tf: Map<string, number>
  length: number
}

export class Retriever {
  private prepared: Prepared[] = []
  private df = new Map<string, number>()
  private avgLength = 1
  /** Overridable so the floor can be calibrated against real scores. */
  private readonly floor: number
  readonly index: KnowledgeIndex

  constructor(index: KnowledgeIndex, options?: { floor?: number }) {
    this.index = index
    this.floor = options?.floor ?? SCORE_FLOOR

    for (const chunk of index.chunks) {
      const tf = new Map<string, number>()
      const add = (text: string, weight: number) => {
        for (const term of tokenize(text)) {
          tf.set(term, (tf.get(term) ?? 0) + weight)
        }
      }
      add(chunk.text, 1)
      // A term in the heading is a much stronger signal than one in the body.
      add(chunk.heading, 3)
      add(chunk.keywords.join(' '), 2.5)

      const length = [...tf.values()].reduce((a, b) => a + b, 0)
      this.prepared.push({ chunk, tf, length })

      for (const term of tf.keys()) {
        this.df.set(term, (this.df.get(term) ?? 0) + 1)
      }
    }

    const total = this.prepared.reduce((a, p) => a + p.length, 0)
    this.avgLength = total / Math.max(1, this.prepared.length)
  }

  search(query: string, limit = 5): RetrievedChunk[] {
    const base = tokenize(query)
    if (base.length === 0) return []

    const { all, original } = expand(base)
    const N = this.prepared.length

    const scored = this.prepared.map((p) => {
      let score = 0
      const matched: string[] = []

      for (const term of all) {
        const f = p.tf.get(term)
        if (!f) continue

        const df = this.df.get(term) ?? 0
        const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5))
        const norm = f * (K1 + 1) / (f + K1 * (1 - B + B * (p.length / this.avgLength)))

        // An expanded synonym is worth less than the word the visitor typed.
        score += idf * norm * (original.has(term) ? 1 : 0.55)
        if (original.has(term)) matched.push(term)
      }

      // Reward chunks that cover more of the query rather than one term loudly.
      const coverage = matched.length / base.length
      score *= Math.pow(coverage, COVERAGE_EXPONENT)
      score *= p.chunk.boost
      // Per-term, so a five-word question and a two-word one are comparable.
      score /= base.length

      return { chunk: p.chunk, score, matched: [...new Set(matched)] }
    })

    return scored
      .filter((r) => r.score >= this.floor)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }

  /**
   * Composes an answer from retrieved passages. The lead sentence is chosen
   * from a fixed set of templates and filled only with retrieved values — it
   * never introduces a fact.
   */
  answer(query: string, limit = 4): Answer {
    const hits = this.search(query, limit)

    if (hits.length === 0) {
      return {
        query,
        confidence: 'none',
        lead:
          "I don't have anything in the portfolio that answers that. I only answer from what's published here — projects, experience, research, writing and contact details.",
        passages: [],
        sources: [],
        didYouMean: this.index.suggestions.slice(0, 4),
      }
    }

    const top = hits[0]
    const strong = top.score >= this.floor * 1.9
    const sources: Source[] = []
    for (const hit of hits) {
      if (!sources.some((s) => s.href === hit.chunk.source.href)) {
        sources.push(hit.chunk.source)
      }
    }

    /* A weak match is stated as a weak match. Retrieval has no notion of
       whether a passage answers the question, and presenting a lexical
       near-miss as "here is what it says" invites the reader to treat an
       unrelated passage as an answer. */
    const lead = strong
      ? `From ${top.chunk.source.title}:`
      : `Nothing here answers that directly. The closest passages by wording are below — they may not be relevant.`

    return {
      query,
      confidence: strong ? 'grounded' : 'partial',
      lead,
      passages: hits,
      sources,
    }
  }
}

/** Loads the index once and caches it. Called on first assistant open. */
let cached: Promise<Retriever> | null = null

export function loadRetriever(basePath = ''): Promise<Retriever> {
  if (!cached) {
    cached = fetch(`${basePath}/ai/knowledge.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`knowledge index ${r.status}`)
        return r.json() as Promise<KnowledgeIndex>
      })
      .then((index) => new Retriever(index))
      .catch((err) => {
        cached = null // allow a retry on the next open
        throw err
      })
  }
  return cached
}
