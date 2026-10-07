'use client'

import { useEffect } from 'react'

/**
 * Drives the `.spotlight` cursor glow for every card on the page from a single
 * listener.
 *
 * One delegated `pointermove` on the document, coalesced to one write per
 * animation frame, writing two CSS custom properties on whichever card is
 * under the pointer. Nothing goes through React state, so moving the mouse
 * never re-renders anything. Coarse pointers and reduced motion opt out
 * entirely — the cards are complete without it.
 */
export function Spotlight() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduced.matches) return

    let frame = 0
    let last: PointerEvent | null = null

    const apply = () => {
      frame = 0
      const e = last
      if (!e) return
      const card = (e.target as Element | null)?.closest?.<HTMLElement>('.spotlight')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      card.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }

    const onMove = (e: PointerEvent) => {
      last = e
      if (!frame) frame = requestAnimationFrame(apply)
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
