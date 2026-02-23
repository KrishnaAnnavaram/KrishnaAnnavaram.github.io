'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Download, Linkedin } from 'lucide-react'
import { profile } from '@/data/profile'

export function ContactCTA() {
  return (
    <section className="section-padding relative overflow-hidden" aria-labelledby="contact-cta-heading">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="container-narrow text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-brand-accent text-sm font-mono font-medium mb-4 tracking-widest uppercase">
            Let&apos;s work together
          </p>
          <h2
            id="contact-cta-heading"
            className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight"
          >
            Let&apos;s build something
            <br />
            <span className="text-gradient">that matters</span>
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-lg mx-auto">
            Open to Senior GenAI Engineer and Applied AI roles. Let&apos;s discuss
            how I can help your team ship reliable AI systems.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/80 transition-all duration-200 glow-primary text-base"
            >
              <Mail size={18} aria-hidden="true" />
              Get in touch
            </Link>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 glass border border-white/10 text-text-primary font-semibold rounded-xl hover:border-brand-primary/30 transition-all duration-200 text-base"
              aria-label="Connect on LinkedIn (opens in new tab)"
            >
              <Linkedin size={18} aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="flex items-center gap-2 px-8 py-4 glass border border-white/10 text-text-primary font-semibold rounded-xl hover:border-brand-primary/30 transition-all duration-200 text-base"
              aria-label="Download Resume PDF"
            >
              <Download size={18} aria-hidden="true" />
              Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
