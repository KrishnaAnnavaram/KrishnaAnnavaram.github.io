import { Metadata } from 'next'
import { ExternalLink, FileText, BookOpen, GraduationCap } from 'lucide-react'
import { publications } from '@/data/publications'

export const metadata: Metadata = {
  title: 'Publications — Krishna Annavaram',
  description: 'Research publications and supervised graduate research by Krishna Annavaram in NLP, Generative AI, and Machine Learning.',
}

const typeColors: Record<string, string> = {
  Conference: '#6366f1',
  Journal: '#10b981',
  Workshop: '#f59e0b',
  Preprint: '#94a3b8',
  'Supervised Research': '#06b6d4',
}

const typeIcons: Record<string, React.ElementType> = {
  Conference: BookOpen,
  Journal: BookOpen,
  Workshop: BookOpen,
  Preprint: FileText,
  'Supervised Research': GraduationCap,
}

const authored = publications.filter((p) => p.type !== 'Supervised Research')
const supervised = publications.filter((p) => p.type === 'Supervised Research')

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
            Authored research in NLP and applied ML, plus 23 graduate research reports
            supervised at UNT across GenAI, computer vision, time series, and more.
</p>
        </div>

        {/* Authored Papers */}
        <section className="mb-16" aria-labelledby="authored-heading">
          <h2
            id="authored-heading"
            className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-6 flex items-center gap-2"
          >
            <BookOpen size={14} aria-hidden="true" />
            Authored &amp; Co-Authored
          </h2>
          <div className="space-y-6">
            {authored.map((pub) => {
              const Icon = typeIcons[pub.type] ?? FileText
              return (
                <article
                  key={pub.id}
                  className="glass p-6 hover:border-brand-primary/20 border border-white/5 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className="text-xs font-mono px-3 py-1 rounded-full font-medium flex items-center gap-1.5"
                      style={{ backgroundColor: typeColors[pub.type] + '20', color: typeColors[pub.type] }}
                    >
                      <Icon size={11} aria-hidden="true" />
                      {pub.type}
                    </span>
                    <span className="text-text-muted text-xs">{pub.year}</span>
                    <span className="text-text-muted text-xs">·</span>
                    <span className="text-text-muted text-xs">{pub.venue}</span>
                  </div>

                  <h3 className="font-display font-bold text-text-primary text-lg mb-2 leading-snug">
                    {pub.title}
                  </h3>

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

                  {(pub.doi ?? pub.url) && (
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
              )
            })}
          </div>
        </section>

        {/* Supervised Research */}
        <section aria-labelledby="supervised-heading">
          <h2
            id="supervised-heading"
            className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-2 flex items-center gap-2"
          >
            <GraduationCap size={14} aria-hidden="true" />
            Supervised Research — UNT DTSC 5082
          </h2>
          <p className="text-text-muted text-sm mb-6 max-w-lg">
            Graduate research reports supervised during the Applied Machine Learning Capstone
            at University of North Texas. Full reports available upon request.
          </p>
          <div className="space-y-4">
            {supervised.map((pub) => (
              <article
                key={pub.id}
                className="glass p-5 hover:border-brand-accent/20 border border-white/5 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className="text-xs font-mono px-3 py-1 rounded-full font-medium flex items-center gap-1.5"
                    style={{ backgroundColor: typeColors['Supervised Research'] + '20', color: typeColors['Supervised Research'] }}
                  >
                    <GraduationCap size={11} aria-hidden="true" />
                    Supervised Research
                  </span>
                  <span className="text-text-muted text-xs">{pub.year}</span>
                </div>

                <h3 className="font-display font-semibold text-text-primary text-base mb-2 leading-snug">
                  {pub.title}
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed mb-3">{pub.abstract}</p>

                <div className="flex flex-wrap gap-1.5">
                  {pub.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 glass-sm border border-white/5 text-text-muted rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

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
