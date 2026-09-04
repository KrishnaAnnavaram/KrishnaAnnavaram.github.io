import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  readTime: number
  excerpt: string
  featured: boolean
}

export interface Post extends PostMeta {
  content: string
}

const WRITING_DIR = path.join(process.cwd(), 'content', 'writing')

function parse(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, '')
  const raw = fs.readFileSync(path.join(WRITING_DIR, fileName), 'utf8')
  const { data, content } = matter(raw)

  // The page header already renders the title, so drop a leading H1 that just
  // repeats it rather than showing the same line twice.
  const body = content.replace(/^\s*#\s+.+?\n/, '').trimStart()

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readTime: Number(data.readTime ?? Math.max(1, Math.round(body.split(/\s+/).length / 220))),
    excerpt: String(data.excerpt ?? ''),
    featured: Boolean(data.featured),
    content: body,
  }
}

/** Newest first. Read at build time only — this module is server-side. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(WRITING_DIR)) return []
  return fs
    .readdirSync(WRITING_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map(parse)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

export function getPostMeta(): PostMeta[] {
  return getAllPosts().map(({ content, ...meta }) => meta)
}
