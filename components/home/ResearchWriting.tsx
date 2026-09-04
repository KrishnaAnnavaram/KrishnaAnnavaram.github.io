import Link from 'next/link'
import { authoredPublications, supervisedResearch } from '@/data/publications'
import { getPostMeta } from '@/lib/writing'
import { formatMonthYear } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel, TextLink } from '@/components/ui/Bits'

export function ResearchWriting() {
  const posts = getPostMeta().slice(0, 3)

  return (
    <section className="page-x rule-t mx-auto max-w-page py-20">
      <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-16">
        <SectionLabel>Beyond the job</SectionLabel>

        <div className="grid gap-14 md:grid-cols-2 md:gap-12">
          <Reveal>
            <h3 className="text-2xl text-ink">Research</h3>
            <p className="mt-3 text-ink-soft">
              Co-authored NLP and computer-vision papers, plus graduate projects mentored during
              the teaching assistantship at UNT. Every entry links to its full report.
            </p>
            <dl className="mt-7 flex gap-10">
              <div>
                <dt className="font-serif text-3xl leading-none text-ink">
                  {authoredPublications.length}
                </dt>
                <dd className="mt-2 text-xs text-ink-muted">co-authored papers</dd>
              </div>
              <div>
                <dt className="font-serif text-3xl leading-none text-ink">
                  {supervisedResearch.length}
                </dt>
                <dd className="mt-2 text-xs text-ink-muted">supervised projects</dd>
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
