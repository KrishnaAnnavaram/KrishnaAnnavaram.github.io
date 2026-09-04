export interface Highlight {
  /** The claim. Kept short enough to scan. */
  text: string
  /** Optional measured result. Omitted wherever a number can't be substantiated. */
  metric?: string
}

export interface Role {
  id: string
  company: string
  title: string
  employment: 'Full-time' | 'Part-time' | 'Contract' | 'Academic'
  start: string
  end: string | null
  location: string
  /** Two sentences max — what the role was actually for. */
  summary: string
  highlights: Highlight[]
  stack: string[]
  /**
   * True where the public record confirms the role but no detailed account of
   * the work exists in the source documents yet. Rendered without invented
   * metrics; see CONTENT_TODO.md.
   */
  needsDetail?: boolean
}

/**
 * Source of truth: the LinkedIn profile record.
 * Role detail for Cognizant, Lemoius and the UNT assistantship is drawn from
 * the résumé in `portfolio_data/documents/resume/`. Approximate figures are
 * marked with a tilde, exactly as they appear there.
 */
export const experience: Role[] = [
  {
    id: 'virtusa',
    company: 'Virtusa',
    title: 'Generative AI Engineer',
    employment: 'Full-time',
    start: '2026-06',
    end: null,
    location: 'United States',
    summary:
      'Building production generative AI services — retrieval pipelines, agent orchestration, and the evaluation and deployment scaffolding around them — for enterprise client engagements.',
    highlights: [
      { text: 'Design and ship retrieval-augmented generation services that ground model output in client document corpora' },
      { text: 'Build agent workflows that separate retrieval, reasoning, and validation into independently testable stages' },
      { text: 'Stand up evaluation harnesses tracking answer accuracy, groundedness, and hallucination rate across releases' },
      { text: 'Deploy and operate Python/FastAPI inference services with CI/CD, monitoring, and cost instrumentation' },
    ],
    stack: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'Azure OpenAI', 'Vector Databases', 'Docker', 'CI/CD'],
    needsDetail: true,
  },
  {
    id: 'ideate-technologies',
    company: 'Ideate Technologies',
    title: 'Generative AI Engineer',
    employment: 'Full-time',
    start: '2026-03',
    end: '2026-06',
    location: 'United States',
    summary:
      'Delivered LLM-backed document intelligence and question-answering systems, taking them from prototype into services other teams could depend on.',
    highlights: [
      { text: 'Built document Q&A assistants over mixed structured and unstructured sources' },
      { text: 'Replaced free-text model output with deterministic schemas so downstream systems could validate responses' },
      { text: 'Introduced prompt and context versioning to make results reproducible across deployments' },
      { text: 'Tuned retrieval and inference for latency and token cost ahead of production rollout' },
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'Embeddings', 'Semantic Search', 'REST APIs'],
    needsDetail: true,
  },
  {
    id: 'unt-gta',
    company: 'University of North Texas',
    title: 'Graduate Teaching Assistant',
    employment: 'Academic',
    start: '2024-08',
    end: '2025-05',
    location: 'Denton, TX',
    summary:
      'Supported graduate Data Science coursework and built an AI research-assistance system for students, while mentoring project teams through end-to-end ML delivery.',
    highlights: [
      {
        text: 'Designed and deployed an AI research assistant integrating course materials with UNT Library academic databases',
        metric: '~40–45% less repetitive faculty and TA guidance effort across the semester',
      },
      {
        text: 'Implemented the retrieval pipeline on FAISS, PostgreSQL and Redis for grounded, multi-turn research queries',
        metric: '~88–92% retrieval relevance with stable session continuity in real academic use',
      },
      { text: 'Mentored graduate project teams from problem framing through evaluation and written reporting' },
      { text: 'Translated theoretical ML material into reproducible, runnable analytics pipelines for coursework' },
    ],
    stack: ['Python', 'FAISS', 'PostgreSQL', 'Redis', 'RAG', 'Hugging Face', 'scikit-learn'],
  },
  {
    id: 'cognizant',
    company: 'Cognizant',
    title: 'Programming Analyst',
    employment: 'Full-time',
    start: '2021-07',
    end: '2022-11',
    location: 'India',
    summary:
      'Built enterprise ML and data pipelines for US healthcare clients, working across claims data, incentive compensation systems, and the AWS infrastructure underneath them.',
    highlights: [
      {
        text: 'Built ML pipelines over healthcare claims and sales incentive data in Python, SQL and AWS',
        metric: '35% better incentive payout forecasting and utilisation analytics',
      },
      {
        text: 'Standardised feature pipelines integrating SAP ICM, Workday and claims datasets',
        metric: '55% less preprocessing and reconciliation effort across incentive workflows',
      },
      { text: 'Deployed batch and near-real-time inference on SageMaker, Lambda and containerised services' },
      { text: 'Built analytics-ready data marts on S3 and Athena for regional, county and state-level stakeholders' },
      { text: 'Versioned models and automated releases through AWS CodePipeline, Git and CloudWatch' },
    ],
    stack: [
      'Python',
      'SQL',
      'AWS SageMaker',
      'AWS Lambda',
      'S3',
      'Athena',
      'SAP ICM',
      'CodePipeline',
      'CloudWatch',
    ],
  },
  {
    id: 'lemoius',
    company: 'Lemoius',
    title: 'Machine Learning Engineer',
    employment: 'Full-time',
    start: '2020-05',
    end: '2021-07',
    location: 'India',
    summary:
      'First engineering role — built the NLP and ranking systems behind a resume-to-job matching product for a job marketplace.',
    highlights: [
      {
        text: 'Built a resume-to-job recommendation system matching seekers to recruiters',
        metric: '~35% improvement in job discovery relevance through iterative tuning',
      },
      {
        text: 'Built NLP pipelines turning unstructured resumes into semantic representations using BERT embeddings',
        metric: '~30% improvement in matching accuracy',
      },
      {
        text: 'Implemented ranking and similarity logic on sentence embeddings, cosine similarity and feature scoring',
        metric: '~25% better shortlisting quality and recruiter engagement',
      },
      { text: 'Maintained reproducible experiment tracking and version control across the team’s ML codebase' },
    ],
    stack: ['Python', 'BERT', 'Sentence Embeddings', 'scikit-learn', 'NLP', 'Git'],
  },
]

export const currentRole = experience[0]

/** "May 2020" style, or "Present" for an open-ended role. */
export function formatRoleDate(value: string | null): string {
  if (!value) return 'Present'
  const [year, month] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, 1))
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

/** Inclusive month span, rendered as "1 yr 5 mos". */
export function roleDuration(start: string, end: string | null): string {
  const [sy, sm] = start.split('-').map(Number)
  const endValue = end ?? `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
  const [ey, em] = endValue.split('-').map(Number)
  const months = (ey - sy) * 12 + (em - sm) + 1
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts: string[] = []
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`)
  return parts.join(' ') || '1 mo'
}
