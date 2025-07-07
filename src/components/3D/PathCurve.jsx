import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { createInvestmentPath, getCameraTransform } from '../../utils/mathHelpers'
import * as THREE from 'three'

const PathCurve = ({ scrollProgress }) => {
  const pathRef = useRef()
  const cameraHelperRef = useRef()
  
  // Create the curve once
  const curve = useMemo(() => createInvestmentPath(), [])
  
  // Create tube geometry from the curve
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 100, 0.05, 8, false)
  }, [curve])

  // Animate the path material based on scroll progress
  useFrame((state) => {
    if (pathRef.current) {
      // Update path material animation
      const material = pathRef.current.material
      material.uniforms.time.value = state.clock.elapsedTime
      material.uniforms.progress.value = scrollProgress
    }

    // Update camera position based on scroll
    const cameraTransform = getCameraTransform(curve, scrollProgress, { x: 2, y: 1, z: 3 })
    state.camera.position.lerp(cameraTransform.position, 0.1)
    state.camera.lookAt(cameraTransform.target)
  })

  // Custom shader material for the path
  const pathMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        colorStart: { value: new THREE.Color('#F97316') }, // Orange
        colorEnd: { value: new THREE.Color('#FCD34D') },   // Yellow
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vProgress;
        uniform float progress;
        
        void main() {
          vUv = uv;
          vProgress = progress;
          
          vec3 pos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float progress;
        uniform vec3 colorStart;
        uniform vec3 colorEnd;
        varying vec2 vUv;
        varying float vProgress;
        
        void main() {
          // Create gradient along the tube
          float gradientFactor = vUv.x;
          
          // Add glow effect
          float glow = 1.0 - abs(vUv.y - 0.5) * 2.0;
          glow = pow(glow, 2.0);
          
          // Progress-based coloring
          float progressGlow = smoothstep(gradientFactor - 0.1, gradientFactor + 0.1, progress);
          
          // Mix colors
          vec3 color = mix(colorStart, colorEnd, gradientFactor);
          color = mix(color * 0.3, color, progressGlow);
          
          // Add pulsing effect
          float pulse = sin(time * 2.0 + gradientFactor * 10.0) * 0.1 + 0.9;
          
          gl_FragColor = vec4(color * glow * pulse, 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  return (
    <group>
      {/* Main path tube */}
      <mesh ref={pathRef} geometry={tubeGeometry} material={pathMaterial} />
      
      {/* Path outline/glow */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial 
          color="#F97316" 
          transparent 
          opacity={0.2} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Path particles */}
      <PathParticles curve={curve} scrollProgress={scrollProgress} />
    </group>
  )
}

// Particles that move along the path
const PathParticles = ({ curve, scrollProgress }) => {
  const particlesRef = useRef()
  const particleCount = 50
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount
      const point = curve.getPoint(t)
      
      positions[i * 3] = point.x
      positions[i * 3 + 1] = point.y
      positions[i * 3 + 2] = point.z
      
      // Orange to yellow gradient
      colors[i * 3] = THREE.MathUtils.lerp(0.98, 1.0, t)     // R
      colors[i * 3 + 1] = THREE.MathUtils.lerp(0.45, 0.83, t) // G
      colors[i * 3 + 2] = THREE.MathUtils.lerp(0.09, 0.30, t) // B
    }
    
    return { positions, colors }
  }, [curve, particleCount])

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array
      
      for (let i = 0; i < particleCount; i++) {
        // Calculate particle position along curve
        let t = (i / particleCount + scrollProgress * 2) % 1
        const point = curve.getPoint(t)
        
        // Add some random movement
        const time = state.clock.elapsedTime
        const offset = Math.sin(time + i) * 0.1
        
        positions[i * 3] = point.x + offset
        positions[i * 3 + 1] = point.y + Math.cos(time + i) * 0.05
        positions[i * 3 + 2] = point.z + offset * 0.5
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
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
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        transparent
        opacity={0.8}
        vertexColors
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  )
}

export default PathCurve 