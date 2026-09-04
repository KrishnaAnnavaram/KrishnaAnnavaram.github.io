export interface Outcome {
  value: string
  label: string
}

export interface CaseStudy {
  slug: string
  title: string
  /** One line, shown in the index. Concrete, no adjectives. */
  summary: string
  context: string
  year: string
  roleId: string
  discipline: string
  /** Problem → Approach → Result. The only structure a case study needs. */
  problem: string
  approach: string[]
  architecture?: string
  outcomes: Outcome[]
  stack: string[]
  featured: boolean
}

/**
 * Case studies are written from work described in the résumé and LinkedIn
 * record. Figures marked "~" are the approximations given in those sources.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'academic-research-assistant',
    title: 'Grounded research assistant for graduate coursework',
    summary:
      'A retrieval system over course materials and library databases that answered students’ research questions with citations instead of guesses.',
    context: 'University of North Texas',
    year: '2024–2025',
    roleId: 'unt-gta',
    discipline: 'Retrieval systems',
    problem:
      'Graduate students repeatedly asked the same categories of research question — where to find a method, which database indexed a given journal, how a technique from lecture applied to their project. Faculty and teaching assistants answered each one individually. A general-purpose chatbot was worse than useless here: it invented citations, and in an academic setting a fabricated reference is a serious failure, not a rough edge.',
    approach: [
      'Scoped the corpus deliberately — course materials plus UNT Library academic databases — so every answer had a retrievable source rather than relying on model recall.',
      'Built the retrieval layer on FAISS for dense semantic search, with PostgreSQL holding document metadata and provenance so each response could name where it came from.',
      'Used Redis for session state, which is what made multi-turn research conversations coherent: a follow-up question inherits the context of the one before it instead of starting cold.',
      'Tuned chunking and retrieval depth against real student queries collected during the semester, rather than against a synthetic benchmark that would not reflect actual usage.',
      'Constrained generation to retrieved context and declined to answer when retrieval returned nothing relevant — refusing is the correct behaviour when the alternative is a plausible-looking invented citation.',
    ],
    architecture:
      'Course materials + library database records → chunking and embedding → FAISS dense index (PostgreSQL for metadata and provenance) → top-k retrieval with relevance threshold → grounded generation with citations → Redis-backed session context for multi-turn continuity.',
    outcomes: [
      { value: '~88–92%', label: 'retrieval relevance in real academic use' },
      { value: '~40–45%', label: 'reduction in repetitive faculty and TA guidance effort' },
      { value: 'Low', label: 'hallucination rate with stable session continuity' },
    ],
    stack: ['Python', 'FAISS', 'PostgreSQL', 'Redis', 'RAG', 'Hugging Face', 'Embeddings'],
    featured: true,
  },
  {
    slug: 'healthcare-claims-ml-platform',
    title: 'ML pipelines for healthcare claims and incentive compensation',
    summary:
      'Enterprise pipelines over claims and incentive data for US healthcare clients — forecasting payouts and cutting the reconciliation work that surrounded them.',
    context: 'Cognizant',
    year: '2021–2022',
    roleId: 'cognizant',
    discipline: 'Applied ML · Data engineering',
    problem:
      'Incentive compensation for US healthcare clients depended on data spread across SAP ICM, Workday, and claims systems that did not agree with each other. Payout forecasting was unreliable because the inputs were unreliable, and analysts spent more time reconciling records than analysing them. Any modelling work sat on top of that problem and inherited it.',
    approach: [
      'Attacked the data layer first — standardised feature pipelines that integrated SAP ICM, Workday, and claims datasets into a consistent representation, because no model was going to compensate for contradictory inputs.',
      'Built the forecasting and utilisation models in Python and SQL on top of that unified layer, where the features finally meant the same thing across sources.',
      'Split inference into batch and near-real-time paths on SageMaker, Lambda, and containerised services, so scoring matched how each downstream reporting system actually consumed it.',
      'Built analytics-ready data marts on S3 and Athena, giving regional, county, and state-level stakeholders direct query access instead of routing every question through an analyst.',
      'Versioned models and pipelines and automated releases through AWS CodePipeline, Git, and CloudWatch, so a deployment was reproducible and a regression was traceable.',
    ],
    architecture:
      'SAP ICM + Workday + claims sources → standardised feature pipelines (Python/Pandas) → model training and versioning → SageMaker batch + Lambda near-real-time inference → S3/Athena analytics marts → stakeholder reporting. Release path: CodePipeline + Git, monitored via CloudWatch.',
    outcomes: [
      { value: '35%', label: 'better payout forecasting and utilisation analytics' },
      { value: '55%', label: 'less preprocessing and reconciliation effort' },
      { value: 'Multi-region', label: 'KPI visibility across US territories' },
    ],
    stack: ['Python', 'SQL', 'Pandas', 'AWS SageMaker', 'Lambda', 'S3', 'Athena', 'SAP ICM', 'CodePipeline'],
    featured: true,
  },
  {
    slug: 'resume-job-matching',
    title: 'Semantic resume-to-job matching for a hiring marketplace',
    summary:
      'Replaced keyword matching with sentence embeddings and a scored ranking layer, so relevant candidates surfaced instead of merely literal ones.',
    context: 'Lemoius',
    year: '2020–2021',
    roleId: 'lemoius',
    discipline: 'NLP · Ranking',
    problem:
      'The marketplace matched candidates to roles on keyword overlap. That misses the obvious cases — a resume saying "PyTorch" never matched a posting asking for "deep learning frameworks" — so recruiters saw thin candidate pools while qualified applicants stayed invisible. The failure was representational: the system compared strings when it needed to compare meaning.',
    approach: [
      'Built NLP pipelines that parsed unstructured resumes into semantic representations using BERT embeddings, so skills were compared by meaning rather than by exact token.',
      'Implemented ranking on sentence embeddings and cosine similarity, combined with feature-based scoring so structured signals like seniority and location still carried weight.',
      'Evaluated iteratively against recruiter shortlisting behaviour — the metric that mattered was whether recruiters engaged with the candidates surfaced, not offline similarity scores.',
      'Kept experiments version-controlled and reproducible through Git-based workflows, which made model comparisons trustworthy across iterations.',
    ],
    outcomes: [
      { value: '~35%', label: 'improvement in job discovery relevance' },
      { value: '~30%', label: 'improvement in matching accuracy' },
      { value: '~25%', label: 'better shortlisting quality and recruiter engagement' },
    ],
    stack: ['Python', 'BERT', 'Sentence Embeddings', 'Cosine Similarity', 'scikit-learn', 'Git'],
    featured: true,
  },
]

export const featuredCaseStudies = caseStudies.filter((c) => c.featured)

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
