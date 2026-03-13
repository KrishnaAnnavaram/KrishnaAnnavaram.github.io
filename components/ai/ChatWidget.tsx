'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import OpenAI from 'openai'
import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function buildSystemContext(): string {
  const experienceSummary = experience
    .map(
      (e) =>
        `- ${e.title} at ${e.company} (${e.startDate} – ${e.endDate ?? 'Present'}): ${e.summary}`
    )
    .join('\n')

  const projectSummary = projects
    .map((p) => `- ${p.title} (${p.year}): ${p.tagline}`)
    .join('\n')

  const skillGroups = skills.reduce<Record<string, string[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(`${s.name} (${s.level}, ${s.years}yr)`)
    return acc
  }, {})

  const skillSummary = Object.entries(skillGroups)
    .map(([cat, items]) => `${cat}: ${items.join(', ')}`)
    .join('\n')

  return `You are an AI assistant on ${profile.name}'s portfolio website. Help recruiters, engineers, and collaborators learn about Krishna's work and experience.

ABOUT KRISHNA:
Name: ${profile.name}
Role: ${profile.headline}
Location: ${profile.location}
Availability: ${profile.availability}

BIO: ${profile.bio}

EXPERIENCE:
${experienceSummary}

KEY PROJECTS:
${projectSummary}

SKILLS:
${skillSummary}

EDUCATION:
- Master of Science in Data Science — University of North Texas
- Bachelor of Technology in Computer Science & Engineering — Kalasalingam University

CERTIFICATIONS:
- AWS Certified AI Practitioner (Jul 2025, expires Jul 2028)
- SAP Certified Development Associate — ABAP

CONTACT:
- Email: ${profile.socials.email}
- LinkedIn: ${profile.socials.linkedin}
- GitHub: ${profile.socials.github}

IDEAL ROLES: ${profile.idealRoles.join(', ')}

GUIDELINES:
1. Only answer based on the information above. Do not fabricate details.
2. If asked about something not in the data, say "I don't have that specific detail — you can reach Krishna directly at ${profile.socials.email}"
3. Keep responses concise and helpful (2-4 sentences max).
4. For scheduling or detailed discussions, direct users to email or LinkedIn.
5. Be professional but warm. This is a portfolio assistant, not a generic chatbot.
6. Never make compliance claims (HIPAA, regulatory audits passed, etc).`
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm ${profile.name.split(' ')[0]}'s AI assistant. Ask me about his skills, experience, or projects.`,
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const constraintsRef = useRef<HTMLDivElement>(null)

  // Shared motion values so panel follows the dragged button
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: text },
        {
          role: 'assistant',
          content: `AI chat is not configured yet. Please contact Krishna directly at ${profile.socials.email}`,
        },
      ])
      setInput('')
      return
    }

    const userMessage: Message = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })

      const history = messages.slice(1).map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }))

      const completion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: buildSystemContext() },
          ...history,
          { role: 'user', content: text },
        ],
        max_tokens: 300,
      })

      const response = completion.choices[0]?.message?.content ?? ''
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry, something went wrong. Try again or reach out at ${profile.socials.email}`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickPrompts = [
    'What GenAI skills does Krishna have?',
    'Tell me about his Graph-RAG projects',
    'Which industries has he shipped AI in?',
    'Is he open to new roles?',
  ]

  return (
    // Full-viewport fixed container — used as drag boundary
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50">

      {/* Chat Panel — shares x/y transform so it moves with the button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{ x, y, maxHeight: '480px' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute bottom-40 md:bottom-24 right-4 md:right-6 pointer-events-auto w-[calc(100vw-2rem)] max-w-sm sm:max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-zinc-700 flex items-center gap-3 bg-zinc-900 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="#6366f1" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <circle cx="12" cy="5" r="2" />
                  <line x1="12" y1="7" x2="12" y2="11" />
                  <line x1="8" y1="15" x2="8" y2="17" />
                  <line x1="16" y1="15" x2="16" y2="17" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Krishna&apos;s AI Assistant</p>
                <p className="text-xs text-zinc-400">Powered by GPT-4o mini</p>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-indigo-500 text-white rounded-br-sm'
                        : 'bg-zinc-800 text-zinc-200 rounded-bl-sm border border-zinc-700'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-xl rounded-bl-sm">
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-zinc-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1 flex-shrink-0">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setInput(prompt)
                      setTimeout(() => inputRef.current?.focus(), 0)
                    }}
                    className="text-xs px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:border-indigo-500/50 rounded-full transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 py-3 border-t border-zinc-700 bg-zinc-900 flex gap-2 flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Krishna's work..."
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500 transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors flex-shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draggable Floating Button */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        dragElastic={0.05}
        style={{ x, y, touchAction: 'none' }}
        className="absolute bottom-20 md:bottom-6 right-4 md:right-6 pointer-events-auto cursor-grab active:cursor-grabbing"
        whileDrag={{ scale: 1.1 }}
      >
        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          className="w-14 h-14 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center transition-colors select-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle AI assistant"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
                width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </motion.svg>
            ) : (
              <motion.svg
                key="bot"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
                width="22" height="22" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <line x1="12" y1="7" x2="12" y2="11" />
                <line x1="8" y1="15" x2="8" y2="17" />
                <line x1="16" y1="15" x2="16" y2="17" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Drag hint — shows briefly on mobile */}
        <motion.div
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs text-zinc-400 whitespace-nowrap pointer-events-none md:hidden"
        >
          drag me
        </motion.div>
      </motion.div>
    </div>
  )
}
