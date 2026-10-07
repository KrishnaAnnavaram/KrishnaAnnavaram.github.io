import type { Metadata } from 'next'
import { activitySummary, explorerFeed, feedDomains, relativeTime } from '@/lib/projects'
import { ProjectExplorer, type ExplorerItem } from '@/components/projects/ProjectExplorer'
import { ArchiveExplorer, type ArchiveRow } from '@/components/projects/ArchiveExplorer'
import { PageHeader } from '@/components/ui/PageHeader'
import { GitHubActivity } from '@/components/projects/GitHubActivity'
import { SectionHead } from '@/components/home/SectionHead'
import { archive, archiveCategories, ARCHIVE_CATEGORIES, repoUrl } from '@/data/archive'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Flagship agentic harnesses — MARS, BootShift, Statute and more — with architecture, evidence and limitations, plus an index of earlier applied ML and GenAI work.',
  alternates: { canonical: '/projects/' },
}

export default function ProjectsPage() {
  const activity = activitySummary()

  /* Only what the explorers need crosses to the client. Case-study prose and
     README text stay on the server. `pushedLabel` is computed here so the
     client never formats a date against a different clock. */
  const items: ExplorerItem[] = explorerFeed().map((p) => ({
    ...p,
    pushedLabel: p.pushedAt ? relativeTime(p.pushedAt) : undefined,
  }))

  const rows: ArchiveRow[] = archive.map((e) => ({
    repo: e.repo,
    url: repoUrl(e.repo),
    tagline: e.tagline,
    category: e.category,
    categoryLabel: ARCHIVE_CATEGORIES[e.category],
    stack: e.stack,
    pipeline: e.pipeline,
    note: e.note,
    tests: e.tests,
    llm: e.llm,
  }))

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Systems, and the evidence for them"
        lede="The flagship harnesses and the employment case studies first — each states the problem, the architecture, what was measured and how, and what it still cannot do. Earlier work follows as an index."
      />

      <section className="page-x mx-auto max-w-page pb-20" aria-labelledby="all-projects">
        <h2 id="all-projects" className="sr-only">
          Flagship systems and case studies
        </h2>
        <ProjectExplorer items={items} domains={feedDomains()} />
      </section>

      <section id="archive" className="scroll-mt-20 border-y border-rule bg-sunken/60" aria-labelledby="archive-title">
        <div className="page-x mx-auto max-w-page py-20">
          <SectionHead
            index="—"
            label="Earlier work"
            id="archive-title"
            title={`${archive.length} applied ML and GenAI repositories`}
            lede="Earlier projects, recently published to GitHub. Each is its own repository with a test suite and CI — open one for its design, validation and known problems."
          />
          <div className="mt-10">
            <ArchiveExplorer rows={rows} categories={archiveCategories()} />
          </div>
        </div>
      </section>

      <GitHubActivity activity={activity} />
    </>
  )
}
