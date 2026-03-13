import Link from 'next/link'
import { Metadata } from 'next'
import { Clock, Calendar, ArrowRight, Tag } from 'lucide-react'
import { getAllPosts } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Writing — Krishna Annavaram',
  description: 'Technical writing on GenAI engineering, Graph-RAG, LLM fine-tuning, multi-agent systems, and production ML by Krishna Annavaram.',
}

export default function WritingPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container-narrow">
        <div className="mb-12">
          <p className="text-brand-accent text-sm font-mono font-medium mb-3 tracking-widest uppercase">
            Technical writing
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Writing
          </h1>
          <p className="text-text-secondary max-w-lg">
            Practical articles on GenAI engineering, Graph-RAG architecture, LLM fine-tuning,
            multi-agent systems, and what it actually takes to ship reliable AI at scale.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="glass p-12 text-center">
            <p className="text-text-muted text-lg mb-2">Coming soon</p>
            <p className="text-text-muted text-sm">New articles are being published.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="glass p-6 group hover:border-brand-primary/20 border border-white/5 transition-all duration-300">
                <Link href={`/writing/${post.slug}`} className="block">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Calendar size={11} aria-hidden="true" />
                      {formatDate(post.frontmatter.date)}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Clock size={11} aria-hidden="true" />
                      {post.frontmatter.readTime} min read
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-text-primary text-xl mb-2 group-hover:text-brand-primary transition-colors leading-snug">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {post.frontmatter.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.frontmatter.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 glass-sm border border-white/5 text-text-muted rounded-md flex items-center gap-1"
                        >
                          <Tag size={9} aria-hidden="true" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1.5 text-brand-primary text-sm font-medium group-hover:gap-2.5 transition-all" aria-hidden="true">
                      Read
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
