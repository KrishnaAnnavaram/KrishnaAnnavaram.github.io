import { Metadata } from 'next'
import { BookOpen } from 'lucide-react'
import { publications } from '@/data/publications'
import PublicationsClient from './PublicationsClient'

export const metadata: Metadata = {
  title: 'Publications — Krishna Annavaram',
  description:
    'Research publications and supervised graduate research by Krishna Annavaram in NLP, Generative AI, and Machine Learning.',
}

export default function PublicationsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container-narrow">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-brand-accent text-sm font-mono font-medium mb-3 tracking-widest uppercase">
            Research
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4 flex items-center gap-3">
            <BookOpen size={36} className="text-brand-primary" aria-hidden="true" />
            Publications
          </h1>
          <p className="text-text-secondary max-w-xl">
            Authored and co-authored research across NLP, applied ML, and computer vision — plus
            over 60 graduate research reports supervised at UNT&apos;s Department of Data Science.
          </p>
        </div>

        {/* Interactive section (client component) */}
        <PublicationsClient publications={publications} />
      </div>
    </div>
  )
}
