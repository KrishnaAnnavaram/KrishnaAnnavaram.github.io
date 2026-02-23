import fs from 'fs'
import path from 'path'

export interface PostFrontmatter {
  title: string
  date: string
  tags: string[]
  readTime: number
  excerpt: string
  featured?: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
}

const contentDir = path.join(process.cwd(), 'content', 'writing')

function parseFrontmatter(fileContent: string): { frontmatter: PostFrontmatter; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/
  const match = fileContent.match(frontmatterRegex)

  if (!match) {
    return {
      frontmatter: {
        title: 'Untitled',
        date: new Date().toISOString(),
        tags: [],
        readTime: 1,
        excerpt: '',
      },
      content: fileContent,
    }
  }

  const frontmatterStr = match[1]
  const content = fileContent.slice(match[0].length)

  const frontmatter: Partial<PostFrontmatter> = {}
  const lines = frontmatterStr.split('\n')

  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.slice(0, colonIndex).trim()
    const value = line.slice(colonIndex + 1).trim()

    if (key === 'title') frontmatter.title = value.replace(/^["']|["']$/g, '')
    else if (key === 'date') frontmatter.date = value.replace(/^["']|["']$/g, '')
    else if (key === 'excerpt') frontmatter.excerpt = value.replace(/^["']|["']$/g, '')
    else if (key === 'readTime') frontmatter.readTime = parseInt(value, 10)
    else if (key === 'featured') frontmatter.featured = value === 'true'
    else if (key === 'tags') {
      frontmatter.tags = value
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map((t) => t.trim().replace(/^["']|["']$/g, ''))
    }
  }

  return {
    frontmatter: {
      title: frontmatter.title ?? 'Untitled',
      date: frontmatter.date ?? new Date().toISOString(),
      tags: frontmatter.tags ?? [],
      readTime: frontmatter.readTime ?? 1,
      excerpt: frontmatter.excerpt ?? '',
      featured: frontmatter.featured,
    },
    content,
  }
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))

  return files
    .map((filename) => {
      const slug = filename.replace(/\.(mdx|md)$/, '')
      const filePath = path.join(contentDir, filename)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { frontmatter, content } = parseFrontmatter(fileContent)
      return { slug, frontmatter, content }
    })
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug)
}
