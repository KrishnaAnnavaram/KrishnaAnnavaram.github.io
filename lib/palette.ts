import type { PaletteItem } from '@/components/layout/CommandPalette'
import { navItems } from '@/data/nav'
import { caseStudies } from '@/data/work'
import { visibleProjects } from '@/data/projects'
import { experience } from '@/data/experience'
import { publications } from '@/data/publications'
import { getPostMeta } from '@/lib/writing'

/**
 * Built on the server so the client bundle carries labels and hrefs only —
 * not the publication abstracts, which are the bulk of the content data.
 */
export function buildPaletteIndex(): PaletteItem[] {
  return [
    ...navItems.map((n) => ({ href: n.href, label: n.label, group: 'Page', hint: n.hint })),
    ...visibleProjects.map((p) => ({
      href: p.problem ? `/projects/${p.slug}/` : '/projects/',
      label: p.name,
      group: 'Project',
      hint: p.tagline,
    })),
    ...caseStudies.map((c) => ({
      href: `/work/${c.slug}/`,
      label: c.title,
      group: 'Case study',
    })),
    ...experience.map((r) => ({
      href: `/experience/#${r.id}`,
      label: `${r.title} — ${r.company}`,
      group: 'Role',
    })),
    ...getPostMeta().map((p) => ({
      href: `/writing/${p.slug}/`,
      label: p.title,
      group: 'Writing',
    })),
    ...publications.map((p) => ({
      href: `/research/#${p.id}`,
      label: p.title,
      group: 'Research',
    })),
  ]
}
