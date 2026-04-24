export interface Skill {
  name: string
  category: SkillCategory
  level: 'Expert' | 'Advanced' | 'Proficient'
  years: number
  relatedProjects: string[]
}

export type SkillCategory =
  | 'GenAI & LLMs'
  | 'LLM Fine-Tuning'
  | 'Machine Learning'
  | 'Engineering'
  | 'Cloud & DevOps'
  | 'Data & Analytics'
  | 'Applied AI Domains'

export const skills: Skill[] = [
  // ─── GenAI & LLMs ─────────────────────────────────────────────────────────
  { name: 'RAG Systems', category: 'GenAI & LLMs', level: 'Expert', years: 3, relatedProjects: ['cvs-pharmacy-graph-rag', 'morgan-stanley-financial-rag'] },
  { name: 'Graph-RAG', category: 'GenAI & LLMs', level: 'Expert', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'LangGraph', category: 'GenAI & LLMs', level: 'Expert', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag', 'morgan-stanley-financial-rag'] },
  { name: 'Multi-Agent Orchestration', category: 'GenAI & LLMs', level: 'Expert', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'Azure OpenAI (GPT-4o)', category: 'GenAI & LLMs', level: 'Expert', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag', 'morgan-stanley-financial-rag'] },
  { name: 'Prompt Engineering', category: 'GenAI & LLMs', level: 'Expert', years: 4, relatedProjects: ['cvs-pharmacy-graph-rag', 'morgan-stanley-llm-evaluation'] },
  { name: 'Agentic AI (A2A / MCP)', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'Embedding Models', category: 'GenAI & LLMs', level: 'Expert', years: 3, relatedProjects: ['cvs-pharmacy-graph-rag', 'morgan-stanley-financial-rag'] },
  { name: 'LangChain', category: 'GenAI & LLMs', level: 'Advanced', years: 3, relatedProjects: ['cvs-pharmacy-graph-rag', 'morgan-stanley-financial-rag'] },
  { name: 'LangSmith', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'LlamaIndex', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: [] },
  { name: 'LLM Evaluation / LLM-as-a-Judge', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['morgan-stanley-llm-evaluation'] },
  { name: 'Hybrid Dense-Sparse Retrieval', category: 'GenAI & LLMs', level: 'Expert', years: 3, relatedProjects: ['cvs-pharmacy-graph-rag', 'morgan-stanley-financial-rag'] },
  { name: 'Chain-of-Thought / Few-Shot', category: 'GenAI & LLMs', level: 'Expert', years: 3, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'ReAct Agents', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: [] },
  { name: 'Conversational AI Systems', category: 'GenAI & LLMs', level: 'Advanced', years: 3, relatedProjects: [] },
  { name: 'Guardrails / Hallucination Reduction', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag', 'morgan-stanley-llm-evaluation'] },

  // ─── LLM Fine-Tuning ──────────────────────────────────────────────────────
  { name: 'LoRA / QLoRA', category: 'LLM Fine-Tuning', level: 'Expert', years: 3, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'PEFT / Adapter Tuning', category: 'LLM Fine-Tuning', level: 'Expert', years: 3, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'RLHF', category: 'LLM Fine-Tuning', level: 'Advanced', years: 2, relatedProjects: [] },
  { name: 'Instruction Tuning', category: 'LLM Fine-Tuning', level: 'Advanced', years: 2, relatedProjects: [] },
  { name: 'Llama 3', category: 'LLM Fine-Tuning', level: 'Advanced', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'BERT / RoBERTa', category: 'LLM Fine-Tuning', level: 'Expert', years: 4, relatedProjects: ['verizon-churn-prediction'] },
  { name: 'HuggingFace Transformers', category: 'LLM Fine-Tuning', level: 'Expert', years: 4, relatedProjects: ['morgan-stanley-financial-rag'] },

  // ─── Machine Learning ─────────────────────────────────────────────────────
  { name: 'PyTorch', category: 'Machine Learning', level: 'Advanced', years: 5, relatedProjects: [] },
  { name: 'TensorFlow / Keras', category: 'Machine Learning', level: 'Advanced', years: 5, relatedProjects: ['morgan-stanley-llm-evaluation', 'verizon-recommendation-engine'] },
  { name: 'XGBoost / LightGBM', category: 'Machine Learning', level: 'Expert', years: 5, relatedProjects: ['verizon-churn-prediction'] },
  { name: 'Scikit-learn', category: 'Machine Learning', level: 'Expert', years: 6, relatedProjects: ['verizon-churn-prediction', 'verizon-recommendation-engine'] },
  { name: 'Named Entity Recognition', category: 'Machine Learning', level: 'Expert', years: 4, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'Text Classification', category: 'Machine Learning', level: 'Expert', years: 5, relatedProjects: ['verizon-churn-prediction', 'morgan-stanley-financial-rag'] },
  { name: 'Semantic Similarity', category: 'Machine Learning', level: 'Expert', years: 4, relatedProjects: ['cvs-pharmacy-graph-rag', 'morgan-stanley-financial-rag'] },
  { name: 'CNN / RNN / LSTM', category: 'Machine Learning', level: 'Advanced', years: 4, relatedProjects: [] },
  { name: 'Time Series Forecasting', category: 'Machine Learning', level: 'Advanced', years: 3, relatedProjects: [] },
  { name: 'Anomaly Detection', category: 'Machine Learning', level: 'Advanced', years: 3, relatedProjects: ['morgan-stanley-llm-evaluation', 'verizon-network-streaming'] },
  { name: 'Collaborative Filtering', category: 'Machine Learning', level: 'Advanced', years: 3, relatedProjects: ['verizon-recommendation-engine'] },
  { name: 'Explainable AI (SHAP / LIME)', category: 'Machine Learning', level: 'Advanced', years: 2, relatedProjects: [] },
  { name: 'MLflow', category: 'Machine Learning', level: 'Advanced', years: 3, relatedProjects: ['cvs-pharmacy-graph-rag', 'verizon-network-streaming'] },
  { name: 'A/B Testing / Model Monitoring', category: 'Machine Learning', level: 'Advanced', years: 4, relatedProjects: ['verizon-recommendation-engine', 'morgan-stanley-llm-evaluation'] },

  // ─── Engineering ──────────────────────────────────────────────────────────
  { name: 'Python', category: 'Engineering', level: 'Expert', years: 6, relatedProjects: [] },
  { name: 'FastAPI', category: 'Engineering', level: 'Expert', years: 4, relatedProjects: [] },
  { name: 'REST APIs', category: 'Engineering', level: 'Expert', years: 5, relatedProjects: [] },
  { name: 'Docker / Kubernetes', category: 'Engineering', level: 'Advanced', years: 4, relatedProjects: [] },
  { name: 'CI/CD (GitHub Actions / Azure DevOps)', category: 'Engineering', level: 'Advanced', years: 4, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'Terraform', category: 'Engineering', level: 'Advanced', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'Apache Airflow', category: 'Engineering', level: 'Proficient', years: 2, relatedProjects: [] },
  { name: 'SQL / PostgreSQL', category: 'Engineering', level: 'Advanced', years: 5, relatedProjects: [] },

  // ─── Cloud & DevOps ───────────────────────────────────────────────────────
  { name: 'Azure (OpenAI, AKS, ML, AI Search)', category: 'Cloud & DevOps', level: 'Expert', years: 3, relatedProjects: ['cvs-pharmacy-graph-rag', 'morgan-stanley-financial-rag'] },
  { name: 'Azure AI Search', category: 'Cloud & DevOps', level: 'Expert', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'AWS (SageMaker, Lambda, S3, Kinesis)', category: 'Cloud & DevOps', level: 'Advanced', years: 4, relatedProjects: ['verizon-churn-prediction', 'verizon-network-streaming'] },
  { name: 'GCP (Vertex AI, Dataflow)', category: 'Cloud & DevOps', level: 'Advanced', years: 2, relatedProjects: [] },
  { name: 'Neo4j Knowledge Graphs', category: 'Cloud & DevOps', level: 'Expert', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'Pinecone', category: 'Cloud & DevOps', level: 'Expert', years: 3, relatedProjects: ['morgan-stanley-financial-rag'] },
  { name: 'FAISS', category: 'Cloud & DevOps', level: 'Expert', years: 3, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'ChromaDB / Weaviate', category: 'Cloud & DevOps', level: 'Proficient', years: 1, relatedProjects: [] },
  { name: 'Azure Cosmos DB', category: 'Cloud & DevOps', level: 'Advanced', years: 2, relatedProjects: [] },
  { name: 'Azure Data Factory', category: 'Cloud & DevOps', level: 'Advanced', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag', 'morgan-stanley-financial-rag'] },

  // ─── Data & Analytics ─────────────────────────────────────────────────────
  { name: 'Pandas / NumPy / Polars', category: 'Data & Analytics', level: 'Expert', years: 6, relatedProjects: [] },
  { name: 'ETL Pipelines', category: 'Data & Analytics', level: 'Expert', years: 5, relatedProjects: ['cvs-pharmacy-graph-rag', 'morgan-stanley-financial-rag'] },
  { name: 'Feature Engineering', category: 'Data & Analytics', level: 'Expert', years: 5, relatedProjects: ['verizon-churn-prediction', 'verizon-recommendation-engine'] },
  { name: 'Apache Kafka / Spark Streaming', category: 'Data & Analytics', level: 'Advanced', years: 4, relatedProjects: ['verizon-network-streaming'] },
  { name: 'NLTK / spaCy', category: 'Data & Analytics', level: 'Expert', years: 5, relatedProjects: [] },
  { name: 'Tableau / Power BI', category: 'Data & Analytics', level: 'Advanced', years: 4, relatedProjects: ['verizon-churn-prediction'] },
  { name: 'SciPy / StatsModels', category: 'Data & Analytics', level: 'Advanced', years: 4, relatedProjects: ['verizon-churn-prediction', 'verizon-recommendation-engine'] },
  { name: 'MongoDB / DynamoDB', category: 'Data & Analytics', level: 'Proficient', years: 2, relatedProjects: [] },

  // ─── Applied AI Domains ───────────────────────────────────────────────────
  { name: 'Pharmacy & Clinical NLP', category: 'Applied AI Domains', level: 'Expert', years: 3, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'FHIR / EHR Integration', category: 'Applied AI Domains', level: 'Advanced', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'Drug-Interaction Knowledge Graphs', category: 'Applied AI Domains', level: 'Expert', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag'] },
  { name: 'Financial Document Intelligence', category: 'Applied AI Domains', level: 'Advanced', years: 2, relatedProjects: ['morgan-stanley-financial-rag', 'morgan-stanley-llm-evaluation'] },
  { name: 'Telecom ML (Churn / Network)', category: 'Applied AI Domains', level: 'Advanced', years: 4, relatedProjects: ['verizon-churn-prediction', 'verizon-network-streaming'] },
  { name: 'Compliance AI & Governance', category: 'Applied AI Domains', level: 'Advanced', years: 2, relatedProjects: ['morgan-stanley-llm-evaluation'] },
  { name: 'Knowledge Graph Construction', category: 'Applied AI Domains', level: 'Advanced', years: 2, relatedProjects: ['cvs-pharmacy-graph-rag'] },
]

export const skillCategories: SkillCategory[] = [
  'GenAI & LLMs',
  'LLM Fine-Tuning',
  'Machine Learning',
  'Engineering',
  'Cloud & DevOps',
  'Data & Analytics',
  'Applied AI Domains',
]

export const categoryColors: Record<SkillCategory, string> = {
  'GenAI & LLMs': '#6366f1',
  'LLM Fine-Tuning': '#a855f7',
  'Machine Learning': '#8b5cf6',
  'Engineering': '#06b6d4',
  'Cloud & DevOps': '#10b981',
  'Data & Analytics': '#f59e0b',
  'Applied AI Domains': '#ef4444',
}
