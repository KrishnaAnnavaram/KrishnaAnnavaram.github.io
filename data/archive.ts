import raw from './archive.json'

/* ═══════════════════════════════════════════════════════════════════════════
   ARCHIVE, earlier work.

   Applied ML and GenAI projects, each its own public repository with a test
   suite and CI. They are deliberately below the flagship systems: the
   flagships are the argument, this is the range.

   What an entry may say is narrower than what a flagship may say. Most of
   these repositories validate on synthetic or demo data, and several READMEs
   name models whose numbers the README itself declines to report. So an
   archive entry carries a description, a pipeline, a stack and a CI test
   count, all checkable from the repository, and NO model metric. If a
   number appears in `note`, it was filtered out when the data was built.

   `tests` is the passing count from the repository's own CI badge.
   ═══════════════════════════════════════════════════════════════════════════ */

export const ARCHIVE_CATEGORIES = {
  'genai-rag': 'RAG & GenAI apps',
  agents: 'Agents & tool use',
  'llm-eval': 'LLM evaluation',
  nlp: 'NLP',
  'vision-medical': 'Medical imaging',
  'clinical-ml': 'Clinical ML',
  'vision-other': 'Computer vision',
  forecasting: 'Forecasting',
  'tabular-ml': 'Applied ML',
  recsys: 'Recommenders',
  'speech-audio': 'Speech & audio',
  analytics: 'Analytics',
  security: 'Security',
} as const

export type ArchiveCategory = keyof typeof ARCHIVE_CATEGORIES

export interface ArchiveEntry {
  /** Exact repository name under github.com/KrishnaAnnavaram. */
  repo: string
  title: string
  tagline: string
  category: ArchiveCategory
  stack: string[]
  /** The stage line from the README, e.g. "validate → segment → measure". */
  pipeline: string | null
  /** One engineering point, number-free by construction. */
  note: string | null
  tests: number | null
  /** True when a language model is part of the system. */
  llm: boolean
  /** Editorial ordering only: A sorts first. Never rendered. */
  tier: 'A' | 'B' | 'C'
}

export const archive = raw as ArchiveEntry[]

export const GITHUB_USER = 'KrishnaAnnavaram'

export function repoUrl(repo: string) {
  return `https://github.com/${GITHUB_USER}/${repo}`
}

/** Category facets with counts, largest first. */
export function archiveCategories(): { id: ArchiveCategory; label: string; count: number }[] {
  const counts = new Map<ArchiveCategory, number>()
  for (const e of archive) counts.set(e.category, (counts.get(e.category) ?? 0) + 1)
  return [...counts.entries()]
    .map(([id, count]) => ({ id, label: ARCHIVE_CATEGORIES[id], count }))
    .sort((a, b) => b.count - a.count)
}

export const archiveTestTotal = archive.reduce((n, e) => n + (e.tests ?? 0), 0)
