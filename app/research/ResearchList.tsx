'use client'

import { useMemo, useState } from 'react'
import { FileText, Search } from 'lucide-react'
import type { Publication } from '@/data/publications'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'authored' | 'supervised'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'authored', label: 'Co-authored' },
  { value: 'supervised', label: 'Supervised' },
]

export function ResearchList({ publications }: { publications: Publication[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const counts = useMemo(
    () => ({
      all: publications.length,
      authored: publications.filter((p) => p.type !== 'Supervised Research').length,
      supervised: publications.filter((p) => p.type === 'Supervised Research').length,
    }),
    [publications]
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return publications.filter((p) => {
      if (filter === 'authored' && p.type === 'Supervised Research') return false
      if (filter === 'supervised' && p.type !== 'Supervised Research') return false
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.abstract.toLowerCase().includes(q)
      )
    })
  }, [publications, filter, query])

  return (
    <>
      <div className="page-x mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 pb-8">
        <div role="tablist" aria-label="Filter research" className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200',
                filter === f.value
                  ? 'border-ink bg-ink text-paper'
                  : 'border-rule text-ink-muted hover:border-rule-strong hover:text-ink'
              )}
            >
              {f.label}
              <span className="ml-1.5 font-mono text-2xs opacity-60">{counts[f.value]}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by topic…"
            aria-label="Filter research by topic"
            className="w-full rounded-full border border-rule bg-surface py-1.5 pl-9 pr-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-rule-strong"
          />
        </div>
      </div>

      <div className="page-x mx-auto max-w-page pb-16">
        <p aria-live="polite" className="eyebrow rule-t py-4">
          {results.length} {results.length === 1 ? 'entry' : 'entries'}
        </p>

        <ul>
          {results.map((pub) => {
            const open = openId === pub.id
            return (
              <li key={pub.id} id={pub.id} className="scroll-mt-24 border-b border-rule">
                <div className="grid gap-4 py-6 md:grid-cols-[1fr_auto] md:gap-8">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-2xs uppercase tracking-[0.14em] text-accent">
                        {pub.type === 'Supervised Research' ? 'Supervised' : pub.type}
                      </span>
                      <span className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-faint">
                        {pub.year} · {pub.venue}
                      </span>
                    </div>

                    <h3 className="mt-2.5 font-sans text-base font-semibold leading-snug tracking-tight text-ink">
                      {pub.title}
                    </h3>

                    <p className="mt-2 text-sm text-ink-muted">
                      {pub.authors.slice(0, 3).join(', ')}
                      {pub.authors.length > 3 && ` +${pub.authors.length - 3}`}
                    </p>

                    <button
                      onClick={() => setOpenId(open ? null : pub.id)}
                      aria-expanded={open}
                      className="mt-3 font-mono text-2xs uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-accent"
                    >
                      {open ? '− Hide abstract' : '+ Abstract'}
                    </button>

                    {open && (
                      <div className="mt-4 max-w-text border-l-2 border-accent pl-4">
                        <p className="text-sm text-ink-soft">{pub.abstract}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {pub.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-rule px-2 py-0.5 font-mono text-2xs text-ink-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {pub.url && (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-fit shrink-0 items-center gap-2 rounded-full border border-rule px-3.5 py-1.5 text-sm text-ink-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      <FileText size={13} aria-hidden />
                      Report
                      <span className="sr-only">for {pub.title} (PDF)</span>
                    </a>
                  )}
                </div>
              </li>
            )
          })}
        </ul>

        {results.length === 0 && (
          <p className="py-16 text-center text-sm text-ink-muted">
            Nothing matches “{query}”.
          </p>
        )}
      </div>
    </>
  )
}
