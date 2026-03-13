'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Download, ArrowRight, ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import dynamic from 'next/dynamic'
import { profile } from '@/data/profile'

const HeroScene = dynamic(() => import('@/components/three/HeroScene').then(m => ({ default: m.HeroScene })), {
  ssr: false,
  loading: () => null,
})

const roles = [
  'Turning LLMs into Production Systems',
  'Graph-RAG · Multi-Agent · Fine-Tuning',
  '5 Industries. All Shipped.',
  'The Engineer Behind the Model',
]

function TextScramble({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('')
  const chars = '!<>-_\\/[]{}—=+*^?#'

  useEffect(() => {
    let frame = 0
    const totalFrames = 30
    const interval = setInterval(() => {
      frame++
      if (frame >= totalFrames) {
        setDisplayText(text)
        clearInterval(interval)
        return
      }
      const progress = frame / totalFrames
      const revealCount = Math.floor(progress * text.length)
      setDisplayText(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < revealCount) return char
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
    }, 40)
    return () => clearInterval(interval)
  }, [text])

  return <span>{displayText}</span>
}

function TypewriterRoles() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const target = roles[currentIndex]
    const speed = isDeleting ? 40 : 70
    const pause = isDeleting ? 0 : 2000

    if (!isDeleting && displayed === target) {
      const timeout = setTimeout(() => setIsDeleting(true), pause)
      return () => clearTimeout(timeout)
    }
    if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % roles.length)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayed((prev) =>
        isDeleting ? prev.slice(0, -1) : target.slice(0, prev.length + 1)
      )
    }, speed)
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, currentIndex])

  return (
    <span className="inline-block min-h-[1.4em]">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="inline-block w-0.5 h-[1em] bg-brand-accent ml-1 align-middle"
        aria-hidden="true"
      />
    </span>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', setScrollProgress)
  }, [scrollYProgress])

  const y = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* 3D Background */}
      <HeroScene scrollProgress={scrollProgress} />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-primary/30 via-transparent to-background-primary/80 pointer-events-none" aria-hidden="true" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-wide px-4 py-20 grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Text content */}
        <div className="order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 glass-sm text-brand-accent text-xs font-mono font-medium mb-6 rounded-full border border-brand-accent/20">
              {profile.availability}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display font-bold text-text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            <TextScramble text="Krishna" />
            <br />
            <span className="text-gradient">
              <TextScramble text="Annavaram" />
            </span>
          </motion.h1>

          {/* Social quick-links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex items-center gap-3 mb-6"
          >
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 glass-sm rounded-lg border border-white/10 text-text-muted hover:text-brand-primary hover:border-brand-primary/40 transition-all duration-200 text-sm font-medium"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={14} aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 glass-sm rounded-lg border border-white/10 text-text-muted hover:text-brand-primary hover:border-brand-primary/40 transition-all duration-200 text-sm font-medium"
              aria-label="GitHub profile"
            >
              <Github size={14} aria-hidden="true" />
              GitHub
            </a>
            <a
              href={`mailto:${profile.socials.email}`}
              className="flex items-center gap-1.5 px-3 py-1.5 glass-sm rounded-lg border border-white/10 text-text-muted hover:text-brand-accent hover:border-brand-accent/40 transition-all duration-200 text-sm font-medium"
              aria-label="Send email"
            >
              <Mail size={14} aria-hidden="true" />
              Email
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-text-secondary font-medium mb-8 leading-snug"
          >
            <TypewriterRoles />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-text-muted text-base leading-relaxed mb-10 max-w-lg"
          >
            GenAI Engineer with 5+ years shipping production LLM systems across pharma,
            enterprise, research, and clinical tech. Graph-RAG, Multi-Agent, Fine-Tuning — all in production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href={profile.resumeUrl}
              download
              className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/80 transition-all duration-200 glow-primary"
              aria-label="Download Resume PDF"
            >
              <Download size={16} aria-hidden="true" />
              Download Resume
            </a>
            <Link
              href="/projects"
              className="flex items-center gap-2 px-6 py-3 glass border border-white/10 text-text-primary font-semibold rounded-xl hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all duration-200"
            >
              Explore Work
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="order-1 md:order-2 flex justify-center md:justify-end"
        >
          <div className="relative">
            {/* Glow rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-brand-primary/20"
              style={{ margin: '-20px' }}
              aria-hidden="true"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-brand-accent/10"
              style={{ margin: '-35px' }}
              aria-hidden="true"
            />

            {/* Profile image */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-brand-primary/30 shadow-2xl glow-primary">
              <Image
                src="/images/profile/profile.png"
                alt="Krishna Annavaram — GenAI Engineer"
                width={256}
                height={256}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
        aria-hidden="true"
      >
        <span className="text-xs font-mono tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
