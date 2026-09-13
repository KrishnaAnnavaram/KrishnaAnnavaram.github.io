import { profile } from '@/data/profile'
import { Reveal } from '@/components/ui/Reveal'

export function Approach() {
  return (
    <section className="page-x rule-t mx-auto max-w-page py-16">
      <div className="spec-grid">
        <div>
          <h2 className="eyebrow lg:sticky lg:top-24">
            <span className="text-ink-faint">04</span> &nbsp;How I work
          </h2>
        </div>

        <div>
          <Reveal>
            <div className="prose-spec max-w-text text-lg">
              {profile.positioning.split('\n\n').map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
          </Reveal>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-[3px] border border-rule bg-rule sm:grid-cols-2">
            {profile.principles.map((principle, i) => (
              <Reveal as="li" key={principle.title} delay={i * 70} className="bg-surface p-6 sm:p-7">
                <p className="font-mono text-2xs text-ink-faint">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-sans text-base font-semibold tracking-tight text-ink">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-sm text-ink-soft">{principle.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
