'use client'

import { Sparkle } from 'lucide-react'
import { useAssistant } from './AssistantProvider'

/**
 * The assistant is opened, never opens itself.
 *
 * No floating bubble, no auto-open, nothing covering content on a phone — an
 * uninvited chat widget is a cost, not a feature. It is reachable three ways:
 * this button, the ⌘K palette, and the `/` shortcut.
 *
 * This is a trigger only. The dialog itself is mounted once by
 * <AssistantProvider>, so any number of these can appear on a page.
 */
const STYLES = {
  outline:
    'group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-rule-strong px-5 py-2.5 text-sm text-ink transition-colors duration-[var(--duration-base)] hover:border-ink hover:bg-sunken',
  /* `whitespace-nowrap` because the label wrapped onto two lines inside a
     single-line 64px header at every width above 640px — the most visible
     unpolished detail on the site. */
  quiet:
    'inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-2xs uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink',
  /* Narrow widths get the icon alone, so the control cluster still fits. */
  icon: 'grid size-9 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-sunken hover:text-ink',
} as const

export function AskButton({ variant = 'outline' }: { variant?: keyof typeof STYLES }) {
  const { open } = useAssistant()

  return (
    <button
      type="button"
      onClick={open}
      className={STYLES[variant]}
      aria-label={variant === 'icon' ? 'Ask the site' : undefined}
    >
      <Sparkle
        size={variant === 'outline' ? 14 : variant === 'icon' ? 15 : 12}
        className="text-accent"
        aria-hidden
      />
      {variant !== 'icon' && 'Ask the site'}
    </button>
  )
}
