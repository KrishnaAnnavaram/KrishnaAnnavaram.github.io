import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featured } from '@/lib/projects'
import { DOMAINS } from '@/data/projects'
import { Reveal } from '@/components/ui/Reveal'

/**
 * The featured systems, with their evidence attached.
 *
 * Each row leads with a measured figure rather than an adjective, because the
 * discriminating question a reviewer is asking is "did this person build a
 * system or call an API" — and a number with a stated method answers it faster
 * than a paragraph does.
 */
export function SelectedSystems() {
  if (featured.length === 0) return null

  return (
    <section className="page-x rule-t mx-auto max-w-page py-16">
      <div className="spec-grid">
        <div>
          <h2 className="eyebrow lg:sticky lg:top-24">
            <span className="text-ink-faint">01</span> &nbsp;Selected systems
          </h2>
        </div>

        <div>
          <p className="max-w-text text-ink-soft">
            Five repositories carry most of the argument. Each one states what it cannot do
            alongside what it can, and every figure below was computed against a clone rather than
            copied from a README.
          </p>

          <ul className="mt-10">
            {featured.map((project, i) => (
              <Reveal as="li" key={project.slug} delay={i * 80}>
                <Link
                  href={`/projects/${project.slug}/`}
                  className="group block border-t border-rule py-8"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-2xs uppercase tracking-[0.14em] text-accent">
                      {project.github?.primaryLanguage ?? project.stack[0]}
                    </span>
                    <span className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-faint tabular">
                      {project.year}
                    </span>
                    {project.domains.slice(0, 2).map((d) => (
                      <span
                        key={d}
                        className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-faint"
                      >
                        {DOMAINS[d]}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-3 flex items-start gap-2 text-2xl text-ink transition-colors duration-[var(--duration-fast)] group-hover:text-accent">
                    <span>{project.name}</span>
                    <ArrowRight
                      size={17}
                      className="mt-2.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden
                    />
                  </h3>

                  <p className="mt-2.5 max-w-text text-ink-soft">{project.tagline}</p>

                  {project.evidence && project.evidence.length > 0 && (
                    <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                      {project.evidence.slice(0, 3).map((e) => (
                        <div key={e.label} className="max-w-[15rem]">
                          <dt className="font-serif text-2xl leading-none text-ink tabular">
                            {e.value}
                          </dt>
                          <dd className="mt-2 text-xs leading-relaxed text-ink-muted">{e.label}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </Link>
              </Reveal>
            ))}
          </ul>

          <div className="mt-8 border-t border-rule pt-6">
            <Link
              href="/projects/"
              className="link-underline inline-flex items-baseline gap-1.5 text-ink transition-colors hover:text-accent"
            >
              Every project, filterable
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
