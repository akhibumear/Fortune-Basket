import { Vector3, CatmullRomCurve3 } from 'three'

// Create the main investment journey path
export const createInvestmentPath = () => {
  const points = [
    new Vector3(0, 0, 0),          // Start: Beginning of journey
    new Vector3(3, 1, -2),         // First SIP
    new Vector3(1, 3, -5),         // Portfolio growth
    new Vector3(-2, 4, -8),        // Goal achievement
    new Vector3(0, 6, -12),        // Advanced features
    new Vector3(3, 8, -16),        // Success celebration
  ]

  return new CatmullRomCurve3(points, false, 'catmullrom', 0.1)
}

// Milestone positions along the curve (0 to 1)
export const milestonePositions = [
  { t: 0.0, name: 'journey-start', title: 'Start Your Investment Journey' },
  { t: 0.2, name: 'first-sip', title: '₹1,000 First SIP' },
  { t: 0.4, name: 'portfolio-growth', title: '₹50K Portfolio Value' },
  { t: 0.6, name: 'goal-achievement', title: 'Dream Home Goal' },
  { t: 0.8, name: 'advanced-features', title: 'Expert Portfolio Management' },
  { t: 1.0, name: 'success', title: 'Financial Freedom Achieved' },
]

// Interpolate between values
export const lerp = (start, end, factor) => {
  return start + (end - start) * factor
}

// Smooth step function for easing
export const smoothstep = (min, max, value) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
  return x * x * (3 - 2 * x)
}

// Calculate camera position and target along the curve
export const getCameraTransform = (curve, t, offset = { x: 1, y: 1, z: 2 }) => {
  const point = curve.getPoint(t)
  const tangent = curve.getTangent(t)
  
  // Camera position with offset
  const cameraPosition = new Vector3(
    point.x + offset.x,
    point.y + offset.y,
    point.z + offset.z
  )
  
  // Look ahead on the curve
  const lookAtPoint = curve.getPoint(Math.min(1, t + 0.1))
  
  return { position: cameraPosition, target: lookAtPoint }
}

// Generate particle positions around a point
export const generateParticlePositions = (centerPoint, count = 20, radius = 1) => {
  const positions = []
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const r = radius * (0.5 + Math.random() * 0.5)
    const height = (Math.random() - 0.5) * 2
    
    positions.push(
      centerPoint.x + Math.cos(angle) * r,
      centerPoint.y + height,
      centerPoint.z + Math.sin(angle) * r
    )
  }
  
  return new Float32Array(positions)
}

// Animate values over time
export const animateValue = (time, duration = 2, delay = 0) => {
  const t = Math.max(0, (time - delay) / duration)
  return Math.min(1, t)
} 