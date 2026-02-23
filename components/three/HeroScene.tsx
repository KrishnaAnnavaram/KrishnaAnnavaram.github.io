'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { GradientFallback } from './GradientFallback'
import { isBrowser, checkWebGLSupport } from '@/lib/utils'

function NeuralMesh({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const vertexShader = `
    uniform float u_time;
    uniform float u_scroll;
    varying vec3 vNormal;
    varying vec3 vPosition;

    float noise(vec3 p) {
      return sin(p.x * 3.0 + u_time) * sin(p.y * 2.5 + u_time * 0.8) * sin(p.z * 2.0 + u_time * 1.2);
    }

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec3 pos = position;

      // Neural firing displacement
      float displacement = noise(pos * 1.5 + vec3(u_time * 0.3)) * 0.15;
      displacement += noise(pos * 3.0 - vec3(u_time * 0.2)) * 0.05;

      // Scroll compression
      pos.y *= (1.0 - u_scroll * 0.5);
      pos.x *= (1.0 + u_scroll * 0.3);

      pos += normal * displacement;
      vPosition = pos;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
    uniform float u_time;
    uniform float u_scroll;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 indigo = vec3(0.388, 0.400, 0.945);
      vec3 violet = vec3(0.545, 0.361, 0.965);
      vec3 cyan = vec3(0.024, 0.714, 0.831);

      float t = sin(vPosition.y * 2.0 + u_time * 0.5) * 0.5 + 0.5;
      float t2 = u_scroll;

      vec3 color = mix(indigo, violet, t);
      color = mix(color, cyan, t2 * 0.3);

      // Fresnel rim
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
      color += cyan * fresnel * 0.5;

      float alpha = 0.6 + fresnel * 0.4;
      gl_FragColor = vec4(color, alpha);
    }
  `

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.003
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1

    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime
      materialRef.current.uniforms.u_scroll.value = scrollProgress
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.4, 4]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_time: { value: 0 },
          u_scroll: { value: 0 },
        }}
        transparent
        wireframe={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function WireframeMesh({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.003
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    meshRef.current.scale.setScalar(1.0 - scrollProgress * 0.3)
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.55, 2]} />
      <meshBasicMaterial
        color="#6366f1"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 300

  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    const r = 2.2 + Math.random() * 2.5

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.cos(phi)
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

    velocities[i * 3] = (Math.random() - 0.5) * 0.002
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002

    const speed = Math.sqrt(velocities[i*3]**2 + velocities[i*3+1]**2 + velocities[i*3+2]**2)
    // indigo to cyan based on speed
    const t = speed / 0.003
    colors[i * 3] = 0.388 + t * (0.024 - 0.388)
    colors[i * 3 + 1] = 0.400 + t * (0.714 - 0.400)
    colors[i * 3 + 2] = 0.945 + t * (0.831 - 0.945)
  }

  const bufferGeometry = new THREE.BufferGeometry()
  bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += 0.001
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
  })

  return (
    <points ref={pointsRef} geometry={bufferGeometry}>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
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
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(Math.min(window.devicePixelRatio, 2))} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
          <pointLight position={[-10, -5, -5]} intensity={0.5} color="#06b6d4" />
          <NeuralMesh scrollProgress={scrollProgress} />
          <WireframeMesh scrollProgress={scrollProgress} />
          <ParticleField />
          <CameraRig />
          <EffectComposer>
            <Bloom
              intensity={0.4}
              luminanceThreshold={0.6}
              luminanceSmoothing={0.9}
            />
            <Vignette eskil={false} offset={0.1} darkness={0.5} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
