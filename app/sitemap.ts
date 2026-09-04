import type { MetadataRoute } from 'next'
import { profile } from '@/data/profile'
import { caseStudies } from '@/data/work'
import { getPostMeta } from '@/lib/writing'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl
  const now = new Date()

  const routes = ['', '/work', '/experience', '/research', '/writing', '/about', '/contact']

  return [
    ...routes.map((route) => ({
      url: `${base}${route}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...caseStudies.map((c) => ({
      url: `${base}/work/${c.slug}/`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...getPostMeta().map((p) => ({
      url: `${base}/writing/${p.slug}/`,
      lastModified: new Date(p.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
