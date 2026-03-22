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
  // Use refs for values used in the animation loop to avoid restarting it on every state change
  const dimensionsRef = useRef({ width: 800, height: 500 })
  const activeCategoryRef = useRef<SkillCategory | null>(null)
  const initializedRef = useRef(false)
  const [activeCategory, setActiveCategory] = useState<SkillCategory | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<SkillBody | null>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })

  // Keep activeCategoryRef in sync with state (for use inside draw without deps)
  useEffect(() => {
    activeCategoryRef.current = activeCategory
  }, [activeCategory])

  const initBodies = useCallback((width: number, height: number) => {
    const isMobile = width < 640
    const radiiMap = isMobile
      ? { Expert: 32, Advanced: 26, Proficient: 21 }
      : { Expert: 42, Advanced: 36, Proficient: 30 }
    bodiesRef.current = skills.map((skill, i) => {
      const radius = radiiMap[skill.level]
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
    initializedRef.current = true
  }, [])

  // Clamp existing bodies to new bounds instead of re-initializing them
  const clampBodiesToBounds = useCallback((width: number, height: number) => {
    for (const body of bodiesRef.current) {
      if (body.x - body.radius < 0) body.x = body.radius
      if (body.x + body.radius > width) body.x = width - body.radius
      if (body.y + body.radius > height) {
        body.y = height - body.radius
        body.vy = 0
      }
    }
  }, [])

  // Apply DPR-aware canvas dimensions imperatively (avoids blurry canvas on Retina/mobile)
  const applyCanvasDpr = useCallback((w: number, h: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
  }, [])

  // simulate reads from dimensionsRef so it never needs to be recreated
  const simulate = useCallback(() => {
    const bodies = bodiesRef.current
    const { width, height } = dimensionsRef.current
    const gravity = 0.3
    const friction = 0.98
    const restitution = 0.6

    for (const body of bodies) {
      body.vy += gravity
      body.vx *= friction
      body.vy *= friction

      body.x += body.vx
      body.y += body.vy

      if (body.y + body.radius > height) {
        body.y = height - body.radius
        body.vy *= -restitution
        body.vx *= 0.95
      }
      if (body.x - body.radius < 0) {
        body.x = body.radius
        body.vx *= -restitution
      }
      if (body.x + body.radius > width) {
        body.x = width - body.radius
        body.vx *= -restitution
      }

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
  }, [])

  // draw reads from refs so it never needs to be recreated
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const { width, height } = dimensionsRef.current
    const currentCategory = activeCategoryRef.current

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.scale(dpr, dpr)

    for (const body of bodiesRef.current) {
      const isFiltered = currentCategory && body.category !== currentCategory
      const alpha = isFiltered ? 0.25 : 1

      ctx.save()
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.arc(body.x, body.y, body.radius, 0, Math.PI * 2)

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

      ctx.strokeStyle = isFiltered ? body.color + '40' : body.color + 'aa'
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.fillStyle = isFiltered ? '#ffffff44' : '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const isMobileRadius = body.radius < 30
      const fontSize = body.radius > 38 ? 11 : body.radius > 28 ? 10 : body.radius > 20 ? 9 : 8
      const fontWeight = isMobileRadius ? '600' : '500'
      ctx.font = `${fontWeight} ${fontSize}px Inter, sans-serif`

      const maxWidth = body.radius * 1.6
      const words = body.name.split(' ')
      if (words.length > 1 && ctx.measureText(body.name).width > maxWidth) {
        const smallerSize = Math.max(fontSize - 1, 7)
        ctx.font = `${fontWeight} ${smallerSize}px Inter, sans-serif`
        const lineSpacing = body.radius > 28 ? 7 : 6
        ctx.fillText(words[0], body.x, body.y - lineSpacing)
        ctx.fillText(words.slice(1).join(' '), body.x, body.y + lineSpacing)
      } else {
        ctx.fillText(body.name, body.x, body.y)
      }
      ctx.restore()
    }

    ctx.restore()
  }, [])

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>

    const updateDimensions = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const w = Math.floor(rect.width)
      const isMobile = w < 640
      const h = isMobile
        ? Math.min(800, Math.max(600, window.innerHeight * 0.85))
        : Math.min(500, Math.max(350, window.innerHeight * 0.45))

      const prevW = dimensionsRef.current.width
      dimensionsRef.current = { width: w, height: h }
      applyCanvasDpr(w, h)

      if (!initializedRef.current) {
        // First initialization
        initBodies(w, h)
      } else if (Math.abs(prevW - w) > 20) {
        // Only reinitialize on significant width change (e.g. orientation change)
        // so mobile URL bar / keyboard changes don't reset bubbles
        initBodies(w, h)
      } else {
        // Minor resize (URL bar, scroll): clamp bodies, don't reset them
        clampBodiesToBounds(w, h)
      }

      setDimensions({ width: w, height: h })
    }

    // Debounce resize to prevent rapid firing on mobile scroll/URL bar animation
    const debouncedUpdate = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateDimensions, 150)
    }

    updateDimensions()
    const ro = new ResizeObserver(debouncedUpdate)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => {
      ro.disconnect()
      clearTimeout(resizeTimer)
    }
  }, [initBodies, clampBodiesToBounds, applyCanvasDpr])

  // Animation loop — stable: simulate and draw never change (no state deps)
  useEffect(() => {
    const loop = () => {
      simulate()
      draw()
      animFrameRef.current = requestAnimationFrame(loop)
    }
    animFrameRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [simulate, draw])

  // Helper: get canvas-space coordinates (CSS px == logical px since we manage size imperatively)
  const getCanvasCoords = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }, [])

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e.clientX, e.clientY)
    if (!coords) return
    const { x, y } = coords

    for (const body of bodiesRef.current) {
      const dx = x - body.x
      const dy = y - body.y
      if (Math.sqrt(dx * dx + dy * dy) < body.radius) {
        body.vy = -8 - Math.random() * 4
        body.vx = (Math.random() - 0.5) * 6
        setSelectedSkill({ ...body })
        return
      }
    }
    setSelectedSkill(null)
  }, [getCanvasCoords])

  const handleCanvasTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return
    e.preventDefault()
    const touch = e.touches[0]
    const coords = getCanvasCoords(touch.clientX, touch.clientY)
    if (!coords) return
    const { x, y } = coords

    for (const body of bodiesRef.current) {
      const dx = x - body.x
      const dy = y - body.y
      if (Math.sqrt(dx * dx + dy * dy) < body.radius) {
        body.vy = -8 - Math.random() * 4
        body.vx = (Math.random() - 0.5) * 6
        setSelectedSkill({ ...body })
        return
      }
    }
    setSelectedSkill(null)
  }, [getCanvasCoords])

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
            onClick={handleCanvasClick}
            onTouchStart={handleCanvasTouch}
            className="cursor-pointer rounded-2xl border border-white/5"
            role="application"
            aria-label="Interactive skills physics simulation. Click bubbles to interact."
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
