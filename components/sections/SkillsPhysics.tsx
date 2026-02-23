'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { skills, skillCategories, categoryColors, type SkillCategory } from '@/data/skills'
import { cn } from '@/lib/utils'

interface SkillBody {
  id: number
  name: string
  category: SkillCategory
  level: string
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export function SkillsPhysics() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const bodiesRef = useRef<SkillBody[]>([])
  const animFrameRef = useRef<number>(0)
  const [activeCategory, setActiveCategory] = useState<SkillCategory | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<SkillBody | null>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })

  const initBodies = useCallback((width: number, height: number) => {
    bodiesRef.current = skills.map((skill, i) => {
      const radius = skill.level === 'Expert' ? 42 : skill.level === 'Advanced' ? 36 : 30
      return {
        id: i,
        name: skill.name,
        category: skill.category,
        level: skill.level,
        x: Math.random() * (width - radius * 2) + radius,
        y: -radius - Math.random() * height * 0.5,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2,
        radius,
        color: categoryColors[skill.category],
      }
    })
  }, [])

  const simulate = useCallback(() => {
    const bodies = bodiesRef.current
    const { width, height } = dimensions
    const gravity = 0.3
    const friction = 0.98
    const restitution = 0.6

    for (const body of bodies) {
      // Gravity
      body.vy += gravity
      body.vx *= friction
      body.vy *= friction

      body.x += body.vx
      body.y += body.vy

      // Floor
      if (body.y + body.radius > height) {
        body.y = height - body.radius
        body.vy *= -restitution
        body.vx *= 0.95
      }
      // Walls
      if (body.x - body.radius < 0) {
        body.x = body.radius
        body.vx *= -restitution
      }
      if (body.x + body.radius > width) {
        body.x = width - body.radius
        body.vx *= -restitution
      }

      // Collision detection
      for (const other of bodies) {
        if (other.id <= body.id) continue
        const dx = other.x - body.x
        const dy = other.y - body.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const minDist = body.radius + other.radius

        if (dist < minDist && dist > 0) {
          const nx = dx / dist
          const ny = dy / dist
          const overlap = minDist - dist

          body.x -= nx * overlap * 0.5
          body.y -= ny * overlap * 0.5
          other.x += nx * overlap * 0.5
          other.y += ny * overlap * 0.5

          const dvx = body.vx - other.vx
          const dvy = body.vy - other.vy
          const dotProduct = dvx * nx + dvy * ny

          if (dotProduct > 0) {
            const impulse = dotProduct * restitution
            body.vx -= impulse * nx
            body.vy -= impulse * ny
            other.vx += impulse * nx
            other.vy += impulse * ny
          }
        }
      }
    }
  }, [dimensions])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    for (const body of bodiesRef.current) {
      const isFiltered = activeCategory && body.category !== activeCategory
      const alpha = isFiltered ? 0.25 : 1

      // Circle
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.arc(body.x, body.y, body.radius, 0, Math.PI * 2)

      // Gradient fill
      const gradient = ctx.createRadialGradient(
        body.x - body.radius * 0.3,
        body.y - body.radius * 0.3,
        body.radius * 0.1,
        body.x,
        body.y,
        body.radius
      )
      gradient.addColorStop(0, body.color + 'cc')
      gradient.addColorStop(1, body.color + '33')
      ctx.fillStyle = gradient
      ctx.fill()

      // Border
      ctx.strokeStyle = isFiltered ? body.color + '40' : body.color + 'aa'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Text
      ctx.fillStyle = isFiltered ? '#ffffff44' : '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const fontSize = body.radius > 38 ? 10 : 9
      ctx.font = `${fontSize}px Inter, sans-serif`

      // Wrap text if needed
      const maxWidth = body.radius * 1.5
      const words = body.name.split(' ')
      if (words.length > 1 && ctx.measureText(body.name).width > maxWidth) {
        ctx.font = `${fontSize - 1}px Inter, sans-serif`
        ctx.fillText(words[0], body.x, body.y - 6)
        ctx.fillText(words.slice(1).join(' '), body.x, body.y + 7)
      } else {
        ctx.fillText(body.name, body.x, body.y)
      }
      ctx.restore()
    }
  }, [activeCategory, dimensions])

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const w = rect.width
      const h = Math.min(500, Math.max(350, window.innerHeight * 0.45))
      setDimensions({ width: w, height: h })
      initBodies(w, h)
    }
    updateDimensions()
    const ro = new ResizeObserver(updateDimensions)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [initBodies])

  useEffect(() => {
    const loop = () => {
      simulate()
      draw()
      animFrameRef.current = requestAnimationFrame(loop)
    }
    animFrameRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [simulate, draw])

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    for (const body of bodiesRef.current) {
      const dx = x - body.x
      const dy = y - body.y
      if (Math.sqrt(dx * dx + dy * dy) < body.radius) {
        // Apply upward impulse
        body.vy = -8 - Math.random() * 4
        body.vx = (Math.random() - 0.5) * 6
        setSelectedSkill(body)
        return
      }
    }
    setSelectedSkill(null)
  }, [])

  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-3">
            Skills & Expertise
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Click any skill bubble to interact. Filter by category below.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-6" role="group" aria-label="Filter skills by category">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
              !activeCategory
                ? 'bg-brand-primary border-brand-primary text-white'
                : 'border-white/10 text-text-secondary hover:border-brand-primary/30 hover:text-text-primary'
            )}
            aria-pressed={!activeCategory}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
                activeCategory === cat
                  ? 'text-white border-transparent'
                  : 'border-white/10 text-text-secondary hover:text-text-primary'
              )}
              style={
                activeCategory === cat
                  ? { backgroundColor: categoryColors[cat], borderColor: categoryColors[cat] }
                  : {}
              }
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Canvas */}
        <div ref={containerRef} className="relative w-full">
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            onClick={handleCanvasClick}
            className="w-full cursor-pointer rounded-2xl border border-white/5"
            role="application"
            aria-label="Interactive skills physics simulation. Click bubbles to interact."
            style={{ height: dimensions.height }}
          />

          {/* Selected skill tooltip */}
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 right-4 glass p-4 max-w-xs"
            >
              <p className="font-display font-semibold text-text-primary">{selectedSkill.name}</p>
              <p className="text-xs text-text-muted mt-1">{selectedSkill.category}</p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: selectedSkill.color + '30', color: selectedSkill.color }}
                >
                  {selectedSkill.level}
                </span>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-2 right-2 text-text-muted hover:text-text-primary"
                aria-label="Close skill detail"
              >
                ×
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
