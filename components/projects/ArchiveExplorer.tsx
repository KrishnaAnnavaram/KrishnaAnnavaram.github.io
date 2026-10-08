'use client'

import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * The archive index: seventy-odd repositories, searchable and filterable.
 *
 * Filter state lives in the URL (`?q=` and `?category=`) so a filtered view
 * can be shared and the command palette can deep-link into it. It is read from
 * `window.location` after mount rather than through `useSearchParams`, which
 * would force a client-only bailout of the whole page under static export.
 */

export interface ArchiveRow {
  repo: string
  url: string
  tagline: string
  category: string
  categoryLabel: string
  stack: string[]
  pipeline: string | null
  note: string | null
  tests: number | null
  llm: boolean
}

export function ArchiveExplorer({
  rows,
  categories,
}: {
  rows: ArchiveRow[]
  categories: { id: string; label: string; count: number }[]
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [llmOnly, setLlmOnly] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  const deferred = useDeferredValue(query)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setQuery(params.get('q') ?? '')
    const c = params.get('category')
    if (c && categories.some((x) => x.id === c)) setCategory(c)
  }, [categories])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (query) params.set('q', query)
    else params.delete('q')
    if (category) params.set('category', category)
    else params.delete('category')
    const search = params.toString()
    const next = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`
    window.history.replaceState(window.history.state, '', next)
  }, [query, category])

  const results = useMemo(() => {
    const terms = deferred.trim().toLowerCase().split(/\s+/).filter(Boolean)
    return rows.filter((r) => {
      if (category && r.category !== category) return false
      if (llmOnly && !r.llm) return false
      if (terms.length === 0) return true
      const hay = [r.repo, r.tagline, r.categoryLabel, r.pipeline ?? '', ...r.stack].join(' ').toLowerCase()
      return terms.every((t) => hay.includes(t))
    })
  }, [rows, deferred, category, llmOnly])

  const filtered = Boolean(query || category || llmOnly)
  const clear = () => {
    setQuery('')
    setCategory(null)
    setLlmOnly(false)
  }

  return (
    <div>
      <div className="plate p-3.5 sm:p-4">
        <div className="flex items-center gap-2.5">
          <Search size={15} className="shrink-0 text-ink-faint" aria-hidden />
          <label htmlFor="archive-search" className="sr-only">
            Search earlier work
          </label>
          <input
            id="archive-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, topic or tool — “rag”, “pytorch”, “forecast”…"
            className="w-full min-w-0 bg-transparent py-1 text-sm text-ink placeholder:text-ink-faint"
          />
          {filtered && (
            <button
              type="button"
              onClick={clear}
              className="flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-medium uppercase tracking-[0.05em] text-ink-muted transition-colors hover:text-ink"
            >
              <X size={11} aria-hidden />
              Clear
            </button>
          )}
        </div>

        <fieldset className="mt-4 border-t border-rule pt-3.5">
          <legend className="sr-only">Filter by category</legend>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory((cur) => (cur === c.id ? null : c.id))}
                aria-pressed={category === c.id}
                className={cn(
                  'min-h-7 rounded-full border px-2.5 py-1 text-xs transition-colors',
                  category === c.id
                    ? 'border-ink bg-ink text-paper'
                    : 'border-rule text-ink-muted hover:border-rule-strong hover:text-ink'
                )}
              >
                {c.label}
                <span className={cn('ml-1.5 tabular', category === c.id ? 'text-paper/70' : 'text-ink-faint')}>
                  {c.count}
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setLlmOnly((v) => !v)}
              aria-pressed={llmOnly}
              className={cn(
                'min-h-7 rounded-full border px-2.5 py-1 text-xs font-medium uppercase tracking-[0.05em] transition-colors',
                llmOnly ? 'border-model bg-model-wash text-model' : 'border-rule text-ink-muted hover:text-ink'
              )}
            >
              ◆ Uses an LLM
            </button>
          </div>
        </fieldset>
      </div>

      <p className="eyebrow mt-5" aria-live="polite">
        {results.length} {results.length === 1 ? 'repository' : 'repositories'}
        {filtered ? ` of ${rows.length}` : ''}
      </p>

      {results.length === 0 ? (
        <div className="plate mt-4 px-4 py-10 text-center">
          <p className="text-sm text-ink">Nothing matches that combination.</p>
          <button type="button" onClick={clear} className="mt-2 text-xs font-medium uppercase tracking-[0.05em] text-accent">
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="plate mt-3 divide-y divide-rule overflow-hidden">
          {results.map((r) => {
            const expanded = open === r.repo
            return (
              <li key={r.repo} className="group/row">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-1 px-4 py-3 transition-colors hover:bg-sunken/60 md:grid-cols-[13rem_minmax(0,1fr)_11rem_auto]">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-w-0 items-center gap-1 font-mono text-xs text-ink transition-colors hover:text-accent"
                  >
                    <span className="truncate">{r.repo}</span>
                    <ArrowUpRight size={12} className="shrink-0 text-ink-faint" aria-hidden />
                    <span className="sr-only">(GitHub)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : r.repo)}
                    aria-expanded={expanded}
                    aria-controls={`row-${r.repo}`}
                    className="col-start-2 row-start-1 justify-self-end rounded-full border border-rule px-2 py-0.5 text-xs font-medium uppercase tracking-[0.05em] text-ink-muted transition-colors hover:text-ink md:col-start-4"
                  >
                    {expanded ? 'Less' : 'More'}
                  </button>
                  <p className="col-span-2 text-sm text-ink-soft md:col-span-1 md:col-start-2 md:row-start-1">
                    {r.llm && <span className="mr-1.5 text-model" title="Uses an LLM" aria-label="Uses an LLM">◆</span>}
                    {r.tagline}
                  </p>
                  <p className="col-span-2 text-xs font-medium uppercase tracking-[0.05em] text-ink-faint md:col-span-1 md:col-start-3 md:row-start-1 md:pt-0.5">
                    {r.categoryLabel}
                    {r.tests ? <span className="text-ink-muted"> · {r.tests} tests</span> : null}
                  </p>
                </div>
                {expanded && (
                  <div id={`row-${r.repo}`} className="border-t border-dashed border-rule bg-sunken/50 px-4 py-3 md:pl-[14.5rem]">
                    {r.pipeline && <p className="font-mono text-2xs leading-relaxed text-ink-soft">{r.pipeline}</p>}
                    {r.note && <p className="mt-2 text-sm text-ink-muted">{r.note}</p>}
                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {r.stack.map((t) => (
                        <li key={t} className="rounded-full border border-rule px-2 py-0.5 text-xs font-medium uppercase tracking-[0.05em] text-ink-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
