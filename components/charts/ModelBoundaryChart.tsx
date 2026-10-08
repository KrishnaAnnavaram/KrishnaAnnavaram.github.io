import Link from 'next/link'
import { stageComposition, STAGE_CATEGORIES } from '@/lib/architecture'
import type { Project } from '@/data/projects'
import { StageBar, StageLegend } from './StageBar'

/**
 * "Where the model sits": one row per flagship, every row on the same scale
 * (number of stages), split by who decides at each stage.
 *
 * A shared scale rather than 100% bars, so a reader sees both how large each
 * pipeline is and how much of it is a model. The totals are labelled directly
 * at the end of each bar; exact counts are in the hover tooltips and in the
 * table view below the chart, which is also what a screen reader gets.
 */
export function ModelBoundaryChart({ projects }: { projects: Project[] }) {
  const rows = projects
    .filter((p) => p.diagram)
    .map((p) => ({ project: p, composition: stageComposition(p.diagram!) }))
  if (rows.length === 0) return null
  const scale = Math.max(...rows.map((r) => r.composition.total))

  return (
    <figure className="plate p-5 sm:p-7">
      <figcaption className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div>
          <p className="text-lg font-semibold text-ink">Where the model sits</p>
          <p className="mt-1 max-w-xl text-sm text-ink-muted">
            Stages in each system&rsquo;s architecture diagram, by who makes the decision at that stage. Hover a segment for its count.
          </p>
        </div>
        <StageLegend />
      </figcaption>

      <ol className="mt-7 space-y-4" aria-hidden>
        {rows.map(({ project, composition }) => (
          <li key={project.slug} className="grid items-center gap-x-5 gap-y-1.5 sm:grid-cols-[15rem_minmax(0,1fr)]">
            <Link
              href={`/projects/${project.slug}/`}
              tabIndex={-1}
              className="line-clamp-2 text-sm font-medium leading-snug text-ink-soft transition-colors hover:text-accent"
            >
              {project.name}
            </Link>
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <StageBar composition={composition} name={project.name} scale={scale} thick />
              </div>
              <span className="w-[5.5rem] shrink-0 whitespace-nowrap text-sm text-ink-muted tabular-nums">
                <span className="font-semibold text-ink">{composition.total}</span> stages
              </span>
            </div>
          </li>
        ))}
      </ol>

      <details className="mt-6 border-t border-rule pt-4 text-sm">
        <summary className="cursor-pointer text-ink-muted transition-colors hover:text-ink">View as a table</summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left tabular-nums">
            <thead>
              <tr className="border-b border-rule text-xs uppercase tracking-[0.05em] text-ink-muted">
                <th scope="col" className="py-2 pr-4 font-medium">System</th>
                {STAGE_CATEGORIES.map((c) => (
                  <th key={c.id} scope="col" className="py-2 pr-4 font-medium">{c.label}</th>
                ))}
                <th scope="col" className="py-2 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ project, composition }) => (
                <tr key={project.slug} className="border-b border-rule last:border-0">
                  <th scope="row" className="py-2 pr-4 font-medium text-ink">{project.name}</th>
                  {composition.parts.map((p) => (
                    <td key={p.id} className="py-2 pr-4 text-ink-soft">{p.count}</td>
                  ))}
                  <td className="py-2 font-semibold text-ink">{composition.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  )
}
