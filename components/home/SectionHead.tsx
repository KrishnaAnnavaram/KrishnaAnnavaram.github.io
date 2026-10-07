/**
 * The heading every home section opens with: a numbered mono label, a title,
 * and at most two sentences of lede. One component so the rhythm is the same
 * in every section.
 */
export function SectionHead({
  index,
  label,
  title,
  lede,
  id,
  aside,
}: {
  index: string
  label: string
  title: React.ReactNode
  lede?: React.ReactNode
  id?: string
  aside?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
      <div className="max-w-3xl">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span aria-hidden className="h-px w-8 bg-rule-strong" />
          {label}
        </p>
        <h2 id={id} className="mt-4 text-3xl text-ink">
          {title}
        </h2>
        {lede && <p className="mt-4 max-w-text text-ink-muted">{lede}</p>}
      </div>
      {aside}
    </div>
  )
}
