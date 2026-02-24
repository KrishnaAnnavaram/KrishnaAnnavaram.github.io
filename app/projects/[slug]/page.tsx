import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, Lock, ExternalLink, ChevronRight } from 'lucide-react'
import { getProjectBySlug, projects } from '@/data/projects'
import { experience } from '@/data/experience'
import { AIConcierge } from '@/components/ai/AIConcierge'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: project.tagline,
  }
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const relatedRoles = experience.filter((e) => project.relatedExperience.includes(e.id))

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container-narrow">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary text-sm mb-8 group transition-colors"
          aria-label="Back to all projects"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          All projects
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="text-xs font-mono px-3 py-1 rounded-full font-medium"
              style={{ backgroundColor: project.color + '20', color: project.color }}
            >
              {project.category}
            </span>
            <span className="text-text-muted text-xs">{project.year}</span>
            {project.reportAvailable && (
              <span className="flex items-center gap-1 text-xs text-text-muted glass-sm px-2 py-0.5 rounded-full border border-white/5">
                <Lock size={10} aria-hidden="true" />
                Report available upon request
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed">{project.tagline}</p>
        </div>

        {/* Content sections */}
        <div className="space-y-12">
          {/* Problem */}
          <section aria-labelledby="problem-heading">
            <h2 id="problem-heading" className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-4">
              The Problem
            </h2>
            <div className="glass p-6 border-l-4" style={{ borderColor: project.color }}>
              <p className="text-text-secondary leading-relaxed">{project.problem}</p>
            </div>
          </section>

          {/* Approach */}
          <section aria-labelledby="approach-heading">
            <h2 id="approach-heading" className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-4">
              Approach
            </h2>
            <p className="text-text-secondary leading-relaxed">{project.approach}</p>
          </section>

          {/* Architecture */}
          <section aria-labelledby="architecture-heading">
            <h2 id="architecture-heading" className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-4">
              Architecture
            </h2>
            <div className="bg-background-elevated border border-white/5 rounded-xl p-6">
              <p className="text-text-secondary text-sm leading-relaxed font-mono">{project.architecture}</p>
            </div>
          </section>

          {/* Results */}
          <section aria-labelledby="results-heading">
            <h2 id="results-heading" className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-4">
              Results
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.results.map((result, i) => (
                <div key={i} className="glass p-5">
                  <p className="text-xs text-text-muted mb-2 font-mono">{result.metric}</p>
                  <p className="text-text-primary font-medium leading-snug">{result.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section aria-labelledby="tech-heading">
            <h2 id="tech-heading" className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 glass border border-white/5 text-text-secondary text-sm rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Related Experience */}
          {relatedRoles.length > 0 && (
            <section aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-4">
                Built during
              </h2>
              <div className="space-y-3">
                {relatedRoles.map((role) => (
                  <div key={role.id} className="glass p-4 flex items-center justify-between">
                    <div>
                      <p className="text-text-primary font-semibold">{role.title}</p>
                      <p className="text-text-muted text-sm">{role.company}</p>
                    </div>
                    <Link
                      href="/experience"
                      className="flex items-center gap-1 text-brand-primary text-sm hover:gap-2 transition-all"
                      aria-label={`View full role at ${role.company}`}
                    >
                      View role
                      <ChevronRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Report notice */}
          {project.reportAvailable && (
            <div className="glass p-6 flex items-start gap-4 border border-brand-primary/10">
              <Lock size={20} className="text-brand-primary mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-text-primary font-semibold mb-1">Research report available</p>
                <p className="text-text-secondary text-sm">
                  The full research report for this project is available upon request.{' '}
                  <a
                    href="mailto:annavaramkrishna@gmail.com"
                    className="text-brand-primary hover:underline"
                  >
                    Email me
                  </a>{' '}
                  to request access.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-white/5 flex justify-between">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-text-muted hover:text-text-primary text-sm transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            All projects
          </Link>
          <Link
            href="/contact"
            className="text-brand-primary text-sm hover:underline"
          >
            Discuss this project →
          </Link>
        </div>
      </div>

      <AIConcierge />
    </div>
  )
}
