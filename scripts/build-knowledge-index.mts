/**
 * Builds the assistant's knowledge index.
 *
 * Reads the same TypeScript data modules the pages render from, chunks them,
 * and writes `public/ai/knowledge.json`. One source of truth: if a sentence is
 * not on the site, it is not in the index, so the assistant cannot say it.
 *
 * Run by `prebuild`, so the index can never drift from the deployed content.
 *
 *   npx tsx scripts/build-knowledge-index.ts
 */

import { writeFile, mkdir, readdir, readFile } from 'node:fs/promises'
import { dirname, resolve, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

import { profile } from '../data/profile'
import { experience, formatRoleDate } from '../data/experience'
import { caseStudies } from '../data/work'
import { projects, DOMAINS } from '../data/projects'
import { skillGroups } from '../data/skills'
import { certifications } from '../data/certifications'
import { diagramToProse } from '../lib/architecture'
import type { Chunk, KnowledgeIndex, Source } from '../lib/assistant/types'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT = resolve(ROOT, 'public/ai/knowledge.json')

const chunks: Chunk[] = []

/** Chunks are quoted verbatim to the reader, so they must read as prose. */
function add(chunk: Omit<Chunk, 'id'> & { id?: string }) {
  const text = chunk.text.replace(/\s+/g, ' ').trim()
  if (text.length < 40) return
  chunks.push({
    id: chunk.id ?? `c${chunks.length}`,
    ...chunk,
    text,
  })
}

/* ── Profile ─────────────────────────────────────────────────────────────── */

const profileSource: Source = { title: 'About', href: '/about/', kind: 'profile' }

add({
  heading: 'Who he is',
  text: profile.intro,
  source: profileSource,
  keywords: ['who', 'introduction', 'summary', 'background', 'bio', 'about', 'years', 'experience'],
  boost: 1.45,
})

add({
  heading: 'How he frames the work',
  text: profile.positioning.split('\n\n')[0],
  source: profileSource,
  keywords: ['positioning', 'philosophy', 'approach', 'engineering', 'production', 'systems'],
  boost: 1.25,
})

/* Derived from the open end date, not from array position — reordering
   data/experience.ts must not change who the assistant calls current. */
const current = experience.find((r) => r.end === null) ?? experience[0]

add({
  heading: 'Current focus',
  text: `${profile.availability}. Based in ${profile.location}. Currently ${current.title} at ${current.company}, since ${formatRoleDate(current.start)}.`,
  source: profileSource,
  keywords: ['now', 'current', 'currently', 'focus', 'available', 'availability', 'location', 'today', 'working'],
  boost: 1.7,
})

for (const principle of profile.principles) {
  add({
    heading: principle.title,
    text: principle.description,
    source: profileSource,
    keywords: ['principle', 'philosophy', 'approach', 'how he works'],
    boost: 1.0,
  })
}

add({
  heading: 'Education',
  text: profile.education
    .map((e) => `${e.degree} at ${e.institution} (${e.location}), focused on ${e.focus}.`)
    .join(' '),
  source: { title: 'About', href: '/about/', kind: 'education' },
  keywords: ['education', 'degree', 'university', 'masters', 'bachelors', 'study', 'school', 'unt'],
  boost: 1.3,
})

add({
  heading: 'Contact and résumé',
  text: `Email ${profile.socials.email}. LinkedIn and GitHub are linked from every page, and the résumé is available at ${profile.resumeUrl}. ${profile.availability}.`,
  source: { title: 'Contact', href: '/contact/', kind: 'contact' },
  keywords: ['contact', 'email', 'reach', 'hire', 'hiring', 'resume', 'cv', 'download', 'linkedin', 'github', 'get in touch'],
  boost: 1.9,
})

/* ── Experience ──────────────────────────────────────────────────────────── */

for (const role of experience) {
  const period = `${formatRoleDate(role.start)} – ${role.end ? formatRoleDate(role.end) : 'present'}`
  const source: Source = { title: `${role.title}, ${role.company}`, href: '/experience/', kind: 'experience' }

  add({
    heading: `${role.company} — ${role.title}`,
    text: `${role.title} at ${role.company}, ${period}, ${role.location}. ${role.summary}`,
    source,
    keywords: [role.company, role.title, 'experience', 'role', 'job', 'work', 'employment', ...role.stack],
    boost: role.end === null ? 1.6 : 1.15,
  })

  if (role.highlights.length) {
    add({
      heading: `${role.company} — what the role involved`,
      text: role.highlights.map((h) => (h.metric ? `${h.text} (${h.metric})` : h.text)).join('. '),
      source,
      keywords: [role.company, 'responsibilities', 'highlights', 'achievements', ...role.stack],
      boost: 1.0,
    })
  }
}

/* ── Repo-backed projects ────────────────────────────────────────────────── */

for (const project of projects) {
  if (project.status === 'hidden') continue

  const source: Source = { title: project.name, href: `/projects/${project.slug}/`, kind: 'project' }
  const domainLabels = project.domains.map((d) => DOMAINS[d])
  const kw = [project.name, project.slug, ...domainLabels, ...project.stack, 'project', 'system', 'built']

  add({
    heading: project.name,
    text: `${project.tagline} Built in ${project.year}. Domains: ${domainLabels.join(', ')}. Stack: ${project.stack.join(', ')}.`,
    source,
    keywords: kw,
    boost: project.status === 'featured' ? 1.75 : 1.25,
  })

  if (project.problem) {
    add({
      heading: `${project.name} — the problem`,
      text: project.problem,
      source,
      keywords: [...kw, 'problem', 'why', 'motivation', 'context'],
      boost: 1.35,
    })
  }

  if (project.approach?.length) {
    add({
      heading: `${project.name} — approach`,
      text: project.approach.join(' '),
      source,
      keywords: [...kw, 'approach', 'how', 'built', 'implementation', 'design'],
      boost: 1.2,
    })
  }

  if (project.diagram) {
    add({
      heading: `${project.name} — architecture`,
      text: `${project.diagram.caption} ${diagramToProse(project.diagram)}`,
      source,
      keywords: [...kw, 'architecture', 'diagram', 'pipeline', 'stages', 'agents', 'design', 'data flow'],
      boost: 1.5,
    })
  }

  for (const decision of project.decisions ?? []) {
    add({
      heading: `${project.name} — ${decision.title}`,
      text: decision.body,
      source,
      keywords: [...kw, 'decision', 'tradeoff', 'why', 'engineering'],
      boost: 1.1,
    })
  }

  if (project.evidence?.length) {
    add({
      heading: `${project.name} — measured results`,
      text: project.evidence
        .map((e) => `${e.value} ${e.label}${e.method ? ` — ${e.method}` : ''}.`)
        .join(' '),
      source,
      keywords: [...kw, 'results', 'evidence', 'metrics', 'numbers', 'evaluation', 'tests', 'measured'],
      boost: 1.4,
    })
  }

  if (project.limitations?.length) {
    add({
      heading: `${project.name} — known limitations`,
      text: project.limitations.join(' '),
      source,
      keywords: [...kw, 'limitations', 'caveats', 'weaknesses', 'known issues', 'what it cannot do'],
      boost: 1.15,
    })
  }
}

/* ── Employment case studies ─────────────────────────────────────────────── */

for (const study of caseStudies) {
  const source: Source = { title: study.title, href: `/work/${study.slug}/`, kind: 'case-study' }
  const kw = [study.title, study.context, study.discipline, ...study.stack, 'case study', 'project']

  add({
    heading: study.title,
    text: `${study.summary} At ${study.context}, ${study.year}.`,
    source,
    keywords: kw,
    boost: study.featured ? 1.4 : 1.1,
  })

  add({
    heading: `${study.title} — the problem`,
    text: study.problem,
    source,
    keywords: [...kw, 'problem', 'why', 'context'],
    boost: 1.15,
  })

  add({
    heading: `${study.title} — approach`,
    text: study.approach.join(' '),
    source,
    keywords: [...kw, 'approach', 'how', 'implementation'],
    boost: 1.05,
  })

  if (study.architecture) {
    add({
      heading: `${study.title} — architecture`,
      text: study.architecture,
      source,
      keywords: [...kw, 'architecture', 'pipeline', 'design', 'data flow'],
      boost: 1.3,
    })
  }

  add({
    heading: `${study.title} — outcomes`,
    text: study.outcomes.map((o) => `${o.value} ${o.label}`).join('. '),
    source,
    keywords: [...kw, 'results', 'outcomes', 'metrics', 'impact'],
    boost: 1.2,
  })
}

/* ── Skills ──────────────────────────────────────────────────────────────── */

for (const group of skillGroups) {
  add({
    heading: `Stack — ${group.title}`,
    /* Framed as an inventory rather than a claim of depth. Listing a tool is
       not evidence of having shipped with it, and this passage should not be
       read as if it were — the case studies are where the depth is shown. */
    text: `Listed in the technical inventory under ${group.title} — these are tools used or worked with, not a claim of depth in each. ${group.note} ${group.items.join(', ')}.`,
    source: { title: 'About', href: '/about/', kind: 'skills' },
    keywords: ['skills', 'stack', 'technology', 'tools', 'framework', 'languages', group.title, ...group.items],
    // Below neutral, so a passage describing real work outranks the inventory.
    boost: 0.8,
  })
}

if (certifications.length) {
  add({
    heading: 'Certifications',
    text: certifications.map((c) => `${c.name} (${c.issuer})`).join('. '),
    source: { title: 'About', href: '/about/', kind: 'skills' },
    keywords: ['certification', 'certified', 'credential', 'course', 'training'],
    boost: 1.1,
  })
}

/* ── Writing ─────────────────────────────────────────────────────────────── */

const writingDir = resolve(ROOT, 'content/writing')
for (const file of await readdir(writingDir)) {
  if (!file.endsWith('.mdx')) continue
  const slug = basename(file, '.mdx')
  const { data, content } = matter(await readFile(resolve(writingDir, file), 'utf8'))

  const body = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*_>`[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  add({
    heading: String(data.title ?? slug),
    text: `${String(data.summary ?? '')} ${body.slice(0, 700)}`.trim(),
    source: { title: String(data.title ?? slug), href: `/writing/${slug}/`, kind: 'writing' },
    keywords: ['writing', 'essay', 'article', 'blog', ...(Array.isArray(data.tags) ? data.tags : [])],
    boost: 1.0,
  })
}

/* ── Research ────────────────────────────────────────────────────────────── */

const { publications } = await import('../data/publications')
/* Counted, not asserted — an earlier version hardcoded the claim that every
   entry was backed by a report, which nothing validated. */
const withReports = publications.filter((p) => Boolean(p.url)).length
const coAuthored = publications.length

add({
  heading: 'Research',
  text: `${coAuthored} co-authored graduate research reports from the MS at UNT, ${withReports} of them linked to the full PDF on this site. They are coursework typeset in an IEEE template, not peer-reviewed conference papers. Topics span NLP, retrieval, computer vision and applied machine learning.`,
  source: { title: 'Research', href: '/research/', kind: 'research' },
  keywords: ['research', 'papers', 'publication', 'academic', 'supervised', 'capstone', 'student', 'teaching'],
  boost: 1.3,
})

/* ── Write ───────────────────────────────────────────────────────────────── */

const index: KnowledgeIndex = {
  /* No build timestamp. This file is committed, and a timestamp made it differ
     on every build — a permanently dirty working tree and a merge conflict
     surface, for a field nothing reads. */
  chunkCount: chunks.length,
  chunks,
  suggestions: [
    'What is he working on now?',
    'Which projects use multi-agent architectures?',
    'Explain the Bootshift architecture',
    'What experience does he have with RAG?',
    'What has he built for legacy modernisation?',
    'How does he evaluate LLM systems?',
    'Where can I find the résumé?',
    'How do I get in touch?',
  ],
}

await mkdir(dirname(OUT), { recursive: true })
await writeFile(OUT, `${JSON.stringify(index)}\n`, 'utf8')

const bytes = Buffer.byteLength(JSON.stringify(index))
console.log(
  `✓ knowledge index — ${chunks.length} passages, ${(bytes / 1024).toFixed(1)} kB → public/ai/knowledge.json`
)
