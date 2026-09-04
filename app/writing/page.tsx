import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPostMeta } from '@/lib/writing'
import { formatMonthYear } from '@/lib/utils'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Chip } from '@/components/ui/Bits'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Essays on retrieval architecture, LLM evaluation, and the engineering that separates a production AI system from a demo.',
}

export default function WritingPage() {
  const posts = getPostMeta()

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes on making AI systems boring enough to trust."
        lede="Mostly about retrieval, evaluation, and the unglamorous engineering that decides whether a model survives contact with real traffic."
      />

      <section className="page-x mx-auto max-w-page pb-8">
        <ul className="rule-t">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 80}>
              <Link
                href={`/writing/${post.slug}/`}
                className="group block border-b border-rule py-9"
              >
                <p className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-faint">
                  {formatMonthYear(post.date)} · {post.readTime} min read
                </p>

                <h2 className="mt-3 flex max-w-3xl items-start gap-2 text-2xl text-ink transition-colors duration-200 group-hover:text-accent">
                  <span>{post.title}</span>
                  <ArrowRight
                    size={18}
                    className="mt-2 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden
                  />
                </h2>

                <p className="mt-3 max-w-text text-ink-soft">{post.excerpt}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 5).map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  )
}
