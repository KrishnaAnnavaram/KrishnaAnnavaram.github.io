import { profile } from '@/data/profile'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Bits'

export function ContactCTA() {
  return (
    <section className="page-x rule-t mx-auto max-w-page py-20">
      <Reveal className="grid gap-8 lg:grid-cols-[10rem_1fr] lg:gap-16">
        <p className="eyebrow">Contact</p>
        <div>
          <h2 className="max-w-2xl text-3xl">
            If you’re building something that has to work on real traffic, I’d like to hear about
            it.
          </h2>
          <p className="mt-5 max-w-text text-ink-soft">
            {profile.availability}. The fastest way to reach me is email — I read every message.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={`mailto:${profile.socials.email}`} external>
              {profile.socials.email}
            </ButtonLink>
            <ButtonLink href="/contact/" variant="outline">
              Other ways to reach me
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
