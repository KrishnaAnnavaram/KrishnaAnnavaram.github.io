export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  year: string
  abstract: string
  type: 'Conference' | 'Journal' | 'Workshop' | 'Preprint'
  doi?: string
  url?: string
  tags: string[]
}

export const publications: Publication[] = [
  {
    id: 'twitter-sentiment-hybrid',
    title: 'Enhancing Twitter Sentiment Analysis using Hybrid Transformer and Sequence Models with Contextual Understanding',
    authors: ['Krishna Annavaram', 'et al.'],
    venue: 'Applied Machine Learning Research',
    year: '2024',
    abstract:
      'This work investigates hybrid architectures combining transformer-based models (BERT variants) with sequence models for improved sentiment analysis on social media text. We demonstrate that contextual understanding from transformer encoders, combined with sequential patterns captured by LSTM layers, achieves superior performance on Twitter sentiment benchmarks compared to single-architecture approaches.',
    type: 'Conference',
    tags: ['NLP', 'Sentiment Analysis', 'Transformers', 'LSTM', 'Social Media'],
  },
]
