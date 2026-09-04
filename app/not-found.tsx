import Link from 'next/link'
import { navItems } from '@/data/nav'
import { ButtonLink } from '@/components/ui/Bits'

export default function NotFound() {
  return (
    <section className="page-x mx-auto max-w-page py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 max-w-2xl text-4xl">
        That page isn’t here. Retrieval returned nothing relevant.
      </h1>
      <p className="mt-6 max-w-text text-lg text-ink-soft">
        Which is the correct behaviour — better an honest miss than a plausible-looking guess.
        Here’s everything that does exist:
      </p>

      <ul className="rule-t mt-12 max-w-text">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-baseline justify-between gap-6 border-b border-rule py-4"
            >
              <span className="font-serif text-xl text-ink transition-colors group-hover:text-accent">
                {item.label}
              </span>
              <span className="max-w-[55%] text-right text-xs text-ink-muted">{item.hint}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <ButtonLink href="/">Back home</ButtonLink>
      </div>
    </section>
  )
}
