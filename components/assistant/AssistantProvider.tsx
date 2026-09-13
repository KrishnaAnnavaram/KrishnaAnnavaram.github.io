'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Assistant } from './Assistant'

/**
 * One assistant for the whole document.
 *
 * The first version mounted an `<Assistant>` inside every trigger button, which
 * meant two dialogs existed in the DOM at once and the `/` shortcut opened both
 * — a duplicate `role="dialog"`, which is an accessibility defect as well as a
 * visual one. The dialog and its keyboard shortcut now live here, once, and the
 * buttons are pure triggers.
 */

interface AssistantApi {
  open: () => void
  close: () => void
  isOpen: boolean
}

const AssistantContext = createContext<AssistantApi | null>(null)

export function useAssistant(): AssistantApi {
  const ctx = useContext(AssistantContext)
  if (!ctx) throw new Error('useAssistant must be used inside <AssistantProvider>')
  return ctx
}

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false)

  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])

  /* `/` is the near-universal "search this site" key. Registered once, and
     ignored while the visitor is typing into something. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const el = document.activeElement
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable)
      ) {
        return
      }
      e.preventDefault()
      setOpen(true)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  /* Marks the document interactive once React has taken over. The filter
     controls and the assistant only respond after this point, so anything
     that needs to wait for interactivity — including the E2E suite — has one
     unambiguous signal instead of a guess about timing. */
  useEffect(() => {
    document.documentElement.dataset.hydrated = 'true'
  }, [])

  const api = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen])

  return (
    <AssistantContext.Provider value={api}>
      {children}
      <Assistant open={isOpen} onClose={close} />
    </AssistantContext.Provider>
  )
}
