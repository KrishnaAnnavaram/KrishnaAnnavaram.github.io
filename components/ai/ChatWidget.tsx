'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_CONTEXT = `You are an AI assistant on Krishna Annavaram's portfolio website. Answer questions about Krishna concisely and professionally.

ABOUT KRISHNA:
- Name: Krishna Annavaram
- Role: Generative AI Engineer | Production LLM Systems | Healthcare AI | Data Scientist
- Location: Denton, TX
- Experience: 5+ years building production-grade AI and ML systems
- Email: annavaramkrishna@gmail.com
- LinkedIn: https://linkedin.com/in/krishna-annavaram
- GitHub: https://github.com/KrishnaAnnavaram
- Open to: Senior GenAI Engineer, LLM Engineer, RAG Engineer, Applied AI Engineer roles

EXPERTISE:
- RAG Systems (Expert, 3 yrs), Prompt Engineering (Expert, 4 yrs), Agentic AI (Advanced, 2 yrs)
- LangChain, Claude/GPT API, Embedding Models, LLM Evaluation, Hallucination Mitigation
- BERT/Transformers, PyTorch, Fine-tuning LLMs, Text Classification, NER, Semantic Search
- Python (Expert, 6 yrs), FastAPI, REST APIs, Microservices, Docker, CI/CD
- AWS, GCP, Azure, Pinecone, Redis
- Healthcare NLP (Expert), Clinical Document AI, Privacy-Aware ML, Medical Summarization

EXPERIENCE:
1. WorkingFox (2025–present) — GenAI Engineer: Production RAG systems, agentic pipelines, evaluation frameworks
2. University of North Texas (2024–2024) — Graduate Assistant: Mentored 80+ students on ML/AI projects
3. Creative Sense (2022–2023) — AI Engineer: NLP automation, document intelligence, REST APIs
4. Cognizant (2021–2022) — ML Consultant: Healthcare enterprise ML, BERT models, SAP integration
5. Lemoius (2020–2021) — ML Engineer: Predictive models, ETL pipelines, production deployment

KEY PROJECTS:
1. Production RAG Knowledge System — Enterprise RAG with evaluation, monitoring, cost optimization
2. Multi-Step Agentic AI Workflow — Reliable agentic pipelines with retrieval, reasoning, validation
3. Healthcare NLP Pipeline — Clinical document AI for healthcare clients
4. Document Intelligence System — Transformer-based document classification and extraction

PHILOSOPHY: AI systems engineering > AI modeling. Prioritizes reliability, structured APIs, evaluation metrics, and measurable business value over prototypes.

Answer only questions related to Krishna's work, skills, experience, projects, and availability. For unrelated questions, politely redirect. Keep answers short (2-4 sentences max). Do not make up information not listed above.`

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Krishna's AI assistant. Ask me about his skills, experience, or projects.",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

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
        { role: 'assistant', content: 'AI chat is not configured yet. Please contact Krishna directly at annavaramkrishna@gmail.com' },
      ])
      setInput('')
      return
    }

    const userMessage: Message = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

      const history = messages.slice(1).map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }))

      const chat = model.startChat({
        history,
        systemInstruction: SYSTEM_CONTEXT,
      })

      const result = await chat.sendMessage(text)
      const response = result.response.text()

      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Try again or reach out at annavaramkrishna@gmail.com' },
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

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center transition-colors"
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
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
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
              width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
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

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
            style={{ maxHeight: '480px' }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-zinc-700 flex items-center gap-3 bg-zinc-900">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <circle cx="12" cy="5" r="2" />
                  <line x1="12" y1="7" x2="12" y2="11" />
                  <line x1="8" y1="15" x2="8" y2="17" />
                  <line x1="16" y1="15" x2="16" y2="17" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Krishna&apos;s AI Assistant</p>
                <p className="text-xs text-zinc-400">Powered by Gemini</p>
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

            {/* Input */}
            <div className="px-3 py-3 border-t border-zinc-700 bg-zinc-900 flex gap-2">
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
    </>
  )
}
