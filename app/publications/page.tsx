import { Metadata } from 'next'
import { ExternalLink, FileText } from 'lucide-react'
import { publications } from '@/data/publications'

export const metadata: Metadata = {
  title: 'Publications — Krishna Annavaram',
  description: 'Research publications by Krishna Annavaram in NLP, Healthcare AI, and Machine Learning.',
}

const typeColors: Record<string, string> = {
  Conference: '#6366f1',
  Journal: '#10b981',
  Workshop: '#f59e0b',
  Preprint: '#94a3b8',
}

export default function PublicationsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container-narrow">
        <div className="mb-12">
          <p className="text-brand-accent text-sm font-mono font-medium mb-3 tracking-widest uppercase">
            Research
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Publications
          </h1>
          <p className="text-text-secondary max-w-lg">
            Research contributions in NLP, sentiment analysis, and applied machine learning.
          </p>
        </div>

        <div className="space-y-6">
          {publications.map((pub) => (
            <article key={pub.id} className="glass p-6 hover:border-brand-primary/20 border border-white/5 transition-colors">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="text-xs font-mono px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: typeColors[pub.type] + '20', color: typeColors[pub.type] }}
                >
                  {pub.type}
                </span>
                <span className="text-text-muted text-xs">{pub.year}</span>
                <span className="text-text-muted text-xs">·</span>
                <span className="text-text-muted text-xs">{pub.venue}</span>
              </div>

              <h2 className="font-display font-bold text-text-primary text-lg mb-2 leading-snug">
                {pub.title}
              </h2>

              <p className="text-text-muted text-sm mb-3">
                {pub.authors.join(', ')}
              </p>

              <p className="text-text-secondary text-sm leading-relaxed mb-4">{pub.abstract}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {pub.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 glass-sm border border-white/5 text-text-muted rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              {(pub.doi || pub.url) && (
                <a
                  href={pub.doi ?? pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-brand-primary text-sm hover:underline"
                  aria-label={`View publication: ${pub.title} (opens in new tab)`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  View publication
                </a>
              )}
            </article>
          ))}
        </div>

        {publications.length === 0 && (
          <div className="glass p-8 text-center">
            <FileText size={32} className="text-text-muted mx-auto mb-3" aria-hidden="true" />
            <p className="text-text-muted">Publications are being updated. Check back soon.</p>
          </div>
        )}
      </div>

    </div>
  )
}
