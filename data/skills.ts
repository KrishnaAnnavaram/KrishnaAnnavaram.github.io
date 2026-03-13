export interface Skill {
  name: string
  category: SkillCategory
  level: 'Expert' | 'Advanced' | 'Proficient'
  years: number
  relatedProjects: string[]
}

export type SkillCategory =
  | 'GenAI & LLMs'
  | 'Machine Learning'
  | 'Engineering'
  | 'Cloud & DevOps'
  | 'Data & Analytics'
  | 'Healthcare AI'

export const skills: Skill[] = [
  // GenAI & LLMs
  { name: 'RAG Systems', category: 'GenAI & LLMs', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss', 'unt-rag-assistant'] },
  { name: 'Graph-RAG', category: 'GenAI & LLMs', level: 'Expert', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'LangGraph', category: 'GenAI & LLMs', level: 'Expert', years: 2, relatedProjects: ['graphrag-clinical-dss', 'voice-patient-intake', 'unt-rag-assistant'] },
  { name: 'Multi-Agent Orchestration', category: 'GenAI & LLMs', level: 'Expert', years: 2, relatedProjects: ['graphrag-clinical-dss', 'voice-patient-intake'] },
  { name: 'Azure OpenAI (GPT-4o)', category: 'GenAI & LLMs', level: 'Expert', years: 2, relatedProjects: ['graphrag-clinical-dss', 'voice-patient-intake'] },
  { name: 'Prompt Engineering', category: 'GenAI & LLMs', level: 'Expert', years: 4, relatedProjects: ['graphrag-clinical-dss', 'unt-rag-assistant'] },
  { name: 'Agentic AI (A2A/MCP)', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['voice-patient-intake'] },
  { name: 'Embedding Models', category: 'GenAI & LLMs', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss', 'unt-rag-assistant'] },
  { name: 'LangChain', category: 'GenAI & LLMs', level: 'Advanced', years: 3, relatedProjects: ['graphrag-clinical-dss', 'unt-rag-assistant'] },
  { name: 'LLM Evaluation', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss'] },

  // Machine Learning
  { name: 'LLM Fine-Tuning (LoRA/PEFT)', category: 'Machine Learning', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'BioBERT / ClinicalBERT', category: 'Machine Learning', level: 'Expert', years: 3, relatedProjects: ['biobert-drug-ner'] },
  { name: 'BERT / Transformers', category: 'Machine Learning', level: 'Expert', years: 5, relatedProjects: ['biobert-drug-ner', 'unt-rag-assistant'] },
  { name: 'PyTorch', category: 'Machine Learning', level: 'Advanced', years: 5, relatedProjects: ['biobert-drug-ner'] },
  { name: 'Named Entity Recognition', category: 'Machine Learning', level: 'Expert', years: 4, relatedProjects: ['biobert-drug-ner'] },
  { name: 'Semantic Search', category: 'Machine Learning', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss', 'unt-rag-assistant'] },
  { name: 'XGBoost / scikit-learn', category: 'Machine Learning', level: 'Expert', years: 5, relatedProjects: ['incentive-ml-platform', 'job-recommendation-engine'] },
  { name: 'MLflow', category: 'Machine Learning', level: 'Advanced', years: 3, relatedProjects: ['biobert-drug-ner', 'incentive-ml-platform'] },

  // Engineering
  { name: 'Python', category: 'Engineering', level: 'Expert', years: 6, relatedProjects: [] },
  { name: 'FastAPI', category: 'Engineering', level: 'Expert', years: 4, relatedProjects: [] },
  { name: 'REST APIs', category: 'Engineering', level: 'Expert', years: 5, relatedProjects: [] },
  { name: 'Docker / Kubernetes', category: 'Engineering', level: 'Advanced', years: 4, relatedProjects: [] },
  { name: 'CI/CD (GitHub Actions)', category: 'Engineering', level: 'Advanced', years: 3, relatedProjects: ['incentive-ml-platform'] },
  { name: 'SQL / PostgreSQL', category: 'Engineering', level: 'Advanced', years: 5, relatedProjects: [] },
  { name: 'Terraform', category: 'Engineering', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss'] },

  // Cloud & DevOps
  { name: 'Azure (OpenAI, AKS, ML)', category: 'Cloud & DevOps', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss', 'voice-patient-intake'] },
  { name: 'AWS (SageMaker, Lambda, S3)', category: 'Cloud & DevOps', level: 'Advanced', years: 3, relatedProjects: ['incentive-ml-platform'] },
  { name: 'GCP (Vertex AI, Dataflow)', category: 'Cloud & DevOps', level: 'Advanced', years: 2, relatedProjects: ['biobert-drug-ner'] },
  { name: 'Neo4j Knowledge Graphs', category: 'Cloud & DevOps', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'FAISS / Pinecone / Milvus', category: 'Cloud & DevOps', level: 'Expert', years: 3, relatedProjects: ['graphrag-clinical-dss', 'unt-rag-assistant'] },
  { name: 'Redis Semantic Cache', category: 'Cloud & DevOps', level: 'Advanced', years: 3, relatedProjects: ['unt-rag-assistant'] },
  { name: 'Cosmos DB', category: 'Cloud & DevOps', level: 'Advanced', years: 2, relatedProjects: ['voice-patient-intake'] },

  // Data & Analytics
  { name: 'Pandas / NumPy / Polars', category: 'Data & Analytics', level: 'Expert', years: 6, relatedProjects: [] },
  { name: 'ETL Pipelines', category: 'Data & Analytics', level: 'Expert', years: 5, relatedProjects: ['biobert-drug-ner', 'incentive-ml-platform'] },
  { name: 'Feature Engineering', category: 'Data & Analytics', level: 'Expert', years: 5, relatedProjects: ['job-recommendation-engine'] },
  { name: 'BigQuery / GCP Dataflow', category: 'Data & Analytics', level: 'Advanced', years: 2, relatedProjects: ['biobert-drug-ner'] },
  { name: 'NLTK / spaCy', category: 'Data & Analytics', level: 'Expert', years: 5, relatedProjects: ['biobert-drug-ner', 'job-recommendation-engine', 'incentive-ml-platform'] },

  // Healthcare AI
  { name: 'Clinical NLP (BioBERT)', category: 'Healthcare AI', level: 'Expert', years: 3, relatedProjects: ['biobert-drug-ner', 'graphrag-clinical-dss'] },
  { name: 'FHIR / EHR Integration', category: 'Healthcare AI', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss', 'voice-patient-intake'] },
  { name: 'Medical Summarization (LoRA)', category: 'Healthcare AI', level: 'Advanced', years: 2, relatedProjects: ['graphrag-clinical-dss'] },
  { name: 'Privacy-Aware ML (HIPAA)', category: 'Healthcare AI', level: 'Advanced', years: 3, relatedProjects: ['graphrag-clinical-dss', 'voice-patient-intake'] },
  { name: 'Drug NER & Adverse Events', category: 'Healthcare AI', level: 'Expert', years: 2, relatedProjects: ['biobert-drug-ner'] },
]

export const skillCategories: SkillCategory[] = [
  'GenAI & LLMs',
  'Machine Learning',
  'Engineering',
  'Cloud & DevOps',
  'Data & Analytics',
  'Healthcare AI',
]

export const categoryColors: Record<SkillCategory, string> = {
  'GenAI & LLMs': '#6366f1',
  'Machine Learning': '#8b5cf6',
  'Engineering': '#06b6d4',
  'Cloud & DevOps': '#10b981',
  'Data & Analytics': '#f59e0b',
  'Healthcare AI': '#ef4444',
}
