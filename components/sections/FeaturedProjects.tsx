'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Lock, ExternalLink } from 'lucide-react'
import { getFeaturedProjects, type Project } from '@/data/projects'
import { cn } from '@/lib/utils'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className="glass p-6 flex flex-col h-full group"
    >
      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-mono px-3 py-1 rounded-full font-medium"
          style={{ backgroundColor: project.color + '20', color: project.color }}
        >
          {project.category}
        </span>
        <span className="text-text-muted text-xs">{project.year}</span>
      </div>

      {/* Color accent line */}
      <div
        className="h-0.5 w-12 rounded mb-4 transition-all duration-300 group-hover:w-20"
        style={{ backgroundColor: project.color }}
        aria-hidden="true"
      />

      <h3 className="font-display font-bold text-text-primary text-lg mb-2 group-hover:text-brand-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">{project.tagline}</p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 glass-sm text-text-muted rounded-md border border-white/5"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="text-xs px-2 py-0.5 text-text-muted">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>

      {/* Action */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <Link
          href={`/projects/${project.slug}`}
          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: project.color }}
          aria-label={`View case study: ${project.title}`}
        >
          Case Study
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
        {project.reportAvailable && (
          <div className="flex items-center gap-1 text-text-muted text-xs">
            <Lock size={10} aria-hidden="true" />
            Report available
          </div>
        )}
      </div>
    </motion.article>
  )
}

export function FeaturedProjects() {
  const featured = getFeaturedProjects()

  return (
    <section className="section-padding" aria-labelledby="featured-projects-heading">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2
              id="featured-projects-heading"
              className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-3"
            >
              Featured Work
            </h2>
            <p className="text-text-secondary max-w-lg">
              Production systems built across healthcare AI, RAG, and enterprise ML.
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 text-brand-primary text-sm font-medium hover:gap-3 transition-all duration-200"
            aria-label="View all projects"
          >
            View all
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 glass border border-white/10 text-text-primary rounded-xl hover:border-brand-primary/30 transition-all"
          >
            View all projects
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
