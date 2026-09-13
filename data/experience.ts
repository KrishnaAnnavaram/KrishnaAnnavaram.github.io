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
 * Source of truth: the résumé at `public/resume/resume.pdf`, cross-checked
 * against the LinkedIn record for companies, titles and dates.
 *
 * Every metric below appears in that document. Nothing is estimated here, and
 * a figure the résumé gives as a range is kept as a range rather than rounded
 * to a single more impressive number.
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
      'Building reusable AI-assisted engineering harnesses on Google Cloud — legacy reverse engineering, quantitative risk, code-complexity assessment, Spring Boot migration and vulnerability remediation — each on the same pattern: deterministic analysis, governed AI reasoning, full traceability, human approval gates.',
    highlights: [
      {
        text: 'Engineered Statute, an 8-stage PL/SQL reverse-engineering harness turning legacy Oracle code into traceable business requirements, BRDs, ERDs and gap registers',
        metric: '41 requirements over a 353-node / 769-relationship knowledge graph, validated by 414 automated checks',
      },
      {
        text: 'Designed Smart Quant, a 3-agent reasoning and bounded-negotiation platform that validates methodology, required inputs and available capability before running any market-risk analytics',
        metric: '267K+ market observations across 56 governed capabilities',
      },
      {
        text: 'Cut the incomplete-request path by putting deterministic preflight completeness checks ahead of retrieval and computation',
        metric: 'From 5 agent handoffs, 4 vector searches and 4 model calls down to 2 handoffs, 0 searches and 1 model call',
      },
      {
        text: 'Built an adaptive legacy code complexity harness covering cyclomatic, cognitive, coupling, dependency, architecture, database, runtime, testability and maintainability dimensions',
        metric: '20 language-agnostic analyzers, enabling source-to-target migration risk and effort comparison',
      },
      {
        text: 'Orchestrated Bootshift, a 20-stage Spring Boot modernisation harness spanning repository discovery, dependency and application graphs, OpenRewrite transformation, compiler-guided repair, and runtime and differential validation',
        metric: '31 enforced safety controls, 190 automated tests',
      },
      {
        text: 'Extended a 7-agent, 9-stage CWE vulnerability detection and adaptive auto-remediation harness with root-cause analysis, blast-radius assessment, controlled patching and red-team plus regression validation',
        metric: 'Derives fixes from five analogous security cases where no vetted patch exists',
      },
      {
        text: 'Led POC delivery end to end — architecture, cross-project CI/CD, automated quality gates, technical review, Google Cloud releases and stakeholder demos',
      },
    ],
    stack: ['Python', 'Java', 'Claude', 'LangGraph', 'MCP', 'A2A', 'ANTLR4', 'sqlglot', 'OpenRewrite', 'Neo4j', 'Qdrant', 'Google Cloud'],
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
      'Delivered a Graph-RAG clinical decision support system and a voice-based patient intake platform for US hospital clients, along with the MLOps that kept both running.',
    highlights: [
      {
        text: 'Led delivery of a Graph-RAG clinical decision support system unifying Neo4j knowledge graphs, FAISS vector search and Azure OpenAI into a real-time diagnostic reasoning pipeline',
        metric: '91% retrieval accuracy, 45% fewer unsafe clinical recommendations',
      },
      {
        text: 'Directed a voice-based patient intake platform on Azure Speech-to-Text with LangGraph multi-agent orchestration and Cosmos DB',
        metric: '85% of clinical data capture automated, 60% shorter intake cycle time',
      },
      {
        text: 'Architected stateful A2A/MCP agent workflows with live FHIR-based EHR integration, fine-tuning Long-T5 and BART on clinical corpora with PEFT/LoRA',
        metric: '50% less physician review time, with handoff summaries at 92% completeness',
      },
      {
        text: 'Established zero-downtime GenAI MLOps on AKS, Azure ML, MLflow, Terraform and GitHub Actions',
        metric: '70% less deployment effort, 40% faster release cycles, 99.9% uptime',
      },
    ],
    stack: ['Python', 'Neo4j', 'FAISS', 'Azure OpenAI', 'LangGraph', 'A2A', 'MCP', 'FHIR', 'PEFT/LoRA', 'AKS', 'MLflow', 'Terraform'],
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
      {
        text: 'Developed a full-stack RAG pipeline on Azure with LangGraph, sentence-transformer embeddings and hybrid dense-sparse retrieval across 10,000+ academic documents',
        metric: 'Sub-second responses under concurrent multi-user load',
      },
      {
        text: 'Improved vector retrieval performance by tuning FAISS index parameters and adding a Redis caching layer',
        metric: '35% faster retrieval, holding latency through peak academic demand',
      },
      { text: 'Mentored graduate project teams from problem framing through evaluation and written reporting' },
    ],
    stack: ['Python', 'FAISS', 'PostgreSQL', 'Redis', 'LangGraph', 'Sentence Transformers', 'Azure', 'RAG'],
  },
  {
    id: 'cognizant',
    company: 'Cognizant',
    title: 'Programmer Analyst — Machine Learning',
    employment: 'Full-time',
    start: '2021-08',
    end: '2022-11',
    location: 'India',
    summary:
      'Built and ran the batch ML pipelines behind incentive compensation for a US medical-device sales organisation, and owned the release path they ran on.',
    highlights: [
      {
        text: 'Deployed three automated batch pipelines on AWS processing daily incentive compensation files with Python, S3, Lambda and SageMaker Batch Transform',
        metric: '40% shorter commission calculation cycle, with county-level payouts guaranteed inside every 24-hour window',
      },
      {
        text: 'Engineered an NLTK document-parsing pipeline that extracted compensation rules, territory hierarchies and manager reassignments from daily flat-file feeds',
        metric: '55% of manual business-rules processing eliminated',
      },
      {
        text: 'Deployed XGBoost classification models on SageMaker over multi-year sales performance data to predict commission attainment tiers, retiring spreadsheet-based calculation entirely',
        metric: '35% better incentive-payout forecasting accuracy',
      },
      {
        text: 'Owned CI/CD across a cross-functional ML team and mentored junior engineers, standardising CodePipeline, Git branching and CloudWatch alerting',
        metric: 'Zero-downtime deployments across all three pipelines, running 24/7',
      },
    ],
    stack: ['Python', 'SQL', 'AWS SageMaker', 'AWS Lambda', 'S3', 'XGBoost', 'NLTK', 'CodePipeline', 'CloudWatch'],
  },
  {
    id: 'lemoius',
    company: 'Lemoius',
    title: 'Machine Learning Engineer',
    employment: 'Full-time',
    start: '2020-05',
    end: '2021-08',
    location: 'India',
    summary:
      'First engineering role — built the content-based recommendation and NLP pipelines behind a job marketplace serving 20,000+ candidate profiles.',
    highlights: [
      {
        text: 'Built a real-time content-based job recommendation engine using TF-IDF vectorisation and cosine-similarity ranking over candidate profiles and job descriptions, replacing manual recruiter shortlisting',
        metric: '35% better candidate-to-role match relevance across 20,000+ profiles',
      },
      {
        text: 'Engineered an end-to-end NLTK preprocessing pipeline — tokenisation, stopword removal, lemmatisation, n-gram extraction — turning raw candidate data into model-ready feature vectors at scale',
        metric: '30% faster candidate profile processing',
      },
      {
        text: 'Productionised real-time top-N candidate ranking, delivering ranked lists for every new posting with no manual intervention',
        metric: '25% more efficient recruiter shortlisting',
      },
      {
        text: 'Standardised reproducible experiments with scikit-learn pipelines and Git version control',
        metric: '40% shorter model iteration cycles — evaluate, validate and ship inside one sprint',
      },
    ],
    stack: ['Python', 'TF-IDF', 'Cosine Similarity', 'NLTK', 'scikit-learn', 'Git'],
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
