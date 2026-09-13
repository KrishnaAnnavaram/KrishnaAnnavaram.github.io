'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CornerDownLeft, Loader2, Search, X } from 'lucide-react'
import { loadRetriever, type Retriever } from '@/lib/assistant/retrieval'
import type { Answer } from '@/lib/assistant/types'
import { cn } from '@/lib/utils'

/**
 * The portfolio assistant.
 *
 * It retrieves; it does not generate. Every sentence a visitor reads here is a
 * passage that already exists somewhere on this site, shown verbatim with a
 * link to where it came from. When retrieval finds nothing above the relevance
 * floor it says so instead of assembling a plausible answer.
 *
 * That is a deliberate design position, not a hosting workaround. A portfolio
 * that argues for grounded retrieval and traceable evidence should not ship an
 * assistant that can invent its owner's work history.
 */

const KIND_LABEL: Record<string, string> = {
  'case-study': 'Case study',
  project: 'Project',
  experience: 'Experience',
  profile: 'Profile',
  writing: 'Writing',
  research: 'Research',
  skills: 'Skills',
  education: 'Education',
  contact: 'Contact',
}

type Status = 'idle' | 'loading' | 'ready' | 'error'

/* Inlined at build time, so the index resolves correctly when the site is
   served from a subpath rather than the domain root. */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function Assistant({
  open,
  onClose,
  basePath = BASE_PATH,
}: {
  open: boolean
  onClose: () => void
  basePath?: string
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [retriever, setRetriever] = useState<Retriever | null>(null)
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState<Answer | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  /* Index is fetched on first open, never on page load — it costs nothing
     until someone actually asks a question. */
  useEffect(() => {
    if (!open || status !== 'idle') return
    setStatus('loading')
    loadRetriever(basePath)
      .then((r) => {
        setRetriever(r)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [open, status, basePath])

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 40)
      return () => clearTimeout(t)
    }
    setQuery('')
    setAnswer(null)
  }, [open])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  /* Focus trap + escape. A dialog that loses focus to the page behind it is
     unusable with a keyboard. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const ask = useCallback(
    (q: string) => {
      const trimmed = q.trim()
      if (!trimmed || !retriever) return
      setQuery(trimmed)
      setAnswer(retriever.answer(trimmed))
    },
    [retriever]
  )

  if (!open) return null

  const suggestions = retriever?.index.suggestions ?? []

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-ink/25 px-3 py-[8vh] backdrop-blur-[2px] sm:px-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Ask about this portfolio"
        className="plate w-full max-w-2xl shadow-lg"
      >
        {/* ── Header / input ─────────────────────────────────────────── */}
        <div className="flex items-center gap-3 border-b border-rule px-4 py-3">
          <Search size={15} className="shrink-0 text-ink-faint" aria-hidden />
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault()
              ask(new FormData(e.currentTarget).get('q') as string)
            }}
          >
            <label htmlFor="assistant-q" className="sr-only">
              Ask a question about Krishna&rsquo;s work
            </label>
            <input
              id="assistant-q"
              name="q"
              ref={inputRef}
              defaultValue={query}
              autoComplete="off"
              placeholder="Ask about projects, architecture, or experience…"
              disabled={status !== 'ready'}
              className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-faint disabled:opacity-60"
            />
          </form>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-7 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-sunken hover:text-ink"
          >
            <X size={15} aria-hidden />
          </button>
        </div>

        {/* ── Body ───────────────────────────────────────────────────── */}
        <div className="max-h-[62vh] overflow-y-auto px-4 py-4">
          {status === 'loading' && (
            <p className="flex items-center gap-2 py-6 text-sm text-ink-muted">
              <Loader2 size={14} className="animate-spin" aria-hidden />
              Loading the index…
            </p>
          )}

          {status === 'error' && (
            <div className="py-4">
              <p className="text-sm text-ink">The index didn&rsquo;t load.</p>
              <p className="mt-1.5 text-sm text-ink-muted">
                Everything it searches is on the site itself — try{' '}
                <Link href="/work/" className="text-accent link-underline" onClick={onClose}>
                  Work
                </Link>{' '}
                or{' '}
                <Link href="/projects/" className="text-accent link-underline" onClick={onClose}>
                  Projects
                </Link>
                .
              </p>
            </div>
          )}

          {status === 'ready' && !answer && (
            <div>
              <p className="text-sm leading-relaxed text-ink-soft">
                This searches the portfolio and quotes what it finds. It doesn&rsquo;t generate
                text, so it can&rsquo;t invent an answer — if nothing here covers your question it
                will say so.
              </p>
              <p className="eyebrow mt-5">Try</p>
              <ul className="mt-2 space-y-1">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => {
                        if (inputRef.current) inputRef.current.value = s
                        ask(s)
                      }}
                      className="group flex w-full items-center gap-2 rounded-[3px] px-2 py-1.5 text-left text-sm text-ink-soft transition-colors hover:bg-sunken hover:text-ink"
                    >
                      <CornerDownLeft
                        size={12}
                        className="shrink-0 text-ink-faint transition-colors group-hover:text-accent"
                        aria-hidden
                      />
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {answer && <AnswerView answer={answer} onClose={onClose} onAsk={(q) => {
            if (inputRef.current) inputRef.current.value = q
            ask(q)
          }} />}
        </div>

        {/* ── Footer: state the mechanism, plainly ───────────────────── */}
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-rule px-4 py-2.5 font-mono text-3xs uppercase tracking-[0.12em] text-ink-faint">
          <span>Retrieval only — no model in the answer path</span>
          <span aria-hidden>·</span>
          <span>BM25 over {retriever?.index.chunkCount ?? '—'} passages</span>
        </p>
      </div>
    </div>
  )
}

function AnswerView({
  answer,
  onClose,
  onAsk,
}: {
  answer: Answer
  onClose: () => void
  onAsk: (q: string) => void
}) {
  return (
    <div aria-live="polite">
      <p
        className={cn(
          'text-sm leading-relaxed',
          answer.confidence === 'none' ? 'text-ink' : 'text-ink-muted'
        )}
      >
        {answer.lead}
      </p>

      {answer.didYouMean && (
        <ul className="mt-3 space-y-1">
          {answer.didYouMean.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => onAsk(s)}
                className="rounded-[3px] px-2 py-1.5 text-left text-sm text-accent transition-colors hover:bg-sunken"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 space-y-4">
        {answer.passages.map(({ chunk }) => (
          <article key={chunk.id} className="border-l-2 border-rule pl-3.5">
            <p className="eyebrow">{chunk.heading}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{chunk.text}</p>
            {chunk.source.external ? (
              <a
                href={chunk.source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-mono text-3xs uppercase tracking-[0.12em] text-accent"
              >
                {KIND_LABEL[chunk.source.kind] ?? 'Source'} · {chunk.source.title}
                <ArrowUpRight size={11} aria-hidden />
              </a>
            ) : (
              <Link
                href={chunk.source.href}
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-1 font-mono text-3xs uppercase tracking-[0.12em] text-accent"
              >
                {KIND_LABEL[chunk.source.kind] ?? 'Source'} · {chunk.source.title}
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
