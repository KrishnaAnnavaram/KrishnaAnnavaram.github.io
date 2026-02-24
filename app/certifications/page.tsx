import { Metadata } from 'next'
import { ExternalLink, Award, Shield } from 'lucide-react'
import { certifications } from '@/data/certifications'

export const metadata: Metadata = {
  title: 'Certifications — Krishna Annavaram',
  description: 'Professional certifications including AWS AI Practitioner and SAP Certified Development Associate.',
}

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-')
  return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })
}

export default function CertificationsPage() {
  const featured = certifications.filter((c) => c.featured)
  const others = certifications.filter((c) => !c.featured)

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container-narrow">
        <div className="mb-12">
          <p className="text-brand-accent text-sm font-mono font-medium mb-3 tracking-widest uppercase">
            Credentials
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Certifications
          </h1>
          <p className="text-text-secondary max-w-lg">
            Professional certifications with verified credentials. Click any badge to verify on Credly.
          </p>
        </div>

        {/* Featured certs */}
        <section className="mb-12" aria-labelledby="featured-certs-heading">
          <h2 id="featured-certs-heading" className="text-xs font-mono font-medium text-text-muted uppercase tracking-widest mb-6">
            Primary Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((cert) => (
              <article key={cert.id} className="glass p-6 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                    <Shield size={24} className="text-brand-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-text-primary mb-1 leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-text-secondary text-sm mb-2">{cert.issuer}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-text-muted mb-3">
                      <span>Issued {formatDate(cert.issuedDate)}</span>
                      {cert.expiryDate && <span>· Expires {formatDate(cert.expiryDate)}</span>}
                    </div>
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-brand-primary text-sm hover:underline"
                        aria-label={`Verify ${cert.name} on Credly (opens in new tab)`}
                      >
                        <ExternalLink size={12} aria-hidden="true" />
                        Verify on Credly
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Other certs */}
        <section aria-labelledby="other-certs-heading">
          <h2 id="other-certs-heading" className="text-xs font-mono font-medium text-text-muted uppercase tracking-widest mb-6">
            Additional Credentials
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {others.map((cert) => (
              <div key={cert.id} className="glass-sm p-4 flex items-center gap-3">
                <Award size={16} className="text-text-muted shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-text-primary text-sm font-medium">{cert.name}</p>
                  <p className="text-text-muted text-xs">{cert.issuer} · {formatDate(cert.issuedDate)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  )
}
