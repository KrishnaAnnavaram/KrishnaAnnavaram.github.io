import { profile } from '@/data/profile'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from './SectionHead'

export function Approach() {
  const [lead, ...rest] = profile.positioning.split('\n\n')

  return (
    <section className="page-x mx-auto max-w-page py-20 sm:py-24" aria-labelledby="approach-title">
      <SectionHead index="05" label="How I work" id="approach-title" title="Most AI work fails at the engineering layer." />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal>
          <div className="prose-spec text-lg">
            <p className="text-ink">{lead.replace(/^Most AI work fails at the engineering layer, not the model layer\.\s*/, '')}</p>
            {rest.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
        </Reveal>

        <ol className="grid gap-3 sm:grid-cols-2">
          {profile.principles.map((principle, i) => (
            <Reveal as="li" key={principle.title} delay={i * 70} className="spotlight plate p-5">
              <p className="font-mono text-2xs text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 text-base text-ink">{principle.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{principle.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
