export interface ProjectResult {
  metric: string
  description: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  category: ProjectCategory
  year: string
  problem: string
  approach: string
  results: ProjectResult[]
  techStack: string[]
  architecture: string
  images: string[]
  reportAvailable: boolean
  repoUrl?: string
  demoUrl?: string
  relatedExperience: string[]
  featured: boolean
  color: string
}

export type ProjectCategory =
  | 'Healthcare AI'
  | 'NLP'
  | 'RAG Systems'
  | 'MLOps'
  | 'Computer Vision'
  | 'Research'

export const projects: Project[] = [
  {
    slug: 'graphrag-clinical-dss',
    title: 'Graph-RAG Clinical Decision Support System',
    tagline: '91% retrieval accuracy on a hospital-deployed diagnostic reasoning pipeline — reducing unsafe clinical recommendations by 45%',
    category: 'Healthcare AI',
    year: '2025',
    problem:
      'U.S. hospital clinicians were making diagnostic decisions without reliable access to the full context of a patient\'s clinical history. Existing AI tools hallucinated on medical queries, lacked integration with live EHR data, and could not reason across the relationships between diagnoses, medications, and adverse events that are critical for safe clinical recommendations.',
    approach:
      'Designed a Graph-RAG architecture combining Neo4j Knowledge Graphs with FAISS dense vector search and Azure OpenAI GPT-4o. Clinical documents were ingested via FHIR-based EHR integration, enriched into a knowledge graph capturing entity relationships (drug-drug interactions, diagnosis pathways, contraindications), and indexed in parallel for both graph traversal and semantic retrieval. LangGraph orchestrated the multi-step reasoning pipeline: graph query for structured clinical facts → FAISS retrieval for contextual evidence → GPT-4o generation with grounded citations → structured clinical output. Every recommendation was traceable to its source clinical record for audit and safety review.',
    results: [
      {
        metric: '91% retrieval accuracy',
        description: 'Deployed across U.S. hospital clients — measured against gold-standard clinical datasets with physician validation',
      },
      {
        metric: '45% reduction in unsafe clinical recommendations',
        description: 'Direct patient safety improvement through knowledge-graph-grounded LLM reasoning replacing unstructured retrieval',
      },
      {
        metric: 'FHIR-compliant EHR integration',
        description: 'Live EHR data ingestion meeting U.S. healthcare regulatory standards for production clinical AI systems',
      },
      {
        metric: 'Zero-downtime production deployment',
        description: 'Hospital-grade reliability sustained via AKS, MLflow, and GitHub Actions MLOps infrastructure',
      },
    ],
    techStack: [
      'Azure OpenAI (GPT-4o)',
      'Neo4j Knowledge Graphs',
      'FAISS',
      'LangGraph',
      'LangChain',
      'FHIR / EHR Integration',
      'Azure ML',
      'AKS',
      'MLflow',
      'Terraform',
      'Python',
      'FastAPI',
      'Cosmos DB',
    ],
    architecture:
      'FHIR-ingested clinical docs → dual-index: Neo4j KG (entity relationships) + FAISS (dense vectors) → LangGraph reasoning pipeline (graph traversal node → semantic retrieval node → GPT-4o generation node → citation validation node) → structured clinical output API → audit trail logging. Deployed on AKS with MLflow model registry and GitHub Actions CI/CD.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['ideate-2025'],
    featured: true,
    color: '#ef4444',
  },
  {
    slug: 'voice-patient-intake',
    title: 'Voice-Based AI Patient Intake Platform',
    tagline: '85% automation of clinical data capture — cutting patient intake cycle time by 60% across hospital workflows',
    category: 'Healthcare AI',
    year: '2025',
    problem:
      'Hospital patient intake was a manual, time-intensive process requiring clinical staff to collect, transcribe, and enter patient information into EHR systems by hand. This created bottlenecks at admission, introduced transcription errors, and consumed significant nursing time that could be redirected to direct patient care.',
    approach:
      'Built a full-stack voice-based intake platform where patients interact with a conversational AI agent that captures clinical data in real time. Azure Speech-to-Text handled real-time transcription with medical vocabulary models. LangGraph multi-agent orchestration coordinated specialist agents for intake questioning, data validation, EHR schema mapping, and Cosmos DB persistence. The system integrated directly with hospital FHIR-compliant EHR workflows, ensuring captured data flowed into the correct clinical records with full audit trails. LangGraph A2A/MCP protocols enabled the intake agent to hand off seamlessly to clinical validation agents without human intervention.',
    results: [
      {
        metric: '85% automation of clinical data capture',
        description: 'Voice-based AI agent replacing manual clinical data entry across hospital patient intake workflows',
      },
      {
        metric: '60% reduction in patient intake cycle time',
        description: 'End-to-end automation from patient interaction to structured EHR data write, eliminating transcription and manual entry steps',
      },
      {
        metric: 'Enterprise-grade healthcare compliance',
        description: 'FHIR-based EHR integration and LangGraph A2A/MCP protocols meeting U.S. healthcare regulatory standards',
      },
      {
        metric: 'Stateful multi-turn clinical conversations',
        description: 'LangGraph memory management enabling context-aware intake sessions that adapt to patient responses in real time',
      },
    ],
    techStack: [
      'Azure OpenAI',
      'Azure Speech-to-Text',
      'LangGraph',
      'LangChain',
      'Cosmos DB',
      'FHIR / EHR Integration',
      'A2A / MCP Protocols',
      'AKS',
      'Azure ML',
      'Python',
      'FastAPI',
    ],
    architecture:
      'Patient voice input → Azure Speech-to-Text (medical vocabulary model) → LangGraph multi-agent coordinator: [Intake Agent → Validation Agent → EHR-Mapping Agent → Cosmos DB Write Agent] → FHIR-compliant EHR data write → audit trail. A2A/MCP inter-agent communication for stateful handoffs. Deployed on AKS with zero-downtime blue/green deployment.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['ideate-2025'],
    featured: true,
    color: '#6366f1',
  },
  {
    slug: 'unt-rag-assistant',
    title: 'AI Research Assistant — UNT Graduate Program',
    tagline: '88–92% retrieval relevance across 10,000+ academic documents — sub-second semantic search replacing manual literature review',
    category: 'RAG Systems',
    year: '2024',
    problem:
      'UNT graduate students and faculty were spending significant time manually searching academic literature — a slow, inconsistent process that scaled poorly as research corpora grew. Existing keyword search tools lacked semantic understanding and required researchers to already know the exact terminology of what they were looking for.',
    approach:
      'Built a production multi-turn RAG system on Azure Cloud combining FAISS vector search, PostgreSQL full-text search, and Redis semantic caching into a hybrid dense-sparse retrieval architecture. LangGraph managed multi-turn conversational context, allowing researchers to ask follow-up questions that refined results across the session. Sentence Transformer embeddings were fine-tuned on academic text for domain-appropriate semantic representations. FAISS index parameters were systematically tuned (HNSW graph structure, M and efConstruction values) to optimize recall-latency tradeoffs at scale. Redis semantic caching eliminated redundant embedding lookups for repeated query patterns, sustaining low latency during peak academic demand periods.',
    results: [
      {
        metric: '88–92% retrieval relevance',
        description: 'Deployed into UNT graduate program infrastructure, measured against faculty-validated relevance benchmarks across thousands of queries',
      },
      {
        metric: '10,000+ academic documents indexed',
        description: 'Sub-second semantic search with concurrent multi-user support under peak academic load',
      },
      {
        metric: '40–45% reduction in query resolution time',
        description: 'Dynamic prompt engineering and real-time context injection reducing repeated information requests and manual faculty intervention',
      },
      {
        metric: '35% improvement in vector retrieval performance',
        description: 'Systematic FAISS index tuning and Redis semantic caching maintaining consistent low latency at scale',
      },
    ],
    techStack: [
      'LangGraph',
      'FAISS',
      'Sentence Transformers',
      'PostgreSQL',
      'Redis',
      'Azure Cloud',
      'HuggingFace Transformers',
      'Python',
      'FastAPI',
      'MLflow',
      'Docker',
    ],
    architecture:
      'Document ingestion → chunking + Sentence Transformer embedding → FAISS HNSW index + PostgreSQL BM25 index → hybrid retrieval fusion layer → LangGraph multi-turn agent (context management + dynamic prompt assembly) → Redis semantic cache → structured response delivery. Azure-hosted with MLflow retrieval quality tracking.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['unt-ga-2024'],
    featured: true,
    color: '#8b5cf6',
  },
  {
    slug: 'biobert-drug-ner',
    title: 'BioBERT Drug Intelligence Pipeline — Sun Pharma',
    tagline: '60% elimination of manual pharma data entry — real-time NER-powered analytics at production scale on GCP',
    category: 'NLP',
    year: '2023',
    problem:
      'Sun Pharma\'s analytics division received thousands of unstructured drug reports daily — adverse event filings, clinical trial summaries, medico-marketing documents — that required manual extraction of drug names, dosages, adverse events, and indications before any downstream analysis. Manual extraction was a 60% bottleneck on the analytics team\'s capacity and introduced systematic inconsistency across records.',
    approach:
      'Deployed a production BioBERT named entity recognition pipeline on GCP designed to operate continuously across Sun Pharma\'s full daily document volume. The preprocessing stack was rebuilt from scratch with Hugging Face Transformers incorporating medical tokenization, negation detection ("no evidence of adverse effects"), and domain normalization for drug name synonyms and dosage unit standardization — ensuring BioBERT received clean, consistent signal regardless of document source or format. BioBERT and ClinicalBERT models were migrated to GCP Vertex AI auto-scaled endpoints for elastic compute scaling during peak ingestion. GCP Dataflow streaming ETL re-architected the data delivery layer to route extracted entities into BigQuery in real time, replacing batch jobs that introduced multi-hour analytics delays.',
    results: [
      {
        metric: '60% elimination of manual data entry',
        description: 'Production BioBERT NER pipeline processing thousands of daily pharma documents and writing structured records directly to BigQuery',
      },
      {
        metric: '38% improvement in clinical NLP model accuracy',
        description: 'Medical tokenization, negation detection, and domain normalization providing clean, consistent signal to BioBERT at production scale',
      },
      {
        metric: '45% increase in model delivery scale',
        description: 'GCP Vertex AI auto-scaled endpoints replacing fragile manual scripts with versioned, reproducible ML pipelines across 365-day operations',
      },
      {
        metric: '50% reduction in analytics reporting latency',
        description: 'GCP Dataflow streaming ETL enabling analytics team to query structured drug records within minutes of raw document arrival',
      },
    ],
    techStack: [
      'BioBERT',
      'ClinicalBERT',
      'HuggingFace Transformers',
      'GCP Vertex AI',
      'GCP Dataflow',
      'BigQuery',
      'Python',
      'PyTorch',
      'NLTK',
      'spaCy',
      'MLflow',
      'Docker',
    ],
    architecture:
      'GCP streaming pipeline: daily pharma document ingestion → Dataflow preprocessing (medical tokenization, negation detection, domain normalization) → BioBERT/ClinicalBERT NER on Vertex AI auto-scaled endpoints → entity extraction (drug names, dosages, adverse events, indications) → BigQuery structured records → analytics dashboard. Vertex AI model registry for versioned, reproducible training runs.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['sun-pharma-2022'],
    featured: true,
    color: '#06b6d4',
  },
  {
    slug: 'incentive-ml-platform',
    title: 'Incentive Compensation ML Platform — Cognizant',
    tagline: '40% faster commission cycles + 55% reduction in manual processing — 3 production AWS pipelines running 24/7/365',
    category: 'MLOps',
    year: '2022',
    problem:
      'A U.S. medical device sales organization ran incentive compensation calculations across thousands of county-level territories on fragile spreadsheets and manual document interpretation. The daily 24-hour SLA was routinely missed, commission errors created audit exposure, and the analytics team spent 55% of their capacity manually extracting business rules from flat-file documents rather than analyzing outcomes.',
    approach:
      'Designed and deployed 3 automated batch pipelines on AWS covering the full incentive compensation stack: document rule extraction (NLTK parsing of compensation rule documents, territory hierarchies, and manager reassignments), ML-powered forecasting (XGBoost on SageMaker trained on multi-year sales performance data to predict commission attainment tiers), and automated payout calculation (Python + Lambda + SageMaker Batch Transform). Owned end-to-end CI/CD pipeline engineering using AWS CodePipeline with Git branching standards and CloudWatch alerting — achieving zero-downtime deployments and 24/7/365 operational monitoring across all 3 production systems.',
    results: [
      {
        metric: '40% reduction in commission calculation cycle time',
        description: '3 automated AWS batch pipelines guaranteeing county-level payout calculations within every 24-hour window',
      },
      {
        metric: '55% elimination of manual business rules processing',
        description: 'NLTK document parsing pipeline automatically extracting compensation rules, territory hierarchies, and manager reassignments from daily flat-file feeds',
      },
      {
        metric: '35% increase in forecasting accuracy',
        description: 'XGBoost classification on SageMaker predicting commission attainment tiers, retiring legacy spreadsheet-based calculations entirely',
      },
      {
        metric: 'Zero-downtime 24/7/365 operations',
        description: 'AWS CodePipeline + CloudWatch alerting sustaining all 3 production incentive pipelines with full audit compliance',
      },
    ],
    techStack: [
      'Python',
      'AWS SageMaker',
      'AWS Lambda',
      'AWS S3',
      'AWS CodePipeline',
      'CloudWatch',
      'XGBoost',
      'NLTK',
      'Pandas',
      'SQL',
      'Docker',
      'MLflow',
    ],
    architecture:
      'Daily flat-file S3 ingestion → Lambda-triggered NLTK rule extraction (compensation rules, territory data, manager reassignments) → SageMaker Batch Transform (XGBoost commission tier inference) → automated payout calculation → structured records → downstream reporting API. CodePipeline CI/CD with CloudWatch alerting for 24/7 operational monitoring and audit trail.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['cognizant-2021'],
    featured: false,
    color: '#10b981',
  },
  {
    slug: 'job-recommendation-engine',
    title: 'Real-Time Job Recommendation Engine — Lemoius',
    tagline: '35% lift in candidate-to-role match relevance — NLP-powered ranking replacing manual recruiter shortlisting across 20,000+ profiles',
    category: 'NLP',
    year: '2021',
    problem:
      'Lemoius operated a job marketplace with 20,000+ candidate profiles where recruiter shortlisting was entirely manual — time-consuming, subjective, and impossible to scale. Recruiters were spending hours reviewing profiles for each new posting instead of evaluating candidates, creating significant platform growth constraints.',
    approach:
      'Built a content-based recommendation engine using TF-IDF vectorization and cosine similarity ranking over candidate profiles and job description text. The NLP preprocessing pipeline was engineered with NLTK to handle the full vocabulary normalization stack: tokenization, stopword removal, lemmatization, and n-gram extraction transforming raw candidate data into clean, model-ready feature vectors. A real-time top-N candidate ranking system delivered ranked shortlists for every new job posting automatically, with zero manual intervention. Reproducible scikit-learn pipeline architecture with Git experiment versioning enabled the team to evaluate and ship updated matching models within single sprints.',
    results: [
      {
        metric: '35% lift in candidate-to-role match relevance',
        description: 'Content-based recommendation engine replacing manual recruiter shortlisting across 20,000+ candidate profiles',
      },
      {
        metric: '30% reduction in profile processing time',
        description: 'End-to-end NLTK preprocessing pipeline transforming raw candidate data into clean feature vectors at scale',
      },
      {
        metric: '25% acceleration in recruiter shortlisting',
        description: 'Real-time top-N ranking system delivering ranked candidate lists for every new job posting automatically',
      },
      {
        metric: '40% reduction in model iteration cycles',
        description: 'Scikit-learn pipelines + Git versioning enabling sprint-velocity model evaluation and deployment',
      },
    ],
    techStack: [
      'Python',
      'Scikit-learn',
      'NLTK',
      'TF-IDF',
      'Cosine Similarity',
      'Pandas',
      'NumPy',
      'SQL',
      'FastAPI',
      'Docker',
      'Git',
    ],
    architecture:
      'Candidate profile ingestion → NLTK preprocessing (tokenization, lemmatization, stopword removal, n-gram extraction) → TF-IDF vectorization → cosine similarity scoring matrix → top-N ranking engine → real-time shortlist delivery API. Scikit-learn pipelines for reproducible feature engineering and model updates with Git-tracked experiment versioning.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['lemoius-2020'],
    featured: false,
    color: '#f59e0b',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
