'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems } from '@/data/nav'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'
import { CommandPalette, type PaletteItem } from './CommandPalette'

export function Header({ paletteItems }: { paletteItems: PaletteItem[] }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-b border-rule bg-paper/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="page-x mx-auto flex h-16 max-w-page items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex shrink-0 items-baseline gap-2.5 text-ink"
          aria-label={`${profile.name} — home`}
        >
          <span className="font-serif text-lg leading-none tracking-tight">{profile.name}</span>
          <span className="hidden font-mono text-2xs uppercase tracking-[0.14em] text-ink-faint sm:inline">
            {profile.role}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-3 py-1.5 text-sm transition-colors duration-200',
                    active ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="hidden sm:block">
            <CommandPalette items={paletteItems} />
          </div>
          <ThemeToggle />

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid size-8 place-items-center rounded-full border border-rule bg-surface text-ink transition-colors hover:bg-sunken md:hidden"
          >
            {menuOpen ? <X size={15} aria-hidden /> : <Menu size={15} aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile"
          className="page-x border-t border-rule bg-paper pb-6 pt-2 md:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-baseline justify-between border-b border-rule py-3.5 last:border-0"
            >
              <span className="font-serif text-xl text-ink">{item.label}</span>
              <span className="max-w-[55%] text-right text-xs text-ink-muted">{item.hint}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
