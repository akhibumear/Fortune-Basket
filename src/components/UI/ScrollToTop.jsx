import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Scroll to top with smooth animation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 20
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0, 
            y: 100,
            transition: {
              duration: 0.3
            }
          }}
          whileHover={{ 
            scale: 1.1,
            y: -5,
            transition: { duration: 0.2 }
          }}
          whileTap={{ 
            scale: 0.9,
            transition: { duration: 0.1 }
          }}
          onClick={scrollToTop}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center group overflow-hidden"
          aria-label="Scroll to top"
        >
          {/* Background glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-0 group-hover:opacity-20"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.2, 0.3, 0.2] : 0
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }}
          />

          {/* Rocket Animation */}
          <motion.div
            animate={{
              y: isHovered ? [0, -2, 0] : 0,
              rotate: isHovered ? [0, -5, 5, 0] : 0
            }}
            transition={{
              duration: 0.6,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <Rocket 
              className="h-6 w-6 text-white transform rotate-45" 
            />
          </motion.div>

          {/* Particle trail effect */}
          {isHovered && (
            <>
              <motion.div
                className="absolute w-1 h-1 bg-orange-300 rounded-full"
                animate={{
                  x: [0, -15, -30],
                  y: [0, 8, 15],
                  opacity: [1, 0.5, 0],
                  scale: [1, 0.8, 0]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                style={{ left: '50%', top: '60%' }}
              />
              <motion.div
                className="absolute w-1 h-1 bg-amber-300 rounded-full"
                animate={{
                  x: [0, -10, -20],
                  y: [0, 5, 12],
                  opacity: [1, 0.6, 0],
                  scale: [1, 0.7, 0]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.1
                }}
                style={{ left: '45%', top: '65%' }}
              />
              <motion.div
                className="absolute w-0.5 h-0.5 bg-orange-200 rounded-full"
                animate={{
                  x: [0, -8, -16],
                  y: [0, 4, 10],
                  opacity: [1, 0.7, 0],
                  scale: [1, 0.6, 0]
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.2
                }}
                style={{ left: '55%', top: '55%' }}
              />
            </>
          )}

          {/* Ripple effect on click */}
          <motion.div
            className="absolute inset-0 border-2 border-white/30 rounded-full"
            initial={{ scale: 1, opacity: 0 }}
            whileTap={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
              transition: { duration: 0.3 }
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop 