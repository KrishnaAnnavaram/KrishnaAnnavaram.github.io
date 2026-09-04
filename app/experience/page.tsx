import type { Metadata } from 'next'
import Link from 'next/link'
import { experience, formatRoleDate, roleDuration } from '@/data/experience'
import { caseStudies } from '@/data/work'
import { profile } from '@/data/profile'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Chip, TextLink } from '@/components/ui/Bits'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Five years across generative AI engineering, enterprise ML for US healthcare clients, NLP ranking systems, and a graduate teaching assistantship at UNT.',
}

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Where the work happened."
        lede="Roles, dates, and what each one actually involved. Two current roles are listed without metrics — the detailed write-ups are still being put together rather than invented."
      />

      <section className="page-x mx-auto max-w-page">
        <ol className="rule-t">
          {experience.map((role, i) => {
            const related = caseStudies.filter((c) => c.roleId === role.id)
            return (
              <Reveal as="li" key={role.id} delay={i * 60} className="scroll-mt-24">
                <div id={role.id} className="grid gap-6 border-b border-rule py-12 lg:grid-cols-[14rem_1fr] lg:gap-12">
                  <div className="lg:sticky lg:top-24 lg:self-start">
                    <p className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-faint">
                      {formatRoleDate(role.start)} — {formatRoleDate(role.end)}
                    </p>
                    <p className="mt-1.5 font-mono text-2xs uppercase tracking-[0.14em] text-ink-faint">
                      {roleDuration(role.start, role.end)} · {role.location}
                    </p>
                    {!role.end && (
                      <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.14em] text-accent">
                        <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                        Current
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="text-2xl text-ink">{role.title}</h2>
                    <p className="mt-1 text-sm text-ink-muted">
                      {role.company} · {role.employment}
                    </p>

                    <p className="mt-5 max-w-text text-ink-soft">{role.summary}</p>

                    <ul className="mt-7 max-w-text space-y-4">
                      {role.highlights.map((h) => (
                        <li key={h.text} className="flex gap-4">
                          <span
                            className="mt-3 h-px w-3 shrink-0 bg-accent"
                            aria-hidden
                          />
                          <div>
                            <p className="text-sm text-ink-soft">{h.text}</p>
                            {h.metric && (
                              <p className="mt-1 font-mono text-2xs uppercase tracking-[0.1em] text-ink">
                                {h.metric}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-1.5">
                      {role.stack.map((tech) => (
                        <Chip key={tech}>{tech}</Chip>
                      ))}
                    </div>

                    {related.length > 0 && (
                      <p className="mt-7 text-sm text-ink-muted">
                        Case study:{' '}
                        {related.map((c, idx) => (
                          <span key={c.slug}>
                            {idx > 0 && ', '}
                            <Link
                              href={`/work/${c.slug}/`}
                              className="link-underline text-ink hover:text-accent"
                            >
                              {c.title}
                            </Link>
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </section>

      <section className="page-x mx-auto max-w-page py-14">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
          <h2 className="eyebrow">Education</h2>
          <ul className="space-y-8">
            {profile.education.map((edu) => (
              <Reveal as="li" key={edu.institution}>
                <h3 className="text-xl text-ink">{edu.institution}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{edu.degree}</p>
                <p className="mt-1 text-sm text-ink-muted">
                  {edu.focus} · {edu.location}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-x rule-t mx-auto max-w-page py-12">
        <p className="text-sm text-ink-muted">
          The full record, including certifications, is on{' '}
          <TextLink href={profile.socials.linkedin} external>
            LinkedIn
          </TextLink>{' '}
          and in the{' '}
          <TextLink href={profile.resumeUrl} external>
            résumé
          </TextLink>
          .
        </p>
      </section>
    </>
  )
}
