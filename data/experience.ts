export interface ImpactMetric {
  metric: string
  value: string
}

export interface ExperienceRole {
  id: string
  company: string
  title: string
  startDate: string
  endDate: string | null
  location: string
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Academic'
  summary: string
  context: string
  built: string[]
  architecture: string
  impact: ImpactMetric[]
  techStack: string[]
  relatedProjects: string[]
  lessonsLearned: string
  featured: boolean
}

export const experience: ExperienceRole[] = [
  {
    id: 'workingfox-2025',
    company: 'WorkingFox',
    title: 'Generative AI Engineer',
    startDate: '2025-01',
    endDate: null,
    location: 'TX, USA',
    type: 'Full-time',
    summary:
      'Leading the end-to-end delivery of hospital-grade Generative AI systems for U.S. healthcare clients — from Graph-RAG clinical decision support to voice-enabled patient intake platforms. Every system ships to production, meets U.S. healthcare regulatory standards, and moves measurable clinical outcomes.',
    context:
      'U.S. hospital clients needed GenAI systems that cleared the bar for clinical safety, regulatory compliance, and 24/7 operational reliability — not research prototypes. The challenge was engineering LLM-powered pipelines that integrated directly with live EHR systems, handled sensitive patient data under HIPAA constraints, and delivered measurable improvements in clinical workflow efficiency.',
    built: [
      'Graph-RAG Clinical Decision Support System unifying Neo4j Knowledge Graphs, FAISS vector search, and Azure OpenAI GPT-4o into a real-time diagnostic reasoning pipeline — achieving 91% retrieval accuracy and 45% reduction in unsafe clinical recommendations',
      'Voice-based patient intake platform integrating Azure Speech-to-Text, LangGraph multi-agent orchestration, and Cosmos DB — automating 85% of clinical data capture and cutting patient intake cycle time by 60%',
      'LangGraph A2A/MCP multi-agent workflows with live FHIR-based EHR integration for stateful, context-aware clinical interactions meeting U.S. healthcare regulatory standards',
      'Long-T5 and BART transformer fine-tuning with PEFT and LoRA on real clinical corpora — generating structured nurse-to-doctor handoff summaries with 92% completeness and driving 50% reduction in physician review time',
      'Zero-downtime GenAI MLOps infrastructure on AKS + Azure ML using MLflow, Terraform, and GitHub Actions — cutting deployment effort by 70%, accelerating release cycles by 40%, and sustaining 99.9% production uptime',
    ],
    architecture:
      'Graph-RAG pipeline: FHIR-ingested clinical documents → Neo4j Knowledge Graph + FAISS dual-index → Azure OpenAI GPT-4o generation → structured clinical output API. Voice intake: Azure Speech-to-Text → LangGraph multi-agent coordinator (intake, validation, EHR-write agents) → Cosmos DB. MLOps: AKS-hosted microservices with MLflow tracking, Terraform IaC, GitHub Actions CI/CD, and Azure ML model registry.',
    impact: [
      {
        metric: '91% retrieval accuracy',
        value: 'Graph-RAG Clinical Decision Support System deployed across U.S. hospital clients',
      },
      {
        metric: '45% reduction in unsafe clinical recommendations',
        value: 'Direct patient safety improvement through grounded LLM reasoning on verified clinical knowledge graphs',
      },
      {
        metric: '85% automation of patient intake',
        value: 'Voice-based AI intake platform replacing manual clinical data capture workflows',
      },
      {
        metric: '60% reduction in intake cycle time',
        value: 'LangGraph multi-agent orchestration streamlining hospital patient onboarding end-to-end',
      },
      {
        metric: '50% reduction in physician review time',
        value: 'Fine-tuned Long-T5/BART models delivering structured nurse-to-doctor handoff summaries at 92% completeness',
      },
      {
        metric: '99.9% production uptime',
        value: 'Zero-downtime MLOps infrastructure sustaining hospital-grade AI services 24/7',
      },
    ],
    techStack: [
      'Azure OpenAI (GPT-4o)',
      'LangGraph',
      'LangChain',
      'Neo4j Knowledge Graphs',
      'FAISS',
      'Azure Speech-to-Text',
      'Cosmos DB',
      'FHIR / EHR Integration',
      'Long-T5',
      'BART',
      'LoRA',
      'PEFT',
      'RLHF',
      'AKS',
      'Azure ML',
      'MLflow',
      'Terraform',
      'GitHub Actions',
      'Python',
      'FastAPI',
    ],
    relatedProjects: ['graphrag-clinical-dss', 'voice-patient-intake'],
    lessonsLearned:
      'Clinical AI demands a completely different engineering bar than enterprise software. Retrieval accuracy, output grounding, and FHIR compliance are not nice-to-haves — they are clinical safety requirements. The most impactful engineering decisions were architectural: separating knowledge graph traversal from dense retrieval, and making every LLM output auditable against its source clinical records.',
    featured: true,
  },
  {
    id: 'unt-ga-2024',
    company: 'University of North Texas',
    title: 'Graduate Teaching Assistant',
    startDate: '2024-08',
    endDate: '2024-12',
    location: 'Denton, TX',
    type: 'Academic',
    summary:
      'Built and deployed production-grade RAG infrastructure into UNT\'s graduate program, enabling thousands of student and faculty queries with 88–92% retrieval relevance. Designed hybrid dense-sparse retrieval pipelines over 10,000+ academic documents and mentored graduate students on applied ML and GenAI systems.',
    context:
      'UNT graduate researchers and faculty relied on manual literature search across massive academic corpora — slow, inconsistent, and impossible to scale. The opportunity was to replace this with a production AI research assistant that delivered instant, accurate semantic retrieval while training the next generation of ML engineers through hands-on mentorship.',
    built: [
      'AI-powered research assistant combining FAISS vector search, PostgreSQL, and Redis into a scalable multi-turn retrieval system — delivering 88–92% retrieval relevance across thousands of student and faculty queries',
      'Full-stack RAG pipeline on Azure Cloud using LangGraph, Sentence Transformer embeddings, and hybrid dense-sparse retrieval — enabling accurate semantic search across 10,000+ UNT academic documents with sub-second latency under concurrent load',
      'Context-aware LLM system with dynamic prompt engineering and real-time context injection — reducing repeated query resolution time by 40–45% and decreasing manual faculty intervention',
      'FAISS index optimization and Redis semantic caching layer — improving vector retrieval performance by 35% and maintaining low-latency responses during peak academic demand',
    ],
    architecture:
      'Azure-hosted RAG system: document ingestion → Sentence Transformer chunking & embedding → FAISS + PostgreSQL hybrid index → LangGraph multi-turn agent → dynamic prompt assembly with context injection → Redis semantic cache layer for repeat queries. MLflow for retrieval quality tracking.',
    impact: [
      {
        metric: '88–92% retrieval relevance',
        value: 'AI research assistant deployed into UNT graduate program infrastructure serving thousands of queries',
      },
      {
        metric: '10,000+ academic documents indexed',
        value: 'Sub-second semantic search across UNT\'s full academic corpus under concurrent multi-user load',
      },
      {
        metric: '40–45% reduction in query resolution time',
        value: 'Dynamic prompt engineering and context injection eliminating repeated information requests',
      },
      {
        metric: '35% improvement in vector retrieval performance',
        value: 'Systematic FAISS index tuning and Redis caching maintaining consistency during peak load',
      },
    ],
    techStack: [
      'LangGraph',
      'FAISS',
      'Sentence Transformers',
      'Azure Cloud',
      'PostgreSQL',
      'Redis',
      'Python',
      'HuggingFace Transformers',
      'MLflow',
      'Docker',
    ],
    relatedProjects: ['unt-rag-assistant'],
    lessonsLearned:
      'Academic RAG systems surface a uniquely hard retrieval challenge: multi-domain corpora where terminology shifts radically between disciplines. The hybrid dense-sparse approach was the breakthrough — BM25 for precise keyword matches, dense embeddings for semantic understanding, and a learned fusion layer to combine both signals. Teaching this to students while building it forced a level of clarity that improved the architecture itself.',
    featured: true,
  },
  {
    id: 'sun-pharma-2022',
    company: 'Sun Pharma (via CreativeSense Pvt Ltd)',
    title: 'AI Engineer',
    startDate: '2022-11',
    endDate: '2023-12',
    location: 'India',
    type: 'Full-time',
    summary:
      'Deployed production BioBERT NER pipelines on GCP that transformed Sun Pharma\'s unstructured drug report backlog into a fully queryable analytics asset — eliminating 60% of manual data entry and cutting analytics reporting latency by 50% through real-time Dataflow streaming ETL into BigQuery.',
    context:
      'Sun Pharma\'s analytics division was bottlenecked by thousands of unstructured daily pharma documents — drug reports, adverse event records, dosage filings — that required manual extraction before any downstream analysis could begin. The opportunity was to replace this entirely with a production-grade NLP pipeline that operated continuously, at scale, and with measurable accuracy improvements.',
    built: [
      'Production BioBERT named entity recognition pipeline on GCP that ingested thousands of daily pharma documents, extracted drug names, dosages, adverse events, and indications at scale, and wrote structured records to BigQuery — eliminating 60% of manual data entry and unblocking the analytics division',
      'End-to-end text preprocessing stack with Hugging Face Transformers incorporating medical tokenization, negation detection, and domain normalization — improving clinical NLP model accuracy by 38% across thousands of heterogeneous pharma documents',
      'GCP Vertex AI auto-scaled endpoints for BioBERT and ClinicalBERT training and batch inference — scaling model delivery by 45% with versioned, reproducible ML pipelines powering Sun Pharma\'s full medico-marketing analytics stack across 365-day operations',
      'GCP Dataflow streaming ETL re-architecture routing NER-extracted drug data into BigQuery in real time — reducing end-to-end pharma analytics reporting latency by 50% and enabling the analytics team to query clean records within minutes of raw document arrival',
    ],
    architecture:
      'GCP-native NLP pipeline: raw pharma document ingestion → Dataflow streaming ETL → Hugging Face preprocessing (medical tokenization, negation detection) → BioBERT/ClinicalBERT NER on Vertex AI auto-scaled endpoints → structured entity records → BigQuery analytics warehouse. MLflow for model versioning, Vertex AI for reproducible training runs.',
    impact: [
      {
        metric: '60% elimination of manual data entry',
        value: 'Production BioBERT NER pipeline ingesting thousands of daily pharma documents and writing structured records to BigQuery',
      },
      {
        metric: '38% improvement in clinical NLP model accuracy',
        value: 'Medical tokenization, negation detection, and domain normalization ensuring BioBERT received clean, consistent signal',
      },
      {
        metric: '45% increase in model delivery scale',
        value: 'GCP Vertex AI auto-scaled endpoints replacing fragile manual scripts with versioned, reproducible ML pipelines',
      },
      {
        metric: '50% reduction in analytics reporting latency',
        value: 'GCP Dataflow streaming ETL enabling clean records to be queried within minutes of raw document arrival',
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
    relatedProjects: ['biobert-drug-ner'],
    lessonsLearned:
      'Domain adaptation is the hardest part of clinical NLP. Off-the-shelf BioBERT is not enough — medical negation patterns ("no evidence of"), abbreviation disambiguation, and drug name normalization each require explicit pipeline engineering. The 38% accuracy gain came entirely from preprocessing rigor, not model changes. Clean data pipelines beat model upgrades every time in production NLP.',
    featured: true,
  },
  {
    id: 'cognizant-2021',
    company: 'Cognizant Technology Solutions',
    title: 'Machine Learning Consultant',
    startDate: '2021-08',
    endDate: '2022-11',
    location: 'India / US Healthcare Clients',
    type: 'Full-time',
    summary:
      'Built and owned 3 production AWS ML pipelines running 24/7/365 for a U.S. medical device sales organization — automating incentive compensation calculations for county-level territories, eliminating 55% of manual business rules processing, and cutting commission cycle time by 40% while achieving zero-downtime deployments.',
    context:
      'A U.S. medical device client ran incentive compensation calculations for their entire sales organization on fragile spreadsheets and manual document interpretation. The business risk was significant: incorrect commission payouts, audit failures, and a 24-hour SLA that manual processes routinely missed. The mandate was to automate the full stack — from document parsing to ML-powered forecasting to CI/CD infrastructure — and make it bulletproof.',
    built: [
      '3 automated batch pipelines on AWS processing daily incentive compensation files using Python, S3, Lambda, and SageMaker Batch Transform — cutting commission calculation cycle time by 40% and guaranteeing county-level payout calculations within every 24-hour window',
      'NLTK document parsing pipeline that automatically extracted compensation rules, territory hierarchies, and manager reassignments from daily flat-file feeds — eliminating 55% of manual business rules processing across 365-day continuous operations',
      'XGBoost classification models on AWS SageMaker trained on multi-year sales performance data to predict commission attainment tiers across U.S. county-level territories — increasing incentive payout forecasting accuracy by 35% and retiring legacy spreadsheet calculations entirely',
      'CI/CD pipeline ownership across cross-functional ML team standardizing AWS CodePipeline, Git branching, and CloudWatch alerting — achieving zero-downtime deployments across all 3 production incentive pipelines running 24/7/365',
    ],
    architecture:
      'AWS-native MLOps pipeline: daily flat-file S3 ingestion → Lambda-triggered NLTK rule extraction → SageMaker Batch Transform (XGBoost inference) → structured payout records → downstream reporting APIs. CodePipeline CI/CD with CloudWatch alerting for 24/7 operational monitoring.',
    impact: [
      {
        metric: '40% reduction in commission calculation cycle time',
        value: '3 automated AWS batch pipelines replacing manual daily incentive compensation processing',
      },
      {
        metric: '55% elimination of manual business rules processing',
        value: 'NLTK document parsing pipeline extracting compensation rules and territory data from daily flat-file feeds',
      },
      {
        metric: '35% increase in forecasting accuracy',
        value: 'XGBoost SageMaker models predicting commission attainment tiers across U.S. county-level territories',
      },
      {
        metric: 'Zero-downtime deployments',
        value: 'AWS CodePipeline + CloudWatch alerting sustaining 24/7/365 production operations with full audit compliance',
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
      'FastAPI',
    ],
    relatedProjects: ['incentive-ml-platform'],
    lessonsLearned:
      'Enterprise ML consulting taught me that the hardest problems are operational, not algorithmic. The XGBoost model took two weeks to build. Making it run reliably at 2am every day for a year, with alerting when data feeds arrive late, automatic fallback logic, and an audit trail for every payout calculation — that took six months of engineering. Production reliability is the product.',
    featured: true,
  },
  {
    id: 'lemoius-2020',
    company: 'Lemoius Pvt. Ltd.',
    title: 'Machine Learning Engineer',
    startDate: '2020-05',
    endDate: '2021-08',
    location: 'India',
    type: 'Full-time',
    summary:
      'Built a real-time content-based job recommendation engine for a 20,000+ profile marketplace using TF-IDF vectorization and cosine similarity — lifting candidate-to-role match relevance by 35% and replacing manual recruiter shortlisting. Reduced profile processing time by 30% and recommendation iteration cycles by 40% through reproducible ML pipelines.',
    context:
      'Lemoius operated a growing job marketplace where recruiter shortlisting was entirely manual — expensive, inconsistent, and impossible to scale beyond a few thousand profiles. The opportunity was to automate candidate-to-role matching with NLP-powered recommendation at production scale.',
    built: [
      'Real-time content-based job recommendation engine for a 20,000+ profile marketplace using TF-IDF vectorization and cosine similarity ranking over candidate profiles and job description text — lifting candidate-to-role match relevance by 35% and replacing manual recruiter shortlisting',
      'End-to-end NLP preprocessing pipeline with NLTK executing tokenization, stopword removal, lemmatization, and n-gram extraction — reducing candidate profile processing time by 30% and transforming raw candidate data into clean, model-ready feature vectors at scale',
      'Real-time top-N candidate ranking system using scikit-learn TF-IDF and cosine similarity scoring — accelerating recruiter shortlisting efficiency by 25% and delivering ranked candidate lists for every new job posting with zero manual intervention',
      'Reproducible ML experiment framework with scikit-learn pipelines and Git version control — reducing recommendation model iteration cycles by 40% and enabling the team to evaluate, validate, and ship updated matching models within a single sprint',
    ],
    architecture:
      'NLP recommendation pipeline: candidate profile ingestion → NLTK preprocessing (tokenization, lemmatization, n-gram extraction) → TF-IDF vectorization → cosine similarity scoring → top-N ranking engine → real-time shortlist API. Scikit-learn pipelines with Git-tracked experiment versioning for reproducible model updates.',
    impact: [
      {
        metric: '35% lift in candidate-to-role match relevance',
        value: 'Content-based recommendation engine replacing manual recruiter shortlisting across 20,000+ profiles',
      },
      {
        metric: '30% reduction in profile processing time',
        value: 'End-to-end NLTK preprocessing pipeline producing clean, model-ready feature vectors at scale',
      },
      {
        metric: '25% acceleration in recruiter shortlisting',
        value: 'Real-time top-N ranking system delivering ranked candidate lists for every new job posting automatically',
      },
      {
        metric: '40% reduction in model iteration cycles',
        value: 'Standardized scikit-learn pipelines and Git versioning enabling sprint-velocity model updates',
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
      'Docker',
      'FastAPI',
      'Git',
    ],
    relatedProjects: ['job-recommendation-engine'],
    lessonsLearned:
      'My first production ML system taught me the fundamentals that still define how I build today. TF-IDF is not glamorous, but a well-engineered recommendation pipeline with reproducible experiments and a clean API beats an over-engineered deep learning system that ships six months late. The discipline of building for production — not just accuracy — started here.',
    featured: false,
  },
]
