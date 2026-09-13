'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems } from '@/data/nav'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'
import { CommandPalette, type PaletteItem } from './CommandPalette'
import { AskButton } from '@/components/assistant/AskButton'

export function Header({ paletteItems }: { paletteItems: PaletteItem[] }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)

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

  /* The menu scroll-locks the page behind it, so a keyboard user who tabbed
     past its last item landed on links they could neither see nor scroll to.
     Escape closes it, Tab cycles within it, and focus returns to the toggle. */
  useEffect(() => {
    if (!menuOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setMenuOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !menuRef.current) return

      const focusable = [
        toggleRef.current,
        ...Array.from(menuRef.current.querySelectorAll<HTMLElement>('a[href], button')),
      ].filter(Boolean) as HTMLElement[]
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
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
      {/* `min-w-0` on both children is what stops this row overflowing. Without
          it a flex item cannot shrink below its min-content width, so the
          control cluster pushed itself off-screen rather than wrapping or
          truncating — at 768px the header ran 388px wider than the viewport,
          and `body { overflow-x: hidden }` hid the evidence. */}
      <div className="page-x mx-auto flex h-16 max-w-page items-center justify-between gap-3">
        <Link
          href="/"
          className="group flex min-w-0 items-baseline gap-2.5 text-ink"
          aria-label={`${profile.name} — home`}
        >
          <span className="truncate font-serif text-lg leading-none tracking-tight">
            {profile.name}
          </span>
          {/* The role is the first thing to go when space runs out — it is
              repeated in the hero immediately below. */}
          <span className="hidden shrink-0 font-mono text-2xs uppercase tracking-[0.14em] text-ink-faint xl:inline">
            {profile.role}
          </span>
        </Link>

        <div className="flex min-w-0 shrink-0 items-center gap-2">
          {/* Six links plus the control cluster do not fit until ~1100px.
              Below that the disclosure menu is the navigation, so the two
              breakpoints here and on the toggle must stay in step. */}
          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
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

          <div className="hidden items-center gap-3 sm:flex">
            <AskButton variant="quiet" />
            <CommandPalette items={paletteItems} />
          </div>

          <div className="sm:hidden">
            <AskButton variant="icon" />
          </div>
          <ThemeToggle />

          <button
            ref={toggleRef}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-rule bg-surface text-ink transition-colors hover:bg-sunken lg:hidden"
          >
            {menuOpen ? <X size={15} aria-hidden /> : <Menu size={15} aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          ref={menuRef}
          aria-label="Mobile"
          className="page-x border-t border-rule bg-paper pb-6 pt-2 lg:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-baseline justify-between border-b border-rule py-3.5"
            >
              <span className="font-serif text-xl text-ink">{item.label}</span>
              <span className="max-w-[55%] text-right text-xs text-ink-muted">{item.hint}</span>
            </Link>
          ))}
          <div className="pt-4">
            <AskButton />
          </div>
        </nav>
      )}
    </header>
  )
}
