'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Linkedin, Github, CheckCircle, AlertCircle, Send } from 'lucide-react'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  purpose: z.enum(['hiring', 'collaboration', 'consulting', 'other'], {
    required_error: 'Please select a purpose',
  }),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  honeypot: z.string().max(0, 'Bot detected'),
})

type ContactFormData = z.infer<typeof contactSchema>

const purposeOptions = [
  { value: 'hiring', label: 'Hiring / Recruiting' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' },
]

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [cooldown, setCooldown] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    if (cooldown) return
    setSubmitState('loading')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '19fc0a30-42a5-4a3d-a086-39b46a5e16ca',
          name: data.name,
          email: data.email,
          company: data.company || '',
          subject: `Portfolio Contact: ${data.purpose} from ${data.name}`,
          message: data.message,
          botcheck: data.honeypot,
        }),
      })

      const result = await response.json()
      if (!result.success) throw new Error('Submission failed')

      setSubmitState('success')
      reset()
      setCooldown(true)
      setTimeout(() => setCooldown(false), 60000)
    } catch {
      setSubmitState('error')
      setTimeout(() => setSubmitState('idle'), 4000)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container-narrow">
        <div className="mb-12">
          <p className="text-brand-accent text-sm font-mono font-medium mb-3 tracking-widest uppercase">
            Get in touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Contact
          </h1>
          <p className="text-text-secondary max-w-lg">
            Open to senior GenAI Engineer roles, consulting, and collaboration.
            I read every message and respond within 2 business days.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-12">
          {/* Form */}
          <div>
            <AnimatePresence mode="wait">
              {submitState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle size={32} className="text-green-500" />
                  </motion.div>
                  <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
                    Message sent!
                  </h2>
                  <p className="text-text-secondary">
                    Thank you for reaching out. I&apos;ll get back to you within 2 business days.
                  </p>
                  <button
                    onClick={() => setSubmitState('idle')}
                    className="mt-6 text-brand-primary text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  {/* Honeypot — anti-spam */}
                  <input
                    type="text"
                    {...register('honeypot')}
                    aria-hidden="true"
                    tabIndex={-1}
                    style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                    autoComplete="off"
                  />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                        Name <span className="text-brand-primary" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        {...register('name')}
                        className={cn(
                          'w-full px-4 py-3 glass border rounded-xl text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-brand-primary/50 transition-colors',
                          errors.name ? 'border-red-500/50' : 'border-white/10'
                        )}
                        placeholder="Your name"
                        aria-required="true"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle size={10} />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                        Email <span className="text-brand-primary" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={cn(
                          'w-full px-4 py-3 glass border rounded-xl text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-brand-primary/50 transition-colors',
                          errors.email ? 'border-red-500/50' : 'border-white/10'
                        )}
                        placeholder="your@email.com"
                        aria-required="true"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle size={10} />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-text-secondary mb-2">
                      Company <span className="text-text-muted text-xs">(optional)</span>
                    </label>
                    <input
                      id="company"
                      {...register('company')}
                      className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-brand-primary/50 transition-colors"
                      placeholder="Company or organization"
                    />
                  </div>

                  <div>
                    <label htmlFor="purpose" className="block text-sm font-medium text-text-secondary mb-2">
                      Purpose <span className="text-brand-primary" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="purpose"
                      {...register('purpose')}
                      className={cn(
                        'w-full px-4 py-3 glass border rounded-xl text-text-primary text-sm focus:outline-none focus:border-brand-primary/50 transition-colors bg-transparent',
                        errors.purpose ? 'border-red-500/50' : 'border-white/10'
                      )}
                      aria-required="true"
                      aria-describedby={errors.purpose ? 'purpose-error' : undefined}
                    >
                      <option value="" className="bg-background-elevated">Select a purpose…</option>
                      {purposeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-background-elevated">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.purpose && (
                      <p id="purpose-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={10} />
                        {errors.purpose.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                      Message <span className="text-brand-primary" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={5}
                      className={cn(
                        'w-full px-4 py-3 glass border rounded-xl text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-brand-primary/50 transition-colors resize-none',
                        errors.message ? 'border-red-500/50' : 'border-white/10'
                      )}
                      placeholder="Tell me about the role, project, or what you&apos;d like to discuss…"
                      aria-required="true"
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={10} />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {submitState === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 px-4 py-3 rounded-lg" role="alert">
                      <AlertCircle size={14} aria-hidden="true" />
                      Something went wrong. Please email me directly at{' '}
                      <a href={`mailto:${profile.socials.email}`} className="underline">
                        {profile.socials.email}
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitState === 'loading' || cooldown}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={submitState === 'loading' ? 'Sending message…' : 'Send message'}
                  >
                    {submitState === 'loading' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} aria-hidden="true" />
                        {cooldown ? 'Message sent (60s cooldown)' : 'Send message'}
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="space-y-4">
              <div>
                <h2 className="text-xs font-mono font-medium text-text-muted uppercase tracking-widest mb-4">
                  Direct contact
                </h2>
                <div className="space-y-3">
                  <a
                    href={`mailto:${profile.socials.email}`}
                    className="flex items-center gap-3 glass-sm p-3 rounded-xl hover:border-brand-primary/20 border border-white/5 transition-colors group"
                    aria-label={`Email ${profile.socials.email}`}
                  >
                    <Mail size={16} className="text-brand-primary" aria-hidden="true" />
                    <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                      {profile.socials.email}
                    </span>
                  </a>
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 glass-sm p-3 rounded-xl hover:border-brand-primary/20 border border-white/5 transition-colors group"
                    aria-label="LinkedIn profile (opens in new tab)"
                  >
                    <Linkedin size={16} className="text-brand-primary" aria-hidden="true" />
                    <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                      LinkedIn
                    </span>
                  </a>
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 glass-sm p-3 rounded-xl hover:border-brand-primary/20 border border-white/5 transition-colors group"
                    aria-label="GitHub profile (opens in new tab)"
                  >
                    <Github size={16} className="text-brand-primary" aria-hidden="true" />
                    <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                      GitHub
                    </span>
                  </a>
                </div>
              </div>

              <div className="glass-sm p-4 border border-white/5">
                <h3 className="text-text-primary text-sm font-semibold mb-2">Ideal roles</h3>
                <ul className="space-y-1">
                  {profile.idealRoles.slice(0, 4).map((role) => (
                    <li key={role} className="text-text-muted text-xs flex items-center gap-1.5">
                      <span className="text-brand-primary" aria-hidden="true">→</span>
                      {role}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-sm p-4 border border-white/5">
                <h3 className="text-text-primary text-sm font-semibold mb-2">Documents</h3>
                <div className="space-y-2">
                  <a
                    href={profile.resumeUrl}
                    download
                    className="block text-brand-primary text-sm hover:underline"
                    aria-label="Download Resume PDF"
                  >
                    ↓ Resume (PDF)
                  </a>
                  <a
                    href={profile.coverLetterUrl}
                    download
                    className="block text-brand-primary text-sm hover:underline"
                    aria-label="Download Cover Letter PDF"
                  >
                    ↓ Cover Letter (PDF)
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

    </div>
  )
}
