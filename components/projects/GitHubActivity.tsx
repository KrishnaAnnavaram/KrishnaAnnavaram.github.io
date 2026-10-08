import { ArrowUpRight, GitCommitHorizontal } from 'lucide-react'
import type { ActivitySummary } from '@/lib/projects'
import { relativeTime } from '@/lib/projects'
import { profile } from '@/data/profile'

/**
 * GitHub activity, read from the committed snapshot rather than the live API.
 *
 * Merge-commit subjects are suppressed: "Merge pull request #13 from
 * KrishnaAnnavaram/readme-full-documentation" is git plumbing, not a statement
 * about the work, and reads as unedited noise on a portfolio.
 *
 * Two failure modes are handled explicitly, because a section that silently
 * shows nothing is worse than one that explains itself:
 *
 *   - The snapshot is missing or empty → the section does not render at all.
 *   - The snapshot is stale → it renders, and says when it was last synced.
 *
 * There is no loading state because there is no request. The data shipped with
 * the page.
 */
export function GitHubActivity({
  activity,
  sectionNumber,
}: {
  activity: ActivitySummary
  /** Omitted on the projects index, where the section is not part of a run. */
  sectionNumber?: string
}) {
  if (activity.recent.length === 0) return null

  const topLanguages = activity.languages.slice(0, 6)

  return (
    <section className="page-x rule-t mx-auto max-w-page py-14">
      <div className="spec-grid">
        <div>
          <h2 className="eyebrow lg:sticky lg:top-24">
            {sectionNumber && <span className="text-ink-faint">{sectionNumber} &nbsp;</span>}
            GitHub
          </h2>
          <p className="mt-2 font-mono text-2xs text-ink-faint">
            Synced {relativeTime(activity.syncedAt)}
          </p>
          {activity.stale && (
            <p className="mt-1.5 max-w-[16rem] text-xs text-ink-muted">
              The nightly sync hasn&rsquo;t run recently, so these figures may lag the repositories.
            </p>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-2xl text-ink">Recent activity</h3>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.05em] text-accent"
            >
              All repositories
              <ArrowUpRight size={12} aria-hidden />
            </a>
          </div>

          {/* Language mix as a sorted bar chart. One series, so one hue and no
              legend; each bar is labelled directly, and the list itself is the
              table view a screen reader reads. */}
          {topLanguages.length > 0 && (
            <figure className="mt-6">
              <figcaption className="text-sm text-ink-muted">
                Language mix across the repositories this site presents, by bytes of code
              </figcaption>
              <ul className="mt-4 space-y-2.5">
                {topLanguages.map((lang) => (
                  <li
                    key={lang.name}
                    className="group/lang grid grid-cols-[7rem_minmax(0,1fr)_3.5rem] items-center gap-3 text-sm"
                  >
                    <span className="truncate text-ink-soft">{lang.name}</span>
                    <span className="relative h-2.5 rounded-r-[4px] bg-sunken" aria-hidden>
                      <span
                        className="absolute inset-y-0 left-0 rounded-r-[4px] bg-chart-script transition-opacity group-hover/lang:opacity-80"
                        style={{ width: `${Math.max((lang.share / topLanguages[0].share) * 100, 1.5)}%` }}
                      />
                    </span>
                    <span className="text-right font-semibold text-ink tabular-nums">{lang.share}%</span>
                  </li>
                ))}
              </ul>
            </figure>
          )}

          <ul className="mt-7">
            {activity.recent.map((repo) => (
              <li key={repo.name} className="border-t border-rule py-4 first:border-t-0 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-ink transition-colors hover:text-accent"
                  >
                    {repo.name}
                  </a>
                  <span className="font-mono text-2xs text-ink-faint tabular">
                    pushed {relativeTime(repo.pushedAt)}
                  </span>
                </div>

                {repo.lastCommit && !/^Merge (pull request|branch)/i.test(repo.lastCommit.message) && (
                  <p className="mt-1.5 flex items-start gap-1.5 text-xs text-ink-muted">
                    <GitCommitHorizontal
                      size={13}
                      className="mt-0.5 shrink-0 text-ink-faint"
                      aria-hidden
                    />
                    <span>
                      <span className="font-mono text-ink-faint">{repo.lastCommit.sha}</span>{' '}
                      {repo.lastCommit.message.replace(/\s*—\s*/g, ', ')}
                    </span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
