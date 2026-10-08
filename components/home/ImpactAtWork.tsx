import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { caseStudies, type CaseStudy } from '@/data/work'
import { cn } from '@/lib/utils'
import { SectionHead } from './SectionHead'

/**
 * Production work at each employer, with the outcomes the résumé reports.
 *
 * Shown as stat tiles rather than a chart on purpose: every figure measures a
 * different thing (retrieval accuracy, review time, uptime), so placing them
 * on a shared axis would imply a comparison that does not exist.
 */
export function ImpactAtWork() {
  const [lead, ...rest] = caseStudies

  return (
    <section className="border-y border-rule bg-sunken/60" aria-labelledby="impact-title">
      <div className="page-x mx-auto max-w-page py-20 sm:py-24">
        <SectionHead
          index="02"
          label="Impact at work"
          id="impact-title"
          title={
            <>
              Systems that shipped, and <span className="text-accent">what they changed</span>.
            </>
          }
          lede="Production work at each employer, from hospital Graph-RAG to enterprise ML pipelines. Every figure comes from my résumé."
        />

        <div className="mt-12 grid gap-4">
          <ImpactCard study={lead} lead />
          <div className="grid gap-4 lg:grid-cols-3">
            {rest.map((s) => (
              <ImpactCard key={s.slug} study={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ImpactCard({ study, lead = false }: { study: CaseStudy; lead?: boolean }) {
  const [headline, ...others] = study.outcomes
  const secondary = others.slice(0, lead ? 4 : 2)

  return (
    <article className={cn('spotlight plate group flex h-full flex-col p-5 sm:p-6', lead && 'lg:p-8')}>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.05em] text-ink-muted">
        <span className="text-accent">{study.context}</span>
        <span>{study.year.replace('–', ' to ')}</span>
        <span>{study.discipline}</span>
      </p>

      <h3 className={cn('mt-3 text-ink', lead ? 'text-3xl' : 'text-lg')}>
        <Link
          href={`/work/${study.slug}/`}
          className="after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
        >
          {study.title}
        </Link>
      </h3>
      <p className={cn('mt-2 text-ink-soft', lead ? 'max-w-3xl text-base' : 'text-sm')}>{study.summary}</p>

      <dl className={cn('mt-6 grid gap-x-6 gap-y-5 border-t border-rule pt-5', lead ? 'grid-cols-2 lg:grid-cols-5' : 'grid-cols-1')}>
        <Stat value={headline.value} label={headline.label} big={lead} />
        {secondary.map((o) => (
          <Stat key={o.label} value={o.value} label={o.label} />
        ))}
      </dl>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <ul className="flex min-w-0 flex-wrap gap-1.5">
          {study.stack.slice(0, lead ? 5 : 3).map((t) => (
            <li key={t} className="rounded-full border border-rule px-2.5 py-0.5 text-xs text-ink-muted">
              {t}
            </li>
          ))}
        </ul>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-ink transition-colors group-hover:text-accent">
          Case study
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </article>
  )
}

function Stat({ value, label, big = false }: { value: string; label: string; big?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col-reverse justify-end">
      <dt className="mt-1 text-sm leading-snug text-ink-muted">{label}</dt>
      <dd className={cn('font-semibold tracking-tight text-ink tabular-nums', big ? 'text-4xl' : 'text-2xl')}>
        {value}
      </dd>
    </div>
  )
}
