import Link from 'next/link'
import { ArrowRight, Github } from 'lucide-react'
import { featured, type ProjectWithRepo } from '@/lib/projects'
import { DOMAINS } from '@/data/projects'
import { stageComposition } from '@/lib/architecture'
import { featuredProjects } from '@/data/projects'
import { StageBar, StageLegend } from '@/components/charts/StageBar'
import { ModelBoundaryChart } from '@/components/charts/ModelBoundaryChart'
import { cn } from '@/lib/utils'
import { SectionHead } from './SectionHead'

/* Bento placement by registry order. Index 0 is the lead tile. */
const SPANS = [
  'lg:col-span-4 lg:row-span-2',
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-6',
]

/**
 * The flagship systems as a bento grid.
 *
 * Each tile carries a composition bar: its stages split by who decides at
 * each one, a script, a model or a person. It is computed from the same typed
 * diagram the case study renders, so the tile cannot drift from the page it
 * links to. Below the grid, the same data compares every system on one scale.
 */
export function SystemsBento() {
  return (
    <section id="systems" className="page-x mx-auto max-w-page scroll-mt-20 py-20 sm:py-24" aria-labelledby="systems-title">
      <SectionHead
        index="01"
        label="Flagship systems"
        id="systems-title"
        title={
          <>
            Harnesses for work that cannot afford to be{' '}
            <span className="text-accent">wrong quietly</span>.
          </>
        }
        lede="Each one separates what a script measured from what a model judged, and ends with a section on what it cannot do. Every figure was computed against a clone, with the method stated."
      />

      <ul className="mt-12 grid auto-rows-[minmax(0,auto)] gap-4 lg:grid-cols-6">
        {featured.map((p, i) => (
          <li key={p.slug} className={cn('min-w-0', SPANS[i] ?? 'lg:col-span-2')}>
            <SystemTile project={p} lead={i === 0} wide={i === 5} />
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <ModelBoundaryChart projects={featuredProjects} />
      </div>
    </section>
  )
}

function SystemTile({ project: p, lead, wide }: { project: ProjectWithRepo; lead: boolean; wide: boolean }) {
  const composition = p.diagram ? stageComposition(p.diagram) : null
  const evidence = (p.evidence ?? []).slice(0, lead ? 3 : 2)
  const href = p.problem ? `/projects/${p.slug}/` : undefined

  return (
    <article
      className={cn(
        'spotlight plate group flex h-full flex-col p-5 transition-colors sm:p-6',
        lead && 'lg:p-8',
        wide && 'lg:flex-row lg:items-center lg:gap-10'
      )}
    >
      <div className={cn('min-w-0', wide && 'lg:flex-1')}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.05em] text-ink-muted">
          <span className="text-accent">{p.github?.primaryLanguage ?? p.stack[0]}</span>
          <span>{p.year}</span>
          {p.domains.slice(0, lead ? 3 : 2).map((d) => (
            <span key={d}>{DOMAINS[d]}</span>
          ))}
        </p>

        <h3 className={cn('mt-3 text-ink', lead ? 'text-3xl' : 'text-xl')}>
          {href ? (
            <Link href={href} className="after:absolute after:inset-0 after:rounded-[inherit] after:content-['']">
              {p.name}
            </Link>
          ) : (
            p.name
          )}
        </h3>
        <p className={cn('mt-2 text-ink-soft', lead ? 'max-w-text text-base' : 'text-sm')}>{p.tagline}</p>
      </div>

      {composition && (
        <div className={cn('mt-5', wide && 'lg:mt-0 lg:w-80')}>
          <StageBar composition={composition} name={p.name} />
          <StageLegend composition={composition} className="mt-2.5 text-xs" />
        </div>
      )}

      {evidence.length > 0 && !wide && (
        <dl className={cn('mt-6 grid gap-4 border-t border-rule pt-5', lead ? 'sm:grid-cols-3' : 'grid-cols-2')}>
          {evidence.map((e) => (
            <div key={e.label} className="flex min-w-0 flex-col-reverse justify-end">
              <dt className="mt-1 text-xs leading-snug text-ink-muted">{e.label}</dt>
              <dd className={cn('font-semibold tracking-tight text-ink tabular-nums', lead ? 'text-3xl' : 'text-xl')}>
                {e.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className={cn('mt-auto flex items-center justify-between gap-3 pt-6', wide && 'lg:pt-0')}>
        {href ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-ink transition-colors group-hover:text-accent">
            Case study
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </span>
        ) : (
          <span />
        )}
        {p.github?.url ? (
          <a
            href={p.github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.name} on GitHub`}
            className="relative z-10 grid size-8 place-items-center rounded-full border border-rule text-ink-muted transition-colors hover:border-ink hover:text-ink"
          >
            <Github size={14} aria-hidden />
          </a>
        ) : (
          <span className="text-xs font-medium uppercase tracking-[0.05em] text-ink-faint">Private repository</span>
        )}
      </div>
    </article>
  )
}

