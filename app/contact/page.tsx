import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/profile'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${profile.name} — email, LinkedIn, GitHub, and résumé.`,
}

const channels = [
  { label: 'Email', value: profile.socials.email, href: `mailto:${profile.socials.email}` },
  { label: 'LinkedIn', value: '/in/krishna-annavaram', href: profile.socials.linkedin },
  { label: 'GitHub', value: '@KrishnaAnnavaram', href: profile.socials.github },
  { label: 'Résumé', value: 'PDF, one page', href: profile.resumeUrl },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say what you’re building."
        lede={`${profile.availability}. Email is the fastest route — I read every message, and I'll tell you honestly if I'm not the right fit.`}
      />

      <section className="page-x rule-t mx-auto max-w-page py-14">
        <div className="grid gap-14 lg:grid-cols-[1fr_18rem] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={100}>
            <h2 className="eyebrow">Direct</h2>
            <ul className="mt-5">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-4 border-b border-rule py-3.5"
                  >
                    <span className="eyebrow">{channel.label}</span>
                    <span className="inline-flex items-baseline gap-1 text-right text-sm text-ink transition-colors group-hover:text-accent">
                      {channel.value}
                      <ArrowUpRight
                        size={12}
                        className="translate-y-px text-ink-faint"
                        aria-hidden
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-ink-muted">
              Based in {profile.location}. Comfortable working remotely across US time zones.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
