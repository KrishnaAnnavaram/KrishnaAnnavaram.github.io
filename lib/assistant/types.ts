/**
 * Types shared by the knowledge-index builder (build time, Node) and the
 * assistant runtime (browser). One definition, two consumers.
 */

/** Where a passage came from. Every answer carries these; none are optional. */
export interface Source {
  /** Human label shown on the citation chip. */
  title: string
  /** Internal route or external URL. */
  href: string
  /** Which part of the portfolio this is, for grouping and filtering. */
  kind: SourceKind
  external?: boolean
}

export type SourceKind =
  | 'case-study'
  | 'project'
  | 'experience'
  | 'profile'
  | 'writing'
  | 'research'
  | 'skills'
  | 'education'
  | 'contact'

/** One retrievable unit. Chunks are small enough to quote in full. */
export interface Chunk {
  id: string
  /** The verbatim text that will be shown to the reader if this chunk wins. */
  text: string
  /** Short heading for the passage, e.g. "Bootshift — the problem". */
  heading: string
  source: Source
  /** Extra terms that should match this chunk but are not in its text. */
  keywords: string[]
  /**
   * Editorial weight. Lifts genuinely important passages above incidental
   * ones that happen to share vocabulary. 1.0 is neutral.
   */
  boost: number
}

export interface KnowledgeIndex {
  chunkCount: number
  chunks: Chunk[]
  /** Questions the assistant is known to answer well. Shown as prompts. */
  suggestions: string[]
}

export interface RetrievedChunk {
  chunk: Chunk
  score: number
  /** Query terms that actually matched — used to highlight and to explain. */
  matched: string[]
}

export type AnswerConfidence = 'grounded' | 'partial' | 'none'

export interface Answer {
  /** The question as asked. */
  query: string
  confidence: AnswerConfidence
  /** Lead sentence. Always factual, always derived from retrieved text. */
  lead: string
  /** Verbatim passages. Never paraphrased, never generated. */
  passages: RetrievedChunk[]
  /** Deduplicated sources across passages, in relevance order. */
  sources: Source[]
  /** Shown when confidence is 'none' — what to try instead. */
  didYouMean?: string[]
}
