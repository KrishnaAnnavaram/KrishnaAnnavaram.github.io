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
    slug: 'production-rag-system',
    title: 'Production RAG Knowledge System',
    tagline: 'Enterprise-grade retrieval-augmented generation with evaluation, monitoring, and cost optimization',
    category: 'RAG Systems',
    year: '2025',
    problem:
      'Enterprise teams were relying on manual knowledge retrieval from large document repositories, creating bottlenecks and inconsistent information delivery. Existing AI chatbot solutions were hallucination-prone and lacked the reliability needed for business-critical workflows.',
    approach:
      'Designed a multi-stage RAG pipeline separating retrieval, context ranking, LLM generation, and structured output validation into independent, testable components. Built deterministic output schemas to replace raw LLM text, implemented confidence-scored retrieval with semantic reranking, and created evaluation dashboards tracking hallucination rates and answer accuracy across model versions.',
    results: [
      {
        metric: 'Production deployment',
        description: 'System transitioned from experimental prototype to daily operational tool used by business teams',
      },
      {
        metric: 'Reliability',
        description: 'Deterministic output schemas significantly reduced downstream integration failures',
      },
      {
        metric: 'Observability',
        description: 'Evaluation dashboards provide continuous monitoring of hallucination rates and answer quality',
      },
      {
        metric: 'Cost efficiency',
        description: 'Context optimization and caching reduced inference costs while maintaining response quality',
      },
    ],
    techStack: ['Python', 'FastAPI', 'LangChain', 'Claude API', 'Pinecone', 'PostgreSQL', 'Docker', 'AWS', 'Redis', 'Pydantic'],
    architecture:
      'Document ingestion → chunking & embedding → vector store (Pinecone) → semantic retrieval → context reranking → LLM generation (Claude) → structured output validation (Pydantic) → delivery API. Async processing with Redis queue, MLflow for experiment tracking.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['workingfox-2025'],
    featured: true,
    color: '#6366f1',
  },
  {
    slug: 'agentic-pipeline',
    title: 'Multi-Step Agentic AI Workflow',
    tagline: 'Reliable agentic pipelines with separation of retrieval, reasoning, and validation steps',
    category: 'RAG Systems',
    year: '2025',
    problem:
      'Single-step LLM calls were insufficient for complex business reasoning tasks requiring access to multiple data sources, conditional logic, and output validation. Monolithic agent designs produced unpredictable behavior that was difficult to debug or audit.',
    approach:
      'Decomposed the agentic workflow into discrete, observable steps: retrieval agents for data gathering, reasoning agents for analysis, and validation agents for output verification. Each step produces structured intermediate outputs that can be inspected, cached, and re-executed independently. Implemented tool-use with function calling for deterministic integrations.',
    results: [
      {
        metric: 'Reliability',
        description: 'Step isolation made failures localizable and recoverable without full pipeline restart',
      },
      {
        metric: 'Auditability',
        description: 'Structured intermediate outputs enable full trace inspection for every workflow execution',
      },
      {
        metric: 'Extensibility',
        description: 'Modular agent architecture allows new tool integrations without redesigning existing steps',
      },
    ],
    techStack: ['Python', 'LangGraph', 'Claude API', 'FastAPI', 'Redis', 'PostgreSQL', 'Pydantic'],
    architecture:
      'Directed acyclic graph of agent nodes: Retrieval Node → Context Aggregation → Reasoning Node → Validation Node → Output Node. Each node has typed inputs/outputs with retry logic and observability hooks.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['workingfox-2025'],
    featured: true,
    color: '#8b5cf6',
  },
  {
    slug: 'healthcare-nlp',
    title: 'Healthcare Document Intelligence',
    tagline: 'Transformer-based NLP for clinical document classification and information extraction in enterprise healthcare',
    category: 'Healthcare AI',
    year: '2022',
    problem:
      'A US healthcare enterprise client needed to process large volumes of unstructured business documents and convert them into structured rules for SAP Incentive & Commission Management. Manual extraction was slow, inconsistent, and a significant operational bottleneck.',
    approach:
      'Deployed BERT-based transformer models fine-tuned for healthcare domain classification and named entity recognition. Built a multi-stage pipeline with document preprocessing, entity extraction, relationship mapping, and structured rule generation. Designed the system with full audit trails to meet enterprise compliance requirements.',
    results: [
      {
        metric: 'Automation',
        description: 'Significantly reduced manual document processing time through AI-powered extraction',
      },
      {
        metric: 'Enterprise integration',
        description: 'ML outputs successfully integrated with SAP ICM, replacing manual data entry workflows',
      },
      {
        metric: 'Compliance',
        description: 'Audit trail and confidence scoring met enterprise governance requirements for regulated environment',
      },
    ],
    techStack: ['Python', 'BERT', 'HuggingFace Transformers', 'PyTorch', 'SAP', 'Azure', 'SQL', 'FastAPI', 'MLflow'],
    architecture:
      'Document ingestion → OCR/text extraction → BERT classification → NER pipeline → relationship extraction → rule generation engine → SAP integration API. Full lineage tracking with confidence scores at each stage.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['cognizant-2021'],
    featured: true,
    color: '#ef4444',
  },
  {
    slug: 'document-intelligence',
    title: 'Automated Document Processing Platform',
    tagline: 'End-to-end document intelligence reducing manual processing through NLP-powered automation',
    category: 'NLP',
    year: '2023',
    problem:
      'Business teams spent significant time manually extracting information from high-volume unstructured documents — invoices, contracts, reports. Existing rule-based approaches lacked flexibility for document format variation.',
    approach:
      'Built a flexible document intelligence platform combining OCR with transformer-based text understanding. Implemented multi-class document classification, key information extraction, and summarization pipelines. API-first architecture enabled integration with existing business tools without workflow disruption.',
    results: [
      {
        metric: 'Processing speed',
        description: 'Automated extraction dramatically reduced time spent on manual document review',
      },
      {
        metric: 'Accuracy',
        description: 'Transformer-based extraction outperformed previous rule-based approaches on format-varied documents',
      },
      {
        metric: 'Integration',
        description: 'REST API design enabled adoption without changes to existing team workflows',
      },
    ],
    techStack: ['Python', 'FastAPI', 'HuggingFace', 'spaCy', 'PyTorch', 'PostgreSQL', 'Docker', 'AWS S3'],
    architecture:
      'Document upload API → preprocessing pipeline → OCR (for scanned docs) → text classification → NER extraction → summarization → structured JSON output → delivery webhook.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['creative-sense-2022'],
    featured: false,
    color: '#06b6d4',
  },
  {
    slug: 'llm-evaluation-framework',
    title: 'LLM Evaluation & Monitoring Framework',
    tagline: 'Systematic evaluation infrastructure for production LLM systems with hallucination detection and quality tracking',
    category: 'MLOps',
    year: '2024',
    problem:
      'Production LLM systems lacked systematic evaluation beyond subjective human review. Teams needed quantifiable metrics for hallucination rates, answer accuracy, and response consistency to make confident deployment decisions.',
    approach:
      'Designed a multi-dimensional evaluation framework combining automated metrics (semantic similarity, factuality scores, coverage) with structured human evaluation protocols. Built dashboards tracking quality trends across model versions, prompt variants, and data distributions. Integrated evaluation into CI/CD pipeline to catch quality regressions before deployment.',
    results: [
      {
        metric: 'Coverage',
        description: 'Evaluation suite covers hallucination detection, answer accuracy, latency, and cost across production traffic',
      },
      {
        metric: 'Automation',
        description: 'CI/CD-integrated evaluation catches quality regressions before reaching production',
      },
      {
        metric: 'Decision quality',
        description: 'Quantified metrics enabled confident model version upgrade decisions',
      },
    ],
    techStack: ['Python', 'MLflow', 'Weights & Biases', 'FastAPI', 'PostgreSQL', 'Grafana', 'OpenAI API', 'Claude API'],
    architecture:
      'Evaluation harness → metric computation (semantic similarity, factuality, coverage) → logging to MLflow/W&B → dashboard aggregation → alert system for threshold breaches → CI/CD integration gate.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['workingfox-2025', 'unt-ga-2024'],
    featured: false,
    color: '#10b981',
  },
  {
    slug: 'student-mentorship',
    title: 'Student AI Research Mentorship — UNT',
    tagline: 'Mentoring 80+ graduate students on production ML systems across healthcare AI, NLP, and computer vision',
    category: 'Research',
    year: '2024',
    problem:
      'Graduate students in the DTSC 5082 Applied Machine Learning capstone course needed guidance bridging the gap between theoretical ML concepts and the engineering discipline required to build production-quality systems.',
    approach:
      'Structured mentoring program covering the full ML engineering lifecycle: problem scoping, data pipeline design, model selection and evaluation, production deployment considerations, and research communication. Provided code reviews, architecture feedback, and technical mentoring across 80+ projects spanning diverse application domains.',
    results: [
      {
        metric: 'Impact',
        description: '80+ student research projects successfully completed under mentorship',
      },
      {
        metric: 'Domain diversity',
        description: 'Projects spanning healthcare AI, NLP, computer vision, forecasting, and recommender systems',
      },
      {
        metric: 'Research quality',
        description: 'Student projects met academic standards with defensible methodology and reproducible implementations',
      },
    ],
    techStack: ['Python', 'PyTorch', 'Transformers', 'Scikit-learn', 'Pandas', 'Jupyter', 'MLflow'],
    architecture:
      'Academic mentorship pipeline: project scoping → data pipeline review → model development guidance → evaluation framework design → report and presentation coaching.',
    images: [],
    reportAvailable: true,
    relatedExperience: ['unt-ga-2024'],
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
