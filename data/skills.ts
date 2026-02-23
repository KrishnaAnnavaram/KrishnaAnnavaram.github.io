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
  { name: 'RAG Systems', category: 'GenAI & LLMs', level: 'Expert', years: 3, relatedProjects: ['production-rag-system'] },
  { name: 'Prompt Engineering', category: 'GenAI & LLMs', level: 'Expert', years: 4, relatedProjects: ['production-rag-system', 'agentic-pipeline'] },
  { name: 'Agentic AI', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['agentic-pipeline'] },
  { name: 'LangChain', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['production-rag-system'] },
  { name: 'Claude / GPT API', category: 'GenAI & LLMs', level: 'Expert', years: 3, relatedProjects: ['production-rag-system', 'agentic-pipeline'] },
  { name: 'Embedding Models', category: 'GenAI & LLMs', level: 'Expert', years: 3, relatedProjects: ['production-rag-system'] },
  { name: 'LLM Evaluation', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['production-rag-system'] },
  { name: 'Context Optimization', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['production-rag-system'] },
  { name: 'Hallucination Mitigation', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['production-rag-system'] },
  { name: 'Function Calling', category: 'GenAI & LLMs', level: 'Advanced', years: 2, relatedProjects: ['agentic-pipeline'] },

  // Machine Learning
  { name: 'BERT / Transformers', category: 'Machine Learning', level: 'Expert', years: 4, relatedProjects: ['healthcare-nlp', 'document-intelligence'] },
  { name: 'PyTorch', category: 'Machine Learning', level: 'Advanced', years: 4, relatedProjects: ['healthcare-nlp'] },
  { name: 'Fine-tuning LLMs', category: 'Machine Learning', level: 'Advanced', years: 2, relatedProjects: ['healthcare-nlp'] },
  { name: 'Text Classification', category: 'Machine Learning', level: 'Expert', years: 5, relatedProjects: ['document-intelligence'] },
  { name: 'Named Entity Recognition', category: 'Machine Learning', level: 'Expert', years: 4, relatedProjects: ['healthcare-nlp'] },
  { name: 'Semantic Search', category: 'Machine Learning', level: 'Expert', years: 3, relatedProjects: ['production-rag-system'] },
  { name: 'Scikit-learn', category: 'Machine Learning', level: 'Expert', years: 5, relatedProjects: [] },
  { name: 'MLflow', category: 'Machine Learning', level: 'Advanced', years: 3, relatedProjects: [] },

  // Engineering
  { name: 'Python', category: 'Engineering', level: 'Expert', years: 6, relatedProjects: [] },
  { name: 'FastAPI', category: 'Engineering', level: 'Expert', years: 4, relatedProjects: [] },
  { name: 'REST APIs', category: 'Engineering', level: 'Expert', years: 5, relatedProjects: [] },
  { name: 'Microservices', category: 'Engineering', level: 'Advanced', years: 3, relatedProjects: [] },
  { name: 'SQL / PostgreSQL', category: 'Engineering', level: 'Advanced', years: 5, relatedProjects: [] },
  { name: 'Docker', category: 'Engineering', level: 'Advanced', years: 4, relatedProjects: [] },
  { name: 'CI/CD', category: 'Engineering', level: 'Advanced', years: 3, relatedProjects: [] },

  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud & DevOps', level: 'Advanced', years: 3, relatedProjects: [] },
  { name: 'GCP', category: 'Cloud & DevOps', level: 'Proficient', years: 2, relatedProjects: [] },
  { name: 'Azure', category: 'Cloud & DevOps', level: 'Proficient', years: 2, relatedProjects: [] },
  { name: 'Pinecone', category: 'Cloud & DevOps', level: 'Advanced', years: 2, relatedProjects: ['production-rag-system'] },
  { name: 'Redis', category: 'Cloud & DevOps', level: 'Advanced', years: 3, relatedProjects: [] },
  { name: 'Monitoring & Logging', category: 'Cloud & DevOps', level: 'Advanced', years: 4, relatedProjects: [] },

  // Data & Analytics
  { name: 'Pandas / NumPy', category: 'Data & Analytics', level: 'Expert', years: 6, relatedProjects: [] },
  { name: 'ETL Pipelines', category: 'Data & Analytics', level: 'Expert', years: 5, relatedProjects: [] },
  { name: 'Feature Engineering', category: 'Data & Analytics', level: 'Expert', years: 5, relatedProjects: [] },
  { name: 'Data Visualization', category: 'Data & Analytics', level: 'Advanced', years: 4, relatedProjects: [] },
  { name: 'Statistical Analysis', category: 'Data & Analytics', level: 'Advanced', years: 5, relatedProjects: [] },

  // Healthcare AI
  { name: 'Healthcare NLP', category: 'Healthcare AI', level: 'Expert', years: 3, relatedProjects: ['healthcare-nlp'] },
  { name: 'Clinical Document AI', category: 'Healthcare AI', level: 'Advanced', years: 3, relatedProjects: ['healthcare-nlp', 'document-intelligence'] },
  { name: 'Privacy-Aware ML', category: 'Healthcare AI', level: 'Advanced', years: 3, relatedProjects: ['healthcare-nlp'] },
  { name: 'Medical Summarization', category: 'Healthcare AI', level: 'Advanced', years: 2, relatedProjects: ['healthcare-nlp'] },
  { name: 'SAP Integration', category: 'Healthcare AI', level: 'Advanced', years: 1, relatedProjects: ['enterprise-ml'] },
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
