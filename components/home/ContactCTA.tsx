import { ArrowRight, Mail } from 'lucide-react'
import Link from 'next/link'
import { profile } from '@/data/profile'

export function ContactCTA() {
  return (
    <section className="page-x mx-auto max-w-page pb-8 pt-4" aria-labelledby="contact-title">
      <div className="relative isolate overflow-hidden rounded-3xl border border-rule bg-surface px-6 py-14 sm:px-12 sm:py-16">
        <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-70" />
        <div
          aria-hidden
          className="absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--color-accent)_22%,transparent),transparent)]"
        />
        <p className="eyebrow flex items-center gap-3">
          <span className="live-dot" aria-hidden />
          Available
        </p>
        <h2 id="contact-title" className="mt-5 max-w-2xl text-4xl text-ink">
          Building something that has to work on{' '}
          <span className="font-accent italic text-accent">real traffic</span>?
        </h2>
        <p className="mt-5 max-w-text text-ink-soft">
          {profile.availability}. Email is the fastest way to reach me — I read every message.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.socials.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            <Mail size={15} aria-hidden />
            {profile.socials.email}
          </a>
          <Link
            href="/contact/"
            className="group inline-flex items-center gap-2 rounded-full border border-rule-strong px-5 py-2.5 text-sm text-ink transition-colors hover:border-ink"
          >
            Other ways to reach me
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
