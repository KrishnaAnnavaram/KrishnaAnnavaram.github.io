import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight, Scale, Star } from 'lucide-react'
import { caseStudyProjects, DOMAINS } from '@/data/projects'
import { getProjectWithRepo, relativeTime } from '@/lib/projects'
import { SystemDiagram } from '@/components/architecture/SystemDiagram'
import { Reveal } from '@/components/ui/Reveal'
import { profile } from '@/data/profile'

export function generateStaticParams() {
  return caseStudyProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectWithRepo(slug)
  if (!project) return {}
  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: { title: project.name, description: project.tagline, type: 'article' },
  }
}

/** Section heading with the numbered rail the rest of the site uses. */
function Section({
  n,
  label,
  children,
}: {
  n: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="rule-t py-12">
      <div className="spec-grid">
        <div>
          <p className="eyebrow lg:sticky lg:top-24">
            <span className="text-ink-faint">{n}</span> &nbsp;{label}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectWithRepo(slug)
  if (!project || !project.problem) notFound()

  const repo = project.github

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: project.tagline,
    codeRepository: repo?.url,
    programmingLanguage: repo?.primaryLanguage ?? project.stack[0],
    author: { '@type': 'Person', name: profile.name, url: profile.siteUrl },
    dateModified: repo?.pushedAt,
    license: repo?.license ? `https://spdx.org/licenses/${repo.license}.html` : undefined,
  }

  return (
    <article className="page-x mx-auto max-w-page pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="pb-10 pt-20 sm:pt-28">
        <Reveal>
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link href="/projects/" className="transition-colors hover:text-ink">
              Projects
            </Link>
            <span aria-hidden className="text-ink-faint">
              /
            </span>
            <span className="tabular">{project.year}</span>
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl">{project.name}</h1>
          <p className="mt-5 max-w-text text-lg text-ink-soft">{project.tagline}</p>

          <ul className="mt-7 flex flex-wrap gap-1.5">
            {project.domains.map((d) => (
              <li
                key={d}
                className="rounded-full border border-rule px-2.5 py-1 text-2xs text-ink-muted"
              >
                {DOMAINS[d]}
              </li>
            ))}
          </ul>

          {/* Repository strip — live metadata from the synced snapshot. */}
          {repo && (
            <div className="plate mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5 px-4 py-3">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-sm text-ink transition-colors hover:text-accent"
              >
                {repo.fullName}
                <ArrowUpRight size={13} aria-hidden />
              </a>
              {repo.primaryLanguage && (
                <span className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-muted">
                  {repo.primaryLanguage}
                </span>
              )}
              {repo.license && (
                <span className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.12em] text-ink-muted">
                  <Scale size={11} aria-hidden />
                  {repo.license}
                </span>
              )}
              {repo.stars > 0 && (
                <span className="inline-flex items-center gap-1.5 font-mono text-2xs text-ink-muted tabular">
                  <Star size={11} aria-hidden />
                  {repo.stars}
                </span>
              )}
              <span className="font-mono text-2xs text-ink-faint tabular">
                pushed {relativeTime(repo.pushedAt)}
              </span>
            </div>
          )}
        </Reveal>
      </header>

      {/* ── 01 Problem ──────────────────────────────────────────────────── */}
      <Section n="01" label="The problem">
        <p className="prose-spec text-base">{project.problem}</p>

        {project.constraints && project.constraints.length > 0 && (
          <>
            <h3 className="mt-9 font-sans text-sm font-semibold text-ink">Constraints</h3>
            <ul className="prose-spec mt-3">
              {project.constraints.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </>
        )}
      </Section>

      {/* ── 02 Architecture ─────────────────────────────────────────────── */}
      {project.diagram && (
        <Section n="02" label="Architecture">
          <SystemDiagram diagram={project.diagram} />
        </Section>
      )}

      {/* ── 03 Approach ─────────────────────────────────────────────────── */}
      {project.approach && project.approach.length > 0 && (
        <Section n="03" label="What was built">
          <ul className="prose-spec">
            {project.approach.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── 04 Decisions ────────────────────────────────────────────────── */}
      {project.decisions && project.decisions.length > 0 && (
        <Section n="04" label="Decisions">
          <dl className="space-y-8">
            {project.decisions.map((d) => (
              <div key={d.title}>
                <dt className="font-sans text-base font-semibold text-ink">{d.title}</dt>
                <dd className="mt-2 max-w-prose text-ink-soft">{d.body}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* ── 05 Evidence ─────────────────────────────────────────────────── */}
      {project.evidence && project.evidence.length > 0 && (
        <Section n="05" label="Evidence">
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {project.evidence.map((e) => (
              <div key={e.label}>
                <dt className="font-serif text-3xl leading-none text-ink tabular">{e.value}</dt>
                <dd className="mt-2.5 text-sm text-ink-soft">
                  {e.label}
                  {e.method && (
                    <span className="mt-1.5 block border-l border-rule pl-2.5 font-mono text-2xs leading-relaxed text-ink-faint">
                      {e.method}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          {project.provenance && (
            <p className="mt-9 max-w-text border-l-2 border-verify pl-3.5 text-sm leading-relaxed text-ink-muted">
              {project.provenance}
            </p>
          )}
        </Section>
      )}

      {/* ── 06 Limitations ──────────────────────────────────────────────── */}
      {project.limitations && project.limitations.length > 0 && (
        <Section n="06" label="What it cannot do">
          <p className="max-w-text text-sm text-ink-muted">
            Stated by the author, not discovered by a reader.
          </p>
          <ul className="prose-spec mt-4">
            {project.limitations.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Stack + repo footer ─────────────────────────────────────────── */}
      <Section n="07" label="Stack">
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-rule bg-surface px-2.5 py-1 font-mono text-2xs text-ink-muted"
            >
              {s}
            </li>
          ))}
        </ul>

        {repo && repo.languages.length > 0 && (
          <div className="mt-8">
            <p className="eyebrow">Language mix, from the repository</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              {repo.languages.slice(0, 5).map((l) => (
                <li key={l.name} className="font-mono text-2xs text-ink-muted tabular">
                  {l.name} {l.share}%
                </li>
              ))}
            </ul>
          </div>
        )}

        {repo && (
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-accent"
          >
            Read the source
            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
              aria-hidden
            />
          </a>
        )}
      </Section>
    </article>
  )
}
