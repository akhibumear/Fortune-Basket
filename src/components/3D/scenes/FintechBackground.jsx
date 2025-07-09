import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// Financial Chart Component
const FloatingChart = ({ position, scale = 1, delay = 0 }) => {
  const meshRef = useRef()
  
  // Generate stock chart data points
  const chartPoints = useMemo(() => {
    const points = []
    for (let i = 0; i < 20; i++) {
      const x = (i - 10) * 0.2
      const y = Math.sin(i * 0.3) * 0.5 + Math.random() * 0.3
      points.push(new THREE.Vector3(x, y, 0))
    }
    return points
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.2
    }
  })

  return (
    <Float speed={1 + delay * 0.5} rotationIntensity={0.2}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Chart Background */}
        <mesh>
          <planeGeometry args={[4, 2]} />
          <meshStandardMaterial 
            color="#1e293b" 
            transparent 
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Chart Lines */}
        {chartPoints.map((point, i) => (
          i < chartPoints.length - 1 && (
            <group key={i}>
              <mesh position={[point.x, point.y, 0.01]}>
                <sphereGeometry args={[0.02]} />
                <meshStandardMaterial 
                  color="#10b981" 
                  emissive="#10b981"
                  emissiveIntensity={0.3}
                />
              </mesh>
              {/* Connection lines */}
              <mesh 
                position={[
                  (point.x + chartPoints[i + 1].x) / 2,
                  (point.y + chartPoints[i + 1].y) / 2,
                  0.01
                ]}
                rotation={[0, 0, Math.atan2(
                  chartPoints[i + 1].y - point.y,
                  chartPoints[i + 1].x - point.x
                )]}
              >
                <cylinderGeometry args={[0.01, 0.01, point.distanceTo(chartPoints[i + 1])]} />
                <meshStandardMaterial 
                  color="#10b981" 
                  emissive="#10b981"
                  emissiveIntensity={0.2}
                />
              </mesh>
            </group>
          )
        ))}
      </group>
    </Float>
  )
}

// Currency Symbol Component
const CurrencySymbol = ({ position, symbol, color = "#f59e0b", delay = 0 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + delay
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + delay) * 0.3
    }
  })

  return (
    <Float speed={1.5 + delay * 0.3} rotationIntensity={0.4}>
      <Text
        ref={meshRef}
        position={position}
        fontSize={0.8}
        color={color}
        anchorX="center"
        anchorY="middle"
        emissive={color}
        emissiveIntensity={0.2}
      >
        {symbol}
      </Text>
    </Float>
  )
}

// Financial Data Stream Component
const DataStream = ({ position, direction = 1 }) => {
  const groupRef = useRef()
  
  const dataPoints = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      value: (Math.random() * 1000).toFixed(2),
      x: (i - 15) * 0.3,
      delay: i * 0.1
    }))
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {dataPoints.map((point, i) => (
        <Float key={point.id} speed={0.8 + point.delay} rotationIntensity={0.1}>
          <Text
            position={[point.x, Math.sin(i * 0.5) * 0.2, 0]}
            fontSize={0.15}
            color="#64748b"
            anchorX="center"
            anchorY="middle"
            transparent
            opacity={0.6}
          >
            {point.value}
          </Text>
        </Float>
      ))}
    </group>
  )
}

// Market Grid Component
const MarketGrid = () => {
  const gridRef = useRef()

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -2]}>
      <planeGeometry args={[50, 50, 20, 20]} />
      <meshStandardMaterial 
        color="#3b82f6"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  )
}

// Performance Indicators
const PerformanceIndicator = ({ position, value, trend = "up", delay = 0 }) => {
  const meshRef = useRef()
  const trendColor = trend === "up" ? "#10b981" : "#ef4444"

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + delay) * 0.1
    }
  })

  return (
    <Float speed={1.2 + delay * 0.2} rotationIntensity={0.3}>
      <group ref={meshRef} position={position}>
        {/* Value Display */}
        <Text
          fontSize={0.3}
          color={trendColor}
          anchorX="center"
          anchorY="center"
          emissive={trendColor}
          emissiveIntensity={0.1}
        >
          {value}
        </Text>
        
        {/* Trend Arrow */}
        <mesh position={[0, trend === "up" ? 0.3 : -0.3, 0]}>
          <coneGeometry args={[0.05, 0.2]} />
          <meshStandardMaterial 
            color={trendColor}
            emissive={trendColor}
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Main Scene Component
const Scene = () => {
  const { viewport } = useThree()
  const isMobile = viewport.width < 6

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#f59e0b" />

      {/* Environment */}
      <Environment preset="night" />

      {/* Market Grid */}
      <MarketGrid />

      {/* Floating Charts */}
      <FloatingChart position={[-6, 2, -4]} scale={0.6} delay={0} />
      <FloatingChart position={[7, -1, -5]} scale={0.8} delay={1.5} />
      <FloatingChart position={[-3, -3, -6]} scale={0.5} delay={3} />

      {/* Currency Symbols */}
      <CurrencySymbol position={[-8, 1, -3]} symbol="₹" color="#f59e0b" delay={0} />
      <CurrencySymbol position={[6, 3, -4]} symbol="$" color="#10b981" delay={1} />
      <CurrencySymbol position={[3, -2, -5]} symbol="€" color="#3b82f6" delay={2} />
      <CurrencySymbol position={[-5, -1, -7]} symbol="£" color="#8b5cf6" delay={3} />

      {/* Performance Indicators */}
      <PerformanceIndicator position={[-4, 3, -3]} value="+12.5%" trend="up" delay={0} />
      <PerformanceIndicator position={[5, 1, -4]} value="+8.2%" trend="up" delay={1} />
      <PerformanceIndicator position={[2, 4, -5]} value="+15.7%" trend="up" delay={2} />
      <PerformanceIndicator position={[-7, -2, -6]} value="+22.1%" trend="up" delay={3} />

      {/* Data Streams */}
      {!isMobile && (
        <>
          <DataStream position={[0, 1, -8]} direction={1} />
          <DataStream position={[0, -1, -9]} direction={-1} />
        </>
      )}

      {/* Subtle Background Particles */}
      <Sparkles 
        count={isMobile ? 30 : 60}
        scale={20}
        size={0.5}
        speed={0.1}
        color="#64748b"
        opacity={0.3}
      />

      {/* Investment Growth Visualization */}
      <Float speed={0.5} rotationIntensity={0.1}>
        <group position={[0, 0, -10]}>
          {[...Array(5)].map((_, i) => (
            <mesh 
              key={i}
              position={[i * 2 - 4, i * 0.5 - 1, 0]}
            >
              <cylinderGeometry args={[0.1, 0.1, 1 + i * 0.5]} />
              <meshStandardMaterial 
                color="#10b981"
                emissive="#10b981"
                emissiveIntensity={0.1}
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </>
  )
}

// Camera Controller for subtle movement
const CameraController = () => {
  const { camera } = useThree()
  
  useFrame((state) => {
    // Very subtle camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.5
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.08) * 0.3
    camera.lookAt(0, 0, -5)
  })

  return null
}

// Main FintechBackground Component
const FintechBackground = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ 
          position: [0, 0, 5],
          fov: 60
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <CameraController />
        <Scene />
      </Canvas>
    </div>
  )
}

export default FintechBackground 