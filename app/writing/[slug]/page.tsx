import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { AIConcierge } from '@/components/ai/AIConcierge'
import { formatDate } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  }
}

// Minimal markdown → HTML converter (for static export without MDX processing)
function renderMarkdown(content: string): string {
  return content
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // H1-H3
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Tables
    .replace(/\|(.+)\|/g, (match) => {
      if (match.includes('---')) return ''
      const cells = match.split('|').filter(Boolean).map((c) => c.trim())
      return `<tr>${cells.map((c) => `<td>${c}</td>`).join('')}</tr>`
    })
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Unordered lists
    .replace(/^[\*\-] (.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Paragraphs
    .replace(/\n\n([^<])/g, '\n\n<p>$1')
    // Horizontal rules
    .replace(/^---$/gm, '<hr />')
}

export default function WritingPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const htmlContent = renderMarkdown(post.content)

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      {/* Reading progress bar placeholder (CSS only) */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-background-elevated z-[55]" aria-hidden="true">
        <div className="h-full bg-brand-primary w-0" id="reading-progress" />
      </div>

      <div className="container-narrow max-w-[720px]">
        {/* Back */}
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary text-sm mb-8 group transition-colors"
          aria-label="Back to all writing"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          All writing
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5 text-xs text-text-muted">
              <Calendar size={11} aria-hidden="true" />
              {formatDate(post.frontmatter.date)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-text-muted">
              <Clock size={11} aria-hidden="true" />
              {post.frontmatter.readTime} min read
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
            {post.frontmatter.title}
          </h1>

          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            {post.frontmatter.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 pb-6 border-b border-white/5">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 glass-sm border border-white/5 text-text-muted rounded-full flex items-center gap-1"
              >
                <Tag size={9} aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article content */}
        <article
          className="prose prose-invert max-w-none"
          style={{
            '--tw-prose-body': 'var(--text-secondary)',
            '--tw-prose-headings': 'var(--text-primary)',
            '--tw-prose-links': 'var(--brand-primary)',
            '--tw-prose-code': 'var(--brand-accent)',
          } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          aria-label={`Article: ${post.frontmatter.title}`}
        />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/5">
          <div className="glass p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-text-primary font-semibold mb-1">Want to discuss this?</p>
              <p className="text-text-muted text-sm">I read every message and respond thoughtfully.</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/80 transition-all text-sm"
            >
              Get in touch
            </Link>
          </div>

          <div className="mt-6 flex justify-between">
            <Link
              href="/writing"
              className="flex items-center gap-2 text-text-muted hover:text-text-primary text-sm transition-colors"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              All writing
            </Link>
          </div>
        </footer>
      </div>

      <AIConcierge />
    </div>
  )
}
