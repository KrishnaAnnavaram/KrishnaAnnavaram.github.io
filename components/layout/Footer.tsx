import Link from 'next/link'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { profile } from '@/data/profile'

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Publications', href: '/publications' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-background-secondary py-12 px-4 mt-20">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display font-bold text-2xl text-gradient" aria-label="Home">
              Krishna Annavaram
            </Link>
            <p className="mt-2 text-text-muted text-sm leading-relaxed">
              GenAI Engineer · Healthcare AI · Production LLM Systems
            </p>
            <p className="mt-1 text-text-muted text-xs">
              Denton, TX · Open to Senior GenAI roles
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
              Navigation
            </h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2" role="list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h2 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
              Connect
            </h2>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${profile.socials.email}`}
                className="flex items-center gap-2 text-text-secondary text-sm hover:text-brand-primary transition-colors"
                aria-label={`Email Krishna at ${profile.socials.email}`}
              >
                <Mail size={14} aria-hidden="true" />
                {profile.socials.email}
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary text-sm hover:text-brand-primary transition-colors"
                aria-label="LinkedIn profile (opens in new tab)"
              >
                <Linkedin size={14} aria-hidden="true" />
                LinkedIn
                <ExternalLink size={10} aria-hidden="true" />
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary text-sm hover:text-brand-primary transition-colors"
                aria-label="GitHub profile (opens in new tab)"
              >
                <Github size={14} aria-hidden="true" />
                GitHub
                <ExternalLink size={10} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            © {currentYear} Krishna Annavaram. Built with Next.js & Three.js.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={profile.resumeUrl}
              download
              className="text-text-muted text-xs hover:text-brand-primary transition-colors"
              aria-label="Download Resume PDF"
            >
              Download Resume
            </a>
            <a
              href={profile.coverLetterUrl}
              download
              className="text-text-muted text-xs hover:text-brand-primary transition-colors"
              aria-label="Download Cover Letter PDF"
            >
              Cover Letter
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
