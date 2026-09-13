import type { Metadata } from 'next'
import { activitySummary, explorerFeed, feedDomains, relativeTime } from '@/lib/projects'
import { ProjectExplorer, type ExplorerItem } from '@/components/projects/ProjectExplorer'
import { PageHeader } from '@/components/ui/PageHeader'
import { GitHubActivity } from '@/components/projects/GitHubActivity'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Systems built and shipped — agentic harnesses, retrieval pipelines, and legacy-modernisation tooling. Each entry links to the repository it was measured against.',
  alternates: { canonical: '/projects/' },
}

export default function ProjectsPage() {
  const activity = activitySummary()

  /* Only what the explorer needs crosses to the client. Case-study prose and
     README text stay on the server, where they are already rendered.
     `pushedLabel` is computed here so the client never formats a date against
     a clock that differs from the one the page was built with. */
  const items: ExplorerItem[] = explorerFeed().map((p) => ({
    ...p,
    pushedLabel: p.pushedAt ? relativeTime(p.pushedAt) : undefined,
  }))

  return (
    <>
      <PageHeader
        eyebrow="02 — Projects"
        title="Systems, and the evidence for them"
        lede="Every entry is a repository you can open. Where a project has a case study, it states the problem, the architecture, what was measured and how — and what the system still cannot do."
      />

      <section className="page-x mx-auto max-w-page pb-16" aria-labelledby="all-projects">
        <h2 id="all-projects" className="sr-only">
          All projects
        </h2>
        <ProjectExplorer items={items} domains={feedDomains()} />
      </section>

      <GitHubActivity activity={activity} />
    </>
  )
}
