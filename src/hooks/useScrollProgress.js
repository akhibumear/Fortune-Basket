import { useState, useEffect, useRef } from 'react'

export const useScrollProgress = (elementRef) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const element = elementRef.current
      const rect = element.getBoundingClientRect()
      const elementHeight = element.offsetHeight
      const windowHeight = window.innerHeight

      // Check if element is in view
      const inView = rect.top < windowHeight && rect.bottom > 0
      setIsInView(inView)

      if (inView) {
        // Calculate progress based on how much of the element has been scrolled
        const scrollTop = window.pageYOffset
        const elementTop = element.offsetTop
        const elementBottom = elementTop + elementHeight
        
        // Progress from 0 to 1 as we scroll through the element
        const progress = Math.max(0, Math.min(1, 
          (scrollTop + windowHeight - elementTop) / (elementHeight + windowHeight)
        ))
        
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [elementRef])

  return { scrollProgress, isInView }
}

export const useScrollMilestone = (elementRef, milestonePositions) => {
  const [currentMilestone, setCurrentMilestone] = useState(0)
  const { scrollProgress } = useScrollProgress(elementRef)

  useEffect(() => {
    // Find the current milestone based on scroll progress
    for (let i = milestonePositions.length - 1; i >= 0; i--) {
      if (scrollProgress >= milestonePositions[i]) {
        setCurrentMilestone(i)
        break
      }
    }
  }, [scrollProgress, milestonePositions])

  return { currentMilestone, scrollProgress }
} 