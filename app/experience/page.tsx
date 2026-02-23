'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, ExternalLink, MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'
import { experience, type ExperienceRole } from '@/data/experience'
import { AIConcierge } from '@/components/ai/AIConcierge'
import { cn } from '@/lib/utils'

function RoleCard({ role, index }: { role: ExperienceRole; index: number }) {
  const [expanded, setExpanded] = useState(index === 0)

  const formatDate = (d: string) => {
    const [year, month] = d.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline line */}
      {index < experience.length - 1 && (
        <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-brand-primary/40 to-transparent" aria-hidden="true" />
      )}

      <div className="flex gap-6">
        {/* Timeline dot */}
        <div className="shrink-0 mt-5">
          <div className={cn(
            'w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 relative',
            role.endDate === null
              ? 'border-brand-primary bg-brand-primary/20'
              : 'border-white/20 bg-background-elevated'
          )}>
            {role.endDate === null && (
              <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" aria-label="Currently working here" />
            )}
          </div>
        </div>

        {/* Card */}
        <div className="flex-1 glass mb-6 overflow-hidden">
          {/* Header */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-white/[0.02] transition-colors"
            aria-expanded={expanded}
            aria-controls={`role-${role.id}-content`}
          >
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 rounded-full glass-sm text-text-muted font-mono">
                  {role.type}
                </span>
                {role.endDate === null && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-brand-primary/20 text-brand-primary font-mono">
                    Current
                  </span>
                )}
              </div>
              <h2 className="font-display font-bold text-text-primary text-xl mb-1">{role.title}</h2>
              <p className="text-brand-primary font-medium mb-1">{role.company}</p>
              <div className="flex flex-wrap items-center gap-3 text-text-muted text-sm">
                <span className="flex items-center gap-1">
                  <MapPin size={12} aria-hidden="true" />
                  {role.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} aria-hidden="true" />
                  {formatDate(role.startDate)} – {role.endDate ? formatDate(role.endDate) : 'Present'}
                </span>
              </div>
            </div>
            <div className="text-text-muted mt-1 shrink-0" aria-hidden="true">
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>

          {/* Expanded content */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id={`role-${role.id}-content`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 border-t border-white/5 pt-6 space-y-6">
                  {/* Summary */}
                  <p className="text-text-secondary leading-relaxed">{role.summary}</p>

                  {/* Context */}
                  <div>
                    <h3 className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-2">Context</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{role.context}</p>
                  </div>

                  {/* Built */}
                  <div>
                    <h3 className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-2">What I built</h3>
                    <ul className="space-y-1.5" role="list">
                      {role.built.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="text-brand-primary mt-1 shrink-0" aria-hidden="true">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div>
                    <h3 className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-3">Impact</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {role.impact.map((metric) => (
                        <div key={metric.metric} className="glass-sm p-3">
                          <p className="text-xs text-text-muted mb-1">{metric.metric}</p>
                          <p className="text-text-primary text-sm font-medium">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Architecture */}
                  <div>
                    <h3 className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-2">Architecture</h3>
                    <p className="text-text-secondary text-sm leading-relaxed font-mono text-xs bg-background-elevated p-3 rounded-lg border border-white/5">
                      {role.architecture}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {role.techStack.map((tech) => (
                        <span key={tech} className="text-xs px-3 py-1 glass-sm border border-white/5 text-text-secondary rounded-lg">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Lessons Learned */}
                  <div>
                    <h3 className="text-xs font-mono font-medium text-brand-accent uppercase tracking-widest mb-2">Lessons learned</h3>
                    <p className="text-text-secondary text-sm leading-relaxed italic border-l-2 border-brand-primary/30 pl-3">
                      {role.lessonsLearned}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container-narrow">
        <div className="mb-12">
          <p className="text-brand-accent text-sm font-mono font-medium mb-3 tracking-widest uppercase">
            Work history
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Experience
          </h1>
          <p className="text-text-secondary max-w-lg">
            5+ years building production AI systems across startups, enterprise clients, and academic research.
            Click any role to expand the full case study.
          </p>
        </div>

        <div>
          {experience.map((role, i) => (
            <RoleCard key={role.id} role={role} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/resume/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 glass border border-white/10 text-text-primary font-semibold rounded-xl hover:border-brand-primary/30 transition-all"
            aria-label="Download full resume PDF"
          >
            Download full resume (PDF)
          </a>
        </div>
      </div>
      <AIConcierge />
    </div>
  )
}
