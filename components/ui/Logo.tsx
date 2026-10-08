import { useId } from 'react'
import { cn } from '@/lib/utils'

/**
 * The KA monogram.
 *
 * Drawn as strokes rather than set in a font, so it is identical in the
 * header, the favicon (app/icon.svg) and the Apple touch icon, none of which
 * can rely on a web font being loaded. The badge carries its own colours, so it
 * reads the same on the light and dark themes. Keep the paths in step with
 * app/icon.svg.
 */
export function Logo({ size = 32, className }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      <defs>
        <linearGradient id={`ka-${id}`} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0e5f73" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#ka-${id})`} />
      <g fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 9v14M15 9l-6.2 7L15 23" />
        <path d="M17 23l4-14 4 14M18.4 18.2h5.2" />
      </g>
    </svg>
  )
}
