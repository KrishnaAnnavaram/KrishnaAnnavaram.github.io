import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, MapPin, Briefcase, GraduationCap, Award, Server, Shield, Network } from 'lucide-react'
import { profile } from '@/data/profile'
import { AIConcierge } from '@/components/ai/AIConcierge'

export const metadata: Metadata = {
  title: 'About Krishna Annavaram',
  description: 'GenAI Engineer with 5+ years building production LLM systems and RAG pipelines for healthcare and enterprise.',
}

const principleIcons = { Server, Shield, Network }

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container-narrow">

        {/* Hero */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
          <div className="flex-1">
            <p className="text-brand-accent text-sm font-mono font-medium mb-3 tracking-widest uppercase">
              About me
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Building AI that actually{' '}
              <span className="text-gradient">ships</span>
            </h1>
            <div className="flex items-center gap-2 text-text-muted text-sm mb-6">
              <MapPin size={14} aria-hidden="true" />
              <span>{profile.location}</span>
              <span aria-hidden="true">·</span>
              <Briefcase size={14} aria-hidden="true" />
              <span>{profile.availability}</span>
            </div>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              {profile.bio.split('\n\n').map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
          </div>

          <div className="shrink-0 relative">
            <div className="w-56 h-56 rounded-2xl overflow-hidden border border-brand-primary/20 shadow-2xl glow-primary">
              <Image
                src="/images/profile/profile.png"
                alt="Krishna Annavaram"
                width={224}
                height={224}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Education badge */}
            <div className="absolute -bottom-4 -right-4 glass p-3 text-xs max-w-[160px]">
              <div className="flex items-center gap-1.5 mb-1">
                <GraduationCap size={12} className="text-brand-accent" aria-hidden="true" />
                <span className="text-text-muted font-mono">Education</span>
              </div>
              <p className="text-text-primary font-medium">MS Data Science</p>
              <p className="text-text-muted">Univ. of North Texas</p>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <section className="mb-20" aria-labelledby="philosophy-heading">
          <h2 id="philosophy-heading" className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Philosophy
          </h2>
          <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl">
            {profile.philosophy}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {profile.principles.map((principle) => {
              const Icon = principleIcons[principle.icon as keyof typeof principleIcons] ?? Server
              return (
                <div
                  key={principle.title}
                  className="glass p-6 group hover:border-brand-primary/20 border border-white/5 transition-all duration-300 cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                    <Icon size={20} className="text-brand-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-bold text-text-primary mb-2">{principle.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{principle.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Education */}
        <section className="mb-20" aria-labelledby="education-heading">
          <h2 id="education-heading" className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-8">
            Education
          </h2>
          <div className="space-y-4">
            <div className="glass p-6 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap size={20} className="text-brand-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Master of Science — Data Science</h3>
                <p className="text-text-secondary text-sm">University of North Texas</p>
                <p className="text-text-muted text-xs mt-1">Denton, TX</p>
              </div>
            </div>
            <div className="glass p-6 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 flex items-center justify-center shrink-0">
                <GraduationCap size={20} className="text-brand-secondary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Bachelor of Technology — Computer Science & Engineering</h3>
                <p className="text-text-secondary text-sm">Kalasalingam University</p>
                <p className="text-text-muted text-xs mt-1">India</p>
              </div>
            </div>
          </div>
        </section>

        {/* What differentiates */}
        <section className="mb-20" aria-labelledby="differentiator-heading">
          <h2 id="differentiator-heading" className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-6">
            What sets me apart
          </h2>
          <div className="glass p-8 border-l-4 border-brand-primary">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-3">Most candidates</p>
                <p className="text-text-secondary italic text-lg">&ldquo;Built a chatbot&rdquo;</p>
              </div>
              <div>
                <p className="text-brand-accent text-xs font-mono uppercase tracking-widest mb-3">My approach</p>
                <p className="text-text-primary text-lg">
                  &ldquo;Designed a production RAG system with evaluation, monitoring, and cost optimization
                  used daily by business teams.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/experience"
            className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/80 transition-all"
          >
            See my experience
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3 glass border border-white/10 text-text-primary font-semibold rounded-xl hover:border-brand-primary/30 transition-all"
          >
            View projects
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <AIConcierge />
    </div>
  )
}
