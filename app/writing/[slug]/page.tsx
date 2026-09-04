import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPost } from '@/lib/writing'
import { formatFullDate } from '@/lib/utils'
import { Chip } from '@/components/ui/Bits'
import { mdxComponents } from '@/components/ui/mdx'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const all = getAllPosts()
  const index = all.findIndex((p) => p.slug === slug)
  const next = all[(index + 1) % all.length]

  return (
    <article className="page-x mx-auto max-w-page">
      <header className="pb-10 pt-16 sm:pt-20">
        <Link
          href="/writing/"
          className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" aria-hidden />
          All writing
        </Link>

        <p className="eyebrow mt-10">
          {formatFullDate(post.date)} · {post.readTime} min read
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl">{post.title}</h1>
        <p className="mt-6 max-w-text text-lg text-ink-soft">{post.excerpt}</p>

        <div className="mt-7 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>
      </header>

      <div className="prose-editorial rule-t py-12">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {all.length > 1 && (
        <nav className="rule-t py-12" aria-label="Next article">
          <Link href={`/writing/${next.slug}/`} className="group block">
            <p className="eyebrow">Next</p>
            <p className="mt-3 flex items-start gap-2 font-serif text-2xl text-ink transition-colors group-hover:text-accent">
              {next.title}
              <ArrowRight
                size={18}
                className="mt-2 shrink-0 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </p>
          </Link>
        </nav>
      )}
    </article>
  )
}
