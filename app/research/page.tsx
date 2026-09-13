import type { Metadata } from 'next'
import { publications, authoredPublications } from '@/data/publications'
import { PageHeader } from '@/components/ui/PageHeader'
import { ResearchList } from './ResearchList'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Co-authored NLP and computer-vision research reports, and graduate projects supervised at the University of North Texas. Every entry links to its full report; none is peer-reviewed.',
}

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Papers and projects, each with its report attached."
        lede={`${authoredPublications.length} co-authored graduate research reports from the MS at UNT, typeset in an IEEE template for coursework — not peer-reviewed. Every entry was checked against the document it links to: the surname appears in the author block and the title matches.`}
      />
      <ResearchList publications={publications} />
    </>
  )
}
