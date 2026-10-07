'use client'

import { useCallback, useEffect, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import type { Photo } from '@/data/profile'
import { cn } from '@/lib/utils'

/**
 * The hero portrait, rotating on a wall-clock slot.
 *
 * The slot is `floor(now / interval) % photos.length`, so the photo is a pure
 * function of the time: two visitors at the same moment see the same frame, and
 * the boot script in app/layout.tsx can pick it before first paint. This
 * component only takes over after hydration, to move to the next frame when
 * the slot turns over while the page is open.
 *
 * WCAG 2.2.2 asks that content which updates on its own can be paused. The
 * change is a slow crossfade every few minutes, not motion, but the control is
 * here anyway, and the choice persists for the session. Under reduced motion
 * the swap is instant.
 *
 * Every frame is in the DOM at identical dimensions, stacked, so a swap never
 * shifts layout.
 */
export function RotatingPortrait({
  photos,
  intervalMs,
  className,
}: {
  photos: Photo[]
  intervalMs: number
  className?: string
}) {
  const slotNow = useCallback(
    () => Math.floor(Date.now() / intervalMs) % photos.length,
    [intervalMs, photos.length]
  )

  // null until hydrated: the CSS (driven by data-photo on <html>) decides the
  // visible frame until then, so server and client markup agree.
  const [active, setActive] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    let stored = false
    try {
      stored = sessionStorage.getItem('portrait-paused') === '1'
    } catch {
      /* storage is optional */
    }
    setPaused(stored)
    setActive(slotNow())
  }, [slotNow])

  useEffect(() => {
    if (paused || active === null) return
    // Wake at the next slot boundary rather than polling.
    const wait = intervalMs - (Date.now() % intervalMs) + 50
    const id = window.setTimeout(() => setActive(slotNow()), wait)
    return () => window.clearTimeout(id)
  }, [active, paused, intervalMs, slotNow])

  const togglePause = () => {
    setPaused((p) => {
      const next = !p
      try {
        sessionStorage.setItem('portrait-paused', next ? '1' : '0')
      } catch {
        /* storage is optional */
      }
      if (!next) setActive(slotNow())
      return next
    })
  }

  const showNext = () => setActive((a) => ((a ?? slotNow()) + 1) % photos.length)

  const current = active ?? 0
  const minutes = Math.round(intervalMs / 60000)

  return (
    <figure className={cn('relative', className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-rule bg-sunken shadow-[0_30px_80px_-30px_rgb(0_0_0/0.45)]">
        {photos.map((photo, i) => (
          <picture
            key={photo.src}
            className="portrait-frame absolute inset-0"
            data-slot={i}
            data-active={active === null ? undefined : String(active === i)}
          >
            <source srcSet={`${photo.src}.webp`} type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element -- static export: next/image adds nothing here and cannot express <picture> */}
            <img
              src={`${photo.src}.jpg`}
              alt={active === null ? (i === 0 ? photo.alt : '') : active === i ? photo.alt : ''}
              width={800}
              height={1000}
              // All eager: the boot script may have chosen any of them as the
              // first visible frame, and a lazy one would then be the LCP
              // image at low priority. They total under 200 kB as WebP.
              loading="eager"
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              className="h-full w-full object-cover"
            />
          </picture>
        ))}

        {/* Legibility scrim for the controls; the photo itself stays natural. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent"
        />

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5" role="group" aria-label="Portrait">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${photo.caption.toLowerCase()} portrait`}
                aria-pressed={current === i}
                className="grid size-6 place-items-center"
              >
                <span
                  className={cn(
                    'block h-1.5 rounded-full transition-all duration-300',
                    current === i ? 'w-5 bg-white' : 'w-1.5 bg-white/55'
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={showNext}
              className="rounded-full bg-black/45 px-2.5 py-1 font-mono text-3xs uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-colors hover:bg-black/65"
            >
              Next
            </button>
            <button
              type="button"
              onClick={togglePause}
              aria-pressed={paused}
              aria-label={paused ? 'Resume portrait rotation' : 'Pause portrait rotation'}
              className="grid size-7 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
            >
              {paused ? <Play size={12} aria-hidden /> : <Pause size={12} aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      <figcaption className="mt-2.5 flex items-center justify-between font-mono text-3xs uppercase tracking-[0.12em] text-ink-faint">
        <span>
          Frame {current + 1}/{photos.length}
          <span className="sr-only"> — {photos[current].caption}</span>
        </span>
        <span>{paused ? 'Rotation paused' : `Rotates every ${minutes} min`}</span>
      </figcaption>
    </figure>
  )
}
