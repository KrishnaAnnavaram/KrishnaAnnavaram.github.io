import { Hero } from '@/components/home/Hero'
import { TrustStrip } from '@/components/home/TrustStrip'
import { SystemsBento } from '@/components/home/SystemsBento'
import { PipelineReplay } from '@/components/home/PipelineReplay'
import { SectionHead } from '@/components/home/SectionHead'
import { RunHistory } from '@/components/home/RunHistory'
import { EarlierWork } from '@/components/home/EarlierWork'
import { Approach } from '@/components/home/Approach'
import { ContactCTA } from '@/components/home/ContactCTA'
import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import { featuredProjects } from '@/data/projects'
import { marsRuns } from '@/data/mars-runs'

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
        image: `${profile.siteUrl}${profile.photos[0].src}.jpg`,
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
      <TrustStrip />
      <SystemsBento />

      <section className="border-y border-rule bg-sunken/60" aria-labelledby="replay-title">
        <div className="page-x mx-auto max-w-page py-20 sm:py-24">
          <SectionHead
            index="02"
            label="Recorded evidence"
            id="replay-title"
            title={
              <>
                Watch MARS <span className="font-accent italic text-accent">refuse</span> to ship a fix.
              </>
            }
            lede="Four real issues, replayed from the evidence MARS committed for each run. Agents judge, scripts decide, a person approves the plan — and all four drafted fixes were blocked by the gates. That is the harness working."
          />
          <div className="mt-10">
            <PipelineReplay runs={marsRuns} />
          </div>
        </div>
      </section>

      <RunHistory />
      <EarlierWork />
      <Approach />
      <ContactCTA />
    </>
  )
}
