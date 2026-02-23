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
    location: 'United States (Remote)',
    type: 'Full-time',
    summary:
      'Leading the development of production-grade Generative AI solutions for business operations. Architecting RAG systems, agentic pipelines, and evaluation frameworks deployed in real-world enterprise environments.',
    context:
      'WorkingFox needed to transition from experimental AI prototypes to reliable, production-grade systems that business teams could depend on daily. The challenge was engineering AI solutions that met enterprise standards for reliability, reproducibility, and cost efficiency.',
    built: [
      'Retrieval-Augmented Generation (RAG) systems integrating vector databases with LLMs for accurate, grounded responses',
      'Document-based Q&A assistants that automate knowledge retrieval from structured and unstructured data',
      'Agentic AI pipelines separating retrieval, reasoning, and validation steps to improve reliability',
      'Deterministic output schemas to replace raw LLM text for safer integrations',
      'Prompt and context versioning systems to ensure reproducibility across deployments',
      'Evaluation frameworks tracking hallucination rates, answer accuracy, and system performance',
      'Scalable cloud-native services using Python and FastAPI',
      'Latency and inference cost optimization systems to make solutions production-viable',
    ],
    architecture:
      'Multi-stage RAG pipeline with vector store retrieval (semantic search), context ranking, LLM generation, and structured output validation. Deployed as microservices with async processing queues and comprehensive observability.',
    impact: [
      {
        metric: 'System status',
        value: 'Transitioned experimental prototypes into operational tools used daily by business teams',
      },
      {
        metric: 'Reliability',
        value: 'Deterministic output schemas reduced downstream integration failures',
      },
      {
        metric: 'Observability',
        value: 'Built evaluation dashboards tracking hallucination rates and answer accuracy',
      },
      {
        metric: 'Cost optimization',
        value: 'Latency and inference cost optimization made solutions production-viable at scale',
      },
    ],
    techStack: [
      'Python',
      'FastAPI',
      'LangChain',
      'OpenAI / Claude API',
      'Pinecone',
      'PostgreSQL',
      'Docker',
      'AWS',
      'Redis',
      'Pydantic',
    ],
    relatedProjects: ['production-rag-system', 'agentic-pipeline'],
    lessonsLearned:
      'Production RAG requires as much engineering rigor as any distributed system. Context window management, retrieval quality scoring, and hallucination detection are first-class engineering concerns — not afterthoughts.',
    featured: true,
  },
  {
    id: 'unt-ga-2024',
    company: 'University of North Texas',
    title: 'Graduate Assistant — Data Science',
    startDate: '2024-08',
    endDate: '2024-12',
    location: 'Denton, TX',
    type: 'Academic',
    summary:
      'Supported faculty research in Data Science and Machine Learning while mentoring students on applied ML projects. Guided 80+ student capstone projects across diverse domains including healthcare AI, NLP, and computer vision.',
    context:
      'The DTSC 5082 Applied Machine Learning capstone course required students to design, build, and evaluate production-ready ML systems. As Graduate Assistant, I bridged the gap between theoretical concepts taught in lectures and the engineering discipline required to actually ship ML systems.',
    built: [
      'Reproducible analytics and experimentation pipelines for faculty research',
      'Curriculum materials translating theoretical ML concepts into practical implementations',
      'Code review frameworks for evaluating student ML project quality',
      'Mentoring sessions for 80+ students across healthcare AI, NLP, and computer vision projects',
    ],
    architecture:
      'Academic research environment with structured mentoring pipeline: project scoping, data pipeline review, model evaluation, and final report assessment.',
    impact: [
      {
        metric: 'Students mentored',
        value: '80+ student research projects guided across multiple cohorts',
      },
      {
        metric: 'Project domains',
        value: 'Healthcare AI, NLP, computer vision, predictive analytics, and recommender systems',
      },
      {
        metric: 'Research support',
        value: 'Contributed to faculty research in applied data science and ML systems',
      },
    ],
    techStack: [
      'Python',
      'Scikit-learn',
      'PyTorch',
      'Transformers',
      'Pandas',
      'NumPy',
      'Jupyter',
      'MLflow',
    ],
    relatedProjects: ['student-mentorship', 'unt-research'],
    lessonsLearned:
      'Teaching ML engineering forced me to articulate principles I had internalized through practice. The ability to explain why a system design decision matters — not just what the decision is — is a skill that translates directly to leading engineering teams.',
    featured: false,
  },
  {
    id: 'creative-sense-2022',
    company: 'Creative Sense Pvt Ltd',
    title: 'AI Engineer',
    startDate: '2022-11',
    endDate: '2023-12',
    location: 'India (Remote)',
    type: 'Full-time',
    summary:
      'Built NLP and LLM-powered automation tools, document intelligence systems, and production APIs integrating AI models into business workflows. Reduced manual processing time through end-to-end automation.',
    context:
      'Creative Sense needed to automate document-heavy business workflows using emerging LLM capabilities. The challenge was building reliable text classification and summarization systems that could operate at production scale with measurable accuracy.',
    built: [
      'NLP and LLM-powered automation tools for document processing workflows',
      'Document intelligence systems for information extraction from unstructured text',
      'REST APIs integrating AI models into existing business systems',
      'Text classification and summarization pipelines for high-volume document processing',
      'Automated data extraction replacing manual knowledge worker tasks',
    ],
    architecture:
      'Document processing pipeline with OCR ingestion, NLP preprocessing, transformer-based classification, and structured output delivery via REST APIs.',
    impact: [
      {
        metric: 'Automation',
        value: 'Reduced manual document processing time through AI-powered extraction pipelines',
      },
      {
        metric: 'Reliability',
        value: 'Delivered production-ready classification and summarization solutions',
      },
      {
        metric: 'Integration',
        value: 'API-first architecture enabled seamless integration with existing business tools',
      },
    ],
    techStack: [
      'Python',
      'FastAPI',
      'HuggingFace Transformers',
      'spaCy',
      'PyTorch',
      'PostgreSQL',
      'Docker',
      'AWS S3',
    ],
    relatedProjects: ['document-intelligence'],
    lessonsLearned:
      'Document intelligence is harder than it looks — OCR errors, inconsistent formats, and ambiguous extractions require careful pipeline design with confidence scoring and human-in-the-loop fallbacks at appropriate thresholds.',
    featured: true,
  },
  {
    id: 'cognizant-2021',
    company: 'Cognizant',
    title: 'Machine Learning Consultant',
    startDate: '2021-08',
    endDate: '2022-11',
    location: 'India / US Healthcare Clients',
    type: 'Full-time',
    summary:
      'Worked with US healthcare clients to develop enterprise-grade ML systems integrating transformer models for document intelligence and business rule extraction. Delivered solutions integrated with SAP enterprise systems.',
    context:
      'US healthcare clients needed to convert large volumes of unstructured business documents into structured, actionable rules for SAP Incentive & Commission Management. The challenge was applying transformer-based NLP in a regulated enterprise environment with strict accuracy and audit requirements.',
    built: [
      'End-to-end ML pipelines for healthcare document classification and information extraction',
      'Transformer models (BERT-based) for document intelligence and unstructured data processing',
      'Business rule extraction systems converting sales documents into structured SAP rules',
      'Integration layer connecting ML outputs with SAP Incentive & Commission Management',
      'Data validation and audit trail systems meeting enterprise compliance requirements',
    ],
    architecture:
      'Enterprise ML pipeline with document ingestion, BERT-based classification, rule extraction engine, and SAP integration layer. Designed for auditability with full lineage tracking.',
    impact: [
      {
        metric: 'Domain',
        value: 'Healthcare enterprise — regulated environment with strict accuracy requirements',
      },
      {
        metric: 'Integration',
        value: 'ML outputs successfully integrated with SAP enterprise systems',
      },
      {
        metric: 'Scale',
        value: 'Processed large volumes of unstructured healthcare and business documents',
      },
    ],
    techStack: [
      'Python',
      'BERT',
      'HuggingFace',
      'PyTorch',
      'SAP',
      'SQL',
      'Azure',
      'Pandas',
      'FastAPI',
      'MLflow',
    ],
    relatedProjects: ['healthcare-nlp', 'enterprise-ml'],
    lessonsLearned:
      'Working in regulated healthcare environments taught me that model accuracy alone is insufficient. Auditability, explainability, and graceful degradation are engineering requirements — and often more valuable to clients than incremental accuracy improvements.',
    featured: true,
  },
  {
    id: 'lemoius-2020',
    company: 'Lemoius',
    title: 'Machine Learning Engineer',
    startDate: '2020-05',
    endDate: '2021-08',
    location: 'India',
    type: 'Full-time',
    summary:
      'Built foundational ML and NLP models, ETL pipelines, and production deployments. This role established the engineering foundation for all subsequent ML work.',
    context:
      'Lemoius was an early-stage startup requiring end-to-end ML engineering across the full stack: data ingestion, feature engineering, model development, and production deployment.',
    built: [
      'Predictive ML and NLP models for business applications',
      'ETL pipelines for data ingestion and preprocessing at scale',
      'Feature engineering systems for structured and unstructured data',
      'Production model deployment pipelines with monitoring',
    ],
    architecture:
      'Standard ML pipeline architecture: data ingestion → preprocessing → feature store → model training → evaluation → deployment → monitoring.',
    impact: [
      {
        metric: 'Foundation',
        value: 'Established end-to-end ML engineering capabilities across the full stack',
      },
      {
        metric: 'Production',
        value: 'Deployed multiple ML models into production with monitoring and alerting',
      },
    ],
    techStack: ['Python', 'Scikit-learn', 'PyTorch', 'Pandas', 'NumPy', 'SQL', 'Docker', 'GCP'],
    relatedProjects: [],
    lessonsLearned:
      'The basics matter more than the algorithms. Clean data pipelines, reproducible experiments, and robust deployment infrastructure are what separate ML projects that ship from those that stay in notebooks.',
    featured: false,
  },
]
