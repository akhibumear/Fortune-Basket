import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { TrendingUp, Target, PieChart, Trophy, Rocket } from 'lucide-react'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [currentMilestone, setCurrentMilestone] = useState(0)

  const milestones = [
    { icon: Rocket, label: "Start Journey", progress: 0 },
    { icon: TrendingUp, label: "Explore Features", progress: 0.25 },
    { icon: Target, label: "Set Goals", progress: 0.5 },
    { icon: PieChart, label: "Choose Portfolio", progress: 0.75 },
    { icon: Trophy, label: "Begin Investing", progress: 1 }
  ]

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const milestone = milestones.findIndex((m, index) => {
        const nextMilestone = milestones[index + 1]
        return latest >= m.progress && (!nextMilestone || latest < nextMilestone.progress)
      })
      setCurrentMilestone(milestone === -1 ? milestones.length - 1 : milestone)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      {/* Progress Bar */}
      <motion.div
        className="h-1 bg-gradient-to-r from-orange-500 to-amber-500 origin-left"
        style={{ scaleX }}
      />

      {/* Milestone Indicator */}
      <motion.div 
        className="absolute top-4 right-4 bg-primary-900/90 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center space-x-3">
          {/* Current Milestone Icon */}
          <motion.div
            key={currentMilestone}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center"
          >
            {React.createElement(milestones[currentMilestone]?.icon || Rocket, {
              className: "h-4 w-4 text-white"
            })}
          </motion.div>

          {/* Milestone Text */}
          <div className="text-sm">
            <motion.div
              key={`${currentMilestone}-text`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white font-medium"
            >
              {milestones[currentMilestone]?.label || "Start Journey"}
            </motion.div>
            <div className="text-orange-400 text-xs">
              Step {currentMilestone + 1} of {milestones.length}
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex space-x-1 ml-2">
            {milestones.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index <= currentMilestone ? 'bg-orange-400' : 'bg-white/20'
                }`}
                animate={{
                  scale: index === currentMilestone ? 1.2 : 1,
                  opacity: index <= currentMilestone ? 1 : 0.5
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* Completion Celebration */}
        {currentMilestone >= milestones.length - 1 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
            >
              <Trophy className="h-3 w-3 text-white" />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ScrollProgress 