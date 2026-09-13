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
 * The claim that is true: it cannot compose a sentence, so it cannot state
 * something the site does not already say. The claim that would NOT be true,
 * and which the copy is careful to avoid: that it is therefore always right.
 * Lexical retrieval has no notion of whether a passage answers the question —
 * ask about Google and it will find "Google Cloud" in an unrelated role. That
 * failure is visible, because the passage and its source are right there, and
 * a weak match is labelled as a weak match rather than dressed up as an answer.
 *
 * A portfolio arguing for grounded retrieval should ship an assistant that is
 * honest about its own failure mode, not one that claims not to have one.
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
  /* A question asked before the index arrived. Typing is never blocked, so it
     is answered as soon as retrieval is available rather than being lost. */
  const [pending, setPending] = useState<string | null>(null)
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
      // rAF rather than a timer: focus lands on the first painted frame, and
      // the field is never disabled, so it can always take focus.
      const id = requestAnimationFrame(() => inputRef.current?.focus())
      return () => cancelAnimationFrame(id)
    }
    setQuery('')
    setAnswer(null)
    setPending(null)
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
      if (!trimmed) return
      setQuery(trimmed)
      if (retriever) {
        setPending(null)
        setAnswer(retriever.answer(trimmed))
      } else {
        // Asked before the index landed — hold it rather than dropping it.
        setPending(trimmed)
      }
    },
    [retriever]
  )

  /* Answer anything that was asked while the index was still loading. */
  useEffect(() => {
    if (retriever && pending) {
      setAnswer(retriever.answer(pending))
      setPending(null)
    }
  }, [retriever, pending])

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
              // The dialog unmounts when closed, so the input is freshly
              // mounted on every open and autoFocus is the reliable path.
              // The rAF above is the fallback for the re-open case.
              autoFocus
              autoComplete="off"
              placeholder="Ask about projects, architecture, or experience…"
              className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-faint"
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
          {status === 'loading' && !answer && (
            <p className="flex items-center gap-2 py-6 text-sm text-ink-muted">
              <Loader2 size={14} className="animate-spin" aria-hidden />
              {pending ? 'Loading the index, then answering…' : 'Loading the index…'}
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
                This searches the portfolio and quotes what it finds, word for word, with a link
                to the source. It doesn&rsquo;t generate text, so it can&rsquo;t tell you anything
                this site doesn&rsquo;t already say — though it can still hand you a passage that
                doesn&rsquo;t answer your question. It will say when a match is weak, and say so
                when it has nothing.
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
          <span>BM25 over {retriever?.index.chunkCount ?? '—'} passages</span>
          <span aria-hidden>·</span>
          <span>Passages quoted verbatim — no model in the answer path</span>
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
