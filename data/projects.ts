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
  | 'RAG Systems'
  | 'Machine Learning'
  | 'MLOps'
  | 'NLP'
  | 'Research'

export const projects: Project[] = [
  {
    slug: 'cvs-pharmacy-graph-rag',
    title: 'Graph-RAG Pharmacy Intelligence Platform — CVS Health',
    tagline: '91% retrieval accuracy across pharmacy workflows — 45% reduction in non-aligned AI responses via agentic Graph RAG with Neo4j and Azure AI Search',
    category: 'RAG Systems',
    year: '2025',
    problem:
      'CVS Health pharmacy teams needed reliable, real-time access to drug interaction, contraindication, and medication guidance through natural language — grounded in verified clinical data. Existing systems could not reason across the relationships between drug names, ICD codes, diagnoses, and clinical conditions at the scale of production pharmacy workflows, resulting in non-aligned AI responses that required manual pharmacist review.',
    approach:
      'Architected an agentic Graph RAG platform combining Neo4j knowledge graphs, Azure AI Search vector embeddings, and Azure OpenAI GPT-4o. First built an entity extraction pipeline using GPT-4o to extract and normalize drug names, ICD codes, diagnoses, and clinical conditions from unstructured pharmacy documents — enriching Neo4j with 50,000+ drug-condition-interaction relationships. Then designed a hybrid retrieval architecture combining Neo4j graph traversal, Azure AI Search semantic search, reranking, and graph caching. LangGraph multi-agent workflows with MCP and A2A patterns coordinated retrieval, validation, and response generation across FHIR-based EHR data sources. Fine-tuned Llama 3 with PEFT and LoRA on clinical datasets for handoff summarization and Q&A. Deployed to AKS via Terraform and GitHub Actions with MLflow monitoring for automated drift detection and retraining.',
    results: [
      {
        metric: '91% retrieval accuracy',
        description: 'Graph RAG platform measured against physician prescription records and clinician-reviewed reference outputs across pharmacy workflows',
      },
      {
        metric: '45% reduction in non-aligned AI responses',
        description: 'Validation against verified clinical records grounding LLM outputs and eliminating hallucinations on drug interaction queries',
      },
      {
        metric: '40% improvement in clinical information accuracy',
        description: 'Hybrid retrieval combining Neo4j graph traversal with Azure AI Search semantic search and reranking over baseline RAG',
      },
      {
        metric: '60% reduction in Neo4j query latency',
        description: 'Graph caching strategies, AKS auto-scaling tuning, and Azure Data Factory batch pipeline optimization',
      },
      {
        metric: '45% increase in system throughput',
        description: 'Azure Data Factory batch update pipeline improvements and AKS auto-scaling configuration delivering higher concurrent query capacity',
      },
      {
        metric: '99.5% service availability',
        description: 'AKS production deployment with Terraform-managed infrastructure, GitHub Actions CI/CD, and MLflow automated retraining triggers',
      },
    ],
    techStack: [
      'Azure OpenAI (GPT-4o)',
      'Neo4j',
      'Azure AI Search',
      'LangGraph',
      'LangChain',
      'Llama 3',
      'PEFT / LoRA',
      'FHIR / EHR Integration',
      'AKS',
      'Azure ML',
      'MLflow',
      'Terraform',
      'GitHub Actions',
      'FastAPI',
      'Python',
    ],
    architecture:
      'Pharmacy document ingestion → Azure OpenAI GPT-4o entity extraction (drug names, ICD codes, diagnoses) → Neo4j knowledge graph (50K+ drug-condition-interaction relationships) + Azure AI Search vector index → hybrid retrieval (graph traversal + semantic search + reranking + graph caching) → LangGraph multi-agent coordinator (MCP/A2A patterns: retrieval agent → validation agent → response generation agent) → validated pharmacy response API. MLOps: AKS-hosted microservices, MLflow tracking, Terraform IaC, GitHub Actions CI/CD, Azure ML model registry.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['cvs-health-2025'],
    featured: true,
    color: '#ef4444',
  },
  {
    slug: 'morgan-stanley-financial-rag',
    title: 'Enterprise Financial Research RAG System — Morgan Stanley',
    tagline: '60% improvement in document retrieval efficiency — 350,000+ proprietary financial research documents indexed with embedding-based semantic search and LangGraph agentic workflows',
    category: 'RAG Systems',
    year: '2024',
    problem:
      'Morgan Stanley financial advisors needed fast, accurate access to 350,000+ proprietary research documents to support client recommendations and compliance review. Manual document search was slow and inconsistent, compliance workflows required human reviewers for every document classification decision, and there was no governed AI layer to ensure LLM outputs met financial regulatory standards.',
    approach:
      'Built enterprise RAG pipelines using Azure OpenAI, LangChain, and Pinecone — chunking and embedding 350,000+ proprietary financial research documents with domain-appropriate embedding models and optimized Pinecone index configurations. Developed transformer-based NLP models using HuggingFace and Azure ML for automated document classification and compliance review, reducing manual reviewer workload. Built LangGraph and LangChain agentic workflows for financial research summarization, document Q&A, and advisor knowledge retrieval — integrated with enterprise APIs and Azure OpenAI services. Constructed scalable data pipelines using Python, FastAPI, and Azure Data Factory to consolidate market, compliance, and research data into a unified ML feature store. Deployed full cloud-native MLOps infrastructure using Docker, Kubernetes, and Azure ML with automated CI/CD for model training, validation, versioning, and monitoring.',
    results: [
      {
        metric: '60% improvement in document retrieval efficiency',
        description: 'RAG pipelines indexing 350,000+ proprietary financial research documents through embedding-based semantic search and Azure ML CI/CD workflows',
      },
      {
        metric: '35% reduction in manual review time',
        description: 'HuggingFace transformer models automating financial document classification and compliance review with automated inference pipelines',
      },
      {
        metric: '40% improvement in advisor productivity',
        description: 'LangGraph agentic workflows for research summarization, document Q&A, and advisor knowledge retrieval integrated with enterprise APIs',
      },
      {
        metric: '40% reduction in model release cycles',
        description: 'Cloud-native MLOps with Docker, Kubernetes, and Azure ML reducing time from model training to validated production deployment',
      },
      {
        metric: '38% improvement in model training efficiency',
        description: 'FastAPI data access layer and Azure Data Factory pipelines consolidating compliance, market, and research data into a unified ML feature store',
      },
    ],
    techStack: [
      'Azure OpenAI',
      'LangChain',
      'LangGraph',
      'Pinecone',
      'HuggingFace Transformers',
      'Azure ML',
      'Docker',
      'Kubernetes',
      'FastAPI',
      'Azure Data Factory',
      'Python',
      'SQL',
    ],
    architecture:
      'Financial document ingestion → HuggingFace embedding → Pinecone vector index (350K+ documents) → LangChain retrieval chain → Azure OpenAI generation → compliance-validated response API. Agentic layer: LangGraph multi-agent workflows (research summarization agent, document Q&A agent, knowledge retrieval agent). MLOps: Docker/Kubernetes CI/CD, Azure ML model registry, FastAPI data access layer, Azure Data Factory feature store.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['morgan-stanley-2024'],
    featured: true,
    color: '#6366f1',
  },
  {
    slug: 'morgan-stanley-llm-evaluation',
    title: 'LLM Evaluation & Governance Framework — Morgan Stanley',
    tagline: '35% improvement in LLM response reliability — LLM-as-a-Judge automated compliance validation for regulated financial AI outputs, with 40% reduction in AI review cycles',
    category: 'MLOps',
    year: '2024',
    problem:
      'In a regulated financial environment, LLM outputs cannot be deployed without verifying compliance with accuracy, regulatory, and risk standards. Manual review of AI-generated financial content was time-consuming, inconsistent, and not scalable to the volume of outputs being generated across advisor tools, compliance workflows, and fraud detection systems.',
    approach:
      'Built an LLM evaluation framework using LLM-as-a-Judge techniques, groundedness testing, prompt engineering, and automated benchmarks to validate Azure OpenAI outputs against financial compliance and accuracy standards. The framework evaluated model outputs across multiple dimensions: factual grounding, regulatory compliance alignment, response completeness, and absence of hallucination. Developed model governance reporting dashboards and A/B testing pipelines to evaluate LLM performance across risk, compliance, and wealth management teams. Fraud and anomaly detection models using Python and TensorFlow were integrated with risk and compliance monitoring workflows to reduce false positive rates. Results were translated into business-ready insights for senior stakeholders, reducing the AI review cycle through automated evaluation rather than manual auditing.',
    results: [
      {
        metric: '35% improvement in LLM response reliability',
        description: 'LLM-as-a-Judge evaluation framework continuously validating Azure OpenAI outputs against compliance and accuracy standards',
      },
      {
        metric: '40% reduction in AI review cycles',
        description: 'Automated benchmarks and model governance reporting replacing manual LLM output review for risk, compliance, and wealth management teams',
      },
      {
        metric: '32% reduction in fraud false positive rates',
        description: 'TensorFlow anomaly detection models with automated monitoring integrated into risk and financial crime compliance workflows',
      },
    ],
    techStack: [
      'Azure OpenAI',
      'LLM-as-a-Judge',
      'TensorFlow',
      'Python',
      'Azure ML',
      'FastAPI',
      'Docker',
      'SQL',
    ],
    architecture:
      'LLM output → multi-dimensional evaluation pipeline (groundedness test, compliance alignment check, hallucination detection, factual grounding score) → LLM-as-a-Judge scoring → governance reporting dashboard. A/B testing pipeline: model variant deployment → controlled output comparison → statistical significance testing → stakeholder reporting. Fraud detection: transaction features → TensorFlow anomaly model → risk alert integration → CloudWatch monitoring.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['morgan-stanley-2024'],
    featured: true,
    color: '#8b5cf6',
  },
  {
    slug: 'verizon-churn-prediction',
    title: 'Telecom Churn Prediction & Customer Intelligence — Verizon',
    tagline: '40% faster high-risk customer identification — XGBoost and LightGBM churn models with BERT ticket classification deployed on AWS SageMaker at telecom scale',
    category: 'Machine Learning',
    year: '2023',
    problem:
      'Verizon needed scalable ML systems to identify at-risk subscribers before churn and route customer support tickets without manual intervention. Existing churn identification relied on lagging business reports, making it impossible to act on high-risk customers in time. Support ticket routing was entirely manual, creating bottlenecks and inconsistency across customer operations.',
    approach:
      'Developed churn prediction and propensity-to-buy models using XGBoost and LightGBM on large-scale telecom subscriber datasets with feature engineering across usage patterns, billing history, device age, and service interactions. Deployed automated CI/CD pipelines on AWS SageMaker for model training, validation, drift detection, and scheduled retraining. Built BERT-based NLP classification pipelines to categorize high-volume customer support tickets by issue type and priority, with CI/CD-enabled deployment through AWS SageMaker. Built collaborative filtering recommendation models using Python and TensorFlow to personalize wireless plan and device offers across customer segments, with feature serving via AWS SageMaker Feature Store. Conducted A/B testing and statistical hypothesis testing using Python, SciPy, and StatsModels across churn and recommendation models to improve performance and campaign targeting. Developed executive-facing Tableau and Power BI dashboards tracking KPIs across churn, network uptime, and customer satisfaction.',
    results: [
      {
        metric: '40% reduction in time to identify high-risk customers',
        description: 'XGBoost/LightGBM churn models on large-scale telecom subscriber data with automated AWS SageMaker CI/CD pipelines',
      },
      {
        metric: '35% reduction in manual ticket routing time',
        description: 'BERT-based NLP classification pipeline deployed with automated CI/CD for high-volume customer support ticket categorization',
      },
      {
        metric: '22% increase in upsell conversion rates',
        description: 'Collaborative filtering recommendation models personalizing wireless plan and device offers across customer segments via SageMaker Feature Store',
      },
      {
        metric: '20% improvement in model and campaign performance',
        description: 'A/B testing and statistical hypothesis testing with Python, SciPy, and StatsModels across churn and recommendation models',
      },
    ],
    techStack: [
      'XGBoost',
      'LightGBM',
      'BERT',
      'TensorFlow',
      'Scikit-learn',
      'AWS SageMaker',
      'AWS S3',
      'Python',
      'SciPy',
      'StatsModels',
      'Tableau',
      'Power BI',
      'SQL',
    ],
    architecture:
      'Subscriber data ingestion → SageMaker Feature Store → parallel model track: (1) XGBoost/LightGBM churn models → at-risk customer scoring → retention campaign targeting; (2) BERT NLP classifier → ticket categorization → automated routing; (3) collaborative filtering recommender → personalized plan offers. AWS SageMaker CI/CD: training → validation → drift detection → retraining triggers. Tableau/Power BI dashboards over SQL reporting layer.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['verizon-2020'],
    featured: false,
    color: '#10b981',
  },
  {
    slug: 'verizon-network-streaming',
    title: 'Real-Time Network Telemetry Pipeline — Verizon',
    tagline: '35% reduction in outage response time — Apache Kafka and Spark Streaming processing high-volume network telemetry with automated anomaly alerting on AWS',
    category: 'MLOps',
    year: '2022',
    problem:
      'Verizon network operations teams were relying on batch telemetry processing that introduced multi-hour delays in detecting network anomalies and outages. By the time issues surfaced in reports, impact had already spread across customer-facing services. A real-time processing layer was needed to detect and alert on network events within minutes of occurrence.',
    approach:
      'Designed and deployed real-time streaming pipelines using Apache Kafka and Spark Streaming to ingest and process high-volume network telemetry data continuously. Kafka topics partitioned by network region and telemetry type enabled parallel processing at scale. Spark Streaming consumers processed raw telemetry events, computed aggregated metrics (latency, packet loss, signal strength), and applied threshold-based and ML-powered anomaly detection to flag network degradation in real time. ETL workflows on AWS were streamlined with automated CI/CD deployments. Built production MLOps workflows using Docker, Git, and AWS SageMaker, reducing deployment cycles from weeks to days. Optimized AWS SageMaker and Lambda infrastructure using spot instance configurations and batch processing strategies.',
    results: [
      {
        metric: '35% reduction in outage response time',
        description: 'Real-time Apache Kafka and Spark Streaming pipeline processing high-volume network telemetry and triggering automated anomaly alerts',
      },
      {
        metric: 'Model deployment from weeks to days',
        description: 'Production MLOps on AWS SageMaker with automated CI/CD for training, validation, drift detection, and retraining pipelines',
      },
      {
        metric: '25% reduction in monthly ML infrastructure spend',
        description: 'AWS SageMaker and Lambda cost optimization via spot instance configurations and batch processing strategy tuning',
      },
    ],
    techStack: [
      'Apache Kafka',
      'Spark Streaming',
      'AWS SageMaker',
      'AWS Lambda',
      'AWS S3',
      'Amazon Kinesis',
      'Docker',
      'MLflow',
      'Python',
      'SQL',
    ],
    architecture:
      'Network telemetry sources → Kafka producers (region-partitioned topics) → Spark Streaming consumers (aggregated metrics computation: latency, packet loss, signal strength) → anomaly detection layer (threshold rules + ML models) → real-time alert pipeline → network operations dashboard. AWS ETL: S3 ingestion → Lambda-triggered processing → SageMaker batch inference → CloudWatch alerting. MLOps: Docker CI/CD, drift detection, automated retraining.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['verizon-2020'],
    featured: false,
    color: '#f59e0b',
  },
  {
    slug: 'verizon-recommendation-engine',
    title: 'Personalized Plan Recommendation Engine — Verizon',
    tagline: '22% increase in upsell conversion — collaborative filtering models personalizing wireless plan and device offers across Verizon customer segments via AWS SageMaker Feature Store',
    category: 'Machine Learning',
    year: '2021',
    problem:
      "Verizon's wireless plan and device upsell campaigns were driven by broad customer segments and manual offer selection. Without personalization, offers were poorly matched to individual customer preferences, device age, and usage patterns — resulting in low conversion rates and missed upsell opportunities across millions of subscribers.",
    approach:
      'Engineered collaborative filtering recommendation models using Python and TensorFlow to personalize wireless plan and device offers across customer segments and device campaigns. Feature engineering incorporated subscriber usage patterns, device lifecycle data, plan tenure, and historical offer acceptance signals. Features were served via AWS SageMaker Feature Store for consistent training and real-time inference. A/B testing frameworks validated recommendation model improvements against baseline offer targeting, with statistical hypothesis testing using SciPy and StatsModels to confirm significance before production rollout.',
    results: [
      {
        metric: '22% increase in upsell conversion rates',
        description: 'Collaborative filtering recommendation models personalizing wireless plan and device offers across subscriber segments via SageMaker Feature Store',
      },
      {
        metric: '20% improvement in campaign targeting effectiveness',
        description: 'A/B testing and statistical hypothesis testing with Python, SciPy, and StatsModels validating recommendation improvements before production rollout',
      },
    ],
    techStack: [
      'Python',
      'TensorFlow',
      'Scikit-learn',
      'AWS SageMaker',
      'AWS SageMaker Feature Store',
      'SciPy',
      'StatsModels',
      'SQL',
      'Docker',
    ],
    architecture:
      'Subscriber data → SageMaker Feature Store (usage patterns, device lifecycle, plan tenure, offer acceptance history) → collaborative filtering model training (TensorFlow) → SageMaker real-time inference endpoint → personalized offer ranking API → campaign targeting integration. A/B testing: variant A (recommendation model) vs. variant B (baseline segment targeting) → SciPy significance testing → production rollout decision.',
    images: [],
    reportAvailable: false,
    relatedExperience: ['verizon-2020'],
    featured: false,
    color: '#06b6d4',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
