'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/profile'

const INTENTS = ['A role', 'A project', 'Research', 'Something else'] as const

/**
 * Composes a mailto: link rather than posting to a form service. On a static
 * site a POST endpoint is one more thing that can silently fail — this opens
 * the sender's own mail client, so they can see the message actually leave.
 */
export function ContactForm() {
  const [intent, setIntent] = useState<(typeof INTENTS)[number]>('A role')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const subject = `${intent} — via krishnaannavaram.github.io`
  const body = `${message}\n\n— ${name || 'Sent from your portfolio'}`
  const href = `mailto:${profile.socials.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`

  const field =
    'w-full rounded-sm border border-rule bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-rule-strong'

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="max-w-text space-y-6"
      aria-label="Compose an email"
    >
      <fieldset>
        <legend className="eyebrow">What’s this about</legend>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {INTENTS.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={intent === option}
              onClick={() => setIntent(option)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200 ${
                intent === option
                  ? 'border-ink bg-ink text-paper'
                  : 'border-rule text-ink-muted hover:border-rule-strong hover:text-ink'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="contact-name" className="eyebrow">
          Your name
        </label>
        <input
          id="contact-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Optional"
          className={`mt-3 ${field}`}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="eyebrow">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A couple of lines is plenty."
          className={`mt-3 resize-y ${field}`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <a
          href={href}
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-colors duration-200 hover:bg-accent"
        >
          Open in your mail app
          <ArrowUpRight
            size={15}
            className="transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
            aria-hidden
          />
        </a>
        <p className="text-xs text-ink-muted">
          Nothing is sent from this page — it drafts the email for you.
        </p>
      </div>
    </form>
  )
}
