import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { archive, archiveCategories, repoUrl } from '@/data/archive'
import { SectionHead } from './SectionHead'

/**
 * The archive, previewed. Deliberately lower and quieter than the flagships:
 * category counts and six entries, then a door to the full index.
 */
export function EarlierWork() {
  const categories = archiveCategories()
  const picks = archive.filter((e) => e.tier === 'A').slice(0, 6)

  return (
    <section className="border-y border-rule bg-sunken/60" aria-labelledby="earlier-title">
      <div className="page-x mx-auto max-w-page py-20 sm:py-24">
        <SectionHead
          index="04"
          label="Earlier work"
          id="earlier-title"
          title={`${archive.length} more projects, each its own repository`}
          lede="Earlier projects, recently published to GitHub: retrieval, agents, evaluation, NLP, medical imaging and forecasting. Each is its own repository with a test suite and CI."
          aside={
            <Link
              href="/projects/#archive"
              className="inline-flex items-center gap-1.5 rounded-full border border-rule-strong px-4 py-2 text-sm text-ink transition-colors hover:border-ink"
            >
              Browse all {archive.length}
              <ArrowRight size={14} aria-hidden />
            </Link>
          }
        />

        <ul className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/projects/?category=${c.id}#archive`}
                className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-accent hover:text-ink"
              >
                {c.label}
                <span className="font-mono text-3xs text-ink-faint tabular">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((e) => (
            <li key={e.repo}>
              <a
                href={repoUrl(e.repo)}
                target="_blank"
                rel="noopener noreferrer"
                className="spotlight plate group flex h-full flex-col p-4"
              >
                <span className="flex items-center justify-between gap-2 font-mono text-2xs text-accent">
                  {e.repo}
                  <ArrowUpRight size={13} className="text-ink-faint transition-colors group-hover:text-accent" aria-hidden />
                </span>
                <span className="mt-2 text-sm text-ink">{e.tagline}</span>
                {e.pipeline && (
                  <span className="mt-3 line-clamp-2 font-mono text-3xs leading-relaxed text-ink-muted">{e.pipeline}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
