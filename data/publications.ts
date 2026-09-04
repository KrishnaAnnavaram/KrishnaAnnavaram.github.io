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

/**
 * Research output. Every entry here is backed by a report PDF committed under
 * `public/reports/` — entries without a retrievable artefact were removed.
 * "Supervised Research" = graduate project work mentored during the UNT
 * teaching assistantship; "Conference" = co-authored submissions.
 */
export const publications: Publication[] = [
  {
    id: 'twitter-sentiment-hybrid',
    title: 'Enhancing Twitter Sentiment Analysis using Hybrid Transformer and Sequence Models with Contextual Understanding',
    authors: ['Vashista Reddy Pisati', 'Anjanasree Erukala', 'Manisha Ganggamreddypally', 'Ravi Varma Kumar Bevara', 'Krishna Annavaram', 'Dr. Stephen Wheeler'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Investigates hybrid architectures combining transformer-based models (BERT variants) with sequence models for improved sentiment analysis on social media text. Demonstrates that contextual understanding from transformer encoders combined with sequential patterns captured by LSTM layers achieves superior performance on Twitter sentiment benchmarks versus single-architecture approaches. Introduces a contextual fusion layer that dynamically weights transformer and sequential signals based on linguistic context, enabling the model to handle both long-range semantic dependencies and local sequential patterns.',
    type: 'Conference',
    url: '/reports/Enhancing_Twitter_Sentiment_Analysis_using_Hybrid_Transformer_and_Sequence_Models_with_Contextual_Understanding.pdf',
    tags: ['NLP', 'Sentiment Analysis', 'BERT', 'LSTM', 'Hybrid Models', 'Social Media', 'Transformers'],
  },
  {
    id: 'blood-cell-cancer-stacking',
    title: 'Blood Cell Cancer Detection Using Stacking Mechanism',
    authors: ['Aiswarya Goriparthi', 'Bala Phaneendra Pothuri', 'Vijay Venkatrao Goparaju', 'Ravi Varma Kumar Bevara', 'Krishna Annavaram', 'Stephen Wheeler'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'The research project focuses on blood cell image classification accuracy to facilitate immediate diagnosis of blood cell diseases. The blood cell image categorization depended on a deep learning stacking ensemble combining VGG19 and DenseNet201 with ResNet50, InceptionV3, Vision Transformers, EfficientNetB3, and Swin Transformers. The dataset contains 5,000 images displaying Basophil, Erythroblast, Monocyte, Myeloblast, and Neutrophil blood cells with extensive data augmentation on 10,000 images. The combination of ensemble learning through stacking with meta-classification produced strong classification results on hematological disorder detection.',
    type: 'Conference',
    url: '/reports/DTSC5082.020_Group1_Project_Demo.pdf',
    tags: ['Medical Imaging', 'Blood Cell Classification', 'Stacking Ensemble', 'VGG19', 'DenseNet', 'Vision Transformers', 'Deep Learning'],
  },
  {
    id: 'weather-traffic-sign-recognition',
    title: 'Weather Aware Traffic Sign Recognition System',
    authors: ['Sai Vaishnavi Govindula', 'Sai Bhargav Dasaraju', 'Sai Rakesh Reddy Anumula', 'Ravi Varma Kumar Bevara', 'Krishna Annavaram', 'Stephen F. Wheeler'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Addresses the immense challenges autonomous vehicles face due to adverse weather conditions dramatically decreasing the precision and dependability of traffic sign recognition systems. Develops a mixed model that combines OpenWeatherMap API real-time weather data with the GTSRB dataset visual data. Implements Convolutional Neural Networks (CNN) and Dense Neural Networks (DNN) for processing weather and image data. Applied augmentation alongside simulation of real-world conditions including synthetic weather effects (fog, rain, and glare) to improve robustness of traffic sign detection under varying environmental conditions.',
    type: 'Conference',
    url: '/reports/5082FinalReport.pdf',
    tags: ['Autonomous Vehicles', 'Traffic Sign Recognition', 'CNN', 'Weather Awareness', 'Computer Vision', 'GTSRB', 'Deep Learning'],
  },
  {
    id: 'retail-sales-prediction-ml',
    title: 'An Enhanced Machine Learning Model for Prediction of Retail Sales',
    authors: ['Sneha Annamareddy', 'Saipradeep Bomma', 'Neha Reddy Kolan', 'Ravi Varma Kumar Bevara', 'Krishna Annavaram', 'Stephen F. Wheeler'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Addresses accurate sales forecasting as a critical aspect in retailing affecting supply chain efficiency, inventory management, and marketing strategies. Employs a double modeling strategy across two distinct datasets (Big Mart and Walmart): classical regression models (Linear Regression, Polynomial Regression, Random Forest, Decision Tree, XGBoost) for non-temporal data, and a hybrid LSTM-XGBoost forecasting framework for multi-year weekly sales. The hybrid approach effectively captures both long-term dependencies and structured feature interactions, delivering significant improvements in forecast accuracy over single-model baselines.',
    type: 'Conference',
    url: '/reports/5082_Final_Report_Group_7.pdf',
    tags: ['Retail Analytics', 'Sales Forecasting', 'LSTM', 'XGBoost', 'Time Series', 'Regression', 'Hybrid Models'],
  },
  {
    id: 'toxifix-comment-moderation-rlhf',
    title: 'Toxifix: Automating Emotionally Intelligent Comment Moderation with Reinforcement Learning from Human Feedback',
    authors: ['Jahnavi Chintakindi', 'Poojitha Ganta', 'Ravi Varma Kumar Bevara', 'Krishna Annavaram', 'Stephen F. Wheeler'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Addresses the alarming rise in toxic interactions including cyberbullying and harassment on digital platforms. Using psychological and social theories, develops a comprehensive definition of toxicity and a sophisticated classifier for discerning toxic interactions within social networks. Employs Reinforcement Learning from Human Feedback (RLHF) to create an emotionally intelligent moderation system that adapts to the complex, context-dependent nature of online toxicity. The system demonstrates robust performance across diverse online communities and platforms.',
    type: 'Conference',
    url: '/reports/5082_Group21_Final_Project_Report_Latest.pdf',
    tags: ['Content Moderation', 'RLHF', 'Toxicity Detection', 'Cyberbullying', 'NLP', 'Reinforcement Learning', 'Social Media'],
  },
  {
    id: 'vit-hiera-skin-cancer-classification',
    title: 'Comparing Vision Transformers (ViT) and Hiera Transformers for Skin Cancer Classification',
    authors: ['Murali Krishna Mokkapati', 'Leela Gopala Bharath Kumar Challagulla', 'Ravi Varma Kumar Bevara', 'Krishna Annavaram', 'Stephen F. Wheeler'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Evaluates the performance of Vision Transformers (ViT) alongside Hiera Transformers for identifying skin cancer from dermatological images. Early skin cancer detection serves as a fundamental factor for achieving positive patient outcomes. The research implements HAM10000 dataset testing on both models measuring accuracy, training time, and memory usage to establish practical viability for medical imaging applications. Hiera Transformers present a less computationally demanding solution that retains promising classification results compared to standard ViT architectures.',
    type: 'Conference',
    url: '/reports/DTSC5082.401_Group15_Project_Report.pdf',
    tags: ['Medical Imaging', 'Vision Transformers', 'Hiera Transformers', 'Skin Cancer', 'HAM10000', 'Classification', 'Healthcare AI'],
  },
  {
    id: 'cloud-cost-estimation-llm',
    title: 'Automated Cloud Cost Estimation Using Large Language Models',
    authors: ['Sri Ambica Sangineedi', 'Pranav Naadh Bayya', 'Vijaya Rama Reddy Mallidi', 'Ravi Kumar Bevara', 'Krishna Annavaram', 'Stephen Wheeler'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Introduces automatic cloud cost estimation leveraging Large Language Models (LLMs) for parsing project requirement descriptions and producing accurate estimates of cloud service costs across major service providers. Leverages an LLM to understand essential requirements from unstructured documents and defines a mapping between requirements and suitable cloud resources. Implements hybrid search to extract prices from a curated knowledge base of Amazon Web Services (AWS), Microsoft Azure, and GCP services, enabling accurate and automated cloud infrastructure cost planning.',
    type: 'Conference',
    url: '/reports/DTSC5082.401_Group18_Final Project Report.pdf',
    tags: ['Cloud Computing', 'LLMs', 'Cost Estimation', 'AWS', 'Azure', 'GCP', 'RAG', 'Applied AI'],
  },
  {
    id: 'paddy-disease-multimodal-weather',
    title: 'Weather-Aware Paddy Disease Detection Using Multimodal Deep Learning',
    authors: ['Anoohya Alivelu Bhaskarla', 'Vyshnavi Annamaneni', 'Achyuth Kumar Miryala', 'Ravi Varma Kumar Bevara', 'Krishna Annavaram'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Proposes a multimodal deep learning framework for paddy disease detection that incorporates weather data (temperature, humidity, rainfall) alongside paddock images to improve crop disease prediction. The architecture integrates EfficientNetV2L for visual feature extraction with weather data fusion to address the challenge that CNN-based classification systems face when ignoring environmental factors affecting disease prevalence. Demonstrates improved accuracy in identifying paddy diseases under varying environmental conditions, contributing to food security through better crop health management.',
    type: 'Conference',
    url: '/reports/DTSC5082.401_Group19_Project_FinalReport.pdf',
    tags: ['Agriculture AI', 'Plant Disease Detection', 'EfficientNet', 'Multimodal Deep Learning', 'Weather Awareness', 'Computer Vision'],
  },
  {
    id: 'emotion-classification-llm-youtube',
    title: 'Emotion Classification Using Large Language Models: A Comparative Study with Real-World Inference on YouTube Comments',
    authors: ['Irfan Ahmed Shaik', 'Varun Kumar Atkuri', 'Stephen Wheeler', 'Ravi Varma Kumar Bevara', 'Krishna Annavaram'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Discusses the capacity of large language models (LLMs) to detect emotions in textual content through real-world YouTube comments. Assesses how Mistral 7B and LLaMA 3.1 8B perform under zero-shot, few-shot, and fine-tuned learning settings. A labeled dataset from Kaggle was used to train and evaluate models on six classes of emotions: joy, sadness, anger, fear, love, and surprise. QLoRA and LoRA were employed during fine-tuning for compute-efficient adaptation, providing comprehensive insights into LLM emotion detection capabilities on user-generated content.',
    type: 'Conference',
    url: '/reports/DTSC5082.401_Group8_Final_Report.pdf',
    tags: ['Emotion Recognition', 'LLMs', 'Mistral 7B', 'LLaMA', 'QLoRA', 'YouTube', 'Text Classification'],
  },
  {
    id: 'digital-shift-book-publishing-libraries',
    title: 'The Digital Shift: Analyzing Trends in Book Publishing and Library Visits',
    authors: ['Harsh Chavva', 'Nandini Gunda', 'Anusha Pogaku', 'Stephen Wheeler', 'Ravi Varma Kumar Bevara', 'Krishna Annavaram'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Examines the changing role of public libraries amid increasing online publishing platforms, with a narrowed scope focusing on circulation trends within Texas. Investigates whether digital platforms popularizing mainstream content at the expense of creative innovation mirror patterns found in the rise of digital reading content and in-person library visitation. Employs data analysis and ML models to identify trends and correlations between digital publishing growth and library visit patterns, providing insights into the evolving information ecosystem.',
    type: 'Conference',
    url: '/reports/DTSC5082_401_Group9_FinalReport-1.pdf',
    tags: ['Data Analysis', 'Digital Publishing', 'Library Analytics', 'Trend Analysis', 'Text Mining', 'Social Science AI'],
  },
  {
    id: 'lstm-attention-interior-point-optimization',
    title: 'Integrating LSTMs and Self-Attention in Interior Point Methods for Nonlinear Optimization',
    authors: ['Balaviswanath Gudimetla', 'Chandana Vemula', 'Ravi Kumar Bevara', 'Krishna Annavaram', 'Stephen Wheeler'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Enhances the IPM-LSTM model by adding a self-attention mechanism to improve search direction approximations within interior point approaches for constrained nonlinear optimization. The new model is evaluated against IPOPT on Quadratic Programs (QPs) involving right-hand-side constraints as well as convex and nonconvex Quadratically Constrained QPs. In the case of RHS-constrained QPs, the new model cuts solver iterations by 1.9% and solve duration by 6.5%, demonstrating that integrating attention mechanisms into optimization solvers yields measurable improvements in convergence speed.',
    type: 'Conference',
    url: '/reports/DTSC_5082_401_GROUP12_FINAL_PROJECT_REPORT.pdf',
    tags: ['Optimization', 'Interior Point Methods', 'LSTM', 'Self-Attention', 'Nonlinear Programming', 'Deep Learning'],
  },
  {
    id: 'computational-discourse-trump-policies',
    title: 'Sympathy Over Polarization: A Computational Discourse Analysis of Trump\'s 2025 Policies',
    authors: ['Hari Subhash Akshit Pulipati', 'Kusal Sai Ayinala', 'Pranavi Gantla', 'Ravi Kumar Bevara', 'Krishna Annavaram', 'Stephen Wheeler'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Examines public opinion towards Donald Trump\'s 2025 policy proposals covering immigration, LGBTQ+ rights, trade tariffs, and ICE raids through computational discourse analysis on Reddit postings. Employs web scraping with sentiment classification using RoBERTa, topic modeling using LDA, and Aspect-Based Sentiment Analysis (ABSA) to understand the extent of online discourse polarization or sympathy. Findings indicate that ICE raids and LGBTQ+ topics are overwhelmingly negative in sentiment, whereas tariff and citizenship discourses show more balanced sentiment, providing data-driven insights into political discourse dynamics.',
    type: 'Conference',
    url: '/reports/DTSC_5082_401_Group_17.pdf',
    tags: ['Computational Social Science', 'Discourse Analysis', 'RoBERTa', 'Sentiment Analysis', 'LDA', 'ABSA', 'Political NLP'],
  },
  {
    id: 'business-audio-transformer-insights',
    title: 'Transforming Business Audio Data into Actionable Insights Using Transformer Models',
    authors: ['Pavan Sai Megha Vardhan Ketireddi', 'Guna Sindhu Priya Singamaneni', 'Stephen F. Wheeler', 'Ravi Varma Kumar Bevara', 'Krishna Annavaram'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Addresses the challenge of extracting valuable information from business conference calls and quarterly earnings calls, which are largely untapped in audio format. Combines Whisper and pyannote.audio transformer models to generate structured, speaker-attributed transcripts through an end-to-end pipeline for automated transcription and speaker diarization. Through extensive experiments, the proposed pipeline achieves high diarization and transcription accuracy, providing enhanced business data access, compliance support, and actionable decision-making insights from corporate audio content.',
    type: 'Conference',
    url: '/reports/Group14_report.pdf',
    tags: ['Speech Processing', 'Whisper', 'Speaker Diarization', 'Transformers', 'Business Analytics', 'NLP', 'Audio AI'],
  },
  {
    id: 'weather-water-quality-prediction',
    title: 'Investigating Impact of Weather on Water Quality Prediction – A Pre- and Post-COVID Analysis',
    authors: ['Aakash Reddy Varala', 'Uma Abhishek Polakonda', 'Punitha Pokala', 'Ravi Varma Kumar Bevara', 'Krishna Annavaram', 'Stephen Wheeler'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Investigates how incorporating weather data (temperature, humidity, rainfall) improves Water Quality Index (WQI) predictions beyond traditional water-based measurements alone. Uses water and weather data from Cambridgeshire and Bedfordshire (UK) covering 2015 to 2024, training Random Forest and Artificial Neural Network models to predict WQI. The COVID-19 pandemic was treated as a natural event that caused disruptions in environmental patterns, enabling pre- and post-COVID comparative analysis. Results demonstrate that weather-augmented models significantly improve WQI prediction accuracy.',
    type: 'Conference',
    url: '/reports/Group_11_Project_Report.pdf',
    tags: ['Environmental AI', 'Water Quality', 'Random Forest', 'ANN', 'Weather Data', 'COVID Analysis', 'Predictive Analytics'],
  },
  {
    id: 'text-summarization-qa-rag-evaluation',
    title: 'Comparative Evaluation of Text Summarization and Question Answering Models with RAG and LLMs',
    authors: ['Suresh Narra', 'Samrudhi Gari', 'Sambamurthi Raju Dantuluri', 'Stephen F. Wheeler', 'Ravi Varma Kumar Bevara', 'Krishna Annavaram'],
    venue: 'UNT Research — Department of Data Science',
    year: '2024',
    abstract:
      'Assesses how Retrieval-Augmented Generation (RAG) systems perform alongside different NLP models when conducting summarization and generating question-answering queries. Evaluates an NLP pipeline integrating 20 summarization models, 3 question generators, and 2 QA systems within a RAG framework. Analyzes benchmark datasets with standard evaluation metrics including ROUGE, BLEU, and F1 to determine which models achieve the best balance of accuracy and efficiency within an NLP pipeline. Findings offer insights to improve end-to-end NLP workflows and guide future automated system development.',
    type: 'Conference',
    url: '/reports/Group_13_Report.pdf',
    tags: ['RAG', 'Text Summarization', 'Question Answering', 'ROUGE', 'BLEU', 'NLP Pipeline', 'LLMs'],
  },
  {
    id: 'group1-020-ecommerce-recommendation',
    title: 'AI-Powered E-Commerce Product Recommendation Engine',
    authors: ['UNT DTSC 5082.020 Group 1', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082.020',
    year: '2024',
    abstract:
      'Designed and implemented a hybrid product recommendation engine combining collaborative filtering (matrix factorization with ALS) and content-based signals (TF-IDF product descriptions, visual embeddings). Deployed a two-stage retrieval-ranking pipeline with a LightGBM re-ranker on top of ANN-retrieved candidates. Evaluated offline using NDCG@10 and Hit Rate, with an A/B testing framework prototype for online evaluation. Report available upon request.',
    type: 'Supervised Research',
    url: '/reports/capstone_final_report_group1.pdf',
    tags: ['Recommender Systems', 'Collaborative Filtering', 'ALS', 'LightGBM', 'E-Commerce', 'Retrieval-Ranking'],
  },
  {
    id: 'group1-401-misinformation-detection',
    title: 'Real-Time Social Media Misinformation Detection',
    authors: ['UNT DTSC 5082.401 Group 1', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082.401',
    year: '2024',
    abstract:
      'Built a real-time misinformation detection pipeline for social media posts using fine-tuned RoBERTa on fact-check datasets (LIAR, FakeNewsNet). Incorporated source credibility signals, claim propagation graph features via GNN, and cross-lingual transfer for multilingual post classification. Designed a streaming inference service using Kafka and FastAPI for sub-second classification latency on live social media feeds.',
    type: 'Supervised Research',
    url: '/reports/DTSC5082.401_Group1_Project.pdf',
    tags: ['Misinformation Detection', 'RoBERTa', 'GNN', 'Fake News', 'Streaming ML', 'Cross-Lingual NLP'],
  },
  {
    id: 'group2-020-news-classification',
    title: 'Multi-Label Text Classification for News Categorization',
    authors: ['UNT DTSC 5082.020 Group 2', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082.020',
    year: '2024',
    abstract:
      'Developed a multi-label news article classification system using BERT-based encoders fine-tuned on a large-scale annotated news corpus spanning 20+ topic categories. Addressed label imbalance via focal loss and threshold tuning per class. Benchmarked against classical TF-IDF + SVM baselines, achieving significant F1 improvements on rare label categories. Explored label co-occurrence as a graph regularization signal to improve multi-label consistency.',
    type: 'Supervised Research',
    url: '/reports/DTSC5082.020_Group2_Project_Report.pdf',
    tags: ['Multi-Label Classification', 'BERT', 'News NLP', 'Focal Loss', 'Text Classification', 'Label Imbalance'],
  },
  {
    id: 'group2-401-energy-forecasting',
    title: 'Predictive Analytics for Energy Consumption Forecasting',
    authors: ['UNT DTSC 5082.401 Group 2', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082.401',
    year: '2024',
    abstract:
      'Applied temporal fusion transformer (TFT) and LSTM models to multi-horizon electricity consumption forecasting at the building and district level. Incorporated smart meter readings, weather features, and calendar variables as exogenous inputs. Implemented probabilistic forecasting with quantile regression to produce 80% and 95% prediction intervals for grid management decisions. Demonstrated superior RMSE over ARIMA and gradient boosting baselines on a 2-year meter dataset.',
    type: 'Supervised Research',
    url: '/reports/DTSC_5082_Project_Report_2-1.pdf',
    tags: ['Energy Forecasting', 'Temporal Fusion Transformer', 'LSTM', 'Smart Grid', 'Probabilistic Forecasting', 'Time Series'],
  },
  {
    id: 'group3-plant-disease-detection',
    title: 'Image-Based Plant Disease Detection Using Transfer Learning',
    authors: ['UNT DTSC 5082 Group 3', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Built a convolutional neural network plant disease classifier using transfer learning from EfficientNet-B4 pre-trained on ImageNet, fine-tuned on the PlantVillage dataset covering 38 crop disease categories. Applied aggressive data augmentation (random crops, color jitter, cutout) to address limited labeled samples in rare disease classes. Developed a mobile-friendly TFLite quantized model for edge deployment in field agriculture applications, achieving 96.8% top-1 accuracy on the held-out test set.',
    type: 'Supervised Research',
    url: '/reports/DTSC 5082_Project Report_Group 3.pdf',
    tags: ['Computer Vision', 'Transfer Learning', 'EfficientNet', 'Agriculture AI', 'Mobile ML', 'TFLite'],
  },
  {
    id: 'group4-financial-fraud-detection',
    title: 'Financial Market Volatility Prediction with Deep Learning',
    authors: ['UNT DTSC 5082 Group 4', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Predicted stock market volatility (VIX index and individual equity realized volatility) using LSTM, Temporal Convolutional Networks (TCN), and attention-based transformer models trained on OHLCV price data, options market features, and macro-economic indicators. Implemented a rolling-window backtesting framework to evaluate prediction accuracy across different market regimes (bull, bear, high-volatility). Applied SHAP to identify dominant leading indicators across different market conditions.',
    type: 'Supervised Research',
    url: '/reports/DTSC5082.020_Group04_Report.pdf',
    tags: ['Financial ML', 'Volatility Prediction', 'LSTM', 'TCN', 'Time Series', 'SHAP', 'Backtesting'],
  },
  {
    id: 'group6-fraud-detection',
    title: 'Deep Learning for Credit Card Fraud Detection',
    authors: ['UNT DTSC 5082 Group 6', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Addressed highly imbalanced credit card fraud detection using SMOTE, class-weighted XGBoost, and autoencoder-based anomaly scoring on transaction sequences. Applied graph-based fraud ring detection using transaction network structure (Graph SAGE) to identify coordinated fraudulent behavior invisible to transaction-level classifiers. Optimized decision thresholds for business-oriented metrics (precision-recall trade-off, dollar-weighted F1) rather than standard accuracy, achieving 94.2% recall at 3:1 precision-recall operating point.',
    type: 'Supervised Research',
    url: '/reports/DTSC5082_Group6_ProjectReport-1.pdf',
    tags: ['Fraud Detection', 'Imbalanced Learning', 'XGBoost', 'Graph SAGE', 'Anomaly Detection', 'SMOTE'],
  },
  {
    id: 'group9-020-social-network-analysis',
    title: 'Social Network Analysis and Community Detection with ML',
    authors: ['UNT DTSC 5082.020 Group 9', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082.020',
    year: '2024',
    abstract:
      'Applied graph neural networks (GraphSAGE, GAT) and classical community detection algorithms (Louvain, Girvan-Newman) to identify influencer communities and information propagation patterns in large social networks. Built a node classification model for user role detection (influencer vs. lurker vs. bridge) and a link prediction model for friend recommendation. Analyzed Twitter ego networks and Reddit community graphs to validate findings across platform types.',
    type: 'Supervised Research',
    url: '/reports/ProjectReport_Group9_DTSC 5082.020.pdf',
    tags: ['Social Network Analysis', 'GraphSAGE', 'GAT', 'Community Detection', 'Link Prediction', 'Graph ML'],
  },
  {
    id: 'group11-satellite-image-classification',
    title: 'Satellite Image Classification for Land Cover and Urban Change Analysis',
    authors: ['UNT DTSC 5082 Group 11', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Developed a multi-class semantic segmentation model (DeepLabV3+, U-Net) for land cover classification from multi-spectral satellite imagery (Sentinel-2). Incorporated NDVI, NDWI, and other spectral indices as additional input channels alongside RGB bands. Applied temporal change detection by comparing segmentation maps across quarterly satellite captures to identify urban growth and deforestation patterns. Validated on EuroSAT benchmark and a custom Texas land-cover dataset.',
    type: 'Supervised Research',
    url: '/reports/Final Project Report Group 11.pdf',
    tags: ['Remote Sensing', 'Semantic Segmentation', 'DeepLabV3+', 'Satellite Imagery', 'Land Cover', 'Change Detection'],
  },
  {
    id: 'group12-brain-tumor-detection',
    title: 'Brain Tumor Detection and Grading from MRI Scans',
    authors: ['UNT DTSC 5082 Group 12', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Implemented 3D convolutional neural networks and Vision Transformer (ViT) models for brain tumor detection, localization, and grade classification (LGG vs. HGG) from multi-modal MRI (T1, T2, FLAIR, T1ce). Trained on the BraTS 2020 challenge dataset with Dice loss optimization for segmentation and cross-entropy for classification. Applied saliency maps and Grad-CAM to generate radiologist-auditable heatmaps identifying tumor regions driving model predictions.',
    type: 'Supervised Research',
    url: '/reports/DTSC5082_Group12_ProjectReport.pdf',
    tags: ['Medical Imaging', '3D CNN', 'Vision Transformers', 'Brain Tumor', 'MRI Segmentation', 'Grad-CAM'],
  },
  {
    id: 'group13-air-quality-prediction',
    title: 'Air Quality Prediction Using Spatiotemporal Deep Learning',
    authors: ['UNT DTSC 5082 Group 13', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Built a spatiotemporal air quality forecasting model (PM2.5, NO2, O3) using a Graph Attention Network (GAT) to model spatial dependencies between monitoring stations, combined with an LSTM temporal encoder. Incorporated meteorological data (wind speed/direction, temperature, humidity) and traffic density as exogenous predictors. Evaluated 24-hour ahead forecasts across 50 EPA monitoring stations in the Dallas-Fort Worth metroplex, achieving MAE improvements of 22% over persistence and random-forest baselines.',
    type: 'Supervised Research',
    url: '/reports/DTSC5082_020_Group13_Project_Report.pdf',
    tags: ['Air Quality', 'Spatiotemporal ML', 'Graph Attention Network', 'LSTM', 'Environmental AI', 'Forecasting'],
  },
  {
    id: 'group14-social-influence-analysis',
    title: 'Social Influence and Network Analysis for Marketing Optimization',
    authors: ['UNT DTSC 5082 Group 14', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Modeled social influence propagation and influencer identification in online social networks using Independent Cascade and Linear Threshold models combined with GNN-based influence scoring. Built a marketing campaign optimization system that selects seed influencers to maximize information spread under a budget constraint (greedy approximation with submodularity guarantees). Applied the system to Instagram and Twitter brand mention graphs, demonstrating 3x improvement in campaign reach vs. follower-count-based influencer selection.',
    type: 'Supervised Research',
    url: '/reports/DTSC5082_Group14_FinalReport.pdf',
    tags: ['Social Influence', 'Graph ML', 'Marketing Analytics', 'Influence Maximization', 'GNN', 'Network Analysis'],
  },
  {
    id: 'group16-code-review-llm',
    title: 'Automated Code Review and Bug Detection with Large Language Models',
    authors: ['UNT DTSC 5082 Group 16', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Developed an LLM-based automated code review system using CodeBERT and GPT-4 fine-tuned on pull request comment datasets. Built a bug localization model that identifies vulnerable code patterns (SQL injection, buffer overflow, type errors) at the function level using static analysis features combined with transformer encodings. Evaluated on the CodeXGLUE code review benchmark and a proprietary enterprise codebase, generating actionable review comments aligned with senior engineer quality bar.',
    type: 'Supervised Research',
    url: '/reports/DTSC5082_401_Group16_Final Project Report.pdf',
    tags: ['Code Intelligence', 'CodeBERT', 'LLMs', 'Bug Detection', 'Static Analysis', 'Software Engineering AI'],
  },
  {
    id: 'group18-healthcare-cost-prediction',
    title: 'Healthcare Cost Prediction and Insurance Claims Analysis',
    authors: ['UNT DTSC 5082 Group 18', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Built predictive models for individual healthcare cost estimation and insurance claims fraud detection using gradient boosting ensembles (XGBoost, CatBoost) on structured EHR and claims data. Developed a two-headed model jointly predicting claim amount and fraud probability, with shared lower layers for representation learning. Applied SHAP for actuarial explainability and implemented calibration techniques to ensure reliable probability estimates for underwriting decisions. Validated on the IBM Watson Health Analytics claims dataset.',
    type: 'Supervised Research',
    url: '/reports/DTSC5082.401_Group18_Final_Project_Report.pdf',
    tags: ['Healthcare Analytics', 'XGBoost', 'CatBoost', 'Claims Fraud', 'SHAP', 'Actuarial ML'],
  },
  {
    id: 'group21-document-layout-analysis',
    title: 'Document Layout Analysis and Structured Information Extraction',
    authors: ['UNT DTSC 5082 Group 21', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Developed a document understanding pipeline combining LayoutLMv3 for multi-modal (text + layout) document classification and structured field extraction from forms, invoices, and receipts. Implemented a two-stage pipeline: first segmenting document regions (table, header, paragraph, figure) using Mask R-CNN, then applying LayoutLM for key-value extraction within each region. Evaluated on the FUNSD, CORD, and DocVQA benchmarks, with production-grade postprocessing for downstream ERP system integration.',
    type: 'Supervised Research',
    url: '/reports/DTSC5082_Group21_ProjectReport.pdf',
    tags: ['Document Intelligence', 'LayoutLMv3', 'Information Extraction', 'OCR', 'Form Understanding', 'Multi-modal'],
  },
  {
    id: 'group22-real-estate-prediction',
    title: 'Real Estate Price Prediction and Market Analytics',
    authors: ['UNT DTSC 5082 Group 22', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Built a real estate valuation model using gradient boosting (XGBoost, LightGBM) and neural network regressors trained on Zillow property attributes, neighborhood census data, school ratings, and walkability scores. Incorporated geospatial features using hexagonal binning (H3) and spatial lag features from neighboring sold properties. Developed an automated valuation model (AVM) achieving median absolute percentage error of 4.2% on Dallas-Fort Worth residential sales, competitive with commercial AVM benchmarks.',
    type: 'Supervised Research',
    url: '/reports/Final_Project_Report-Group 22.pdf',
    tags: ['Real Estate', 'Geospatial ML', 'XGBoost', 'Automated Valuation', 'H3 Hexgrid', 'Regression'],
  },
  {
    id: 'group24-deepfake-detection',
    title: 'Deepfake Detection and Media Authenticity Verification',
    authors: ['UNT DTSC 5082 Group 24', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Implemented deepfake video detection using a dual-stream CNN-LSTM architecture analyzing both spatial artifacts (facial inconsistencies, blending boundaries) and temporal incoherence across frames. Fine-tuned EfficientNet on the FaceForensics++ dataset across four manipulation categories (Deepfakes, Face2Face, FaceSwap, NeuralTextures). Applied frequency domain analysis (DCT features) as complementary signals for compression artifact detection. Evaluated cross-dataset generalization to unseen GAN architectures on the DFDC and Celeb-DF benchmarks.',
    type: 'Supervised Research',
    url: '/reports/DTSC_5082_FINAL_PROJECT_REPORT_GROUP24.pdf',
    tags: ['Deepfake Detection', 'Media Forensics', 'EfficientNet', 'CNN-LSTM', 'Video Analysis', 'Trustworthy AI'],
  },
  {
    id: 'molecular-property-gnn',
    title: 'Graph Neural Network for Molecular Property Prediction',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Built a GNN-based molecular property prediction pipeline using message-passing neural networks (MPNN, Attentive FP, DimeNet++) applied to molecular graphs constructed from SMILES strings. Trained on MoleculeNet benchmarks covering solubility, toxicity, and bioactivity prediction tasks. Pre-trained on 10M unlabeled molecular graphs using contrastive self-supervised learning (InfoGraph), significantly improving downstream task performance with few labeled examples. Demonstrated applicability to virtual screening workflows in drug discovery pipelines.',
    type: 'Supervised Research',
    url: '/reports/5082_FinalPaper.pdf',
    tags: ['Drug Discovery', 'Graph Neural Networks', 'Molecular ML', 'MPNN', 'Self-Supervised', 'MoleculeNet'],
  },
  {
    id: 'hate-speech-detection',
    title: 'Hate Speech and Toxic Content Detection in Online Communities',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Developed a multi-class hate speech detection model for online platforms using HateBERT, fine-tuned on HateXplain, Measuring Hate Speech, and Reddit/Twitter annotated corpora. Addressed annotator disagreement via soft-label training and model calibration. Implemented span-level rationale extraction (LIME tokens, attention rollout) to generate human-readable explanations for moderation decisions. Built a robust cross-platform transfer evaluation to assess model reliability across Reddit, Twitter, and Discord community types.',
    type: 'Supervised Research',
    url: '/reports/DTSC5082_Project_Final.pdf',
    tags: ['Hate Speech Detection', 'HateBERT', 'Content Moderation', 'Explainability', 'NLP', 'Trustworthy AI'],
  },
  {
    id: 'emotion-recognition-speech',
    title: 'Multimodal Emotion Recognition from Speech and Text',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Built a multimodal emotion recognition system fusing acoustic speech features (MFCCs, mel spectrograms via wav2vec 2.0) with textual sentiment signals (RoBERTa) through cross-modal attention fusion. Evaluated on IEMOCAP and MSP-IMPROV benchmarks across 8 discrete emotion categories. Implemented an adaptive fusion gate that dynamically weights acoustic vs. textual modality based on speech quality and text availability. Applied to customer service call analytics as a downstream application for real-time agent coaching.',
    type: 'Supervised Research',
    url: '/reports/Final Project Paper Report.pdf',
    tags: ['Emotion Recognition', 'Speech Processing', 'wav2vec 2.0', 'Multimodal Fusion', 'Affective Computing', 'NLP'],
  },
  {
    id: 'traffic-sign-recognition',
    title: 'Traffic Sign Recognition for Autonomous Driving Applications',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Implemented a real-time traffic sign detection and classification system using YOLOv8 (detection) and EfficientNet-B2 (classification) trained on the GTSRB and Mapillary Traffic Sign datasets covering 200+ sign categories. Addressed scale variation and occlusion challenges with multi-scale feature pyramid networks. Achieved 99.1% classification accuracy on GTSRB with inference at 45 FPS on NVIDIA Jetson hardware. Integrated adversarial robustness evaluation against physical patch attacks to assess safety margins for deployment.',
    type: 'Supervised Research',
    url: '/reports/Final report.pdf',
    tags: ['Autonomous Driving', 'Traffic Sign Recognition', 'YOLOv8', 'EfficientNet', 'Computer Vision', 'Edge AI'],
  },
  {
    id: 'product-review-sentiment-mining',
    title: 'Aspect-Based Sentiment Analysis for Product Review Mining',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Developed an aspect-based sentiment analysis (ABSA) system for e-commerce product reviews using BERT-ADA fine-tuned on SemEval ABSA datasets. Extracted aspect categories (battery, camera, display, performance) and their associated sentiment polarities from unstructured review text. Built a review summarization layer using GPT to generate structured product pros/cons from aggregated aspect-sentiment outputs. Applied to Amazon review datasets across electronics and apparel categories for automated competitive intelligence extraction.',
    type: 'Supervised Research',
    url: '/reports/FinalReport.pdf',
    tags: ['Aspect-Based Sentiment', 'ABSA', 'BERT', 'Product Reviews', 'Opinion Mining', 'E-Commerce NLP'],
  },
  {
    id: 'student-performance-prediction',
    title: 'Educational Data Mining for Student Performance Prediction',
    authors: ['UNT DTSC 5082 Team', 'Supervised by Krishna Annavaram'],
    venue: 'UNT Applied Machine Learning Capstone — DTSC 5082',
    year: '2024',
    abstract:
      'Developed early-alert student performance prediction models using LMS engagement logs, assignment submission patterns, video watch time, and discussion forum activity as features. Implemented ensemble classifiers (Random Forest, XGBoost) and an LSTM model for sequential engagement modeling across course weeks. Built an explainability dashboard surfacing per-student risk factors to instructors via SHAP waterfall plots. Validated on 3 semesters of UNT online course data achieving AUC of 0.87 for at-risk student identification by week 4.',
    type: 'Supervised Research',
    url: '/reports/INFO 5082 Report.pdf',
    tags: ['Educational Analytics', 'LMS Data', 'XGBoost', 'LSTM', 'SHAP', 'Early Alert', 'Predictive Analytics'],
  },
]

export const authoredPublications = publications.filter((p) => p.type !== 'Supervised Research')
export const supervisedResearch = publications.filter((p) => p.type === 'Supervised Research')

export const publicationYears = Array.from(new Set(publications.map((p) => p.year))).sort().reverse()

export const publicationTags = Array.from(new Set(publications.flatMap((p) => p.tags))).sort()
