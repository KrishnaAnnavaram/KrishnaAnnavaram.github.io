import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { experience, formatRoleDate, roleDuration } from '@/data/experience'
import { cn } from '@/lib/utils'
import { SectionHead } from './SectionHead'

/**
 * Experience as a run log: newest first, a status light on the role that is
 * still running, and each role a native <details> so the highlights expand
 * without JavaScript and keep their keyboard and screen-reader semantics.
 */
export function RunHistory() {
  return (
    <section className="page-x mx-auto max-w-page py-20 sm:py-24" aria-labelledby="history-title">
      <SectionHead
        index="03"
        label="Experience"
        id="history-title"
        title="Run history"
        lede="Five roles across enterprise modernisation, healthcare, financial risk and teaching. Open a role for what it involved and the figures that come from the résumé."
        aside={
          <Link href="/experience/" className="inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-accent">
            Full experience
            <ArrowRight size={14} aria-hidden />
          </Link>
        }
      />

      <ol className="relative mt-12 border-l border-rule pl-6 sm:pl-8">
        {experience.map((role, i) => {
          const current = role.end === null
          return (
            <li key={role.id} className="relative pb-4 last:pb-0">
              <span
                aria-hidden
                className={cn(
                  'absolute -left-[1.85rem] top-6 grid size-3 place-items-center rounded-full border sm:-left-[2.35rem]',
                  current ? 'border-accent bg-paper' : 'border-rule-strong bg-paper'
                )}
              >
                {current ? <span className="live-dot !size-1.5" /> : <span className="size-1 rounded-full bg-ink-faint" />}
              </span>

              <details className="plate group/role" open={i === 0}>
                <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-x-6 gap-y-1 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                  <div className="min-w-0">
                    <p className="font-mono text-3xs uppercase tracking-[0.12em] text-ink-muted">
                      <time dateTime={role.start}>{formatRoleDate(role.start)}</time> —{' '}
                      {role.end ? <time dateTime={role.end}>{formatRoleDate(role.end)}</time> : <span className="text-accent">Present</span>}
                      <span className="text-ink-faint"> · {roleDuration(role.start, role.end)}</span>
                    </p>
                    <h3 className="mt-1.5 text-lg text-ink">
                      {role.title} <span className="text-ink-muted">· {role.company}</span>
                    </h3>
                  </div>
                  <ChevronDown
                    size={16}
                    className="shrink-0 text-ink-faint transition-transform duration-200 group-open/role:rotate-180"
                    aria-hidden
                  />
                </summary>

                <div className="border-t border-rule px-4 pb-5 pt-4 sm:px-5">
                  <p className="max-w-text text-sm text-ink-soft">{role.summary}</p>
                  <ul className="mt-4 space-y-2.5">
                    {role.highlights.slice(0, 4).map((h) => (
                      <li key={h.text} className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-2 text-sm">
                        <span aria-hidden className="mt-2 h-px w-2 bg-accent" />
                        <span className="text-ink-soft">
                          {h.text}
                          {h.metric && (
                            <span className="mt-0.5 block font-mono text-2xs text-verify">{h.metric}</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {role.stack.slice(0, 8).map((t) => (
                      <li key={t} className="rounded-full border border-rule px-2 py-0.5 font-mono text-3xs uppercase tracking-[0.08em] text-ink-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
