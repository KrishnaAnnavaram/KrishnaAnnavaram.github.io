import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { caseStudies } from '@/data/work'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Chip } from '@/components/ui/Bits'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies in retrieval systems, applied machine learning, and NLP ranking — each written as problem, approach, and measured result.',
}

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Three systems, written up honestly."
        lede="Each of these is a problem I was handed, the approach I took, and what actually came out of it. Where a number is an estimate, it says so."
      />

      <section className="page-x mx-auto max-w-page pb-8">
        <ul className="rule-t">
          {caseStudies.map((study, i) => (
            <Reveal as="li" key={study.slug} delay={i * 80}>
              <Link
                href={`/work/${study.slug}/`}
                className="group grid gap-6 border-b border-rule py-10 md:grid-cols-[1fr_auto] md:items-start md:gap-12"
              >
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-2xs uppercase tracking-[0.14em] text-accent">
                      {study.context}
                    </span>
                    <span className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-faint">
                      {study.year} · {study.discipline}
                    </span>
                  </div>

                  <h2 className="mt-3 flex items-start gap-2 text-2xl text-ink transition-colors duration-200 group-hover:text-accent">
                    <span>{study.title}</span>
                    <ArrowRight
                      size={18}
                      className="mt-2 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden
                    />
                  </h2>

                  <p className="mt-3 text-ink-soft">{study.summary}</p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {study.stack.slice(0, 6).map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                    {study.stack.length > 6 && (
                      <Chip className="text-ink-faint">+{study.stack.length - 6}</Chip>
                    )}
                  </div>
                </div>

                <dl className="flex gap-8 md:w-56 md:flex-col md:gap-5">
                  {study.outcomes.map((o) => (
                    <div key={o.label}>
                      <dt className="font-serif text-2xl leading-none text-ink">{o.value}</dt>
                      <dd className="mt-1.5 text-xs text-ink-muted">{o.label}</dd>
                    </div>
                  ))}
                </dl>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  )
}
