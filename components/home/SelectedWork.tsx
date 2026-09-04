import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featuredCaseStudies } from '@/data/work'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel, TextLink } from '@/components/ui/Bits'

export function SelectedWork() {
  return (
    <section className="page-x rule-t mx-auto max-w-page py-20">
      <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-16">
        <SectionLabel>Selected work</SectionLabel>

        <div>
          <ul>
            {featuredCaseStudies.map((study, i) => (
              <Reveal as="li" key={study.slug} delay={i * 90}>
                <Link
                  href={`/work/${study.slug}/`}
                  className="group block border-b border-rule py-8 first:pt-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-2xs uppercase tracking-[0.14em] text-accent">
                      {study.context}
                    </span>
                    <span className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-faint">
                      {study.year} · {study.discipline}
                    </span>
                  </div>

                  <h3 className="mt-3 flex items-start gap-2 text-2xl text-ink transition-colors duration-200 group-hover:text-accent">
                    <span>{study.title}</span>
                    <ArrowRight
                      size={18}
                      className="mt-2 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden
                    />
                  </h3>

                  <p className="mt-3 max-w-text text-ink-soft">{study.summary}</p>

                  <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
                    {study.outcomes.map((o) => (
                      <div key={o.label}>
                        <dt className="font-serif text-xl leading-none text-ink">{o.value}</dt>
                        <dd className="mt-1.5 max-w-[16rem] text-xs text-ink-muted">{o.label}</dd>
                      </div>
                    ))}
                  </dl>
                </Link>
              </Reveal>
            ))}
          </ul>

          <div className="mt-8">
            <TextLink href="/work/">All work</TextLink>
          </div>
        </div>
      </div>
    </section>
  )
}
