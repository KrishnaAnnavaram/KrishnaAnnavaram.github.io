'use client'

import { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { GradientFallback } from './GradientFallback'
import { isBrowser, checkWebGLSupport } from '@/lib/utils'

// Torus knot — the centerpiece
function TorusKnot({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.25
    groupRef.current.rotation.x = state.clock.elapsedTime * 0.12
    groupRef.current.scale.setScalar(1.0 - scrollProgress * 0.35)

    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        0.4 + Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Solid torus knot */}
      <mesh>
        <torusKnotGeometry args={[1.0, 0.3, 200, 24, 3, 2]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#6366f1"
          emissive="#4f46e5"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Cyan wireframe overlay */}
      <mesh>
        <torusKnotGeometry args={[1.0, 0.3, 100, 12, 3, 2]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

// Small glowing spheres orbiting around the knot in 3D
function OrbitalNodes() {
  const groupRef = useRef<THREE.Group>(null)

  const nodes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        radius: 2.1 + (i % 3) * 0.5,
        speed: 0.3 + i * 0.07,
        theta: (i / 8) * Math.PI * 2,
        phi: (i / 8) * Math.PI,
        size: 0.06 + (i % 3) * 0.025,
        color: i % 2 === 0 ? '#6366f1' : '#06b6d4',
      })),
    []
  )

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const node = nodes[i]
      const t = state.clock.elapsedTime * node.speed + node.theta
      child.position.x = node.radius * Math.sin(t) * Math.cos(node.phi)
      child.position.y = node.radius * Math.sin(node.phi + t * 0.3) * 0.7
      child.position.z = node.radius * Math.cos(t)
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.3
      child.scale.setScalar(pulse)
    })
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i}>
          <sphereGeometry args={[node.size, 8, 8]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  )
}

// Background particle cloud
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 400

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.8 + Math.random() * 3.0

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      const t = Math.random()
      colors[i * 3] = 0.388 + t * (0.024 - 0.388)
      colors[i * 3 + 1] = 0.4 + t * (0.714 - 0.4)
      colors[i * 3 + 2] = 0.945 + t * (0.831 - 0.945)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return geo
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += 0.0008
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.65} sizeAttenuation />
    </points>
  )
}

function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.05
    camera.position.y += (mouse.current.y * 0.3 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })

  return null
}

interface HeroSceneProps {
  scrollProgress: number
}

export function HeroScene({ scrollProgress }: HeroSceneProps) {
  const [dpr, setDpr] = useState(1)
  const glSupport = isBrowser() ? checkWebGLSupport() : 'none'

  if (glSupport === 'none') {
    return <GradientFallback />
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 60 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(Math.min(window.devicePixelRatio, 2))}
        />
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
          <pointLight position={[-10, -5, -5]} intensity={0.8} color="#06b6d4" />
          <pointLight position={[0, -10, 5]} intensity={0.4} color="#8b5cf6" />
          <TorusKnot scrollProgress={scrollProgress} />
          <OrbitalNodes />
          <ParticleField />
          <CameraRig />
          <EffectComposer>
            <Bloom intensity={0.8} luminanceThreshold={0.4} luminanceSmoothing={0.9} />
            <Vignette eskil={false} offset={0.1} darkness={0.5} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
