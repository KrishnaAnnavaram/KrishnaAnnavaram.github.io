import { ArrowUpRight, GitCommitHorizontal } from 'lucide-react'
import type { ActivitySummary } from '@/lib/projects'
import { relativeTime } from '@/lib/projects'
import { profile } from '@/data/profile'

/**
 * GitHub activity, read from the committed snapshot rather than the live API.
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
          <p className="eyebrow lg:sticky lg:top-24">
            {sectionNumber && <span className="text-ink-faint">{sectionNumber} &nbsp;</span>}
            GitHub
          </p>
          <p className="mt-2 font-mono text-2xs text-ink-faint">
            Synced {relativeTime(activity.syncedAt)}
          </p>
          {activity.stale && (
            <p className="mt-1.5 max-w-[16rem] text-xs text-ink-muted">
              The nightly sync hasn&rsquo;t run recently — these figures may lag the repositories.
            </p>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl text-ink">Recent activity</h2>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-2xs uppercase tracking-[0.14em] text-accent"
            >
              All repositories
              <ArrowUpRight size={12} aria-hidden />
            </a>
          </div>

          {/* Language mix — a single honest bar rather than a wall of logos. */}
          {topLanguages.length > 0 && (
            <div className="mt-6">
              <div
                className="flex h-1.5 w-full overflow-hidden rounded-full bg-sunken"
                role="img"
                aria-label={`Language mix across featured repositories: ${topLanguages
                  .map((l) => `${l.name} ${l.share}%`)
                  .join(', ')}`}
              >
                {topLanguages.map((lang, i) => (
                  <span
                    key={lang.name}
                    style={{ width: `${lang.share}%` }}
                    className={
                      i === 0
                        ? 'bg-accent'
                        : i === 1
                          ? 'bg-verify'
                          : i === 2
                            ? 'bg-ink-soft'
                            : 'bg-rule-strong'
                    }
                  />
                ))}
              </div>
              <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
                {topLanguages.map((lang) => (
                  <li key={lang.name} className="font-mono text-2xs text-ink-muted tabular">
                    {lang.name} {lang.share}%
                  </li>
                ))}
              </ul>
            </div>
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

                {repo.lastCommit && (
                  <p className="mt-1.5 flex items-start gap-1.5 text-xs text-ink-muted">
                    <GitCommitHorizontal
                      size={13}
                      className="mt-0.5 shrink-0 text-ink-faint"
                      aria-hidden
                    />
                    <span>
                      <span className="font-mono text-ink-faint">{repo.lastCommit.sha}</span>{' '}
                      {repo.lastCommit.message}
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
