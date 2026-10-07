import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { profile, PHOTO_ROTATION_MS } from '@/data/profile'
import { currentRole, formatRoleDate } from '@/data/experience'
import { AskButton } from '@/components/assistant/AskButton'
import { RotatingPortrait } from './RotatingPortrait'

/**
 * The first screen is the human one: a face, a name, one sentence, and the
 * three places a recruiter goes next. The console material starts below it.
 *
 * Nothing here is behind a reveal — the hero is the LCP, and hiding it until
 * hydration once cost this site 900ms of LCP for no visual gain.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="hero-glow -z-10" />
      <div aria-hidden className="bg-dots absolute inset-0 -z-10" />

      <div className="page-x mx-auto grid max-w-page items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-16 lg:pb-24 lg:pt-20">
        <div className="min-w-0">
          <p className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-rule bg-surface/70 px-3 py-1.5 font-mono text-2xs uppercase tracking-[0.12em] text-ink-soft backdrop-blur">
            <span className="live-dot" aria-hidden />
            <span className="truncate">Open to Generative &amp; Agentic AI roles</span>
          </p>

          <h1 className="mt-7 text-5xl text-ink">{profile.name}</h1>

          <p className="mt-5 max-w-[34ch] text-2xl text-ink-soft sm:text-3xl">
            Generative AI engineer building agentic systems that{' '}
            <span className="font-accent italic text-accent">show their work</span>.
          </p>

          <p className="mt-6 max-w-text text-ink-muted">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <Link
              href="/#systems"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors duration-[var(--duration-base)] hover:bg-accent"
            >
              See the systems
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-rule-strong bg-surface/60 px-5 py-2.5 text-sm text-ink backdrop-blur transition-colors duration-[var(--duration-base)] hover:border-ink"
            >
              Résumé
              <ArrowUpRight size={15} className="text-ink-faint transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" aria-hidden />
            </a>
            <AskButton />
          </div>

          <ul className="mt-7 flex flex-wrap items-center gap-2">
            {[
              { href: profile.socials.github, label: 'GitHub', icon: Github },
              { href: profile.socials.linkedin, label: 'LinkedIn', icon: Linkedin },
              { href: `mailto:${profile.socials.email}`, label: 'Email', icon: Mail },
            ].map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-mono text-2xs uppercase tracking-[0.12em] text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  <Icon size={13} aria-hidden />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Identity panel ───────────────────────────────────────────────── */}
        <div className="order-first mx-auto w-full max-w-[15rem] sm:max-w-[18rem] lg:order-none lg:mx-0 lg:ml-auto lg:max-w-[22rem]">
          <RotatingPortrait photos={profile.photos} intervalMs={PHOTO_ROTATION_MS} />

          <dl className="plate mt-4 hidden divide-y divide-rule text-sm lg:block">
            <Row label="Now">
              <span className="text-ink">{currentRole.company}</span>
              <span className="block font-mono text-3xs uppercase tracking-[0.1em] text-ink-muted">
                {currentRole.title} · since {formatRoleDate(currentRole.start)}
              </span>
            </Row>
            <Row label="Based">{profile.location}</Row>
            <Row label="Focus">Agentic AI · RAG · Modernisation</Row>
          </dl>
        </div>
      </div>
    </section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-4 py-2.5">
      <dt className="eyebrow shrink-0">{label}</dt>
      <dd className="text-right text-ink-soft">{children}</dd>
    </div>
  )
}
