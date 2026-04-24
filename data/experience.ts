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
    id: 'cvs-health-2025',
    company: 'CVS Health',
    title: 'Generative AI Engineer',
    startDate: '2025-06',
    endDate: null,
    location: 'TX, USA',
    type: 'Full-time',
    summary:
      'Architecting and deploying a production-grade agentic Graph RAG platform for CVS Health pharmacy teams — enabling natural language retrieval of drug interaction, contraindication, and medication guidance with 91% retrieval accuracy, 45% reduction in non-aligned AI responses, and 99.5% service availability.',
    context:
      'CVS Health pharmacy teams needed reliable, production-grade GenAI systems that could surface drug interaction and medication guidance through natural language — grounded in verified clinical data and integrated with FHIR-based EHR systems. The challenge was designing an agentic architecture that held up under production load while maintaining clinical accuracy and complying with pharmacy workflow standards.',
    built: [
      'Production agentic Graph RAG platform using Neo4j, LangGraph, LangChain, and Azure OpenAI GPT-4o — enabling pharmacy teams to retrieve drug interaction, contraindication, and medication guidance through natural language queries, achieving 91% retrieval accuracy and 45% reduction in non-aligned AI responses',
      'Azure OpenAI GPT-4o-based entity extraction workflows to extract and normalize drug names, ICD codes, diagnoses, and clinical conditions from unstructured pharmacy documents — enriching a Neo4j knowledge graph with 50,000+ drug-condition-interaction relationships',
      'Hybrid retrieval architecture combining Neo4j graph traversal, Azure AI Search vector embeddings, semantic search, reranking, and graph caching — improving clinical information accuracy by 40% over baseline RAG and reducing query latency by 60%',
      'LangGraph multi-agent workflows with MCP and A2A patterns to coordinate retrieval, validation, and response generation across FHIR-based EHR data sources and internal pharmacy knowledge systems',
      'Fine-tuned Llama 3 using PEFT and LoRA on clinical conversation datasets with Azure OpenAI GPT-4o workflows for handoff summarization and clinical Q&A — improving handoff completeness to 92% and reducing physician review time by 50%',
      'Graph RAG services deployed to Azure Kubernetes Service using Terraform and GitHub Actions — CI/CD pipelines for containerized Neo4j services and LangGraph agent workflows maintaining 99.5% service availability',
      'MLflow tracking and Azure ML monitoring for GenAI pipelines — automating model versioning, drift monitoring, performance regression testing, and retraining triggers to reduce manual intervention by 70%',
      'Azure Data Factory batch update pipelines and AKS auto-scaling tuning — increasing system throughput by 45% and reducing Neo4j query latency by 60%',
    ],
    architecture:
      'Agentic Graph RAG pipeline: pharmacy document ingestion → Azure OpenAI GPT-4o entity extraction → Neo4j knowledge graph (50K+ drug-condition relationships) + Azure AI Search vector index → hybrid retrieval (graph traversal + semantic search + reranking) → LangGraph multi-agent coordinator (MCP/A2A patterns) → validated clinical response API. MLOps: AKS-hosted microservices, MLflow tracking, Terraform IaC, GitHub Actions CI/CD, Azure ML model registry.',
    impact: [
      {
        metric: '91% retrieval accuracy',
        value: 'Graph RAG platform deployed across CVS Health pharmacy workflows for drug interaction and medication guidance',
      },
      {
        metric: '45% reduction in non-aligned AI responses',
        value: 'Responses validated against physician prescription records and clinician-reviewed reference outputs',
      },
      {
        metric: '40% improvement in clinical information accuracy',
        value: 'Hybrid retrieval combining Neo4j graph traversal with Azure AI Search semantic search and reranking',
      },
      {
        metric: '60% reduction in Neo4j query latency',
        value: 'Graph caching strategies, hybrid retrieval architecture tuning, and AKS auto-scaling optimization',
      },
      {
        metric: '45% increase in system throughput',
        value: 'Azure Data Factory batch update pipeline improvements and AKS auto-scaling configuration',
      },
      {
        metric: '70% reduction in manual intervention',
        value: 'MLflow and Azure ML automated model versioning, drift monitoring, and retraining triggers',
      },
      {
        metric: '99.5% service availability',
        value: 'AKS production deployment with Terraform-managed infrastructure and GitHub Actions CI/CD',
      },
    ],
    techStack: [
      'Azure OpenAI (GPT-4o)',
      'LangGraph',
      'LangChain',
      'Neo4j',
      'Azure AI Search',
      'Pinecone',
      'Llama 3',
      'PEFT',
      'LoRA',
      'FHIR / EHR Integration',
      'AKS',
      'Azure ML',
      'MLflow',
      'Terraform',
      'GitHub Actions',
      'Azure Data Factory',
      'FastAPI',
      'Python',
    ],
    relatedProjects: [],
    lessonsLearned:
      'Pharmacy AI demands rigorous architecture before any LLM call. The 91% retrieval accuracy came from separating entity extraction, knowledge graph traversal, and semantic search into distinct pipeline stages — not a single retrieval step. Graph caching and hybrid reranking were the decisive improvements over baseline RAG. Every architectural decision had a measurable clinical outcome attached.',
    featured: true,
  },
  {
    id: 'morgan-stanley-2024',
    company: 'Morgan Stanley',
    title: 'AI / ML Engineer',
    startDate: '2024-06',
    endDate: '2025-05',
    location: 'TX, USA',
    type: 'Full-time',
    summary:
      'Built enterprise RAG pipelines, agentic financial research workflows, and cloud-native MLOps infrastructure for Morgan Stanley — indexing 350,000+ proprietary financial documents, improving advisor document retrieval efficiency by 60%, and accelerating model release cycles by 40% in a regulated financial environment.',
    context:
      'Morgan Stanley financial advisors needed AI-powered access to 350,000+ proprietary research documents with automated compliance review, fraud detection, and governed LLM outputs — all in a regulated financial environment. The challenge was building RAG and agentic systems that met enterprise compliance standards while delivering measurable productivity gains across risk, compliance, and wealth management teams.',
    built: [
      'RAG pipelines using Azure OpenAI, LangChain, and Pinecone to index 350,000+ proprietary financial research documents — improving advisor document retrieval efficiency by 60% through embedding-based semantic search and Azure ML CI/CD workflows',
      'Transformer-based NLP models using HuggingFace and Azure ML for financial document classification and compliance review workflows — reducing manual review time by 35% through automated inference pipelines',
      'LangChain and LangGraph-based agentic workflows for financial research summarization, document Q&A, and advisor knowledge retrieval — improving advisor productivity by 40% through integration with enterprise APIs and Azure OpenAI services',
      'Fraud and anomaly detection models using Python and TensorFlow — reducing false positive rates by 32% through automated monitoring integrated with risk, compliance, and financial crime workflows',
      'Cloud-native MLOps pipelines using Docker, Kubernetes, and Azure ML — reducing model release cycles by 40% through automated CI/CD for training, validation, versioning, observability, and monitoring',
      'LLM evaluation frameworks using LLM-as-a-Judge, prompt engineering, groundedness testing, and automated benchmarks — improving response reliability by 35% against compliance and accuracy standards',
      'Scalable data pipelines and data access APIs using Python, FastAPI, and Azure Data Factory — improving model training efficiency by 38% through a unified ML feature store',
      'Model governance reporting frameworks and A/B testing pipelines — reducing AI review cycles by 40% by translating evaluation metrics into business-ready insights for senior stakeholders',
    ],
    architecture:
      'Enterprise RAG: financial document ingestion → HuggingFace embedding → Pinecone vector index → LangChain retrieval → Azure OpenAI generation → compliance-validated response API. Agentic layer: LangGraph multi-agent workflows (research summarization, Q&A, knowledge retrieval). MLOps: Docker/Kubernetes, Azure ML CI/CD, FastAPI data access layer, Azure Data Factory feature store. LLM evaluation: LLM-as-a-Judge automated benchmarks with governance reporting.',
    impact: [
      {
        metric: '60% improvement in document retrieval efficiency',
        value: 'RAG pipelines indexing 350,000+ proprietary financial research documents with embedding-based semantic search',
      },
      {
        metric: '35% reduction in manual review time',
        value: 'HuggingFace transformer models automating financial document classification and compliance review',
      },
      {
        metric: '40% improvement in advisor productivity',
        value: 'LangGraph agentic workflows for research summarization, document Q&A, and knowledge retrieval',
      },
      {
        metric: '32% reduction in fraud false positive rates',
        value: 'TensorFlow anomaly detection models with automated risk and compliance monitoring integration',
      },
      {
        metric: '40% reduction in model release cycles',
        value: 'Cloud-native MLOps with Docker, Kubernetes, and Azure ML CI/CD automation',
      },
      {
        metric: '35% improvement in LLM response reliability',
        value: 'LLM-as-a-Judge evaluation framework validating outputs against compliance and accuracy standards',
      },
      {
        metric: '38% improvement in model training efficiency',
        value: 'FastAPI data pipelines and Azure Data Factory consolidating data into a unified ML feature store',
      },
    ],
    techStack: [
      'Azure OpenAI',
      'LangChain',
      'LangGraph',
      'Pinecone',
      'HuggingFace Transformers',
      'Azure ML',
      'TensorFlow',
      'Docker',
      'Kubernetes',
      'FastAPI',
      'Azure Data Factory',
      'Python',
      'SQL',
    ],
    relatedProjects: [],
    lessonsLearned:
      'Regulated financial environments surface a different engineering challenge than standard ML: every LLM output needs a compliance audit trail, every model deployment needs a governance approval step, and retrieval pipelines must be explainable to legal and risk teams. The LLM-as-a-Judge evaluation framework was the breakthrough — automating what would otherwise be weeks of manual output review into continuous benchmarks.',
    featured: true,
  },
  {
    id: 'verizon-2020',
    company: 'Verizon',
    title: 'Data Scientist',
    startDate: '2020-03',
    endDate: '2023-11',
    location: 'TX, USA',
    type: 'Full-time',
    summary:
      'Built and deployed production ML systems for Verizon — churn prediction, NLP ticket classification, real-time network telemetry streaming, and personalized recommendation engines — reducing customer attrition risk identification time by 40%, improving upsell conversion by 22%, and cutting monthly ML infrastructure costs by 25%.',
    context:
      "Verizon needed scalable, production-grade ML systems operating on large-scale telecom subscriber data in real time — from churn detection to Kafka-based network telemetry processing to personalized plan recommendations — all deployed on AWS SageMaker with CI/CD automation, drift detection, and KPI visibility for 10+ stakeholder groups.",
    built: [
      'Churn prediction and propensity-to-buy models using XGBoost and LightGBM on large-scale telecom subscriber datasets — reducing time to identify high-risk customers by 40% through automated CI/CD pipelines on AWS SageMaker',
      'BERT-based NLP classification pipelines to categorize high-volume customer support tickets — reducing manual ticket routing time by 35% through CI/CD-enabled model deployment and collaboration with customer operations teams',
      'Collaborative filtering recommendation models using Python and TensorFlow to personalize wireless plan and device offers across customer segments — increasing upsell conversion rates by 22% through feature serving on AWS SageMaker Feature Store',
      'Real-time streaming pipelines using Apache Kafka and Spark Streaming to process high-volume network telemetry — reducing outage response time by 35% while streamlining ETL workflows on AWS through automated CI/CD deployments',
      'Production MLOps workflows using Docker, Git, and AWS SageMaker — reducing model deployment cycles from weeks to days through automated CI/CD for training, validation, drift detection, and retraining',
      'A/B testing and statistical hypothesis testing using Python, SciPy, and StatsModels across churn and recommendation models — improving model performance and campaign targeting effectiveness by 20%',
      'Executive-facing Tableau and Power BI dashboards tracking telecom KPIs across churn, network uptime, and customer satisfaction — automating recurring SQL reporting workflows for 10+ stakeholder groups',
      'AWS SageMaker and Lambda infrastructure cost optimization using spot instance configurations and batch processing strategies — reducing monthly ML infrastructure spend by 25% while maintaining model performance',
    ],
    architecture:
      'AWS-native ML stack: subscriber data ingestion → SageMaker Feature Store → XGBoost/LightGBM churn models + BERT NLP classifier + collaborative filtering recommender → SageMaker batch and real-time endpoints → business downstream APIs. Streaming: Apache Kafka + Spark Streaming → real-time network anomaly alerting. MLOps: Docker CI/CD, SageMaker drift detection, CloudWatch monitoring, automated retraining triggers. Analytics: Tableau/Power BI dashboards over SQL reporting.',
    impact: [
      {
        metric: '40% reduction in time to identify high-risk customers',
        value: 'XGBoost/LightGBM churn prediction on large-scale telecom subscriber data via AWS SageMaker CI/CD',
      },
      {
        metric: '35% reduction in manual ticket routing time',
        value: 'BERT-based NLP classification pipeline deployed with automated CI/CD for high-volume customer support',
      },
      {
        metric: '22% increase in upsell conversion rates',
        value: 'Collaborative filtering recommendation models personalized across wireless plan and device segments',
      },
      {
        metric: '35% reduction in outage response time',
        value: 'Real-time Apache Kafka and Spark Streaming pipeline processing high-volume network telemetry',
      },
      {
        metric: 'Deployment cycles from weeks to days',
        value: 'Production MLOps on AWS SageMaker with automated CI/CD, drift detection, and retraining pipelines',
      },
      {
        metric: '20% improvement in model and campaign performance',
        value: 'A/B testing and statistical hypothesis testing with Python, SciPy, and StatsModels',
      },
      {
        metric: '25% reduction in monthly ML infrastructure spend',
        value: 'AWS SageMaker and Lambda cost optimization via spot instances and batch processing strategies',
      },
    ],
    techStack: [
      'Python',
      'XGBoost',
      'LightGBM',
      'BERT',
      'TensorFlow',
      'Scikit-learn',
      'AWS SageMaker',
      'AWS Lambda',
      'AWS S3',
      'Amazon Kinesis',
      'Apache Kafka',
      'Spark Streaming',
      'Docker',
      'MLflow',
      'SciPy',
      'StatsModels',
      'SQL',
      'Tableau',
      'Power BI',
    ],
    relatedProjects: [],
    lessonsLearned:
      'Large-scale telecom ML taught me that scale fundamentally changes engineering constraints. XGBoost on millions of subscriber records requires careful feature engineering and memory management. Real-time Kafka streaming at network telemetry volume demands intentional partition strategy. The 25% infrastructure cost reduction came from systematically profiling every SageMaker job and shifting batch workloads to spot instances — engineering discipline, not algorithmic cleverness.',
    featured: true,
  },
]
