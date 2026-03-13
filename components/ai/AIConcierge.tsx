'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Mic, Volume2, VolumeX, Shield, AlertCircle } from 'lucide-react'
import {
  streamConciergeResponse,
  getRemainingMessages,
  incrementMessageCount,
  type ChatMessage,
} from '@/lib/ai-concierge'
import { cn } from '@/lib/utils'

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 glass-sm rounded-2xl rounded-bl-sm w-fit">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-brand-primary"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

export function AIConcierge() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm an AI assistant for Krishna's portfolio. Ask me anything about his work, experience, or how to get in touch.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [remaining, setRemaining] = useState(10)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<{ stop?: () => void } | null>(null)

  useEffect(() => {
    setRemaining(getRemainingMessages())
  }, [])

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, messages])

  const sendMessage = async (text?: string) => {
    const messageText = text ?? input.trim()
    if (!messageText || loading || remaining <= 0) return

    setInput('')
    setError(null)
    incrementMessageCount()
    setRemaining((r) => r - 1)

    const userMessage: ChatMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setLoading(true)

    // Placeholder for streaming response
    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    }
    setMessages([...updatedMessages, assistantMessage])

    await streamConciergeResponse(
      updatedMessages,
      (chunk) => {
        setMessages((prev) => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          if (last.role === 'assistant') {
            updated[updated.length - 1] = { ...last, content: last.content + chunk }
          }
          return updated
        })
      },
      () => {
        setLoading(false)
        if (voiceEnabled) {
          setMessages((prev) => {
            const lastMsg = prev[prev.length - 1]
            if (lastMsg.role === 'assistant' && lastMsg.content) {
              speak(lastMsg.content)
            }
            return prev
          })
        }
      },
      (err) => {
        setLoading(false)
        setError(err)
        setMessages((prev) => prev.slice(0, -1)) // Remove empty assistant message
      }
    )
  }

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  const startVoiceInput = () => {
    if (typeof window === 'undefined') return
    type SpeechRecognitionConstructor = new () => {
      lang: string
      interimResults: boolean
      maxAlternatives: number
      onresult: (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void
      onerror: () => void
      start: () => void
    }
    const SpeechRecognitionAPI: SpeechRecognitionConstructor | undefined =
      (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor })
        .SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition
    if (!SpeechRecognitionAPI) return

    const recognition = new SpeechRecognitionAPI()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
    }
    recognition.onerror = () => {}
    recognition.start()
    recognitionRef.current = recognition as unknown as { stop?: () => void }
  }

  const quickPrompts = [
    'What LLMs and GenAI tools has Krishna worked with?',
    'What industries has he shipped AI systems in?',
    'What is his availability for new roles?',
    'Show me his best Graph-RAG projects',
  ]

  return (
    <>
      {/* Floating orb */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40">
        <motion.button
          onClick={() => setOpen(!open)}
          className={cn(
            'w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300',
            open
              ? 'bg-background-elevated border border-white/10'
              : 'bg-brand-primary glow-primary'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={
            !open
              ? {
                  boxShadow: [
                    '0 0 20px rgba(99,102,241,0.4)',
                    '0 0 40px rgba(99,102,241,0.8)',
                    '0 0 20px rgba(99,102,241,0.4)',
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
          aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
          aria-expanded={open}
          aria-controls="concierge-panel"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageCircle size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="concierge-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-36 md:bottom-24 right-4 md:right-6 z-40 w-[calc(100vw-2rem)] md:w-[420px] max-h-[600px] flex flex-col glass border border-white/10 shadow-2xl"
            role="dialog"
            aria-label="AI Portfolio Assistant"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Portfolio Assistant</p>
                  <p className="text-xs text-text-muted">{remaining} messages remaining</p>
                </div>
              </div>
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  voiceEnabled ? 'text-brand-accent bg-brand-accent/10' : 'text-text-muted hover:text-text-secondary'
                )}
                aria-label={voiceEnabled ? 'Disable voice output' : 'Enable voice output'}
                title={voiceEnabled ? 'Voice output on' : 'Voice output off'}
              >
                {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-brand-primary text-white rounded-br-sm'
                        : 'glass-sm text-text-primary rounded-bl-sm'
                    )}
                  >
                    {msg.content || (loading && i === messages.length - 1 ? <TypingIndicator /> : null)}
                  </div>
                </div>
              ))}
              {error && (
                <div className="flex items-center gap-2 text-xs text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">
                  <AlertCircle size={12} />
                  {error}
                </div>
              )}
              {remaining === 0 && (
                <div className="glass-sm p-3 text-xs text-text-muted text-center">
                  Session limit reached.{' '}
                  <a href="mailto:annavaramkrishna@gmail.com" className="text-brand-primary hover:underline">
                    Email Krishna directly
                  </a>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="text-xs px-3 py-1.5 glass-sm text-text-secondary hover:text-text-primary hover:border-brand-primary/30 border border-transparent rounded-full transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Privacy notice */}
            <div className="px-4 py-2 flex items-center gap-1.5 border-t border-white/5">
              <Shield size={10} className="text-text-muted shrink-0" />
              <p className="text-xs text-text-muted">Conversations are not stored</p>
            </div>

            {/* Input */}
            <div className="p-4 pt-0">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage() }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={remaining > 0 ? 'Ask about Krishna…' : 'Session limit reached'}
                  disabled={loading || remaining === 0}
                  className="flex-1 bg-background-elevated border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary/50 transition-colors disabled:opacity-50"
                  aria-label="Message input"
                />
                <button
                  type="button"
                  onClick={startVoiceInput}
                  className="p-2.5 glass-sm rounded-xl text-text-muted hover:text-text-primary transition-colors"
                  aria-label="Voice input"
                  title="Voice input"
                >
                  <Mic size={16} />
                </button>
                <button
                  type="submit"
                  disabled={!input.trim() || loading || remaining === 0}
                  className="p-2.5 bg-brand-primary rounded-xl text-white hover:bg-brand-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
