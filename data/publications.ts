export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  year: string
  abstract: string
  type: 'Graduate Research' | 'Journal' | 'Workshop' | 'Preprint'
  doi?: string
  url?: string
  tags: string[]
}

/**
 * Research output.
 *
 * Every entry here has been verified against the PDF it links to: the author's
 * surname appears in the document, and the title matches the document's own
 * title. `scripts/verify-publications.mjs` re-runs both checks.
 *
 * These are graduate research reports produced in coursework at UNT, typeset in
 * an IEEE template. They are NOT peer-reviewed conference papers, and are no
 * longer labelled as such.
 *
 * Twenty-three "supervised project" entries were removed. Their titles and
 * abstracts described work that was not in the documents they linked to — of
 * 23, one contained the author's surname and two had titles matching the
 * linked PDF. The linked files were other students' coursework.
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
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
    type: 'Graduate Research',
    url: '/reports/Group_13_Report.pdf',
    tags: ['RAG', 'Text Summarization', 'Question Answering', 'ROUGE', 'BLEU', 'NLP Pipeline', 'LLMs'],
  },
]

/** Every entry is co-authored; the supervised category no longer exists. */
export const authoredPublications = publications

export const publicationYears = Array.from(new Set(publications.map((p) => p.year))).sort().reverse()

export const publicationTags = Array.from(new Set(publications.flatMap((p) => p.tags))).sort()
