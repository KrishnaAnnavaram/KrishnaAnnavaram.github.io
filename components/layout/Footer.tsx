import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { navItems } from '@/data/nav'
import { profile } from '@/data/profile'

const elsewhere = [
  { label: 'Email', href: `mailto:${profile.socials.email}`, external: true },
  { label: 'LinkedIn', href: profile.socials.linkedin, external: true },
  { label: 'GitHub', href: profile.socials.github, external: true },
  { label: 'Résumé (PDF)', href: profile.resumeUrl, external: true },
]

export function Footer() {
  return (
    <footer className="rule-t mt-16">
      <div className="page-x mx-auto max-w-page py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="font-serif text-2xl leading-tight text-ink">
              Building LLM systems that survive contact with production.
            </p>
            <p className="mt-4 text-sm text-ink-muted">{profile.availability}</p>
            <Link
              href="/contact/"
              className="mt-6 inline-flex items-center gap-1.5 border-b border-accent pb-0.5 text-sm text-ink transition-colors hover:text-accent"
            >
              Get in touch
              <ArrowUpRight size={14} aria-hidden />
            </Link>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow">Pages</h2>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Elsewhere</h2>
            <ul className="mt-4 space-y-2.5">
              {elsewhere.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {item.label}
                    <ArrowUpRight size={12} className="text-ink-faint" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule-t mt-16 flex flex-col gap-2 pt-6 text-2xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono uppercase tracking-[0.14em]">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono uppercase tracking-[0.14em]">
            {profile.locationShort} · Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
