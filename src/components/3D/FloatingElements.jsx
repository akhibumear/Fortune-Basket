import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FloatingElements = ({ scrollProgress }) => {
  return (
    <>
      {/* Ambient floating coins */}
      <FloatingCoins scrollProgress={scrollProgress} />
      
      {/* Data streams */}
      <DataStreams scrollProgress={scrollProgress} />
      
      {/* Success celebration particles */}
      {scrollProgress > 0.8 && <CelebrationParticles />}
      
      {/* Ambient light orbs */}
      <LightOrbs />
    </>
  )
}

// Floating coin particles
const FloatingCoins = ({ scrollProgress }) => {
  const coinsRef = useRef()
  const coinCount = 30
  
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(coinCount * 3)
    const sizes = new Float32Array(coinCount)
    
    for (let i = 0; i < coinCount; i++) {
      // Distribute coins in a large area around the path
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = Math.random() * -20
      
      sizes[i] = Math.random() * 0.1 + 0.05
    }
    
    return { positions, sizes }
  }, [coinCount])

  useFrame((state) => {
    if (coinsRef.current) {
      const time = state.clock.elapsedTime
      const positions = coinsRef.current.geometry.attributes.position.array
      
      for (let i = 0; i < coinCount; i++) {
        const i3 = i * 3
        
        // Floating motion
        positions[i3 + 1] += Math.sin(time + i) * 0.005
        
        // Slight drift
        positions[i3] += Math.cos(time * 0.5 + i) * 0.002
        positions[i3 + 2] += Math.sin(time * 0.3 + i) * 0.002
        
        // Reset if too far
        if (positions[i3 + 1] > 10) positions[i3 + 1] = -5
        if (positions[i3 + 1] < -10) positions[i3 + 1] = 5
      }
      
      coinsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={coinsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={coinCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={coinCount}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#F59E0B"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        vertexColors={false}
      />
    </points>
  )
}

// Data stream particles representing portfolio data
const DataStreams = ({ scrollProgress }) => {
  const streamRef = useRef()
  const particleCount = 100
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      // Create vertical streams
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = Math.random() * 20 - 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25
    }
    
    return pos
  }, [particleCount])

  useFrame((state) => {
    if (streamRef.current && scrollProgress > 0.3) {
      const time = state.clock.elapsedTime
      const positions = streamRef.current.geometry.attributes.position.array
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        
        // Upward movement
        positions[i3 + 1] += 0.02
        
        // Slight wave motion
        positions[i3] += Math.sin(time + i * 0.1) * 0.001
        
        // Reset when too high
        if (positions[i3 + 1] > 15) {
          positions[i3 + 1] = -10
          positions[i3] = (Math.random() - 0.5) * 15
          positions[i3 + 2] = (Math.random() - 0.5) * 25
        }
      }
      
      streamRef.current.geometry.attributes.position.needsUpdate = true
      
      // Update opacity based on scroll progress
      const material = streamRef.current.material
      material.opacity = Math.min(0.4, (scrollProgress - 0.3) * 2)
    }
  })

  return (
    <points ref={streamRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#3B82F6"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  )
}

// Celebration particles for the final milestone
const CelebrationParticles = () => {
  const celebrationRef = useRef()
  const particleCount = 200
  
  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      // Start from center
      positions[i * 3] = (Math.random() - 0.5) * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2
      positions[i * 3 + 2] = -16 + (Math.random() - 0.5) * 2
      
      // Random velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.1
      velocities[i * 3 + 1] = Math.random() * 0.1
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1
      
      // Gold/orange colors
      const colorType = Math.random()
      if (colorType < 0.5) {
        colors[i * 3] = 1.0     // R
        colors[i * 3 + 1] = 0.84 // G
        colors[i * 3 + 2] = 0.0  // B
      } else {
        colors[i * 3] = 0.98    // R
        colors[i * 3 + 1] = 0.45 // G
        colors[i * 3 + 2] = 0.09 // B
      }
    }
    
    return { positions, velocities, colors }
  }, [particleCount])

  useFrame(() => {
    if (celebrationRef.current) {
      const positions = celebrationRef.current.geometry.attributes.position.array
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        
        // Apply velocities
        positions[i3] += velocities[i3]
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2]
        
        // Gravity
        velocities[i3 + 1] -= 0.001
        
        // Reset if fallen too far
        if (positions[i3 + 1] < -20) {
          positions[i3] = (Math.random() - 0.5) * 2
          positions[i3 + 1] = 5
          positions[i3 + 2] = -16 + (Math.random() - 0.5) * 2
          
          velocities[i3] = (Math.random() - 0.5) * 0.1
          velocities[i3 + 1] = Math.random() * 0.1
          velocities[i3 + 2] = (Math.random() - 0.5) * 0.1
        }
      }
      
      celebrationRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={celebrationRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        transparent
        opacity={0.8}
        vertexColors
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  )
}

// Ambient light orbs
const LightOrbs = () => {
  const orbsRef = useRef()
  const orbCount = 15
  
  const positions = useMemo(() => {
    const pos = new Float32Array(orbCount * 3)
    
    for (let i = 0; i < orbCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = Math.random() * -30
    }
    
    return pos
  }, [orbCount])

  useFrame((state) => {
    if (orbsRef.current) {
      const time = state.clock.elapsedTime
      orbsRef.current.rotation.y = time * 0.1
      
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.1
      orbsRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group ref={orbsRef}>
      {Array.from({ length: orbCount }, (_, i) => (
        <mesh
          key={i}
          position={[
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2]
          ]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#F97316" : "#F59E0B"}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

export default FloatingElements 