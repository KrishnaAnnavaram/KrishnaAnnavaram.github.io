'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * The project index, filterable.
 *
 * The client receives a trimmed projection of each project rather than the
 * full registry — no case-study prose, no README text. That keeps the page
 * payload in single-digit kilobytes while still supporting search across the
 * fields anyone would actually search by.
 *
 * Filtering is synchronous over a list this size; `useDeferredValue` keeps
 * typing responsive without adding a debounce that would make it feel laggy.
 */

export interface ExplorerItem {
  slug: string
  name: string
  tagline: string
  year: string
  featured: boolean
  /** Where the row goes. Internal case study, or the repository if none. */
  href?: string
  /** True when `href` leaves the site. */
  external?: boolean
  /** "Repository" or the employer — shown so the two kinds are distinguishable. */
  context: string
  domains: { id: string; label: string }[]
  stack: string[]
  repoUrl?: string
  language?: string | null
  pushedAt?: string
  pushedLabel?: string
}

type Sort = 'curated' | 'recent'

export function ProjectExplorer({
  items,
  domains,
}: {
  items: ExplorerItem[]
  domains: { id: string; label: string; count: number }[]
}) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<string[]>([])
  const [sort, setSort] = useState<Sort>('curated')
  const deferred = useDeferredValue(query)

  const languages = useMemo(() => {
    const seen = new Map<string, number>()
    for (const i of items) {
      if (i.language) seen.set(i.language, (seen.get(i.language) ?? 0) + 1)
    }
    return [...seen.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name)
  }, [items])

  const results = useMemo(() => {
    const q = deferred.trim().toLowerCase()

    let out = items.filter((item) => {
      // Domain/language filters are AND across facets, OR within one.
      if (active.length > 0) {
        const tags = [...item.domains.map((d) => d.id), ...(item.language ? [item.language] : [])]
        if (!active.every((a) => tags.includes(a))) return false
      }
      if (!q) return true
      const haystack = [
        item.name,
        item.tagline,
        item.year,
        item.language ?? '',
        ...item.stack,
        ...item.domains.map((d) => d.label),
      ]
        .join(' ')
        .toLowerCase()
      return q.split(/\s+/).every((term) => haystack.includes(term))
    })

    out = [...out].sort((a, b) => {
      if (sort === 'recent') {
        return (b.pushedAt ?? '').localeCompare(a.pushedAt ?? '')
      }
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return 0
    })

    return out
  }, [items, deferred, active, sort])

  const toggle = (id: string) =>
    setActive((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))

  const clear = () => {
    setActive([])
    setQuery('')
  }

  const filtered = active.length > 0 || query.trim().length > 0

  return (
    <div>
      {/* ── Controls ───────────────────────────────────────────────────── */}
      <div className="plate p-3.5 sm:p-4">
        <div className="flex items-center gap-2.5">
          <Search size={15} className="shrink-0 text-ink-faint" aria-hidden />
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full min-w-0 bg-transparent py-1 text-sm text-ink placeholder:text-ink-faint"
          />
          {filtered && (
            <button
              type="button"
              onClick={clear}
              className="flex shrink-0 items-center gap-1 font-mono text-3xs uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
            >
              <X size={11} aria-hidden />
              Clear
            </button>
          )}
        </div>

        <fieldset className="mt-4 border-t border-rule pt-3.5">
          <legend className="sr-only">Filter by domain and language</legend>
          <div className="flex flex-wrap gap-1.5">
            {domains.map((d) => (
              <FilterChip
                key={d.id}
                label={d.label}
                count={d.count}
                active={active.includes(d.id)}
                onClick={() => toggle(d.id)}
              />
            ))}
            {languages.map((lang) => (
              <FilterChip
                key={lang}
                label={lang}
                mono
                active={active.includes(lang)}
                onClick={() => toggle(lang)}
              />
            ))}
          </div>
        </fieldset>
      </div>

      {/* ── Result count + sort ────────────────────────────────────────── */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow" aria-live="polite">
          {results.length} {results.length === 1 ? 'project' : 'projects'}
          {filtered ? ` of ${items.length}` : ''}
        </p>
        <div className="flex items-center gap-1">
          <span className="eyebrow">Sort</span>
          {(['curated', 'recent'] as Sort[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSort(s)}
              aria-pressed={sort === s}
              className={cn(
                'rounded-full px-2.5 py-1 font-mono text-3xs uppercase tracking-[0.12em] transition-colors',
                sort === s ? 'bg-ink text-paper' : 'text-ink-muted hover:text-ink'
              )}
            >
              {s === 'curated' ? 'Featured' : 'Recent'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results ────────────────────────────────────────────────────── */}
      {results.length === 0 ? (
        <div className="plate mt-4 px-4 py-10 text-center">
          <p className="text-sm text-ink">Nothing matches that combination.</p>
          <button
            type="button"
            onClick={clear}
            className="mt-2 font-mono text-3xs uppercase tracking-[0.12em] text-accent"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-4">
          {results.map((item) => (
            <li key={item.slug}>
              <ProjectRow item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function FilterChip({
  label,
  count,
  active,
  mono,
  onClick,
}: {
  label: string
  count?: number
  active: boolean
  mono?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-2.5 py-1 text-xs transition-colors duration-[var(--duration-fast)]',
        mono && 'font-mono text-3xs uppercase tracking-[0.1em]',
        active
          ? 'border-ink bg-ink text-paper'
          : 'border-rule text-ink-muted hover:border-rule-strong hover:text-ink'
      )}
    >
      {label}
      {count !== undefined && (
        <span className={cn('ml-1.5 tabular', active ? 'text-paper/60' : 'text-ink-faint')}>
          {count}
        </span>
      )}
    </button>
  )
}

function ProjectRow({ item }: { item: ExplorerItem }) {
  const href = item.href
  const external = Boolean(item.external)

  const inner = (
    <>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-2xs uppercase tracking-[0.14em] text-accent">
          {item.context}
        </span>
        <span className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-faint tabular">
          {item.year}
        </span>
        {item.language && (
          <span className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-faint">
            {item.language}
          </span>
        )}
        {item.pushedLabel && (
          <span className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-faint">
            pushed {item.pushedLabel}
          </span>
        )}
      </div>

      <h3 className="mt-2 flex items-start gap-1.5 text-xl text-ink transition-colors duration-[var(--duration-fast)] group-hover:text-accent">
        <span>{item.name}</span>
        {external && <ArrowUpRight size={15} className="mt-1.5 shrink-0" aria-hidden />}
      </h3>

      <p className="mt-1.5 max-w-text text-sm text-ink-soft">{item.tagline}</p>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {item.domains.map((d) => (
          <li
            key={d.id}
            className="rounded-full border border-rule px-2 py-0.5 text-2xs text-ink-muted"
          >
            {d.label}
          </li>
        ))}
      </ul>
    </>
  )

  const className =
    'group block border-b border-rule py-6 transition-colors duration-[var(--duration-fast)]'

  if (!href) return <div className={className}>{inner}</div>

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  )
}
