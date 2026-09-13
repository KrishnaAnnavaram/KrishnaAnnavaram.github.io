import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/profile'
import { currentRole, formatRoleDate } from '@/data/experience'
import { Reveal } from '@/components/ui/Reveal'
import { AskButton } from '@/components/assistant/AskButton'

/**
 * The first screen has one job: let a recruiter answer "what does he do, is he
 * relevant, and where do I go next" without scrolling.
 *
 * So everything above the fold is identity and routing. The claim is a single
 * sentence; the evidence for it starts immediately below. There is no ambient
 * motion here — the only animation is the reveal, which runs once.
 */
export function Hero() {
  return (
    <section className="page-x mx-auto max-w-page pb-16 pt-14 sm:pt-20">
      <div className="grid items-start gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
        <div>
          <Reveal eager>
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-accent">{profile.role}</span>
              <span aria-hidden className="text-ink-faint">
                /
              </span>
              <span>{profile.locationShort}</span>
            </p>
          </Reveal>

          <Reveal eager>
            <h1 className="mt-6 text-5xl">
              I build systems that
              <br />
              can <span className="italic text-accent">show their work</span>.
            </h1>
          </Reveal>

          <Reveal eager>
            <p className="mt-7 max-w-text text-lg text-ink-soft">{profile.intro}</p>
          </Reveal>

          <Reveal eager>
            <p className="mt-5 max-w-text text-ink-muted">
              Most of what I ship is infrastructure for other engineers: migration harnesses,
              reverse-engineering pipelines, retrieval systems. The through-line is that each one
              has to be able to justify its output — which stages were deterministic, what was
              measured, and what it could not establish.
            </p>
          </Reveal>

          <Reveal eager>
            <div className="mt-9 flex flex-wrap items-center gap-2.5">
              <Link
                href="/projects/"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-colors duration-[var(--duration-base)] hover:bg-accent"
              >
                See the systems
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>

              <AskButton />

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-rule-strong px-5 py-2.5 text-sm text-ink transition-colors duration-[var(--duration-base)] hover:border-ink hover:bg-sunken"
              >
                Résumé
                <ArrowUpRight
                  size={15}
                  className="text-ink-faint transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
                  aria-hidden
                />
              </a>
            </div>
          </Reveal>

          <Reveal eager>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-2xs uppercase tracking-[0.14em]">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted transition-colors hover:text-ink"
              >
                GitHub
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted transition-colors hover:text-ink"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.socials.email}`}
                className="text-ink-muted transition-colors hover:text-ink"
              >
                Email
              </a>
            </p>
          </Reveal>
        </div>

        {/* ── Identity plate: portrait plus the facts a recruiter checks ──── */}
        <Reveal eager className="order-first lg:order-none">
          <div className="mx-auto w-40 sm:w-48 lg:mx-0 lg:ml-auto lg:w-full lg:max-w-[16rem]">
            <Image
              src="/images/profile/portrait.jpg"
              alt={`${profile.name}, ${profile.role}`}
              width={720}
              height={960}
              priority
              sizes="(max-width: 1024px) 12rem, 16rem"
              className="w-full rounded-[3px] object-cover grayscale-[0.2]"
            />

            <dl className="mt-5 space-y-0">
              <Row label="Now">
                {currentRole.company}
                <span className="block font-mono text-2xs text-ink-muted">
                  {currentRole.title} · since {formatRoleDate(currentRole.start)}
                </span>
              </Row>
              <Row label="Based">{profile.location}</Row>
              <Row label="Open to">
                <span className="text-ink-soft">Generative AI · Applied AI · ML Engineering</span>
              </Row>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-rule py-2.5">
      <dt className="eyebrow shrink-0">{label}</dt>
      <dd className="text-right text-sm text-ink">{children}</dd>
    </div>
  )
}
