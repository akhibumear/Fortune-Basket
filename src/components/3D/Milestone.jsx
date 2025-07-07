import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Text } from '@react-three/drei'
import { createInvestmentPath } from '../../utils/mathHelpers'
import * as THREE from 'three'

const Milestone = ({ position, data, isActive, scrollProgress }) => {
  const groupRef = useRef()
  const sphereRef = useRef()
  const glowRef = useRef()
  
  // Get the curve to position milestone
  const curve = useMemo(() => createInvestmentPath(), [])
  
  // Calculate milestone position on curve
  const milestonePosition = useMemo(() => {
    return curve.getPoint(position)
  }, [curve, position])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (groupRef.current) {
      // Float animation
      groupRef.current.position.y = milestonePosition.y + Math.sin(time + position * 5) * 0.1
      
      // Rotation animation
      groupRef.current.rotation.y = time * 0.5
    }
    
    if (sphereRef.current) {
      // Scale animation when active
      const targetScale = isActive ? 1.2 : 1.0
      sphereRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
    
    if (glowRef.current) {
      // Glow intensity animation
      const material = glowRef.current.material
      material.opacity = isActive ? 0.3 + Math.sin(time * 3) * 0.1 : 0.1
    }
  })

  // Different milestone types have different 3D representations
  const getMilestoneGeometry = () => {
    switch(position) {
      case 0.0: // Journey Start
        return <octahedronGeometry args={[0.3, 0]} />
      case 0.2: // First SIP
        return <sphereGeometry args={[0.25, 16, 16]} />
      case 0.4: // Portfolio Growth
        return <boxGeometry args={[0.4, 0.4, 0.4]} />
      case 0.6: // Goal Achievement (House)
        return <coneGeometry args={[0.3, 0.5, 6]} />
      case 0.8: // Advanced Features
        return <icosahedronGeometry args={[0.3, 0]} />
      case 1.0: // Success
        return <dodecahedronGeometry args={[0.35, 0]} />
      default:
        return <sphereGeometry args={[0.25, 16, 16]} />
    }
  }

  const getMilestoneIcon = () => {
    switch(position) {
      case 0.0: return "🚀"
      case 0.2: return "💰"
      case 0.4: return "📈"
      case 0.6: return "🏠"
      case 0.8: return "🤖"
      case 1.0: return "🏆"
      default: return "⭐"
    }
  }

  return (
    <group 
      ref={groupRef}
      position={[milestonePosition.x, milestonePosition.y, milestonePosition.z]}
    >
      {/* Main milestone sphere */}
      <mesh ref={sphereRef}>
        {getMilestoneGeometry()}
        <meshStandardMaterial 
          color={data.color}
          emissive={data.color}
          emissiveIntensity={isActive ? 0.3 : 0.1}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh ref={glowRef} scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial 
          color={data.color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Particles around milestone */}
      <MilestoneParticles color={data.color} isActive={isActive} />
      
      {/* 3D Text label when active */}
      {isActive && (
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {getMilestoneIcon()}
        </Text>
      )}
      
      {/* HTML overlay for detailed info */}
      {isActive && (
        <Html
          center
          distanceFactor={10}
          position={[0, -0.8, 0]}
          style={{
            transition: 'all 0.3s',
            opacity: isActive ? 1 : 0,
            transform: `scale(${isActive ? 1 : 0.5})`,
          }}
        >
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-center min-w-32">
            <div className="text-2xl mb-1">{getMilestoneIcon()}</div>
            <div className="text-sm font-semibold">{data.title.split(' ').slice(-2).join(' ')}</div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Floating particles around each milestone
const MilestoneParticles = ({ color, isActive }) => {
  const particlesRef = useRef()
  const particleCount = 20
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      // Random spherical distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 0.5 + Math.random() * 0.5
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
    }
    return pos
  }, [particleCount])

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime
      const positions = particlesRef.current.geometry.attributes.position.array
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const originalX = positions[i3]
        const originalY = positions[i3 + 1]
        const originalZ = positions[i3 + 2]
        
        // Orbital motion
        const angle = time * 0.5 + i * 0.1
        const radius = Math.sqrt(originalX * originalX + originalZ * originalZ)
        
        positions[i3] = Math.cos(angle) * radius
        positions[i3 + 1] = originalY + Math.sin(time + i) * 0.1
        positions[i3 + 2] = Math.sin(angle) * radius
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
      
      // Update opacity based on active state
      const material = particlesRef.current.material
      material.opacity = isActive ? 0.8 : 0.3
    }
  })

  return (
    <points ref={particlesRef}>
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
        color={color}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  )
}

export default Milestone 