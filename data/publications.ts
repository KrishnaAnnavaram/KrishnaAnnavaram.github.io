export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  year: string
  abstract: string
  type: 'Conference' | 'Journal' | 'Workshop' | 'Preprint' | 'Supervised Research'
  doi?: string
  url?: string
  tags: string[]
}

export const publications: Publication[] = [
  // ─── Authored / Co-Authored Papers ────────────────────────────────────────

  {
    id: 'twitter-sentiment-hybrid',
    title: 'Enhancing Twitter Sentiment Analysis using Hybrid Transformer and Sequence Models with Contextual Understanding',
    authors: ['Krishna Annavaram', 'et al.'],
    venue: 'Applied Machine Learning Research',
    year: '2024',
    abstract:
      'Investigates hybrid architectures combining transformer-based models (BERT variants) with sequence models for improved sentiment analysis on social media text. Demonstrates that contextual understanding from transformer encoders combined with sequential patterns captured by LSTM layers achieves superior performance on Twitter sentiment benchmarks versus single-architecture approaches. Introduces a contextual fusion layer that dynamically weights transformer and sequential signals based on linguistic context, enabling the model to handle both long-range semantic dependencies and local sequential patterns.',
    type: 'Conference',
    tags: ['NLP', 'Sentiment Analysis', 'BERT', 'LSTM', 'Hybrid Models', 'Social Media', 'Transformers'],
  },
  {
    id: 'ieee-applied-ml-production',
    title: 'Applied Machine Learning in Production Systems: Lessons from Enterprise AI Deployments',
    authors: ['Krishna Annavaram', 'University of North Texas Research Group'],
    venue: 'IEEE Conference on Applied Machine Learning',
    year: '2024',
    abstract:
      'Documents engineering patterns and architectural decisions distilled from multiple production ML deployments across healthcare, pharma, and enterprise domains. Covers the operational gap between research-grade ML and production AI — specifically: hybrid dense-sparse retrieval design, MLOps infrastructure for 99.9% uptime, PEFT fine-tuning strategies for domain adaptation, and measurement frameworks for evaluating AI impact in regulated production environments. Presents case evidence from Graph-RAG, NER pipelines, and incentive compensation ML systems shipped into live enterprise environments.',
    type: 'Conference',
    tags: ['Production ML', 'MLOps', 'RAG', 'Enterprise AI', 'Applied ML', 'LLM Systems', 'IEEE'],
  },

  // ─── Supervised Research Reports (UNT DTSC 5082 — 2024) ──────────────────
  // Graduate Teaching Assistant, Applied Machine Learning Capstone
  // Full project reports available upon request.

  {
    id: 'mental-health-llm',
    title: 'Mental Health Prediction Using Advanced Large Language Models',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Fine-tuned large language models on annotated mental health discourse datasets to classify and predict mental health states from social media and clinical text. Explored prompt-based classification, PEFT adapter tuning, and zero-shot inference with GPT variants. Achieved strong F1 on PHQ-9 aligned depression screening benchmarks and surfaced model explainability using attention visualization and SHAP attribution.',
    type: 'Supervised Research',
    tags: ['LLMs', 'Mental Health NLP', 'Fine-Tuning', 'PEFT', 'SHAP', 'Text Classification'],
  },
  {
    id: 'liver-tumor-segmentation',
    title: 'Liver Tumor Segmentation Using Deep Learning',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Applied U-Net and attention-gated variants to liver CT scan segmentation for automated tumor boundary delineation. Benchmarked 2D and 3D convolutional architectures against the LiTS dataset. Implemented Dice loss optimization and post-processing morphological operations to improve segmentation boundary precision. Achieved competitive IoU scores on held-out CT volumes, demonstrating clinical-grade segmentation quality on limited labeled data.',
    type: 'Supervised Research',
    tags: ['Computer Vision', 'Medical Image Segmentation', 'U-Net', 'CNN', 'PyTorch', 'CT Scan'],
  },
  {
    id: 'pneumonia-vit-explainability',
    title: 'Pneumonia Detection and Explainability Using Vision Transformers and LLMs',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Implemented Vision Transformer (ViT) models for chest X-ray pneumonia detection, combining image classification with LLM-generated radiology-style explanations. Applied Grad-CAM and LIME for visual explainability of model decisions. Coupled the ViT classifier with a GPT prompt pipeline to generate interpretable clinical rationales for each prediction, addressing the black-box limitation of CNN-based diagnostic AI.',
    type: 'Supervised Research',
    tags: ['Vision Transformers', 'ViT', 'Explainable AI', 'Grad-CAM', 'LIME', 'LLMs', 'Medical Imaging'],
  },
  {
    id: 'twitter-sentiment-contextual',
    title: 'Enhancing Twitter Sentiment with Contextual Understanding',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Extended the published hybrid Transformer-LSTM architecture for Twitter sentiment to cover contextual thread-level analysis, sarcasm detection, and hashtag semantic modeling. Implemented BERTweet fine-tuning on domain-specific social media corpora and evaluated against SemEval-2017 benchmarks. Introduced a thread-context injection layer that improved multi-turn sentiment consistency on nested Twitter conversations.',
    type: 'Supervised Research',
    tags: ['NLP', 'Sentiment Analysis', 'BERTweet', 'Sarcasm Detection', 'BERT', 'Social Media'],
  },
  {
    id: 'systematic-lit-review',
    title: 'Systematic Literature Review Automation',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Built an end-to-end NLP pipeline for automating systematic literature review — spanning paper retrieval, abstract screening, relevance classification, and structured data extraction. Used SPECTER embeddings for semantic similarity filtering, fine-tuned SciBERT for inclusion/exclusion classification, and LangChain to extract PICO (Population, Intervention, Comparison, Outcome) structured fields at scale. Reduced manual screening effort by over 60% on a biomedical review corpus.',
    type: 'Supervised Research',
    tags: ['NLP', 'Information Extraction', 'SciBERT', 'LangChain', 'Literature Review', 'PICO'],
  },
  {
    id: 'food-delivery-forecasting',
    title: 'Food Delivery Demand Forecasting and Optimization',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Developed time series forecasting models for restaurant-level food delivery demand using LSTM, Prophet, and XGBoost with lag features, rolling statistics, and weather/event exogenous variables. Implemented multi-step ahead forecasting at hourly granularity across 50+ restaurant locations. Combined forecasting with route optimization heuristics to minimize delivery latency under demand surge conditions.',
    type: 'Supervised Research',
    tags: ['Time Series', 'LSTM', 'Prophet', 'XGBoost', 'Demand Forecasting', 'Optimization'],
  },
  {
    id: 'food-waste-gas-stations',
    title: 'Demand Forecasting and Food Waste Reduction at Gas Stations',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Applied regression and ensemble time series models (LightGBM, ARIMA) to predict daily perishable food demand at gas station convenience stores. Integrated POS transaction history, seasonal patterns, and local event calendars as features. Demonstrated a 22% simulated reduction in food waste through accurate demand signals enabling just-in-time restocking decisions.',
    type: 'Supervised Research',
    tags: ['Time Series', 'LightGBM', 'ARIMA', 'Demand Forecasting', 'Regression', 'Optimization'],
  },
  {
    id: 'federated-learning-privacy',
    title: 'Federated Learning for Privacy-Preserving Healthcare Models',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Implemented a federated learning framework using PySyft and Flower to train clinical prediction models across simulated hospital nodes without centralizing patient data. Applied differential privacy noise injection (DP-SGD) and secure aggregation to prevent gradient inversion attacks. Benchmarked federated vs. centralized training on EHR classification tasks, quantifying the privacy-accuracy trade-off curve under varying privacy budgets (ε).',
    type: 'Supervised Research',
    tags: ['Federated Learning', 'Differential Privacy', 'EHR', 'Privacy-Preserving ML', 'PySyft', 'DP-SGD'],
  },
  {
    id: 'nhtsa-vehicle-safety',
    title: 'NHTSA Vehicle Safety Analysis and Prediction',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Analyzed NHTSA crash and complaint datasets to build ML models predicting vehicle safety recalls and defect severity. Applied XGBoost classifiers with SHAP feature attribution to identify top mechanical and environmental predictors of safety incidents. Implemented an NLP pipeline using spaCy and BERT to extract structured defect descriptions from unstructured NHTSA complaint text, enabling automated complaint triage and severity scoring.',
    type: 'Supervised Research',
    tags: ['Safety-Critical ML', 'SHAP', 'XGBoost', 'NLP', 'spaCy', 'Predictive Analytics'],
  },
  {
    id: 'knowflow-chatbot',
    title: 'KnowFlow Chatbot Documentation and AI Assistant',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Built a conversational AI assistant over enterprise documentation using RAG — combining document chunking, FAISS vector indexing, and GPT-3.5 generation to answer natural language queries over internal knowledge bases. Implemented intent classification, entity extraction, and multi-turn conversation memory using LangChain ConversationalRetrievalChain. Deployed as a FastAPI service with a React front-end supporting real-time streaming responses.',
    type: 'Supervised Research',
    tags: ['Conversational AI', 'RAG', 'LangChain', 'FAISS', 'Chatbot', 'FastAPI', 'Streaming'],
  },
  {
    id: 'altriva-healthcare-analytics',
    title: 'Altriva Healthcare Analytics Platform',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Designed a full-stack AI analytics platform for patient outcome prediction and clinical workflow optimization. Integrated an XGBoost readmission risk model, an NLP pipeline for clinical note summarization using BART, and a real-time dashboard for risk stratification. Applied SHAP for model explainability, enabling clinical staff to audit prediction drivers. Architected ETL pipelines ingesting FHIR-compatible HL7 data from simulated EHR exports.',
    type: 'Supervised Research',
    tags: ['Clinical Analytics', 'XGBoost', 'BART', 'SHAP', 'FHIR', 'ETL', 'Dashboard'],
  },
  {
    id: 'enterprise-rag-knowledge',
    title: 'Enterprise RAG System for Business Knowledge Retrieval',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Engineered a production-oriented RAG system for enterprise knowledge base retrieval, implementing hybrid BM25 + dense embedding search over internal policy documents, SOPs, and product documentation. Used LangGraph for multi-step retrieval chains, Chroma DB for vector storage, and an LLM evaluation harness (RAGAS) to benchmark answer faithfulness and context relevance. Deployed on Azure with role-based access control limiting document visibility by user group.',
    type: 'Supervised Research',
    tags: ['RAG', 'Enterprise AI', 'BM25', 'LangGraph', 'Chroma DB', 'RAGAS', 'Azure'],
  },
  {
    id: 'multimodal-medical-image',
    title: 'Multi-modal Medical Image Analysis',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Developed a multi-modal AI pipeline fusing radiology images (X-ray, CT) with structured clinical metadata (lab values, vitals) for improved diagnostic classification. Used a dual-encoder architecture — ViT for image features and a tabular MLP for clinical features — fused via cross-attention before final classification. Demonstrated that the multi-modal fusion model consistently outperformed both unimodal baselines, with the largest gains on edge-case pathologies where image signal alone was ambiguous.',
    type: 'Supervised Research',
    tags: ['Multi-modal AI', 'Vision Transformers', 'Cross-Attention', 'Medical Imaging', 'ViT', 'Deep Learning'],
  },
  {
    id: 'churn-prediction-explainability',
    title: 'Customer Churn Prediction with Explainability',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Built an end-to-end churn prediction pipeline for a telecom dataset using LightGBM and logistic regression ensembles, achieving 89% AUC. Implemented SHAP TreeExplainer and LIME for local and global feature attribution, enabling business stakeholders to understand model decisions at the customer level. Designed an automated re-training pipeline with concept drift detection to maintain model freshness on live production distributions.',
    type: 'Supervised Research',
    tags: ['Churn Prediction', 'LightGBM', 'SHAP', 'LIME', 'Explainable AI', 'Concept Drift', 'MLOps'],
  },
  {
    id: 'nlp-contract-analysis',
    title: 'NLP-based Contract Analysis System',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Designed an NLP system for automated legal contract analysis — extracting key clauses (indemnification, termination, SLA), identifying non-standard terms, and flagging risk provisions. Used LegalBERT for named entity recognition and clause classification, combined with a GPT summarization layer for plain-language explanations of complex legal language. Built an efficient document chunking strategy preserving cross-paragraph clause boundaries during retrieval.',
    type: 'Supervised Research',
    tags: ['Document Intelligence', 'LegalBERT', 'NER', 'Contract Analysis', 'NLP', 'Information Extraction'],
  },
  {
    id: 'time-series-retail-inventory',
    title: 'Time Series Forecasting for Retail Inventory',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Applied temporal fusion transformers (TFT) and N-BEATS models to multi-horizon SKU-level inventory demand forecasting for a retail chain. Incorporated external features including promotions, weather, and local event calendars. Benchmarked against ARIMA and Holt-Winters baselines, demonstrating significant RMSE improvements on slow-moving and seasonal SKUs. Implemented automated safety stock recalculation from forecast confidence intervals to minimize stockout risk.',
    type: 'Supervised Research',
    tags: ['Time Series', 'Temporal Fusion Transformer', 'N-BEATS', 'Inventory Forecasting', 'Retail AI'],
  },
  {
    id: 'recommender-collaborative-filtering',
    title: 'Recommender System with Collaborative Filtering',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Implemented a hybrid recommender system combining matrix factorization collaborative filtering (SVD, ALS) with content-based features using TF-IDF item profiles. Applied implicit feedback modeling for click-stream data and implemented Bayesian Personalized Ranking (BPR) for pairwise optimization. Evaluated offline with NDCG@K and Hit Rate@K, achieving competitive performance against LightFM baseline. Extended with a two-stage retrieval-ranking architecture for production-scale user counts.',
    type: 'Supervised Research',
    tags: ['Collaborative Filtering', 'Matrix Factorization', 'Recommender Systems', 'BPR', 'LightFM', 'SVD'],
  },
  {
    id: 'knowledge-graph-nlp',
    title: 'Knowledge Graph Construction from Unstructured Text',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Built an automated pipeline to construct domain knowledge graphs from raw text corpora using transformer-based NER and relation extraction. Applied spaCy, REBEL, and custom fine-tuned BERT models to extract entities and relations, then populated a Neo4j graph database for downstream querying. Demonstrated the knowledge graph quality improvement over naive RAG by benchmarking question-answering over knowledge graph traversal vs. flat vector retrieval on a domain-specific corpus.',
    type: 'Supervised Research',
    tags: ['Knowledge Graphs', 'Neo4j', 'Relation Extraction', 'NER', 'spaCy', 'Graph-RAG', 'Information Extraction'],
  },
  {
    id: 'anomaly-detection-iot',
    title: 'Anomaly Detection in IoT Sensor Data',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Developed unsupervised and semi-supervised anomaly detection pipelines for multivariate IoT sensor time series. Benchmarked Isolation Forest, LSTM Autoencoders, and Variational Autoencoders (VAE) for detecting equipment failure precursors in industrial sensor streams. Implemented sliding window feature extraction and adaptive threshold calibration to minimize false positive rates in operational contexts. Applied SHAP-based attribution to identify which sensor channels drove anomaly scores.',
    type: 'Supervised Research',
    tags: ['Anomaly Detection', 'IoT', 'LSTM Autoencoder', 'Isolation Forest', 'VAE', 'Time Series'],
  },
  {
    id: 'clinical-note-summarization',
    title: 'Clinical Note Summarization with LLMs',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Fine-tuned Long-T5 and BART models on the MeQSum and MIMIC clinical note datasets for abstractive summarization of discharge summaries and nursing notes. Implemented LoRA adapters to reduce fine-tuning compute while preserving summarization quality. Evaluated outputs with ROUGE-L and BERTScore, and conducted human evaluation with clinical annotators for factual consistency. Benchmarked against GPT-4 zero-shot summarization to quantify the value of domain fine-tuning.',
    type: 'Supervised Research',
    tags: ['Clinical NLP', 'Long-T5', 'BART', 'LoRA', 'Summarization', 'MIMIC', 'Fine-Tuning'],
  },
  {
    id: 'twitter-x-sentiment-hybrid',
    title: 'Twitter / X Sentiment Analysis with Hybrid Models',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Built a hybrid sentiment analysis pipeline for Twitter/X data combining TF-IDF and BERT-based representations with an LSTM sequence model for temporal tweet dynamics. Addressed platform-specific challenges including slang, abbreviations, hashtag semantics, and character limits. Evaluated on SemEval sentiment benchmarks and a custom-collected dataset of 50,000+ tweets across political, sports, and consumer brand domains, demonstrating performance gains of the hybrid approach over both standalone BERT and LSTM baselines.',
    type: 'Supervised Research',
    tags: ['NLP', 'Sentiment Analysis', 'BERT', 'LSTM', 'Twitter', 'Hybrid Models', 'TF-IDF'],
  },
  {
    id: 'amara-healthcare-intelligence',
    title: 'AMARA Healthcare Document Intelligence',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Developed AMARA — an AI-powered document intelligence platform for healthcare organizations — combining BioBERT-based NER, LLM-driven summarization, and a RAG-backed question-answering interface over clinical and administrative documents. Implemented entity linking against UMLS ontologies for structured medical concept extraction, and a FHIR-compatible export layer for downstream EHR integration. The system reduced manual clinical document review effort by an estimated 55% on a representative document corpus benchmark.',
    type: 'Supervised Research',
    tags: ['Document Intelligence', 'BioBERT', 'RAG', 'UMLS', 'FHIR', 'Clinical NLP', 'NER'],
  },
    title: 'Drug-Drug Interaction Prediction',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Built a Drug-Drug Interaction (DDI) prediction system using graph neural networks (GNN) on the DrugBank interaction graph and BioBERT-encoded drug embeddings from literature. Combined structural molecular features (SMILES fingerprints) with textual pharmacology descriptions in a multi-modal GNN architecture. Achieved competitive performance on the DDI binary classification benchmark, with an attention mechanism surfacing the molecular sub-structures driving interaction predictions.',
    type: 'Supervised Research',
    tags: ['Drug-Drug Interaction', 'Graph Neural Networks', 'BioBERT', 'Pharma AI', 'Multi-modal', 'DrugBank'],
  },
]
