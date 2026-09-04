import { Hero } from '@/components/home/Hero'
import { SelectedWork } from '@/components/home/SelectedWork'
import { Approach } from '@/components/home/Approach'
import { ResearchWriting } from '@/components/home/ResearchWriting'
import { ContactCTA } from '@/components/home/ContactCTA'
import { profile } from '@/data/profile'
import { experience } from '@/data/experience'

/** Person + WebSite structured data, built from the same source as the pages. */
function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: profile.siteUrl,
    email: `mailto:${profile.socials.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Denton', addressRegion: 'TX', addressCountry: 'US' },
    sameAs: [profile.socials.linkedin, profile.socials.github],
    worksFor: { '@type': 'Organization', name: experience[0].company },
    alumniOf: profile.education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
    knowsAbout: [
      'Retrieval-Augmented Generation',
      'Large Language Models',
      'Agentic AI',
      'Natural Language Processing',
      'MLOps',
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
      <SelectedWork />
      <Approach />
      <ResearchWriting />
      <ContactCTA />
    </>
  )
}
