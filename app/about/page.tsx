import type { Metadata } from 'next'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { profile } from '@/data/profile'
import { skillGroups } from '@/data/skills'
import { certifications } from '@/data/certifications'
import { formatMonthYear } from '@/lib/utils'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Chip, TextLink } from '@/components/ui/Bits'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Background, engineering principles, the full technical inventory, and verified certifications.',
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A systems engineer who happens to work on models."
      />

      <section className="page-x mx-auto max-w-page pb-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
          <Reveal>
            <div className="prose-editorial text-lg">
              <p>{profile.intro}</p>
              {profile.positioning.split('\n\n').map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
              <p>
                Before the US, I worked in India — first at Lemoius building the NLP and ranking
                layer of a hiring marketplace, then at Cognizant on enterprise ML for US healthcare
                clients. I came to the University of North Texas for a master’s in Data Science,
                and spent a year there as a teaching assistant: supporting graduate coursework,
                mentoring project teams, and building a retrieval system that answered students’
                research questions without inventing citations.
              </p>
              <p>
                That mix — startup, enterprise, academic — is why I default to engineering
                discipline over novelty. Enterprise work taught me what auditability costs.
                Teaching taught me that if you can’t explain why a system answered the way it did,
                you don’t understand it yet.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:pt-2">
            <Image
              src="/images/profile/portrait.jpg"
              alt={`${profile.name}, ${profile.role}`}
              width={720}
              height={960}
              sizes="16rem"
              className="w-40 rounded-sm object-cover grayscale-[0.15] lg:w-full"
            />
            <dl className="rule-t mt-6 space-y-3 pt-5 text-sm">
              <div>
                <dt className="eyebrow">Based in</dt>
                <dd className="mt-1 text-ink">{profile.location}</dd>
              </div>
              <div>
                <dt className="eyebrow">Looking for</dt>
                <dd className="mt-1.5 space-y-1 text-ink-soft">
                  {profile.idealRoles.map((role) => (
                    <p key={role}>{role}</p>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="page-x rule-t mx-auto max-w-page py-16">
        <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-16">
          <h2 className="eyebrow sticky top-24 self-start">Principles</h2>
          <ol className="grid gap-px overflow-hidden rounded-sm bg-rule sm:grid-cols-2">
            {profile.principles.map((principle, i) => (
              <Reveal as="li" key={principle.title} delay={i * 60} className="bg-paper p-6 sm:p-7">
                <p className="font-mono text-2xs text-ink-faint">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-sans text-base font-semibold tracking-tight text-ink">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-sm text-ink-soft">{principle.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="page-x rule-t mx-auto max-w-page py-16">
        <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-16">
          <h2 className="eyebrow sticky top-24 self-start">Toolkit</h2>
          <div className="space-y-12">
            {skillGroups.map((group, i) => (
              <Reveal key={group.id} delay={i * 50}>
                <h3 className="font-sans text-base font-semibold tracking-tight text-ink">
                  {group.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-muted">{group.note}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-x rule-t mx-auto max-w-page py-16">
        <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-16">
          <h2 className="eyebrow sticky top-24 self-start">Certifications</h2>
          <ul className="max-w-text">
            {certifications.map((cert) => (
              <Reveal as="li" key={cert.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4">
                  <div>
                    <p className="text-ink">{cert.name}</p>
                    <p className="mt-0.5 text-sm text-ink-muted">{cert.issuer}</p>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-2xs uppercase tracking-[0.1em] text-ink-faint">
                      {formatMonthYear(cert.issued)}
                    </span>
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-2xs uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-accent"
                      >
                        Verify
                        <ExternalLink size={11} aria-hidden />
                        <span className="sr-only">{cert.name} on Credly</span>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-x rule-t mx-auto max-w-page py-12">
        <p className="text-sm text-ink-muted">
          Full role history on the{' '}
          <TextLink href="/experience/">experience page</TextLink>, or download the{' '}
          <TextLink href={profile.resumeUrl} external>
            résumé
          </TextLink>
          .
        </p>
      </section>
    </>
  )
}
