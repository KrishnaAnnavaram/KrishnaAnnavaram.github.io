import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface PageHeaderProps {
  eyebrow: string
  title: string
  lede?: string
  meta?: ReactNode
}

export function PageHeader({ eyebrow, title, lede, meta }: PageHeaderProps) {
  return (
    <header className="page-x mx-auto max-w-page pb-14 pt-20 sm:pt-28">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl">{title}</h1>
        {lede && (
          <p className="mt-6 max-w-text text-lg text-ink-soft">{lede}</p>
        )}
        {meta && <div className="mt-8">{meta}</div>}
      </Reveal>
    </header>
  )
}
