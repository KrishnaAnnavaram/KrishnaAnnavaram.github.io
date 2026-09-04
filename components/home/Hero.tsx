import Image from 'next/image'
import { profile } from '@/data/profile'
import { currentRole, formatRoleDate } from '@/data/experience'
import { ButtonLink } from '@/components/ui/Bits'
import { Reveal } from '@/components/ui/Reveal'

export function Hero() {
  return (
    <section className="page-x mx-auto max-w-page pb-20 pt-16 sm:pt-24">
      <div className="grid items-end gap-12 lg:grid-cols-[1.65fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-5xl">
              I build LLM systems
              <br />
              that hold up in{' '}
              <span className="italic text-accent">production</span>.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-text text-lg text-ink-soft">{profile.intro}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="/work/">Read the case studies</ButtonLink>
              <ButtonLink href={profile.resumeUrl} variant="outline" external>
                Résumé
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="order-first lg:order-none">
          <div className="relative mx-auto w-44 sm:w-52 lg:mx-0 lg:ml-auto lg:w-full lg:max-w-[17rem]">
            <Image
              src="/images/profile/portrait.jpg"
              alt={`${profile.name}, ${profile.role}`}
              width={720}
              height={960}
              priority
              sizes="(max-width: 1024px) 13rem, 17rem"
              className="w-full rounded-sm object-cover grayscale-[0.15]"
            />
            <dl className="rule-t mt-5 space-y-2.5 pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="eyebrow">Now</dt>
                <dd className="text-right text-sm text-ink">
                  {currentRole.company}
                  <span className="block text-xs text-ink-muted">
                    since {formatRoleDate(currentRole.start)}
                  </span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="eyebrow">Based</dt>
                <dd className="text-sm text-ink">{profile.location}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
