import type { Metadata } from 'next'
import { publications, authoredPublications, supervisedResearch } from '@/data/publications'
import { PageHeader } from '@/components/ui/PageHeader'
import { ResearchList } from './ResearchList'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Co-authored NLP and computer-vision papers, and graduate research projects supervised at the University of North Texas. Every entry links to its full report.',
}

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Papers and projects, each with its report attached."
        lede={`${authoredPublications.length} co-authored submissions and ${supervisedResearch.length} graduate projects mentored during the teaching assistantship at UNT. Only work with a retrievable report is listed here.`}
      />
      <ResearchList publications={publications} />
    </>
  )
}
