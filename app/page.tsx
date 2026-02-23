import { Hero } from '@/components/sections/Hero'
import { CredibilityBar } from '@/components/sections/CredibilityBar'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { SkillsPhysics } from '@/components/sections/SkillsPhysics'
import { MentorshipImpact } from '@/components/sections/MentorshipImpact'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { AIConcierge } from '@/components/ai/AIConcierge'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Krishna Annavaram — GenAI Engineer & Healthcare AI Specialist',
  description:
    'GenAI Engineer with 5+ years building production LLM systems, RAG pipelines, and agentic AI workflows for healthcare and enterprise.',
}

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <CredibilityBar />
      <FeaturedProjects />
      <SkillsPhysics />
      <MentorshipImpact />
      <ContactCTA />
      <AIConcierge />
    </>
  )
}
