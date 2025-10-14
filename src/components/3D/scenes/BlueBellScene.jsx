import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Blue Bell Flower Component
const BlueBell = ({ position, scale = 1, delay = 0 }) => {
  const groupRef = useRef()
  const petalRefs = useRef([])

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle swaying animation
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.2
    }

    // Petal breathing animation
    petalRefs.current.forEach((petal, i) => {
      if (petal) {
        const breathe = Math.sin(state.clock.elapsedTime * 0.8 + delay + i * 0.3) * 0.05 + 1
        petal.scale.setScalar(breathe)
      }
    })
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Bell flower shape - multiple petals forming a bell */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const x = Math.cos(angle) * 0.3
        const z = Math.sin(angle) * 0.3
        
        return (
          <mesh
            key={i}
            ref={(el) => (petalRefs.current[i] = el)}
            position={[x, 0, z]}
            rotation={[Math.PI / 4, angle, 0]}
          >
            <sphereGeometry args={[0.4, 16, 16, 0, Math.PI]} />
            <meshStandardMaterial
              color="#4F46E5"
              emissive="#3730A3"
              emissiveIntensity={0.3}
              metalness={0.3}
              roughness={0.4}
              transparent
              opacity={0.85}
            />
          </mesh>
        )
      })}

      {/* Bell center/pistil */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
        <meshStandardMaterial
          color="#FCD34D"
          emissive="#F59E0B"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Pollen particles */}
      {[...Array(5)].map((_, i) => (
        <mesh key={`pollen-${i}`} position={[
          (Math.random() - 0.5) * 0.2,
          -0.5 + Math.random() * 0.2,
          (Math.random() - 0.5) * 0.2
        ]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#FCD34D"
            emissive="#FBBF24"
            emissiveIntensity={1}
          />
        </mesh>
      ))}

      {/* Stem */}
      <mesh position={[0, -1, 0]} rotation={[0, 0, Math.sin(delay) * 0.1]}>
        <cylinderGeometry args={[0.03, 0.05, 1.5, 8]} />
        <meshStandardMaterial color="#10B981" roughness={0.8} />
      </mesh>

      {/* Leaves */}
      <mesh position={[-0.2, -1, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.4, 0.1, 0.15]} />
        <meshStandardMaterial color="#059669" roughness={0.7} />
      </mesh>
      <mesh position={[0.2, -1.3, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.4, 0.1, 0.15]} />
        <meshStandardMaterial color="#059669" roughness={0.7} />
      </mesh>
    </group>
  )
}

// Golden Coin Component
const GoldenCoin = ({ position, delay = 0 }) => {
  const coinRef = useRef()

  useFrame((state) => {
    if (coinRef.current) {
      coinRef.current.rotation.y = state.clock.elapsedTime + delay
      coinRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.3
    }
  })

  return (
    <mesh ref={coinRef} position={position}>
      <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
      <meshStandardMaterial
        color="#FCD34D"
        emissive="#F59E0B"
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  )
}

// Prosperity Orb Component
const ProsperityOrb = ({ position, color, delay = 0 }) => {
  const orbRef = useRef()

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x = state.clock.elapsedTime * 0.3 + delay
      orbRef.current.rotation.y = state.clock.elapsedTime * 0.2 + delay
    }
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[-0.5, 0.5]}
    >
      <mesh ref={orbRef} position={position}>
        <icosahedronGeometry args={[0.4, 1]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  )
}

// Particle Ring
const ParticleRing = ({ radius = 5, count = 50, color = '#60A5FA' }) => {
  const particlesRef = useRef()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = (Math.random() - 0.5) * 2
      temp.push({ position: [x, y, z], scale: Math.random() * 0.5 + 0.5 })
    }
    return temp
  }, [count, radius])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

// Main Scene Component
const BlueBellScene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#DBEAFE" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C7D2FE" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#BFDBFE"
        castShadow
      />

      {/* Blue Bell Flowers - arranged in a garden */}
      <BlueBell position={[-2, 0, -2]} scale={1.2} delay={0} />
      <BlueBell position={[2, -0.5, -1]} scale={1} delay={1} />
      <BlueBell position={[0, 0.3, -3]} scale={1.3} delay={2} />
      <BlueBell position={[-3, -0.2, 0]} scale={0.9} delay={1.5} />
      <BlueBell position={[3, 0.5, -3]} scale={1.1} delay={0.5} />
      <BlueBell position={[1, -0.3, 1]} scale={0.8} delay={2.5} />
      <BlueBell position={[-1.5, 0.2, -1]} scale={1} delay={1.2} />

      {/* Golden Coins - floating around */}
      <GoldenCoin position={[-3, 2, 0]} delay={0} />
      <GoldenCoin position={[3, 1.5, -2]} delay={1} />
      <GoldenCoin position={[0, 2.5, -1]} delay={2} />
      <GoldenCoin position={[2, 1, 1]} delay={1.5} />
      <GoldenCoin position={[-2, 1.8, -3]} delay={0.8} />

      {/* Prosperity Orbs */}
      <ProsperityOrb position={[-4, 1, -1]} color="#60A5FA" delay={0} />
      <ProsperityOrb position={[4, 0.5, -2]} color="#818CF8" delay={1} />
      <ProsperityOrb position={[0, 3, -2]} color="#A78BFA" delay={2} />
      <ProsperityOrb position={[-2, 2, 2]} color="#93C5FD" delay={1.5} />

      {/* Particle Rings */}
      <ParticleRing radius={6} count={40} color="#60A5FA" />
      <ParticleRing radius={7.5} count={30} color="#818CF8" />

      {/* Central Glowing Sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.8, 32, 32]} position={[0, 0, -5]}>
          <MeshDistortMaterial
            color="#3B82F6"
            emissive="#2563EB"
            emissiveIntensity={0.6}
            distort={0.4}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.7}
          />
        </Sphere>
      </Float>

      {/* Subtle Camera Controls (optional) */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2.5}
      />
    </>
  )
}

export default BlueBellScene

