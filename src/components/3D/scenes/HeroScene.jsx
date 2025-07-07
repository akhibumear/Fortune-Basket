import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, 
  Text, 
  Sphere, 
  Box, 
  Cylinder,
  OrbitControls,
  Environment,
  Sparkles,
  Html
} from '@react-three/drei'
// Removed framer-motion-3d import as it doesn't exist
import * as THREE from 'three'

// Floating Investment Portfolio Visualization
const PortfolioSphere = ({ position, color, scale = 1, speed = 1 }) => {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed * 0.5
      meshRef.current.rotation.y += delta * speed * 0.3
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.01
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
        <Sparkles 
          count={20} 
          scale={3} 
          size={2} 
          speed={0.5}
          color={color}
        />
      </mesh>
    </Float>
  )
}

// Advanced Chart Visualization
const ChartBars = ({ position }) => {
  const heights = [1, 2.5, 3.8, 2.1, 4.2, 3.5, 5.0]
  const colors = ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#f97316', '#fb923c', '#fdba74']

  return (
    <group position={position}>
      {heights.map((height, index) => (
        <Float key={index} speed={1 + index * 0.2}>
          <Box
            position={[(index - 3) * 0.8, height / 2, 0]}
            args={[0.5, height, 0.5]}
          >
            <meshStandardMaterial 
              color={colors[index]}
              metalness={0.6}
              roughness={0.3}
            />
          </Box>
        </Float>
      ))}
    </group>
  )
}

// Floating Coins Animation
const FloatingCoin = ({ position, delay = 0 }) => {
  const coinRef = useRef()
  
  useFrame((state) => {
    if (coinRef.current) {
      const time = state.clock.elapsedTime + delay
      coinRef.current.rotation.y = time * 2
      coinRef.current.position.y = position[1] + Math.sin(time) * 0.5
    }
  })

  return (
    <mesh ref={coinRef} position={position}>
      <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
      <meshStandardMaterial 
        color="#fbbf24"
        metalness={0.9}
        roughness={0.1}
      />
      <Html center>
        <div className="text-white text-xs font-bold bg-black/20 rounded px-2 py-1">
          ₹
        </div>
      </Html>
    </mesh>
  )
}

// Particle Ring System
const ParticleRing = ({ radius = 5, count = 50 }) => {
  const points = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      temp.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 0.5,
          Math.sin(angle) * radius
        )
      )
    }
    return temp
  }, [count, radius])

  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={meshRef}>
      {points.map((point, index) => (
        <Float key={index} speed={2 + index * 0.1}>
          <Sphere position={point} args={[0.02]}>
            <meshStandardMaterial 
              color="#f97316"
              emissive="#f97316"
              emissiveIntensity={0.2}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

// Main Scene Component
const Scene = () => {
  const { viewport } = useThree()
  const isMobile = viewport.width < 6

  return (
    <>
      {/* Ambient Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#f97316" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

      {/* Environment */}
      <Environment preset="night" />

      {/* Portfolio Spheres */}
      <PortfolioSphere 
        position={[-3, 2, -2]} 
        color="#3b82f6" 
        scale={isMobile ? 0.5 : 0.8}
        speed={1.2}
      />
      <PortfolioSphere 
        position={[4, -1, -1]} 
        color="#10b981" 
        scale={isMobile ? 0.4 : 0.6}
        speed={0.8}
      />
      <PortfolioSphere 
        position={[2, 3, -3]} 
        color="#f59e0b" 
        scale={isMobile ? 0.3 : 0.5}
        speed={1.5}
      />

      {/* Chart Visualization */}
      {!isMobile && (
        <ChartBars position={[-2, -2, -2]} />
      )}

      {/* Floating Coins */}
      <FloatingCoin position={[3, 1, 1]} delay={0} />
      <FloatingCoin position={[-1, 2, 2]} delay={1} />
      <FloatingCoin position={[1, -1, 3]} delay={2} />

      {/* Particle Ring */}
      <ParticleRing radius={isMobile ? 3 : 6} count={isMobile ? 30 : 60} />

      {/* 3D Text */}
      <Float speed={0.5}>
        <Text
          position={[0, 0, -4]}
          fontSize={isMobile ? 0.5 : 1}
          color="#f97316"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          Fortune Basket
        </Text>
      </Float>

      {/* Investment Flow Lines */}
      <group>
        {[...Array(5)].map((_, i) => (
          <Float key={i} speed={1 + i * 0.3}>
            <Box
              position={[
                Math.sin(i * 2) * 4,
                Math.cos(i * 1.5) * 2,
                -5 + i * 0.5
              ]}
              args={[0.1, 0.1, 2]}
            >
              <meshStandardMaterial 
                color="#f97316"
                transparent
                opacity={0.6}
              />
            </Box>
          </Float>
        ))}
      </group>

      {/* Background Sparkles */}
      <Sparkles 
        count={isMobile ? 50 : 100}
        scale={10}
        size={1}
        speed={0.3}
        color="#f97316"
      />
    </>
  )
}

// Camera Controller
const CameraController = () => {
  const { camera } = useThree()
  
  useFrame((state) => {
    // Subtle camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.3
    camera.lookAt(0, 0, 0)
  })

  return null
}

// Main HeroScene Component
const HeroScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ 
          position: [0, 0, 8],
          fov: 50
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <CameraController />
        <Scene />
        
        {/* Controls for desktop */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

export default HeroScene 