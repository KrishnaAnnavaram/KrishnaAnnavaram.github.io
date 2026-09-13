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
  /**
   * Where these figures come from, stated on the page.
   *
   * Employment work has no repository to recompute against, so the honest
   * thing is to name the source rather than imply the same verification the
   * repo-backed case studies carry. Enforced by a unit test.
   */
  provenance: string
}

/**
 * Employment case studies.
 *
 * Source of truth is the résumé at `public/resume/resume.pdf`. Every figure
 * below appears in that document; nothing here is estimated, extrapolated or
 * rounded up.
 *
 * The repository-backed systems built at Virtusa live in `data/projects.ts`
 * instead, because those can be read as code and are documented against the
 * code rather than against the résumé.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'clinical-decision-support-graph-rag',
    title: 'Graph-RAG clinical decision support for US hospitals',
    summary:
      'A diagnostic reasoning pipeline over a clinical knowledge graph and vector search, built so that a wrong answer is caught before it reaches a clinician.',
    context: 'Ideate Technologies',
    year: '2026',
    roleId: 'ideate-technologies',
    discipline: 'Graph-RAG · Clinical AI',
    problem:
      'Clinical decision support is the setting where a plausible-sounding wrong answer does the most damage. Pure vector retrieval over clinical text returns passages that read as relevant while missing the relationships that actually determine a diagnosis — which condition contraindicates which medication, which finding rules out which differential. Those are edges in a graph, not similarities in an embedding space, and a system that only knows how to measure similarity cannot see them.',
    approach: [
      'Unified a Neo4j clinical knowledge graph with FAISS vector search, so retrieval could follow explicit clinical relationships as well as semantic similarity.',
      'Put Azure OpenAI behind that retrieval rather than in front of it, keeping generation constrained to what the graph and the index actually returned.',
      'Integrated live EHR data through FHIR, so reasoning ran against the patient record in front of the clinician rather than a stale extract.',
      'Fine-tuned Long-T5 and BART on clinical corpora using PEFT/LoRA for the summarisation path, where a general-purpose model produced handoff notes that were fluent and incomplete.',
      'Built the intake side as a separate voice pipeline — Azure Speech-to-Text into LangGraph multi-agent orchestration, persisting to Cosmos DB — so capture and reasoning failed independently.',
      'Ran it all on zero-downtime MLOps: AKS, Azure ML, MLflow, Terraform and GitHub Actions, because a clinical service that needs a maintenance window is a clinical service people route around.',
    ],
    architecture:
      'Clinical corpora + live FHIR EHR data → Neo4j knowledge graph and FAISS vector index → hybrid graph-and-vector retrieval → Azure OpenAI reasoning constrained to retrieved evidence → clinician-facing recommendation. Intake runs in parallel: Azure Speech-to-Text → LangGraph multi-agent orchestration → Cosmos DB. Deployed on AKS via Azure ML, MLflow, Terraform and GitHub Actions.',
    outcomes: [
      { value: '91%', label: 'retrieval accuracy in the diagnostic reasoning pipeline' },
      { value: '45%', label: 'fewer unsafe clinical recommendations' },
      { value: '50%', label: 'less physician review time, with handoff summaries at 92% completeness' },
      { value: '85%', label: 'of clinical data capture automated, cutting intake cycle time by 60%' },
      { value: '99.9%', label: 'uptime, with 70% less deployment effort' },
    ],
    stack: [
      'Neo4j',
      'FAISS',
      'Azure OpenAI',
      'LangGraph',
      'FHIR',
      'Long-T5',
      'BART',
      'PEFT/LoRA',
      'Azure Speech',
      'Cosmos DB',
      'AKS',
      'MLflow',
      'Terraform',
    ],
    provenance:
      'Figures as stated in the résumé. There is no public repository for this engagement, so — unlike the repository-backed systems — nothing on this page can be recomputed by a reader. These are the author’s own reported numbers.',
    featured: true,
  },

  {
    slug: 'academic-research-assistant',
    title: 'Grounded research assistant for graduate coursework',
    summary:
      'A retrieval system over course materials and academic databases that answered students’ research questions with citations instead of guesses.',
    context: 'University of North Texas',
    year: '2024–2025',
    roleId: 'unt-gta',
    discipline: 'Retrieval systems',
    problem:
      'Graduate students repeatedly asked the same categories of research question — where to find a method, which database indexed a given journal, how a technique from lecture applied to their project. Faculty and teaching assistants answered each one individually. A general-purpose chatbot was worse than useless here: it invented citations, and in an academic setting a fabricated reference is a serious failure, not a rough edge.',
    approach: [
      'Scoped the corpus deliberately — course materials plus academic databases, over 10,000 documents — so every answer had a retrievable source rather than relying on model recall.',
      'Built the retrieval layer on FAISS for dense search with PostgreSQL holding document metadata and provenance, so each response could name where it came from.',
      'Ran hybrid dense-sparse retrieval through a LangGraph pipeline on Azure with sentence-transformer embeddings, holding sub-second responses under concurrent multi-user load.',
      'Used Redis for session state, which is what made multi-turn research conversations coherent: a follow-up question inherits the context of the one before it instead of starting cold.',
      'Tuned FAISS index parameters and added Redis caching against real student queries collected during the semester, rather than against a synthetic benchmark that would not reflect actual usage.',
      'Constrained generation to retrieved context and declined to answer when retrieval returned nothing relevant — refusing is the correct behaviour when the alternative is a plausible-looking invented citation.',
    ],
    architecture:
      'Course materials + academic database records (10,000+ documents) → chunking and sentence-transformer embedding → hybrid dense-sparse retrieval over FAISS, with PostgreSQL for metadata and provenance → relevance threshold → grounded generation with citations → Redis-backed session context for multi-turn continuity. Orchestrated with LangGraph on Azure.',
    outcomes: [
      { value: '88–92%', label: 'retrieval relevance across thousands of student and faculty queries' },
      { value: '35%', label: 'faster vector retrieval after index tuning and Redis caching' },
      { value: '40–45%', label: 'less repeated-query resolution time through student self-service' },
    ],
    stack: [
      'Python',
      'FAISS',
      'PostgreSQL',
      'Redis',
      'LangGraph',
      'Sentence Transformers',
      'Azure',
      'RAG',
    ],
    provenance:
      'Figures as stated in the résumé. There is no public repository for this engagement, so — unlike the repository-backed systems — nothing on this page can be recomputed by a reader. These are the author’s own reported numbers.',
    featured: true,
  },

  {
    slug: 'incentive-compensation-pipelines',
    title: 'Batch ML pipelines for medical-device sales compensation',
    summary:
      'Three daily AWS pipelines that replaced spreadsheet commission calculation and had to close inside a 24-hour window, every day.',
    context: 'Cognizant',
    year: '2021–2022',
    roleId: 'cognizant',
    discipline: 'Applied ML · Data engineering',
    problem:
      'Incentive compensation for a US medical-device sales organisation ran on daily flat-file feeds and spreadsheets. Business rules, territory hierarchies and manager reassignments arrived as unstructured text that someone had to read and apply by hand — which is slow, and which quietly introduces a different kind of error than a broken pipeline does, because a misread rule produces a number that looks entirely reasonable. Underneath that, county-level payouts had to be calculated inside a 24-hour window whether or not the inputs cooperated.',
    approach: [
      'Deployed three automated batch pipelines on AWS — Python, S3, Lambda and SageMaker Batch Transform — processing the daily compensation files end to end.',
      'Engineered an NLTK document-parsing pipeline to extract compensation rules, territory hierarchies and manager reassignments from the flat-file feeds, removing the human reading step that was the source of the quiet errors.',
      'Trained XGBoost classification models on multi-year sales performance data to predict commission attainment tiers across county-level territories, retiring the spreadsheet calculation rather than running alongside it.',
      'Owned CI/CD for the whole cross-functional team — CodePipeline, Git branching and CloudWatch alerting — because a payout pipeline that needs a maintenance window does not have one.',
      'Mentored junior engineers on the same standards, so the release discipline survived people rotating off the project.',
    ],
    architecture:
      'Daily flat-file feeds → S3 → NLTK parsing of business rules, territory hierarchies and reassignments → feature preparation → XGBoost attainment-tier models on SageMaker Batch Transform → county-level payout calculation inside the 24-hour window → downstream reporting. Release path: CodePipeline and Git, monitored through CloudWatch.',
    outcomes: [
      { value: '40%', label: 'shorter commission calculation cycle' },
      { value: '55%', label: 'of manual business-rules processing eliminated' },
      { value: '35%', label: 'better incentive-payout forecasting accuracy' },
      { value: 'Zero', label: 'downtime deployments across three pipelines running 24/7' },
    ],
    stack: [
      'Python',
      'SQL',
      'AWS SageMaker',
      'AWS Lambda',
      'S3',
      'XGBoost',
      'NLTK',
      'CodePipeline',
      'CloudWatch',
    ],
    provenance:
      'Figures as stated in the résumé. There is no public repository for this engagement, so — unlike the repository-backed systems — nothing on this page can be recomputed by a reader. These are the author’s own reported numbers.',
    featured: false,
  },

  {
    slug: 'resume-job-matching',
    title: 'Content-based job matching for a hiring marketplace',
    summary:
      'Replaced manual recruiter shortlisting with TF-IDF ranking over 20,000+ candidate profiles, delivering a ranked list for every new posting.',
    context: 'Lemoius',
    year: '2020–2021',
    roleId: 'lemoius',
    discipline: 'NLP · Ranking',
    problem:
      'Every new job posting on the marketplace started a manual shortlisting pass over more than twenty thousand candidate profiles. Recruiters saw whoever they got to first rather than whoever fit best, and qualified applicants stayed invisible for no better reason than where they sat in the list. The bottleneck was not judgement — it was that nothing ranked the pool before a human looked at it.',
    approach: [
      'Built a real-time content-based recommendation engine using TF-IDF vectorisation and cosine-similarity ranking over candidate profile and job description text.',
      'Engineered the NLP preprocessing pipeline behind it in NLTK — tokenisation, stopword removal, lemmatisation and n-gram extraction — turning raw candidate data into model-ready feature vectors at scale.',
      'Productionised top-N ranking so a ranked candidate list was produced for every new posting automatically, with no manual step in the loop.',
      'Standardised experiments on scikit-learn pipelines under Git version control, which is what made model comparisons trustworthy across iterations rather than anecdotal.',
    ],
    architecture:
      'Candidate profiles + job description text → NLTK preprocessing (tokenisation, stopword removal, lemmatisation, n-grams) → TF-IDF vectorisation → cosine-similarity scoring → real-time top-N ranked candidate list per posting. Experiments versioned through scikit-learn pipelines and Git.',
    outcomes: [
      { value: '35%', label: 'better candidate-to-role match relevance across 20,000+ profiles' },
      { value: '30%', label: 'faster candidate profile processing' },
      { value: '25%', label: 'more efficient recruiter shortlisting' },
      { value: '40%', label: 'shorter model iteration cycles' },
    ],
    stack: ['Python', 'TF-IDF', 'Cosine Similarity', 'NLTK', 'scikit-learn', 'Git'],
    provenance:
      'Figures as stated in the résumé. There is no public repository for this engagement, so — unlike the repository-backed systems — nothing on this page can be recomputed by a reader. These are the author’s own reported numbers.',
    featured: false,
  },
]

export const featuredCaseStudies = caseStudies.filter((c) => c.featured)

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
