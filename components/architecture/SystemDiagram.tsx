'use client'

import { useId, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  NODE_KIND_META,
  type DiagramNode,
  type SystemDiagram as Diagram,
} from '@/lib/architecture'

/* ─────────────────────────────────────────────────────────────────────────
   Tone → class. Kept as a lookup rather than interpolated strings so Tailwind
   sees every class literally and does not tree-shake them away.
   ───────────────────────────────────────────────────────────────────────── */

const TONE: Record<string, { chip: string; bar: string; ring: string }> = {
  accent: {
    chip: 'text-accent',
    bar: 'bg-accent',
    ring: 'border-accent/45',
  },
  verify: {
    chip: 'text-verify',
    bar: 'bg-verify',
    ring: 'border-verify/45',
  },
  neutral: {
    chip: 'text-ink-soft',
    bar: 'bg-rule-strong',
    ring: 'border-rule-strong',
  },
  faint: {
    chip: 'text-ink-faint',
    bar: 'bg-rule',
    ring: 'border-rule',
  },
}

function Node({
  node,
  index,
  open,
  onToggle,
}: {
  node: DiagramNode
  index: number
  open: boolean
  onToggle: () => void
}) {
  const meta = NODE_KIND_META[node.kind]
  const tone = TONE[meta.tone]
  const hasDetail = Boolean(
    node.detail && (node.detail.inputs || node.detail.outputs || node.detail.tech || node.detail.note)
  )
  const panelId = `${node.id}-detail`

  return (
    <li className="relative">
      {/* Connector into this node. Vertical on mobile, horizontal from lg. */}
      {index > 0 && (
        <span
          aria-hidden
          className={cn(
            'absolute left-1/2 -top-4 h-4 w-px -translate-x-1/2 bg-rule',
            'lg:left-auto lg:-left-4 lg:top-1/2 lg:h-px lg:w-4 lg:translate-x-0 lg:-translate-y-1/2'
          )}
        />
      )}

      <div
        className={cn(
          'plate h-full overflow-hidden transition-colors duration-[var(--duration-base)]',
          open ? tone.ring : 'border-rule'
        )}
      >
        <span aria-hidden className={cn('block h-0.5 w-full', tone.bar)} />

        <div className="p-3.5">
          <p className="flex items-center gap-2">
            <span className={cn('font-mono text-3xs uppercase tracking-[0.12em]', tone.chip)}>
              {meta.label}
            </span>
          </p>

          <h4 className="mt-1.5 font-sans text-sm font-semibold leading-snug text-ink">
            {node.label}
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">{node.summary}</p>

          {hasDetail && (
            <>
              <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={panelId}
                className="mt-2.5 font-mono text-3xs uppercase tracking-[0.12em] text-ink-faint transition-colors hover:text-ink"
              >
                {open ? '− Hide detail' : '+ Detail'}
              </button>

              {/* Rendered in the DOM whenever open; `hidden` keeps it in the
                  a11y tree's control rather than unmounting and losing focus. */}
              <div id={panelId} hidden={!open} className="mt-3 space-y-2 border-t border-rule pt-3">
                {node.detail?.inputs && (
                  <DetailRow label="In" items={node.detail.inputs} />
                )}
                {node.detail?.outputs && (
                  <DetailRow label="Out" items={node.detail.outputs} />
                )}
                {node.detail?.tech && <DetailRow label="Uses" items={node.detail.tech} />}
                {node.detail?.note && (
                  <p className="text-xs leading-relaxed text-ink-soft">
                    <span className="font-mono text-3xs uppercase tracking-[0.12em] text-ink-faint">
                      Why
                    </span>{' '}
                    {node.detail.note}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  )
}

function DetailRow({ label, items }: { label: string; items: string[] }) {
  return (
    <p className="flex gap-2 text-xs leading-relaxed">
      <span className="shrink-0 font-mono text-3xs uppercase tracking-[0.12em] text-ink-faint">
        {label}
      </span>
      <span className="text-ink-soft">{items.join(' · ')}</span>
    </p>
  )
}

export function SystemDiagram({ diagram }: { diagram: Diagram }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const figureId = useId()

  // Only show legend entries for kinds the diagram actually contains.
  const kindsUsed = Array.from(
    new Set(diagram.groups.flatMap((g) => g.nodes.map((n) => n.kind)))
  )

  return (
    <figure
      className="my-10"
      aria-labelledby={`${figureId}-title`}
      role="group"
    >
      <figcaption className="mb-4">
        <h3 id={`${figureId}-title`} className="font-sans text-sm font-semibold text-ink">
          {diagram.title}
        </h3>
        <p className="mt-1 max-w-text text-sm text-ink-muted">{diagram.caption}</p>
      </figcaption>

      <div className="rounded-[3px] border border-rule bg-sunken p-4 sm:p-5">
        {diagram.groups.map((group, gi) => (
          <div key={group.label ?? gi} className={gi > 0 ? 'mt-7' : undefined}>
            {/* A boundary the system enforces, drawn rather than described. */}
            {group.boundary && (
              <p className="mb-4 flex items-center gap-3 border-t-2 border-dashed border-accent/50 pt-3">
                <span className="font-mono text-3xs uppercase tracking-[0.12em] text-accent">
                  {group.boundary}
                </span>
              </p>
            )}

            {group.label && (
              <p className="eyebrow mb-3 flex items-center gap-3">
                <span>{group.label}</span>
                <span aria-hidden className="h-px flex-1 bg-rule" />
              </p>
            )}

            <ol
              className={cn(
                'grid gap-4',
                'lg:auto-cols-fr lg:grid-flow-col lg:gap-8'
              )}
            >
              {group.nodes.map((node, i) => (
                <Node
                  key={node.id}
                  node={node}
                  index={i}
                  open={openId === node.id}
                  onToggle={() => setOpenId((cur) => (cur === node.id ? null : node.id))}
                />
              ))}
            </ol>
          </div>
        ))}

        {/* Legend. Explains the one thing the diagram is really communicating:
            which stages are deterministic and which involve a model. */}
        {/* A grid, not flex-wrap: wrapped rows packed independently, so one
            row's label started 15px right of the next one's and the first
            description detached from its marker. */}
        <ul className="mt-6 grid gap-x-4 gap-y-1.5 border-t border-rule pt-4 sm:grid-cols-[auto_auto_1fr]">
          {kindsUsed.map((kind) => {
            const meta = NODE_KIND_META[kind]
            return (
              <li key={kind} className="contents">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className={cn('h-0.5 w-4 shrink-0 rounded-full', TONE[meta.tone].bar)}
                  />
                  <span className="font-mono text-3xs uppercase tracking-[0.12em] text-ink-muted">
                    {meta.label}
                  </span>
                </span>
                <span className="text-xs text-ink-soft">{meta.description}</span>
                <span aria-hidden className="hidden sm:block" />
              </li>
            )
          })}
        </ul>
      </div>

      {diagram.footnote && (
        <p className="mt-3 max-w-text text-xs leading-relaxed text-ink-muted">
          {diagram.footnote}
        </p>
      )}
    </figure>
  )
}
