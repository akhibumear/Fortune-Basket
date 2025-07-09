import { useState, useEffect, useRef } from 'react'

const useCountUp = (end, duration = 2000, start = 0, isInView = true) => {
  const [count, setCount] = useState(start)
  const countRef = useRef(start)
  const requestRef = useRef()
  const startTimeRef = useRef()

  useEffect(() => {
    if (!isInView) return

    const animate = (currentTime) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime
      
      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease-out animation curve
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * easeOut
      
      countRef.current = current
      setCount(Math.floor(current))
      
      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    // Reset animation
    setCount(start)
    countRef.current = start
    startTimeRef.current = null
    
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [end, duration, start, isInView])

  return count
}

export default useCountUp 