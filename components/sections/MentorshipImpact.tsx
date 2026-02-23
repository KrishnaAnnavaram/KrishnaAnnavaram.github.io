'use client'

import { motion } from 'framer-motion'
import { Lock, GraduationCap, BookOpen } from 'lucide-react'
import { mentorshipProjects, mentorshipStats } from '@/data/mentorship'

export function MentorshipImpact() {
  const displayProjects = mentorshipProjects.slice(0, 12)

  return (
    <section className="section-padding bg-background-secondary/50" aria-labelledby="mentorship-heading">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="text-brand-warm" size={24} aria-hidden="true" />
            <span className="text-brand-warm text-sm font-mono font-medium">
              {mentorshipStats.institution}
            </span>
          </div>
          <h2
            id="mentorship-heading"
            className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            {mentorshipStats.totalProjects}+ Student Research Projects
            <br />
            <span className="text-gradient">Mentored</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            As Graduate Assistant for {mentorshipStats.course}, I guided students
            through the full ML engineering lifecycle — from problem scoping to production-quality
            system design across diverse application domains.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {displayProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-sm p-4 group hover:border-brand-primary/20 border border-white/5 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-text-primary text-sm font-medium leading-snug mb-1">
                    {project.title}
                  </p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: getDomainColor(project.domain) + '20',
                      color: getDomainColor(project.domain),
                    }}
                  >
                    {project.domain}
                  </span>
                </div>
                <div
                  className="shrink-0 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Full report available upon request"
                >
                  <Lock size={12} aria-label="Report available upon request" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note about more projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-text-muted text-sm flex items-center justify-center gap-2">
            <BookOpen size={14} aria-hidden="true" />
            Showing 12 of {mentorshipStats.totalProjects}+ projects ·{' '}
            <span className="flex items-center gap-1">
              <Lock size={11} aria-hidden="true" />
              Full reports available upon request
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function getDomainColor(domain: string): string {
  const colors: Record<string, string> = {
    'Healthcare AI': '#ef4444',
    'NLP': '#6366f1',
    'Computer Vision': '#8b5cf6',
    'Predictive Analytics': '#f59e0b',
    'RAG / GenAI': '#06b6d4',
    'ML Systems': '#10b981',
    'Research': '#94a3b8',
    'GenAI': '#06b6d4',
  }
  return colors[domain] ?? '#94a3b8'
}
