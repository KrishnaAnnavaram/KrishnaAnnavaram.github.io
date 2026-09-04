'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PaletteItem {
  href: string
  label: string
  group: string
  hint?: string
}

/** Subsequence match — "grarag" finds "Grounded research assistant". */
function score(query: string, haystack: string): number {
  if (!query) return 0
  const q = query.toLowerCase()
  const h = haystack.toLowerCase()

  const direct = h.indexOf(q)
  if (direct === 0) return 1000
  if (direct > 0) return 500 - direct

  let qi = 0
  let gaps = 0
  let last = -1
  for (let hi = 0; hi < h.length && qi < q.length; hi++) {
    if (h[hi] === q[qi]) {
      if (last >= 0) gaps += hi - last - 1
      last = hi
      qi++
    }
  }
  return qi === q.length ? 200 - Math.min(gaps, 190) : -1
}

export function CommandPalette({ items }: { items: PaletteItem[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    if (!query.trim()) return items.slice(0, 8)
    return items
      .map((item) => ({ item, s: Math.max(score(query, item.label), score(query, item.group) - 100) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.item)
  }, [items, query])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActive(0)
  }, [])

  const go = useCallback(
    (href: string) => {
      close()
      router.push(href)
    },
    [close, router]
  )

  // Global open shortcut.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === '/' && !open) {
        const el = document.activeElement
        const typing = el instanceof HTMLElement && /input|textarea/i.test(el.tagName)
        if (!typing) {
          e.preventDefault()
          setOpen(true)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Keep the highlighted row in view during arrow navigation.
  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') return close()
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (results.length ? (i + 1) % results.length : 0))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    }
    if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      go(results[active].href)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className="group flex items-center gap-2 rounded-full border border-rule bg-surface py-1.5 pl-3 pr-1.5 text-ink-muted transition-colors duration-200 hover:border-rule-strong hover:text-ink"
      >
        <Search size={13} strokeWidth={2} aria-hidden />
        <span className="hidden text-sm sm:inline">Search</span>
        <kbd className="hidden rounded-full border border-rule bg-sunken px-1.5 py-0.5 font-mono text-2xs text-ink-faint sm:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-100 flex items-start justify-center px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <button
            aria-label="Close search"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 cursor-default bg-ink/25 backdrop-blur-[2px]"
          />

          <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-rule bg-surface shadow-2xl shadow-ink/10">
            <div className="flex items-center gap-3 border-b border-rule px-4">
              <Search size={15} className="shrink-0 text-ink-faint" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search work, research, writing…"
                aria-label="Search query"
                className="w-full bg-transparent py-3.5 text-base text-ink outline-none placeholder:text-ink-faint"
              />
              <kbd className="shrink-0 rounded border border-rule px-1.5 py-0.5 font-mono text-2xs text-ink-faint">
                esc
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-1.5">
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-ink-muted">
                  Nothing matches “{query}”.
                </p>
              ) : (
                results.map((item, i) => (
                  <button
                    key={`${item.group}-${item.href}-${item.label}`}
                    data-active={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(item.href)}
                    className={cn(
                      'flex w-full items-baseline gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-100',
                      i === active ? 'bg-sunken' : 'bg-transparent'
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate text-sm text-ink">{item.label}</span>
                    <span className="eyebrow shrink-0">{item.group}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
