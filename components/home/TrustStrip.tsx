import { featuredProjects } from '@/data/projects'
import { archive, archiveTestTotal } from '@/data/archive'
import { experience } from '@/data/experience'
import { certifications } from '@/data/certifications'
import { activitySummary } from '@/lib/projects'

/**
 * A strip of figures a reader can check, computed from the data the site
 * renders rather than typed in. If a number here is wrong, the data is wrong.
 */
export function TrustStrip() {
  const firstYear = Math.min(...experience.map((r) => Number(r.start.slice(0, 4))))
  const years = new Date().getFullYear() - firstYear
  const repos = activitySummary().repoCount

  const items = [
    { value: String(featuredProjects.length), label: 'flagship systems, each with a “what it cannot do”' },
    { value: `${repos}`, label: 'public repositories, synced nightly' },
    { value: archiveTestTotal.toLocaleString('en-US'), label: `tests in CI across ${archive.length} earlier projects` },
    { value: `${years}+`, label: 'years in machine learning and NLP' },
    { value: String(certifications.length), label: 'cloud AI certifications: Azure AI-102, AWS AI' },
  ]

  return (
    <section aria-label="At a glance" className="border-y border-rule bg-surface/60">
      <dl className="page-x mx-auto grid max-w-page grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => (
          // Label first in the DOM so a screen reader hears "label: value";
          // column-reverse puts the figure on top visually.
          <div key={item.label} className="flex flex-col-reverse justify-end py-5 pr-4">
            <dt className="mt-1 text-xs leading-snug text-ink-muted">{item.label}</dt>
            <dd className="text-3xl font-semibold tracking-tight text-ink tabular-nums">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
