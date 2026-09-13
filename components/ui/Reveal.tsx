'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  /** Stagger within a group, in milliseconds. */
  delay?: number
  as?: ElementType
  className?: string
  /**
   * Render immediately, with no reveal at all.
   *
   * Anything above the fold must set this. The reveal hides content until an
   * IntersectionObserver runs after hydration, which made the hero paragraph
   * the Largest Contentful Paint element at ~1,050ms on a loopback connection
   * — a static page hiding its own first screen behind its JavaScript. First
   * Contentful Paint was ~180ms; everything between the two was self-inflicted.
   */
  eager?: boolean
}

/**
 * Fades content in once as it enters the viewport. The transition itself lives
 * in globals.css under [data-reveal]; this only flips the attribute, so a
 * reduced-motion user sees the content immediately with no JS-driven animation.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
  eager = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (eager) return
    const node = ref.current
    if (!node) return

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      node.setAttribute('data-reveal', 'shown')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.setAttribute('data-reveal', 'shown')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [eager])

  if (eager) {
    return <Tag className={cn(className)}>{children}</Tag>
  }

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  )
}
