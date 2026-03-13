import { Hero } from '@/components/sections/Hero'
import { CredibilityBar } from '@/components/sections/CredibilityBar'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { SkillsPhysics } from '@/components/sections/SkillsPhysics'
import { MentorshipImpact } from '@/components/sections/MentorshipImpact'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Krishna Annavaram — Generative AI Engineer | Graph-RAG · Multi-Agent · LLM Systems',
  description:
    'Generative AI Engineer with 5+ years shipping production LLM systems, Graph-RAG pipelines, and multi-agent AI across pharma, enterprise, research, and clinical tech.',
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
    </>
  )
}
