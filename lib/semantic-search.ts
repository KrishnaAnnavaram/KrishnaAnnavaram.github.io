import { cosineSimilarity } from './utils'
import { projects, type Project } from '@/data/projects'
import { experience, type ExperienceRole } from '@/data/experience'

export interface SearchResult {
  id: string
  type: 'project' | 'experience'
  score: number
  data: Project | ExperienceRole
}

type PipelineFunction = (text: string, options?: Record<string, unknown>) => Promise<{ data: number[] }>

let embedder: PipelineFunction | null = null
let contentEmbeddings: { id: string; type: 'project' | 'experience'; embedding: number[]; data: Project | ExperienceRole }[] = []
let isLoading = false
let isReady = false

function getSearchableText(item: Project | ExperienceRole): string {
  if ('slug' in item) {
    const p = item as Project
    return `${p.title} ${p.tagline} ${p.category} ${p.problem} ${p.approach} ${p.techStack.join(' ')}`
  } else {
    const e = item as ExperienceRole
    return `${e.title} ${e.company} ${e.summary} ${e.context} ${e.built.join(' ')} ${e.techStack.join(' ')}`
  }
}

export async function initSemanticSearch(onProgress?: (status: string) => void): Promise<void> {
  if (isReady || isLoading) return
  isLoading = true

  try {
    onProgress?.('Loading AI model…')

    // Dynamically import to avoid SSR issues and missing module errors
    const transformers = await import('@xenova/transformers' as string).catch(() => null) as Record<string, unknown> | null

    if (!transformers) {
      // Graceful fallback: use simple keyword search if transformers unavailable
      isLoading = false
      return
    }

    onProgress?.('Initializing embeddings…')
    const createPipeline = transformers.pipeline as (task: string, model: string) => Promise<PipelineFunction>
    embedder = await createPipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')

    const allItems: { id: string; type: 'project' | 'experience'; data: Project | ExperienceRole }[] = [
      ...projects.map((p) => ({ id: p.slug, type: 'project' as const, data: p })),
      ...experience.map((e) => ({ id: e.id, type: 'experience' as const, data: e })),
    ]

    onProgress?.('Building search index…')
    for (const item of allItems) {
      const text = getSearchableText(item.data)
      if (!embedder) break
      const result = await embedder(text, { pooling: 'mean', normalize: true })
      contentEmbeddings.push({ ...item, embedding: Array.from(result.data) })
    }

    isReady = true
    onProgress?.('Ready')
  } catch (error) {
    console.error('Semantic search initialization failed:', error)
    isLoading = false
    throw error
  }
}

export async function semanticSearch(query: string): Promise<SearchResult[]> {
  if (!isReady || !embedder) {
    // Fallback to keyword search
    return keywordSearch(query)
  }

  const queryResult = await embedder(query, { pooling: 'mean', normalize: true })
  const queryEmbedding = Array.from(queryResult.data)

  const results: SearchResult[] = contentEmbeddings.map((item) => ({
    id: item.id,
    type: item.type,
    score: cosineSimilarity(queryEmbedding, item.embedding),
    data: item.data,
  }))

  return results.sort((a, b) => b.score - a.score)
}

function keywordSearch(query: string): SearchResult[] {
  const q = query.toLowerCase()
  const results: SearchResult[] = []

  for (const project of projects) {
    const text = getSearchableText(project).toLowerCase()
    const score = q.split(' ').filter((word) => text.includes(word)).length / q.split(' ').length
    if (score > 0) {
      results.push({ id: project.slug, type: 'project', score, data: project })
    }
  }

  for (const role of experience) {
    const text = getSearchableText(role).toLowerCase()
    const score = q.split(' ').filter((word) => text.includes(word)).length / q.split(' ').length
    if (score > 0) {
      results.push({ id: role.id, type: 'experience', score, data: role })
    }
  }

  return results.sort((a, b) => b.score - a.score)
}

export function isSearchReady(): boolean {
  return isReady
}

export function isSearchLoading(): boolean {
  return isLoading
}
