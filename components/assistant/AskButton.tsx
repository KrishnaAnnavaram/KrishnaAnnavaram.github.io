'use client'

import { useEffect, useState } from 'react'
import { Sparkle } from 'lucide-react'
import { Assistant } from './Assistant'

/**
 * The assistant is opened, never opens itself.
 *
 * No floating bubble, no auto-open, nothing covering content on a phone — the
 * research is unambiguous that an uninvited chat widget is a cost, not a
 * feature. It is reachable three ways: this button, the ⌘K palette, and the
 * `/` shortcut.
 */
export function AskButton({ variant = 'outline' }: { variant?: 'outline' | 'quiet' }) {
  const [open, setOpen] = useState(false)

  // `/` is the near-universal "search this site" key. Ignored while typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const el = document.activeElement
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable)
      ) {
        return
      }
      e.preventDefault()
      setOpen(true)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          variant === 'outline'
            ? 'group inline-flex items-center gap-2 rounded-full border border-rule-strong px-5 py-2.5 text-sm text-ink transition-colors duration-[var(--duration-base)] hover:border-ink hover:bg-sunken'
            : 'inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink'
        }
      >
        <Sparkle size={variant === 'outline' ? 14 : 12} className="text-accent" aria-hidden />
        Ask the site
      </button>

      <Assistant open={open} onClose={() => setOpen(false)} />
    </>
  )
}
