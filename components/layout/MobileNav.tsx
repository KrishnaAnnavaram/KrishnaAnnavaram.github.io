'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Briefcase, FolderOpen, PenLine, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: FolderOpen },
  { href: '/experience', label: 'Work', icon: Briefcase },
  { href: '/writing', label: 'Writing', icon: PenLine },
  { href: '/contact', label: 'Contact', icon: Mail },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 pb-safe"
      aria-label="Mobile bottom navigation"
    >
      <ul className="flex items-center justify-around px-2 py-2" role="list">
        {tabs.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  'flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all duration-200 min-h-[44px] min-w-[44px] justify-center',
                  isActive
                    ? 'text-brand-primary'
                    : 'text-text-muted hover:text-text-secondary'
                )}
                aria-current={isActive ? 'page' : undefined}
                aria-label={label}
              >
                <Icon
                  size={20}
                  aria-hidden="true"
                  className={cn(
                    'transition-transform duration-200',
                    isActive && 'scale-110'
                  )}
                />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
