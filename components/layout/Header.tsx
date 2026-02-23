'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
      )}
    >
      <nav className="container-wide px-4 flex items-center justify-between" aria-label="Primary navigation">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-bold text-xl text-text-primary hover:text-brand-primary transition-colors"
          aria-label="Krishna Annavaram — Home"
        >
          <span className="text-gradient">KA</span>
          <span className="text-text-secondary ml-1 text-sm font-normal hidden sm:inline">
            / GenAI Engineer
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative',
                  pathname === link.href
                    ? 'text-brand-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                )}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-brand-primary/10 border border-brand-primary/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/resume/resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-brand-primary/30 text-brand-primary text-sm font-medium hover:bg-brand-primary/10 transition-all duration-200"
            aria-label="Download Resume PDF"
          >
            <Download size={14} aria-hidden="true" />
            Resume
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg glass-sm text-text-secondary hover:text-text-primary transition-colors"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden glass border-t border-white/5"
          >
            <ul className="container-wide px-4 py-4 flex flex-col gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      pathname === link.href
                        ? 'text-brand-primary bg-brand-primary/10'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                    )}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-white/5">
                <a
                  href="/resume/resume.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-3 text-brand-primary font-medium"
                  aria-label="Download Resume PDF"
                >
                  <Download size={16} aria-hidden="true" />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
