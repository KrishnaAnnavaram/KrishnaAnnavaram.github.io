'use client'

import { useState, useMemo, type ElementType } from 'react'
import {
  ExternalLink,
  FileText,
  BookOpen,
  GraduationCap,
  Search,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react'
import { Publication } from '@/data/publications'

const typeColors: Record<string, string> = {
  Conference: '#6366f1',
  Journal: '#10b981',
  Workshop: '#f59e0b',
  Preprint: '#94a3b8',
  'Supervised Research': '#06b6d4',
}

const typeIcons: Record<string, ElementType> = {
  Conference: BookOpen,
  Journal: BookOpen,
  Workshop: BookOpen,
  Preprint: FileText,
  'Supervised Research': GraduationCap,
}

interface Props {
  publications: Publication[]
}

export default function PublicationsClient({ publications }: Props) {
  const authored = useMemo(
    () => publications.filter((p) => p.type !== 'Supervised Research'),
    [publications],
  )
  const supervised = useMemo(
    () => publications.filter((p) => p.type === 'Supervised Research'),
    [publications],
  )

  const [activeTab, setActiveTab] = useState<'authored' | 'supervised'>('authored')
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const currentList = activeTab === 'authored' ? authored : supervised

  const filteredList = useMemo(() => {
    const q = search.toLowerCase()
    return currentList.filter((pub) => {
      const matchSearch =
        q === '' ||
        pub.title.toLowerCase().includes(q) ||
        pub.tags.some((t) => t.toLowerCase().includes(q)) ||
        pub.authors.some((a) => a.toLowerCase().includes(q))
      const matchTag = activeTag === null || pub.tags.includes(activeTag)
      return matchSearch && matchTag
    })
  }, [currentList, search, activeTag])

  // Top tags by frequency for the current section
  const topTags = useMemo(() => {
    const freq: Record<string, number> = {}
    currentList.forEach((pub) => pub.tags.forEach((t) => (freq[t] = (freq[t] ?? 0) + 1)))
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag)
  }, [currentList])

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const clearFilters = () => {
    setSearch('')
    setActiveTag(null)
  }

  const hasActiveFilter = search !== '' || activeTag !== null

  return (
    <>
      {/* ── Stats row ──────────────────────────────────────────────────── */}
      <div className="flex gap-4 mb-10 flex-wrap">
        {[
          { label: 'Authored Papers', value: authored.length, color: typeColors.Conference },
          { label: 'Supervised Reports', value: supervised.length, color: typeColors['Supervised Research'] },
          { label: 'Total Works', value: publications.length, color: '#8b5cf6' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="glass px-5 py-3 flex items-center gap-3"
          >
            <span
              className="text-2xl font-display font-bold"
              style={{ color }}
            >
              {value}
            </span>
            <span className="text-text-muted text-sm">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Tab bar ────────────────────────────────────────────────────── */}
      <div
        className="flex gap-1 p-1 mb-8 rounded-2xl"
        style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
        role="tablist"
      >
        {(
          [
            { key: 'authored', label: 'Authored & Co-Authored', Icon: BookOpen, count: authored.length, color: typeColors.Conference },
            { key: 'supervised', label: 'Supervised Research', Icon: GraduationCap, count: supervised.length, color: typeColors['Supervised Research'] },
          ] as const
        ).map(({ key, label, Icon, count, color }) => {
          const isActive = activeTab === key
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveTab(key)
                setActiveTag(null)
                setSearch('')
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={
                isActive
                  ? { background: color + '18', color, boxShadow: `0 0 0 1px ${color}30` }
                  : { color: 'var(--text-muted)' }
              }
            >
              <Icon size={15} aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{key === 'authored' ? 'Authored' : 'Supervised'}</span>
              <span
                className="text-xs font-mono px-1.5 py-0.5 rounded-md"
                style={
                  isActive
                    ? { background: color + '25', color }
                    : { background: 'var(--bg-elevated)', color: 'var(--text-muted)' }
                }
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Search & filter ────────────────────────────────────────────── */}
      <div className="mb-5 space-y-3">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--text-muted)' }}
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search by title, author, or keyword…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
            }}
            aria-label="Search publications"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Clear search"
            >
              <X size={14} style={{ color: 'var(--text-muted)' }} />
            </button>
          )}
        </div>

        {/* Tag chips */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
          {topTags.map((tag) => {
            const isActive = activeTag === tag
            const color =
              activeTab === 'authored' ? typeColors.Conference : typeColors['Supervised Research']
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(isActive ? null : tag)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-150"
                style={
                  isActive
                    ? { background: color + '25', color, boxShadow: `0 0 0 1px ${color}50` }
                    : {
                        background: 'var(--glass-bg)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--glass-border)',
                      }
                }
                aria-pressed={isActive}
              >
                {tag}
              </button>
            )
          })}
        </div>

        {/* Active filter summary + clear */}
        {hasActiveFilter && (
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: 'var(--text-muted)' }}>
              {filteredList.length} of {currentList.length} shown
            </span>
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: 'var(--text-muted)' }}
            >
              <X size={12} />
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* ── Publication list ────────────────────────────────────────────── */}
      {filteredList.length === 0 ? (
        <div className="glass p-10 text-center">
          <Search size={28} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
          <p style={{ color: 'var(--text-muted)' }}>No publications match your search.</p>
          <button
            onClick={clearFilters}
            className="mt-3 text-sm underline"
            style={{ color: typeColors.Conference }}
          >
            Clear filters
          </button>
        </div>
      ) : activeTab === 'authored' ? (
        <AuthoredList
          items={filteredList}
          expandedIds={expandedIds}
          onToggle={toggleExpand}
        />
      ) : (
        <SupervisedList
          items={filteredList}
          expandedIds={expandedIds}
          onToggle={toggleExpand}
        />
      )}
    </>
  )
}

/* ─── Authored Papers List ─────────────────────────────────────────────── */

function AuthoredList({
  items,
  expandedIds,
  onToggle,
}: {
  items: Publication[]
  expandedIds: Set<string>
  onToggle: (id: string) => void
}) {
  return (
    <div className="space-y-4">
      {items.map((pub, idx) => {
        const Icon = typeIcons[pub.type] ?? FileText
        const color = typeColors[pub.type]
        const isExpanded = expandedIds.has(pub.id)
        return (
          <article
            key={pub.id}
            className="glass border border-white/5 overflow-hidden transition-all duration-200 hover:border-white/10"
            style={{ borderLeft: `3px solid ${color}` }}
          >
            {/* Card header — always visible */}
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="text-xs font-mono px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1.5"
                  style={{ background: color + '18', color }}
                >
                  <Icon size={11} aria-hidden="true" />
                  {pub.type}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {pub.year}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>·</span>
                <span
                  className="text-xs truncate max-w-[200px] sm:max-w-none"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {pub.venue}
                </span>
                <span
                  className="ml-auto text-xs font-mono"
                  style={{ color: 'var(--text-muted)' }}
                >
                  #{String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <h3
                className="font-display font-bold text-lg leading-snug mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {pub.title}
              </h3>

              <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                {pub.authors.join(', ')}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {pub.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-md"
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions row */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onToggle(pub.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                  style={{ color: color }}
                  aria-expanded={isExpanded}
                  aria-controls={`abstract-${pub.id}`}
                >
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {isExpanded ? 'Hide abstract' : 'Show abstract'}
                </button>

                {(pub.doi ?? pub.url) && (
                  <a
                    href={pub.doi ?? pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-80"
                    style={{ color: 'var(--text-muted)' }}
                    aria-label={`View publication: ${pub.title} (opens in new tab)`}
                  >
                    <ExternalLink size={13} aria-hidden="true" />
                    View paper
                  </a>
                )}
              </div>
            </div>

            {/* Collapsible abstract */}
            {isExpanded && (
              <div
                id={`abstract-${pub.id}`}
                className="px-5 pb-5 pt-0"
                style={{ borderTop: `1px solid ${color}20` }}
              >
                <p
                  className="text-sm leading-relaxed mt-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {pub.abstract}
                </p>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}

/* ─── Supervised Research List ─────────────────────────────────────────── */

function SupervisedList({
  items,
  expandedIds,
  onToggle,
}: {
  items: Publication[]
  expandedIds: Set<string>
  onToggle: (id: string) => void
}) {
  const color = typeColors['Supervised Research']

  return (
    <div className="space-y-3">
      {items.map((pub, idx) => {
        const isExpanded = expandedIds.has(pub.id)
        return (
          <article
            key={pub.id}
            className="glass border border-white/5 overflow-hidden transition-all duration-200 hover:border-white/10"
            style={{ borderLeft: `3px solid ${color}` }}
          >
            {/* Compact header */}
            <button
              className="w-full text-left p-4 flex items-start gap-4 group"
              onClick={() => onToggle(pub.id)}
              aria-expanded={isExpanded}
              aria-controls={`supervised-${pub.id}`}
            >
              {/* Index number */}
              <span
                className="text-xs font-mono pt-0.5 shrink-0 w-7 text-right"
                style={{ color }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="flex-1 min-w-0">
                <h3
                  className="font-display font-semibold text-base leading-snug mb-1.5 group-hover:text-white transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {pub.title}
                </h3>

                {/* Tags inline */}
                <div className="flex flex-wrap gap-1">
                  {pub.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {pub.tags.length > 4 && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      +{pub.tags.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Expand chevron */}
              <span className="shrink-0 mt-0.5 transition-transform duration-200" style={{ color }}>
                {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </span>
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <div
                id={`supervised-${pub.id}`}
                className="px-4 pb-4 pt-0 ml-11"
                style={{ borderTop: `1px solid ${color}15` }}
              >
                <p
                  className="text-sm leading-relaxed mt-3 mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {pub.abstract}
                </p>

                {/* All tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-80"
                    style={{ color }}
                    aria-label={`View report: ${pub.title} (opens in new tab)`}
                  >
                    <ExternalLink size={13} aria-hidden="true" />
                    View report
                  </a>
                )}
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
