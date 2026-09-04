import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { caseStudies, getCaseStudy } from '@/data/work'
import { experience, formatRoleDate } from '@/data/experience'
import { Reveal } from '@/components/ui/Reveal'
import { Chip, Stat } from '@/components/ui/Bits'

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}
  return {
    title: study.title,
    description: study.summary,
    openGraph: { title: study.title, description: study.summary, type: 'article' },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const role = experience.find((r) => r.id === study.roleId)
  const index = caseStudies.findIndex((c) => c.slug === slug)
  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <article>
      <header className="page-x mx-auto max-w-page pb-12 pt-16 sm:pt-20">
        <Link
          href="/work/"
          className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" aria-hidden />
          All work
        </Link>

        <Reveal>
          <p className="eyebrow mt-10">
            {study.context} · {study.year} · {study.discipline}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl">{study.title}</h1>
          <p className="mt-6 max-w-text text-lg text-ink-soft">{study.summary}</p>
        </Reveal>

        {role && (
          <Reveal delay={100}>
            <p className="mt-8 text-sm text-ink-muted">
              Built as {role.title} at {role.company} · {formatRoleDate(role.start)} —{' '}
              {formatRoleDate(role.end)}
            </p>
          </Reveal>
        )}
      </header>

      {/* Outcomes first — the reader decides here whether to keep going. */}
      <section className="page-x rule-t mx-auto max-w-page py-12">
        <Reveal>
          <h2 className="eyebrow">Outcome</h2>
          <dl className="mt-7 grid gap-8 sm:grid-cols-3">
            {study.outcomes.map((o) => (
              <Stat key={o.label} value={o.value} label={o.label} />
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="page-x rule-t mx-auto max-w-page py-14">
        <div className="grid gap-8 lg:grid-cols-[10rem_1fr] lg:gap-16">
          <h2 className="eyebrow sticky top-24 self-start">The problem</h2>
          <Reveal>
            <p className="max-w-text text-lg text-ink-soft">{study.problem}</p>
          </Reveal>
        </div>
      </section>

      <section className="page-x rule-t mx-auto max-w-page py-14">
        <div className="grid gap-8 lg:grid-cols-[10rem_1fr] lg:gap-16">
          <h2 className="eyebrow sticky top-24 self-start">The approach</h2>
          <ol className="max-w-text space-y-7">
            {study.approach.map((step, i) => (
              <Reveal as="li" key={step.slice(0, 32)} delay={i * 60} className="flex gap-5">
                <span className="mt-1 shrink-0 font-mono text-2xs text-ink-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-ink-soft">{step}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {study.architecture && (
        <section className="page-x rule-t mx-auto max-w-page py-14">
          <div className="grid gap-8 lg:grid-cols-[10rem_1fr] lg:gap-16">
            <h2 className="eyebrow sticky top-24 self-start">Shape of it</h2>
            <Reveal>
              <p className="max-w-text rounded-sm border border-rule bg-sunken p-6 font-mono text-sm leading-relaxed text-ink-soft">
                {study.architecture}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      <section className="page-x rule-t mx-auto max-w-page py-14">
        <div className="grid gap-8 lg:grid-cols-[10rem_1fr] lg:gap-16">
          <h2 className="eyebrow sticky top-24 self-start">Built with</h2>
          <Reveal>
            <div className="flex flex-wrap gap-1.5">
              {study.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <nav className="page-x rule-t mx-auto max-w-page py-12" aria-label="Next case study">
        <Link href={`/work/${next.slug}/`} className="group block">
          <p className="eyebrow">Next</p>
          <p className="mt-3 flex items-start gap-2 font-serif text-2xl text-ink transition-colors group-hover:text-accent">
            {next.title}
            <ArrowRight
              size={18}
              className="mt-2 shrink-0 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </p>
        </Link>
      </nav>
    </article>
  )
}
