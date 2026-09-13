import { describe, expect, it } from 'vitest'
import {
  activitySummary,
  explorerFeed,
  feedDomains,
  getProjectWithRepo,
  getRepo,
  relativeTime,
} from '@/lib/projects'
import { DOMAINS, projects, visibleProjects, featuredProjects } from '@/data/projects'
import { caseStudies } from '@/data/work'
import { publications } from '@/data/publications'
import { diagramNodes, diagramToProse, NODE_KIND_META } from '@/lib/architecture'

/**
 * The registry is the editorial layer over GitHub. These tests defend the two
 * properties that make it safe: a project survives its repository going away,
 * and a repository cannot publish itself to the site.
 */

describe('editorial control', () => {
  it('a repo with no registry entry is never shown', () => {
    // `pick-n-play` exists on the account and is deliberately not registered.
    expect(getRepo('pick-n-play')).toBeDefined()
    expect(visibleProjects.some((p) => p.repo === 'pick-n-play')).toBe(false)
    expect(explorerFeed().some((i) => i.slug === 'pick-n-play')).toBe(false)
  })

  it('a project whose repo is missing still renders', () => {
    // DecisionForge is private, so it is absent from the public snapshot.
    const decisionForge = getProjectWithRepo('decisionforge')
    expect(decisionForge).toBeDefined()
    expect(decisionForge!.github).toBeUndefined()
    expect(decisionForge!.problem).toBeTruthy()
    expect(decisionForge!.evidence!.length).toBeGreaterThan(0)
  })

  it('no featured project links to a repository that is not in the snapshot', () => {
    for (const project of featuredProjects) {
      if (!project.repo) continue
      expect(getRepo(project.repo), `${project.slug} names a repo that was not synced`).toBeDefined()
    }
  })

  it('every registered repo name resolves or is explicitly absent', () => {
    for (const project of projects) {
      if (!project.repo) continue
      const repo = getRepo(project.repo)
      if (repo) expect(repo.name.toLowerCase()).toBe(project.repo.toLowerCase())
    }
  })
})

describe('provenance discipline', () => {
  it('every case study states what the system cannot do', () => {
    for (const project of projects.filter((p) => p.problem)) {
      expect(project.limitations?.length, `${project.slug} has no limitations`).toBeGreaterThan(0)
    }
  })

  it('every published figure records how it was obtained', () => {
    for (const project of projects) {
      for (const evidence of project.evidence ?? []) {
        expect(evidence.method, `${project.slug}: "${evidence.label}" has no method`).toBeTruthy()
      }
    }
  })

  it('every employment case study names where its figures come from', () => {
    // These cannot carry a per-figure method — there is no repository to
    // recompute against — so the requirement is that the page says so rather
    // than borrowing the credibility of the figures that can be checked.
    for (const study of caseStudies) {
      expect(study.provenance, `${study.slug} has no provenance note`).toBeTruthy()
      expect(study.provenance).toMatch(/résumé|resume/i)
    }
  })

  it('publications are not described as peer-reviewed', () => {
    for (const pub of publications) {
      expect(pub.type).not.toBe('Conference')
      expect(pub.url, `${pub.id} has no linked report`).toBeTruthy()
    }
  })

  it('does not publish the contaminated F1 figure Statute disowns', () => {
    const statute = projects.find((p) => p.slug === 'statute')!
    // The headline figures must be the blind ones. The contaminated 1.000 may
    // appear in a `method` note explaining why it is not the published number.
    const values = statute.evidence!.map((e) => `${e.value} ${e.label}`)
    expect(values.some((v) => v.includes('0.588'))).toBe(true)
    expect(values.some((v) => v.includes('1.000'))).toBe(false)
  })

  it('describes Statute’s checks as assertions, not tests', () => {
    const statute = projects.find((p) => p.slug === 'statute')!
    const figure = statute.evidence!.find((e) => e.value === '414')!
    expect(figure.label).toMatch(/assertion/i)
    expect(figure.label).not.toMatch(/\btests\b/i)
  })

  it('uses the counted Bootshift test figure rather than the README’s', () => {
    const bootshift = projects.find((p) => p.slug === 'bootshift')!
    const values = bootshift.evidence!.map((e) => e.value)
    expect(values).toContain('191')
    expect(values).not.toContain('143')
  })
})

describe('taxonomy', () => {
  it('every project domain exists in the taxonomy', () => {
    for (const project of projects) {
      for (const domain of project.domains) {
        expect(DOMAINS[domain], `unknown domain "${domain}" on ${project.slug}`).toBeTruthy()
      }
    }
  })

  it('facet counts match the feed', () => {
    const feed = explorerFeed()
    for (const facet of feedDomains()) {
      const actual = feed.filter((i) => i.domains.some((d) => d.id === facet.id)).length
      expect(actual).toBe(facet.count)
    }
  })

  it('the feed covers both repositories and employment work', () => {
    const feed = explorerFeed()
    expect(feed.some((i) => i.context === 'Repository')).toBe(true)
    expect(feed.some((i) => i.context !== 'Repository')).toBe(true)
  })

  it('every feed row has somewhere to go', () => {
    for (const item of explorerFeed()) {
      expect(item.href, `${item.slug} has no destination`).toBeTruthy()
    }
  })
})

describe('github activity', () => {
  it('summarises only repos the registry shows', () => {
    const shown = new Set(visibleProjects.map((p) => p.repo?.toLowerCase()).filter(Boolean))
    for (const repo of activitySummary(20).recent) {
      expect(shown.has(repo.name.toLowerCase())).toBe(true)
    }
  })

  it('language shares total roughly 100%', () => {
    const total = activitySummary().languages.reduce((a, l) => a + l.share, 0)
    expect(total).toBeGreaterThan(99)
    expect(total).toBeLessThan(101)
  })

  it('orders recent activity by push date, newest first', () => {
    const dates = activitySummary(20).recent.map((r) => +new Date(r.pushedAt))
    expect([...dates].sort((a, b) => b - a)).toEqual(dates)
  })
})

describe('relativeTime', () => {
  const now = Date.UTC(2026, 8, 13)
  const ago = (days: number) => new Date(now - days * 86_400_000).toISOString()

  it.each([
    [0, 'today'],
    [1, 'yesterday'],
    [5, '5 days ago'],
    [45, '1 month ago'],
    [400, '1 year ago'],
  ])('formats %i days as "%s"', (days, expected) => {
    expect(relativeTime(ago(days), now)).toBe(expected)
  })
})

describe('architecture diagrams', () => {
  const withDiagram = projects.filter((p) => p.diagram)

  it('featured systems carry a diagram', () => {
    expect(withDiagram.length).toBeGreaterThanOrEqual(4)
  })

  it('every node uses a known kind and has a summary', () => {
    for (const project of withDiagram) {
      for (const node of diagramNodes(project.diagram!)) {
        expect(NODE_KIND_META[node.kind], `unknown kind on ${node.id}`).toBeTruthy()
        expect(node.summary.length).toBeGreaterThan(10)
      }
    }
  })

  it('node ids are unique within a diagram', () => {
    for (const project of withDiagram) {
      const ids = diagramNodes(project.diagram!).map((n) => n.id)
      expect(new Set(ids).size, `duplicate node id in ${project.slug}`).toBe(ids.length)
    }
  })

  it('marks the model boundary — every diagram distinguishes deterministic work', () => {
    for (const project of withDiagram) {
      const kinds = new Set(diagramNodes(project.diagram!).map((n) => n.kind))
      expect(kinds.has('deterministic'), `${project.slug} marks nothing deterministic`).toBe(true)
    }
  })

  it('renders to prose for screen readers and the index', () => {
    for (const project of withDiagram) {
      const prose = diagramToProse(project.diagram!)
      expect(prose).toContain('→')
      expect(prose.length).toBeGreaterThan(50)
    }
  })
})
