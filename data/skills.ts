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
  { name: 'RAG Systems', category: 'GenAI & LLMs', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss', 'unt-rag-assistant'] },
  { name: 'Graph-RAG', category: 'GenAI & LLMs', level: 'Expert', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'LangGraph', category: 'GenAI & LLMs', level: 'Expert', years: 2, relatedProjects: ['graphrag-clinical-dss', 'voice-patient-intake', 'unt-rag-assistant'] },
  { name: 'Multi-Agent Orchestration', category: 'GenAI & LLMs', level: 'Expert', years: 2, relatedProjects: ['graphrag-clinical-dss', 'voice-patient-intake'] },
  { name: 'Azure OpenAI (GPT-4o)', category: 'GenAI & LLMs', level: 'Expert', years: 2, relatedProjects: ['graphrag-clinical-dss', 'voice-patient-intake'] },
  { name: 'Prompt Engineering', category: 'GenAI & LLMs', level: 'Expert', years: 4, relatedProjects: ['graphrag-clinical-dss', 'unt-rag-assistant'] },
  { name: 'Agentic AI (A2A / MCP)', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['voice-patient-intake'] },
  { name: 'Embedding Models', category: 'GenAI & LLMs', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss', 'unt-rag-assistant'] },
  { name: 'LangChain', category: 'GenAI & LLMs', level: 'Advanced', years: 3, relatedProjects: ['graphrag-clinical-dss', 'unt-rag-assistant'] },
  { name: 'LangSmith', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'LlamaIndex', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: [] },
  { name: 'LLM Evaluation / LLM-as-a-Judge', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'Hybrid Dense-Sparse Retrieval', category: 'GenAI & LLMs', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss', 'unt-rag-assistant'] },
  { name: 'Chain-of-Thought / Few-Shot', category: 'GenAI & LLMs', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'ReAct Agents', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['voice-patient-intake'] },
  { name: 'Dialogflow CX', category: 'GenAI & LLMs', level: 'Proficient', years: 1, relatedProjects: ['voice-patient-intake'] },
  { name: 'Conversational AI Systems', category: 'GenAI & LLMs', level: 'Advanced', years: 3, relatedProjects: ['voice-patient-intake'] },

  // ─── LLM Fine-Tuning ──────────────────────────────────────────────────────
  { name: 'LoRA / QLoRA', category: 'LLM Fine-Tuning', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'PEFT / Adapter Tuning', category: 'LLM Fine-Tuning', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'RLHF', category: 'LLM Fine-Tuning', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'Instruction Tuning', category: 'LLM Fine-Tuning', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'Long-T5 / BART', category: 'LLM Fine-Tuning', level: 'Expert', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'LLaMA / Mistral', category: 'LLM Fine-Tuning', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'BioBERT / ClinicalBERT', category: 'LLM Fine-Tuning', level: 'Expert', years: 3, relatedProjects: ['biobert-drug-ner'] },
  { name: 'RoBERTa / ALBERT', category: 'LLM Fine-Tuning', level: 'Advanced', years: 3, relatedProjects: ['biobert-drug-ner'] },
  { name: 'HuggingFace Transformers', category: 'LLM Fine-Tuning', level: 'Expert', years: 4, relatedProjects: ['biobert-drug-ner', 'graphrag-clinical-dss'] },

  // ─── Machine Learning ─────────────────────────────────────────────────────
  { name: 'PyTorch', category: 'Machine Learning', level: 'Advanced', years: 5, relatedProjects: ['biobert-drug-ner'] },
  { name: 'TensorFlow / Keras', category: 'Machine Learning', level: 'Advanced', years: 4, relatedProjects: ['biobert-drug-ner'] },
  { name: 'XGBoost / LightGBM', category: 'Machine Learning', level: 'Expert', years: 5, relatedProjects: ['incentive-ml-platform', 'job-recommendation-engine'] },
  { name: 'Scikit-learn', category: 'Machine Learning', level: 'Expert', years: 6, relatedProjects: ['job-recommendation-engine', 'incentive-ml-platform'] },
  { name: 'Named Entity Recognition', category: 'Machine Learning', level: 'Expert', years: 4, relatedProjects: ['biobert-drug-ner'] },
  { name: 'Text Classification', category: 'Machine Learning', level: 'Expert', years: 5, relatedProjects: ['biobert-drug-ner', 'job-recommendation-engine'] },
  { name: 'Semantic Similarity', category: 'Machine Learning', level: 'Expert', years: 4, relatedProjects: ['graphrag-clinical-dss', 'unt-rag-assistant', 'job-recommendation-engine'] },
  { name: 'Vision Transformers (ViT)', category: 'Machine Learning', level: 'Proficient', years: 1, relatedProjects: [] },
  { name: 'CNN / RNN / LSTM', category: 'Machine Learning', level: 'Advanced', years: 4, relatedProjects: ['biobert-drug-ner'] },
  { name: 'Graph Neural Networks', category: 'Machine Learning', level: 'Proficient', years: 1, relatedProjects: [] },
  { name: 'Time Series Forecasting', category: 'Machine Learning', level: 'Advanced', years: 3, relatedProjects: ['incentive-ml-platform'] },
  { name: 'Anomaly Detection', category: 'Machine Learning', level: 'Advanced', years: 2, relatedProjects: [] },
  { name: 'Collaborative Filtering', category: 'Machine Learning', level: 'Advanced', years: 2, relatedProjects: ['job-recommendation-engine'] },
  { name: 'Federated Learning', category: 'Machine Learning', level: 'Proficient', years: 1, relatedProjects: [] },
  { name: 'Explainable AI (SHAP / LIME)', category: 'Machine Learning', level: 'Advanced', years: 2, relatedProjects: [] },
  { name: 'MLflow', category: 'Machine Learning', level: 'Advanced', years: 3, relatedProjects: ['biobert-drug-ner', 'incentive-ml-platform'] },
  { name: 'A/B Testing / Model Monitoring', category: 'Machine Learning', level: 'Advanced', years: 3, relatedProjects: ['incentive-ml-platform'] },

  // ─── Engineering ──────────────────────────────────────────────────────────
  { name: 'Python', category: 'Engineering', level: 'Expert', years: 6, relatedProjects: [] },
  { name: 'FastAPI', category: 'Engineering', level: 'Expert', years: 4, relatedProjects: [] },
  { name: 'REST APIs', category: 'Engineering', level: 'Expert', years: 5, relatedProjects: [] },
  { name: 'Docker / Kubernetes', category: 'Engineering', level: 'Advanced', years: 4, relatedProjects: [] },
  { name: 'CI/CD (GitHub Actions)', category: 'Engineering', level: 'Advanced', years: 3, relatedProjects: ['incentive-ml-platform'] },
  { name: 'Terraform', category: 'Engineering', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'Airflow / Kubeflow', category: 'Engineering', level: 'Proficient', years: 2, relatedProjects: [] },
  { name: 'SQL / PostgreSQL', category: 'Engineering', level: 'Advanced', years: 5, relatedProjects: [] },

  // ─── Cloud & DevOps ───────────────────────────────────────────────────────
  { name: 'Azure (OpenAI, AKS, ML, AI Search)', category: 'Cloud & DevOps', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'Azure AI Search', category: 'Cloud & DevOps', level: 'Expert', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'AWS (SageMaker, Lambda, S3, Kinesis)', category: 'Cloud & DevOps', level: 'Advanced', years: 4, relatedProjects: [] },
  { name: 'GCP (Vertex AI, Dataflow)', category: 'Cloud & DevOps', level: 'Advanced', years: 2, relatedProjects: ['biobert-drug-ner'] },
  { name: 'Neo4j Knowledge Graphs', category: 'Cloud & DevOps', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'FAISS / Pinecone / Milvus', category: 'Cloud & DevOps', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss', 'unt-rag-assistant'] },
  { name: 'Chroma DB / Weaviate', category: 'Cloud & DevOps', level: 'Proficient', years: 1, relatedProjects: [] },
  { name: 'Redis Semantic Cache', category: 'Cloud & DevOps', level: 'Advanced', years: 3, relatedProjects: ['unt-rag-assistant'] },
  { name: 'Cosmos DB', category: 'Cloud & DevOps', level: 'Advanced', years: 2, relatedProjects: ['voice-patient-intake'] },
  { name: 'Azure Databricks', category: 'Cloud & DevOps', level: 'Proficient', years: 1, relatedProjects: [] },

  // ─── Data & Analytics ─────────────────────────────────────────────────────
  { name: 'Pandas / NumPy / Polars', category: 'Data & Analytics', level: 'Expert', years: 6, relatedProjects: [] },
  { name: 'ETL Pipelines', category: 'Data & Analytics', level: 'Expert', years: 5, relatedProjects: ['biobert-drug-ner', 'incentive-ml-platform'] },
  { name: 'Feature Engineering', category: 'Data & Analytics', level: 'Expert', years: 5, relatedProjects: ['job-recommendation-engine'] },
  { name: 'BigQuery / GCP Dataflow', category: 'Data & Analytics', level: 'Advanced', years: 2, relatedProjects: ['biobert-drug-ner'] },
  { name: 'Apache Kafka / Spark Streaming', category: 'Data & Analytics', level: 'Advanced', years: 4, relatedProjects: [] },
  { name: 'NLTK / spaCy', category: 'Data & Analytics', level: 'Expert', years: 5, relatedProjects: ['biobert-drug-ner'] },
  { name: 'Tableau / Power BI', category: 'Data & Analytics', level: 'Advanced', years: 4, relatedProjects: [] },
  { name: 'SciPy / StatsModels', category: 'Data & Analytics', level: 'Advanced', years: 4, relatedProjects: [] },
  { name: 'MongoDB / DynamoDB', category: 'Data & Analytics', level: 'Proficient', years: 2, relatedProjects: [] },

  // ─── Applied AI Domains ───────────────────────────────────────────────────
  { name: 'Clinical NLP (BioBERT)', category: 'Applied AI Domains', level: 'Expert', years: 3, relatedProjects: ['biobert-drug-ner', 'graphrag-clinical-dss'] },
  { name: 'FHIR / EHR Integration', category: 'Applied AI Domains', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss', 'voice-patient-intake'] },
  { name: 'Medical Summarization (LoRA)', category: 'Applied AI Domains', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'Medical Image Segmentation', category: 'Applied AI Domains', level: 'Proficient', years: 1, relatedProjects: [] },
  { name: 'Drug NER & Adverse Events', category: 'Applied AI Domains', level: 'Expert', years: 2, relatedProjects: ['biobert-drug-ner'] },
  { name: 'Drug-Drug Interaction (DDI)', category: 'Applied AI Domains', level: 'Proficient', years: 1, relatedProjects: [] },
  { name: 'Document Intelligence NLP', category: 'Applied AI Domains', level: 'Advanced', years: 3, relatedProjects: ['biobert-drug-ner', 'incentive-ml-platform'] },
  { name: 'Knowledge Graph Construction', category: 'Applied AI Domains', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
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
