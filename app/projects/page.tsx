'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Lock, ArrowRight, X } from 'lucide-react'
import { projects, type Project, type ProjectCategory } from '@/data/projects'
import { AIConcierge } from '@/components/ai/AIConcierge'
import { cn } from '@/lib/utils'

const categories: (ProjectCategory | 'All')[] = [
  'All',
  'Healthcare AI',
  'RAG Systems',
  'NLP',
  'MLOps',
  'Computer Vision',
  'Research',
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
      className="glass p-6 flex flex-col h-full group"
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-mono px-3 py-1 rounded-full font-medium"
          style={{ backgroundColor: project.color + '20', color: project.color }}
        >
          {project.category}
        </span>
        <span className="text-text-muted text-xs">{project.year}</span>
      </div>

      <div
        className="h-0.5 w-12 rounded mb-4 transition-all duration-300 group-hover:w-20"
        style={{ backgroundColor: project.color }}
        aria-hidden="true"
      />

      <h2 className="font-display font-bold text-text-primary text-lg mb-2 group-hover:text-brand-primary transition-colors">
        {project.title}
      </h2>
      <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">{project.tagline}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.techStack.slice(0, 5).map((tech) => (
          <span key={tech} className="text-xs px-2 py-0.5 glass-sm border border-white/5 text-text-muted rounded-md">
            {tech}
          </span>
        ))}
        {project.techStack.length > 5 && (
          <span className="text-xs px-2 py-0.5 text-text-muted">+{project.techStack.length - 5}</span>
        )}
      </div>

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
          <div className="flex items-center gap-1 text-text-muted text-xs" title="Research report available upon request">
            <Lock size={10} aria-hidden="true" />
            Report available
          </div>
        )}
      </div>
    </motion.article>
  )
}

export default function ProjectsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All')
  const [filtered, setFiltered] = useState(projects)

  const filterProjects = useCallback(() => {
    let result = projects

    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q) ||
          p.problem.toLowerCase().includes(q)
      )
    }

    setFiltered(result)
  }, [search, activeCategory])

  useEffect(() => {
    filterProjects()
  }, [filterProjects])

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-12">
          <p className="text-brand-accent text-sm font-mono font-medium mb-3 tracking-widest uppercase">
            Case studies
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Projects
          </h1>
          <p className="text-text-secondary max-w-lg">
            Production AI systems built across healthcare, enterprise, and research.
            Each project is a full case study: problem → approach → results.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 relative max-w-lg">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by technology, domain, or keyword…"
            className="w-full pl-10 pr-10 py-3 glass border border-white/10 rounded-xl text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-brand-primary/50 transition-colors"
            aria-label="Search projects"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
                activeCategory === cat
                  ? 'bg-brand-primary border-brand-primary text-white'
                  : 'border-white/10 text-text-secondary hover:border-brand-primary/30 hover:text-text-primary'
              )}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        {search && (
          <p className="text-text-muted text-sm mb-6" aria-live="polite">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} matching &ldquo;{search}&rdquo;
          </p>
        )}

        {/* Project grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-text-muted text-lg mb-2">No projects match your search</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All') }}
                className="text-brand-primary text-sm hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AIConcierge />
    </div>
  )
}
