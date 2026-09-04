import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Small monospace chip. Used for stacks, tags, and role types. */
export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-rule bg-surface px-2.5 py-1 font-mono text-2xs uppercase tracking-[0.08em] text-ink-muted',
        className
      )}
    >
      {children}
    </span>
  )
}

/** The primary call to action. One filled button per view, at most. */
export function ButtonLink({
  href,
  children,
  external,
  variant = 'solid',
  className,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  variant?: 'solid' | 'outline'
  className?: string
}) {
  const classes = cn(
    'group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all duration-200',
    variant === 'solid'
      ? 'bg-ink text-paper hover:bg-accent'
      : 'border border-rule-strong text-ink hover:border-ink hover:bg-sunken',
    className
  )

  const inner = (
    <>
      {children}
      {external ? (
        <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" aria-hidden />
      ) : (
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      )}
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  )
}

/** Understated inline link with a growing underline. */
export function TextLink({
  href,
  children,
  external,
  className,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}) {
  const classes = cn(
    'link-underline inline-flex items-baseline gap-1 text-ink transition-colors duration-200 hover:text-accent',
    className
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <ArrowUpRight size={13} className="translate-y-px text-ink-faint" aria-hidden />
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

/** Section label sitting in the left column of a two-column section. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="eyebrow sticky top-24 self-start">{children}</h2>
}

/** A measured result: big figure, small caption. */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-3xl leading-none text-ink">{value}</p>
      <p className="mt-2.5 text-sm text-ink-muted">{label}</p>
    </div>
  )
}
