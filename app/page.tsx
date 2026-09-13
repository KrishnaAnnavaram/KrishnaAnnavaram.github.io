import { Hero } from '@/components/home/Hero'
import { CurrentFocus } from '@/components/home/CurrentFocus'
import { SelectedSystems } from '@/components/home/SelectedSystems'
import { Approach } from '@/components/home/Approach'
import { ResearchWriting } from '@/components/home/ResearchWriting'
import { ContactCTA } from '@/components/home/ContactCTA'
import { GitHubActivity } from '@/components/projects/GitHubActivity'
import { activitySummary } from '@/lib/projects'
import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import { featuredProjects } from '@/data/projects'

/**
 * Person + ItemList structured data, built from the same source the pages
 * render so the two can never disagree.
 */
function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${profile.siteUrl}/#person`,
        name: profile.name,
        jobTitle: profile.role,
        url: profile.siteUrl,
        email: `mailto:${profile.socials.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Denton',
          addressRegion: 'TX',
          addressCountry: 'US',
        },
        sameAs: [profile.socials.linkedin, profile.socials.github],
        worksFor: { '@type': 'Organization', name: experience[0].company },
        alumniOf: profile.education.map((e) => ({
          '@type': 'CollegeOrUniversity',
          name: e.institution,
        })),
        knowsAbout: [
          'Agentic AI',
          'Multi-agent systems',
          'Model Context Protocol',
          'Retrieval-Augmented Generation',
          'Large Language Models',
          'Legacy modernisation',
          'Reverse engineering',
          'LLM evaluation',
          'Natural Language Processing',
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${profile.siteUrl}/#featured-projects`,
        name: 'Featured systems',
        itemListElement: featuredProjects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'SoftwareSourceCode',
            name: p.name,
            description: p.tagline,
            url: `${profile.siteUrl}/projects/${p.slug}/`,
            author: { '@id': `${profile.siteUrl}/#person` },
          },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <SelectedSystems />
      <CurrentFocus />
      <GitHubActivity activity={activitySummary(5)} sectionNumber="03" />
      <Approach />
      <ResearchWriting />
      <ContactCTA />
    </>
  )
}
