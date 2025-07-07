import { useState, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Hook for managing 3D animation states
export const use3DAnimation = (duration = 2, delay = 0, autoPlay = true) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const startTimeRef = useRef(null)

  const start = () => {
    setIsPlaying(true)
    setProgress(0)
    setIsComplete(false)
    startTimeRef.current = null
  }

  const pause = () => {
    setIsPlaying(false)
  }

  const reset = () => {
    setIsPlaying(false)
    setProgress(0)
    setIsComplete(false)
    startTimeRef.current = null
  }

  useFrame((state) => {
    if (!isPlaying || isComplete) return

    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime - delay
    }

    const elapsed = state.clock.elapsedTime - startTimeRef.current - delay
    
    if (elapsed < 0) return

    const newProgress = Math.min(elapsed / duration, 1)
    setProgress(newProgress)

    if (newProgress >= 1) {
      setIsComplete(true)
      setIsPlaying(false)
    }
  })

  return {
    progress,
    isPlaying,
    isComplete,
    start,
    pause,
    reset
  }
}

// Hook for spring-based animations
export const useSpringAnimation = (target, stiffness = 100, damping = 10) => {
  const [current, setCurrent] = useState(0)
  const velocityRef = useRef(0)

  useFrame((state, delta) => {
    const force = (target - current) * stiffness
    const dampingForce = velocityRef.current * damping
    
    velocityRef.current += (force - dampingForce) * delta
    setCurrent(prev => prev + velocityRef.current * delta)
  })

  return current
}

// Hook for easing animations
export const useEasingAnimation = (from, to, progress, easingFunction = 'easeInOutCubic') => {
  const easingFunctions = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => (--t) * t * t + 1,
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInQuart: (t) => t * t * t * t,
    easeOutQuart: (t) => 1 - (--t) * t * t * t,
    easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    easeInElastic: (t) => {
      const c4 = (2 * Math.PI) / 3
      return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
    },
    easeOutElastic: (t) => {
      const c4 = (2 * Math.PI) / 3
      return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
    }
  }

  const easing = easingFunctions[easingFunction] || easingFunctions.easeInOutCubic
  const easedProgress = easing(Math.max(0, Math.min(1, progress)))
  
  return from + (to - from) * easedProgress
}

// Hook for rotation animations
export const useRotationAnimation = (speed = 1, axis = 'y') => {
  const [rotation, setRotation] = useState(0)

  useFrame((state) => {
    setRotation(state.clock.elapsedTime * speed)
  })

  switch (axis) {
    case 'x':
      return [rotation, 0, 0]
    case 'y':
      return [0, rotation, 0]
    case 'z':
      return [0, 0, rotation]
    default:
      return [0, rotation, 0]
  }
}

// Hook for floating animations
export const useFloatAnimation = (amplitude = 0.5, frequency = 1, offset = 0) => {
  const [position, setPosition] = useState(0)

  useFrame((state) => {
    const y = Math.sin(state.clock.elapsedTime * frequency + offset) * amplitude
    setPosition(y)
  })

  return position
} 