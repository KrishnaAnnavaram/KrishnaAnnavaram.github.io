'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Pause, Play, RotateCcw, SkipForward, UserCheck } from 'lucide-react'
import {
  MARS_EVIDENCE_COMMIT,
  MARS_REPO,
  type MarsRun,
  type StepKind,
  type Tone,
} from '@/data/mars-runs'
import { cn } from '@/lib/utils'

const STEP_MS = 900

const KIND: Record<StepKind, { glyph: string; label: string; cls: string }> = {
  deterministic: { glyph: '■', label: 'Script', cls: 'text-verify' },
  model: { glyph: '◆', label: 'Agent', cls: 'text-model' },
  human: { glyph: '▲', label: 'Human', cls: 'text-human' },
}

const TONE: Record<Tone, string> = {
  pass: 'border-verify/40 bg-verify-wash text-verify',
  fail: 'border-human/40 bg-human-wash text-human',
  warn: 'border-model/40 bg-model-wash text-model',
  info: 'border-rule bg-sunken text-ink-soft',
}

/**
 * Replays one of MARS's recorded runs, stage by stage.
 *
 * Server-rendered in its finished state, so a reader without JavaScript — or
 * with reduced motion — sees every verdict at once. With motion allowed, it
 * resets and plays when it first scrolls into view, then stops at the human
 * gate until the reader approves the plan, the way the real pipeline stops
 * for a person.
 */
export function PipelineReplay({ runs }: { runs: MarsRun[] }) {
  const [runIndex, setRunIndex] = useState(0)
  const run = runs[runIndex]
  const total = run.steps.length

  // `cursor` = number of completed steps. Starts complete for the server render.
  const [cursor, setCursor] = useState(total)
  const [playing, setPlaying] = useState(false)
  const [approved, setApproved] = useState(true)
  const [reduced, setReduced] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  const restart = useCallback((autoplay: boolean) => {
    setCursor(0)
    setApproved(false)
    setPlaying(autoplay)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    if (mq.matches) return
    const node = rootRef.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          restart(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [restart])

  const atGate = cursor < total && Boolean(run.steps[cursor].gate) && !approved
  const done = cursor >= total

  const advance = useCallback(() => {
    setCursor((c) => {
      if (c >= total) return c
      if (run.steps[c].gate && !approved) return c
      return c + 1
    })
  }, [approved, run.steps, total])

  useEffect(() => {
    if (!playing || done || atGate) return
    const id = window.setTimeout(advance, STEP_MS)
    return () => window.clearTimeout(id)
  }, [playing, done, atGate, advance, cursor])

  useEffect(() => {
    if (done) setPlaying(false)
  }, [done])

  const approve = () => {
    setApproved(true)
    setCursor((c) => c + 1)
    if (!reduced) setPlaying(true)
  }

  const selectRun = (i: number) => {
    setRunIndex(i)
    if (reduced) {
      setCursor(runs[i].steps.length)
      setApproved(true)
      setPlaying(false)
    } else {
      setCursor(0)
      setApproved(false)
      setPlaying(true)
    }
  }

  const status = done
    ? `${run.id} — ${run.decision}. Score ${run.score} of 100 against a threshold of ${run.threshold}.`
    : atGate
      ? 'Waiting for a human to approve the fix plan.'
      : `Running: ${run.steps[Math.min(cursor, total - 1)].agent}`

  const scorePct = done ? run.score : 0

  return (
    <div ref={rootRef} className="plate overflow-hidden">
      {/* ── Title bar ─────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-sunken px-4 py-2.5">
        <p className="flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.12em] text-ink-muted">
          <span className={cn('live-dot', done && 'bg-human after:hidden')} aria-hidden />
          mars · remediation pipeline · recorded run
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => (done ? restart(!reduced) : setPlaying((p) => !p))}
            disabled={atGate}
            aria-label={done ? 'Replay' : playing ? 'Pause replay' : 'Play replay'}
            className="grid size-8 place-items-center rounded-md text-ink-soft transition-colors hover:bg-surface hover:text-ink disabled:opacity-40"
          >
            {done ? <RotateCcw size={14} aria-hidden /> : playing ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
          </button>
          <button
            type="button"
            onClick={advance}
            disabled={done || atGate}
            aria-label="Next stage"
            className="grid size-8 place-items-center rounded-md text-ink-soft transition-colors hover:bg-surface hover:text-ink disabled:opacity-40"
          >
            <SkipForward size={14} aria-hidden />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[17rem_minmax(0,1fr)]">
        {/* ── Run picker ──────────────────────────────────────────────────── */}
        <div className="border-b border-rule p-3 lg:border-b-0 lg:border-r">
          <p className="eyebrow px-1 pb-2">Issue</p>
          <div role="tablist" aria-label="Recorded runs" className="flex gap-1.5 overflow-x-auto lg:flex-col">
            {runs.map((r, i) => (
              <button
                key={r.id}
                role="tab"
                type="button"
                aria-selected={i === runIndex}
                onClick={() => selectRun(i)}
                className={cn(
                  'min-w-[11rem] shrink-0 rounded-lg border px-3 py-2 text-left transition-colors lg:min-w-0',
                  i === runIndex
                    ? 'border-accent/60 bg-accent-wash'
                    : 'border-transparent hover:border-rule hover:bg-sunken'
                )}
              >
                <span className="flex items-center justify-between gap-2 font-mono text-2xs">
                  <span className="text-ink">{r.id}</span>
                  <span className={r.severity === 'Critical' ? 'text-human' : r.severity === 'High' ? 'text-model' : 'text-ink-muted'}>
                    {r.severity}
                  </span>
                </span>
                <span className="mt-0.5 block font-mono text-3xs uppercase tracking-[0.1em] text-ink-muted">
                  {r.cwe}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-3 hidden px-1 text-xs leading-relaxed text-ink-muted lg:block">
            <span className="text-ink">{run.title}.</span> {run.cweName}.
          </p>
        </div>

        {/* ── Trace ───────────────────────────────────────────────────────── */}
        <div className="min-w-0">
          <p className="border-b border-rule px-4 py-2.5 text-xs text-ink-soft lg:hidden">{run.title}</p>
          <ol className="divide-y divide-rule">
            {run.steps.map((step, i) => {
              const state = i < cursor ? 'done' : i === cursor && !done ? 'running' : 'pending'
              const k = KIND[step.kind]
              const waiting = state === 'running' && step.gate && !approved
              return (
                <li
                  key={`${run.id}-${i}`}
                  className={cn('trace-row grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-2 px-4 py-2.5 sm:grid-cols-[1.25rem_minmax(0,1fr)_auto]', waiting && 'bg-human-wash')}
                  data-state={state}
                >
                  <span className={cn('pt-0.5 font-mono text-xs', k.cls)} aria-hidden>
                    {state === 'running' && !waiting ? <span className="inline-block animate-pulse">{k.glyph}</span> : k.glyph}
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
                      <span className="font-medium text-ink">{step.agent}</span>
                      <span className="sr-only">({k.label})</span>
                      <span className="text-ink-muted">{step.action}</span>
                    </p>
                    <p className="mt-0.5 truncate font-mono text-3xs text-ink-faint">{step.artefact}</p>
                    {waiting && (
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={approve}
                          className="inline-flex items-center gap-1.5 rounded-full bg-human px-3 py-1 text-xs font-medium text-paper transition-opacity hover:opacity-90"
                        >
                          <UserCheck size={13} aria-hidden />
                          Approve the plan
                        </button>
                        <span className="text-2xs text-ink-muted">
                          In the recorded runs this approval was given programmatically.
                        </span>
                      </div>
                    )}
                  </div>
                  <span
                    className={cn(
                      'col-start-2 mt-1.5 justify-self-start rounded-full border px-2 py-0.5 font-mono text-3xs uppercase tracking-[0.08em] sm:col-start-3 sm:mt-0 sm:self-start sm:justify-self-end',
                      state === 'done' ? TONE[step.tone] : 'border-rule text-ink-faint'
                    )}
                  >
                    {state === 'done' ? step.result : state === 'running' ? (waiting ? 'waiting' : 'running') : 'pending'}
                  </span>
                </li>
              )
            })}
          </ol>

          {/* ── Verdict ───────────────────────────────────────────────────── */}
          <div className="border-t border-rule bg-sunken px-4 py-3.5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-muted">
                Ship decision
              </p>
              <p className={cn('font-mono text-sm', done ? 'text-human' : 'text-ink-faint')}>
                {done ? `⛔ ${run.decision} · ${run.score}/100 · needs ${run.threshold}` : '—'}
              </p>
            </div>
            <div className="relative mt-2.5 h-1.5 rounded-full bg-rule" aria-hidden>
              <div
                className="h-full rounded-full bg-human transition-[width] duration-700 ease-out"
                style={{ width: `${scorePct}%` }}
              />
              <div
                className="absolute -top-1 h-3.5 w-0.5 rounded bg-ink"
                style={{ left: `${run.threshold}%` }}
                title={`Threshold ${run.threshold}`}
              />
            </div>
            <p className="mt-2.5 text-xs text-ink-muted">
              Hard gates triggered: <span className="font-mono text-ink-soft">{run.hardGates.join(', ')}</span>.
              No score can override a hard gate, and an agent may only make a verdict stricter.
            </p>
          </div>
        </div>
      </div>

      {/* ── Footer: legend + provenance ───────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule px-4 py-2.5">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-3xs uppercase tracking-[0.1em] text-ink-muted">
          {(Object.keys(KIND) as StepKind[]).map((k) => (
            <li key={k} className="flex items-center gap-1.5">
              <span className={KIND[k].cls} aria-hidden>{KIND[k].glyph}</span>
              {KIND[k].label}
            </li>
          ))}
        </ul>
        <a
          href={`${MARS_REPO}/tree/${MARS_EVIDENCE_COMMIT}/docs/agent_output`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-3xs uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-accent"
        >
          Evidence at {MARS_EVIDENCE_COMMIT}
          <ArrowUpRight size={11} aria-hidden />
        </a>
      </div>

      <p className="sr-only" aria-live="polite">
        {status}
      </p>
    </div>
  )
}
