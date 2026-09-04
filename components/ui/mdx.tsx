import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

/**
 * The article's own <h1> is rendered by the page header, so an H1 inside the
 * body is demoted rather than duplicated. Tables get their own scroll
 * container so wide content never scrolls the page sideways.
 */
export const mdxComponents: MDXComponents = {
  h1: ({ children }) => <h2>{children}</h2>,

  a: ({ href = '', children }) => {
    if (href.startsWith('/')) return <Link href={href}>{children}</Link>
    if (href.startsWith('#')) return <a href={href}>{children}</a>
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  },

  table: ({ children }) => (
    <div className="-mx-1 overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="border-b border-rule-strong">{children}</thead>,
  th: ({ children }) => (
    <th className="px-3 py-2.5 text-left font-mono text-2xs uppercase tracking-[0.1em] text-ink-muted">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-rule px-3 py-2.5 align-top text-ink-soft">{children}</td>
  ),

  hr: () => <hr className="my-12" />,
}
