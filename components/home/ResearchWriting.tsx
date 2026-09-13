import Link from 'next/link'
import { authoredPublications } from '@/data/publications'
import { getPostMeta } from '@/lib/writing'
import { formatMonthYear } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { TextLink } from '@/components/ui/Bits'

export function ResearchWriting() {
  const posts = getPostMeta().slice(0, 3)

  return (
    <section className="page-x rule-t mx-auto max-w-page py-16">
      <div className="spec-grid">
        <div>
          <h2 className="eyebrow lg:sticky lg:top-24">
            <span className="text-ink-faint">05</span> &nbsp;Beyond the job
          </h2>
        </div>

        <div className="grid gap-14 md:grid-cols-2 md:gap-12">
          <Reveal>
            <h3 className="text-2xl text-ink">Research</h3>
            <p className="mt-3 text-ink-soft">
              Co-authored NLP and computer-vision research reports from graduate study at UNT.
              Every entry links to its full report, and every one was checked against that
              document. None is peer-reviewed.
            </p>
            <dl className="mt-7">
              <div>
                <dt className="font-serif text-3xl leading-none text-ink tabular">
                  {authoredPublications.length}
                </dt>
                <dd className="mt-2 max-w-[18rem] text-xs text-ink-muted">
                  co-authored graduate research reports, each verified against the PDF it links to
                </dd>
              </div>
            </dl>
            <div className="mt-7">
              <TextLink href="/research/">Browse research</TextLink>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h3 className="text-2xl text-ink">Writing</h3>
            <p className="mt-3 text-ink-soft">
              Notes on retrieval architecture, evaluation, and what changes when a model has to
              serve real traffic.
            </p>
            <ul className="mt-7 space-y-px">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/writing/${post.slug}/`}
                    className="group flex items-baseline justify-between gap-4 border-b border-rule py-3"
                  >
                    <span className="text-sm text-ink transition-colors group-hover:text-accent">
                      {post.title}
                    </span>
                    <span className="shrink-0 font-mono text-2xs uppercase tracking-[0.1em] text-ink-faint">
                      {formatMonthYear(post.date)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <TextLink href="/writing/">All writing</TextLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
