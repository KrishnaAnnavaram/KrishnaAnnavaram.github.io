// Student research projects mentored at University of North Texas
// DTSC 5082 — Applied Machine Learning Capstone
// Source: student project reports (private — not exposed publicly)

export interface MentorshipProject {
  title: string
  domain: string
  year: string
}

export const mentorshipProjects: MentorshipProject[] = [
  { title: 'Mental Health Prediction Using Advanced Large Language Models', domain: 'Healthcare AI', year: '2024' },
  { title: 'Liver Tumor Segmentation Using Deep Learning', domain: 'Computer Vision', year: '2024' },
  { title: 'Pneumonia Detection and Explainability Using Vision Transformers and LLMs', domain: 'Healthcare AI', year: '2024' },
  { title: 'Twitter / X Sentiment Analysis with Hybrid Models', domain: 'NLP', year: '2024' },
  { title: 'Systematic Literature Review Automation', domain: 'NLP', year: '2024' },
  { title: 'Food Delivery Demand Forecasting and Optimization', domain: 'Predictive Analytics', year: '2024' },
  { title: 'Demand Forecasting and Food Waste Reduction at Gas Stations', domain: 'Predictive Analytics', year: '2024' },
  { title: 'Federated Learning for Privacy-Preserving Healthcare Models', domain: 'Healthcare AI', year: '2024' },
  { title: 'NHTSA Vehicle Safety Analysis and Prediction', domain: 'Predictive Analytics', year: '2024' },
  { title: 'KnowFlow Chatbot Documentation and AI Assistant', domain: 'GenAI', year: '2024' },
  { title: 'Altriva Healthcare Analytics Platform', domain: 'Healthcare AI', year: '2024' },
  { title: 'Enterprise RAG System for Business Knowledge Retrieval', domain: 'RAG / GenAI', year: '2024' },
  { title: 'Enhancing Twitter Sentiment with Contextual Understanding', domain: 'NLP', year: '2024' },
  { title: 'IEEE Conference Paper: Applied ML in Production Systems', domain: 'Research', year: '2024' },
  { title: 'AMARA Healthcare Document Intelligence', domain: 'Healthcare AI', year: '2024' },
  { title: 'Multi-modal Medical Image Analysis', domain: 'Computer Vision', year: '2024' },
  { title: 'Customer Churn Prediction with Explainability', domain: 'Predictive Analytics', year: '2024' },
  { title: 'NLP-based Contract Analysis System', domain: 'NLP', year: '2024' },
  { title: 'Time Series Forecasting for Retail Inventory', domain: 'Predictive Analytics', year: '2024' },
  { title: 'Recommender System with Collaborative Filtering', domain: 'ML Systems', year: '2024' },
  { title: 'Knowledge Graph Construction from Unstructured Text', domain: 'NLP', year: '2024' },
  { title: 'Anomaly Detection in IoT Sensor Data', domain: 'ML Systems', year: '2024' },
  { title: 'Clinical Note Summarization with LLMs', domain: 'Healthcare AI', year: '2024' },
  { title: 'Drug-Drug Interaction Prediction', domain: 'Healthcare AI', year: '2024' },
]

export const mentorshipStats = {
  totalProjects: 80,
  institution: 'University of North Texas',
  course: 'DTSC 5082 — Applied Machine Learning Capstone',
  role: 'Graduate Teaching Assistant',
  period: 'Aug 2024 – Dec 2024',
  domains: [
    'Healthcare AI',
    'NLP & Text Analytics',
    'Computer Vision',
    'Predictive Analytics',
    'RAG & GenAI',
    'ML Systems',
  ],
}
