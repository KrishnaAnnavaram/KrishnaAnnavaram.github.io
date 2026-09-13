import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { profile } from '@/data/profile'
import { Reveal } from '@/components/ui/Reveal'

/**
 * "What is he working on right now" is one of the first questions a recruiter
 * asks and one of the last things most portfolios answer. Each entry here
 * links to the thing that evidences it, so the section is a set of pointers
 * rather than a list of interests.
 */
export function CurrentFocus() {
  return (
    <section className="page-x rule-t mx-auto max-w-page py-16">
      <div className="spec-grid">
        <div>
          <p className="eyebrow lg:sticky lg:top-24">
            <span className="text-ink-faint">02</span> &nbsp;Current focus
          </p>
        </div>

        <div>
          <ol className="grid gap-px overflow-hidden rounded-[3px] border border-rule bg-rule sm:grid-cols-3">
            {profile.currentFocus.map((focus, i) => (
              <Reveal as="li" key={focus.title} delay={i * 70} className="bg-surface p-5">
                <p className="font-mono text-3xs uppercase tracking-[0.12em] text-accent tabular">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-sans text-base font-semibold leading-snug text-ink">
                  {focus.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{focus.detail}</p>
                <Link
                  href={focus.evidence}
                  className="group mt-4 inline-flex items-center gap-1.5 font-mono text-3xs uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-accent"
                >
                  {focus.evidenceLabel}
                  <ArrowRight
                    size={11}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
