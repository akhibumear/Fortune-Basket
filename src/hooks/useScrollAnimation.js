import { useInView } from 'react-intersection-observer'

const useScrollAnimation = (threshold = 0.1, triggerOnce = true, delay = 0) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin: '-50px 0px'
  })

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: inView ? { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing curve
      }
    } : { opacity: 0, y: 30 }
  }

  const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: inView ? { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    } : { opacity: 0, x: -30 }
  }

  const fadeInRight = {
    initial: { opacity: 0, x: 30 },
    animate: inView ? { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    } : { opacity: 0, x: 30 }
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: inView ? { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    } : { opacity: 0, scale: 0.8 }
  }

  return {
    ref,
    inView,
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn
  }
}

export default useScrollAnimation 