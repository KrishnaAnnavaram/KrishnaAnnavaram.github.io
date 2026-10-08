import { cn } from '@/lib/utils'
import { STAGE_CATEGORIES, type StageComposition, type StageCategoryId } from '@/lib/architecture'

/* Literal class names so Tailwind keeps them. Order matches STAGE_CATEGORIES. */
export const STAGE_FILL: Record<StageCategoryId, string> = {
  script: 'bg-chart-script',
  model: 'bg-chart-model',
  human: 'bg-chart-human',
  data: 'bg-chart-data',
}

/**
 * One horizontal stacked bar: how a system's stages split across script,
 * model, human gate and data.
 *
 * Mark spec: a 2px surface gap between segments, the baseline end square and
 * the data end rounded, and a hover tooltip per segment. `scale` is the number
 * of stages the full track represents, pass a shared value so several bars
 * compare on one axis, or omit it for a bar that fills its own track.
 */
export function StageBar({
  composition,
  name,
  scale,
  thick = false,
}: {
  composition: StageComposition
  /** System name, for the tooltip. */
  name: string
  scale?: number
  thick?: boolean
}) {
  const full = scale ?? composition.total
  const parts = composition.parts.filter((p) => p.count > 0)

  return (
    // z-10 lifts the bar above a card's stretched-link overlay so segments still
    // receive hover; the link stays clickable everywhere else on the card.
    <div className={cn('relative z-10 flex w-full', thick ? 'h-3.5' : 'h-2.5')} aria-hidden>
      <div className="flex gap-0.5" style={{ width: `${(composition.total / full) * 100}%` }}>
        {parts.map((p, i) => (
          <div
            key={p.id}
            className={cn(
              'group/seg relative h-full',
              STAGE_FILL[p.id],
              i === parts.length - 1 && 'rounded-r-[4px]'
            )}
            style={{ width: `${(p.count / composition.total) * 100}%` }}
          >
            {/* Hover target taller than the mark, so a 10px bar is easy to hit. */}
            <span className="absolute -inset-y-2 inset-x-0" />
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-20 w-max max-w-[16rem] -translate-x-1/2 rounded-lg border border-rule bg-surface px-3 py-2 text-xs text-ink-soft shadow-lg hidden group-hover/seg:block"
            >
              <span className="block font-medium text-ink">{name}</span>
              {p.label}: <span className="font-semibold text-ink tabular-nums">{p.count}</span> of{' '}
              {composition.total} stages
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Legend in the fixed category order; swatches carry identity, text stays ink. */
export function StageLegend({
  composition,
  className,
}: {
  /** With a composition, each entry shows its count and empty categories drop out. */
  composition?: StageComposition
  className?: string
}) {
  const items = STAGE_CATEGORIES.map((c) => ({
    ...c,
    count: composition?.parts.find((p) => p.id === c.id)?.count,
  })).filter((c) => !composition || (c.count ?? 0) > 0)

  return (
    <ul className={cn('flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-muted', className)}>
      {items.map((c) => (
        <li key={c.id} className="flex items-center gap-2">
          <span aria-hidden className={cn('size-2.5 rounded-[3px]', STAGE_FILL[c.id])} />
          {composition ? (
            <span>
              <span className="font-semibold text-ink tabular-nums">{c.count}</span> {c.label}
            </span>
          ) : (
            c.label
          )}
        </li>
      ))}
    </ul>
  )
}
