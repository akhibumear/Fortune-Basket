import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Simplified milestone data
const milestones = [
  {
    id: 1,
    title: "Start Journey",
    description: "Open account & KYC",
    color: "#10b981",
    icon: "🚀",
    x: 15,
    y: 75
  },
  {
    id: 2,
    title: "Set Goals",
    description: "Define objectives",
    color: "#3b82f6",
    icon: "🎯",
    x: 35,
    y: 55
  },
  {
    id: 3,
    title: "Choose Portfolio",
    description: "Select strategy",
    color: "#8b5cf6",
    icon: "📊",
    x: 55,
    y: 35
  },
  {
    id: 4,
    title: "Start SIP",
    description: "Begin investing",
    color: "#f59e0b",
    icon: "💰",
    x: 75,
    y: 25
  },
  {
    id: 5,
    title: "Achieve Goals",
    description: "Reach targets",
    color: "#f97316",
    icon: "🏆",
    x: 90,
    y: 15
  }
]

// Clean milestone component
const MilestoneNode = ({ milestone, index, isActive, onClick }) => {
  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ 
        left: `${milestone.x}%`, 
        top: `${milestone.y}%`,
        zIndex: isActive ? 20 : 10
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isActive ? 1.1 : 1,
        opacity: 1
      }}
      transition={{ 
        delay: index * 0.15,
        type: "spring",
        bounce: 0.3
      }}
      whileHover={{ scale: 1.2 }}
      onClick={() => onClick(index)}
    >
      {/* Clean node */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg border-2 border-white/20"
        style={{
          background: `linear-gradient(135deg, ${milestone.color}, ${milestone.color}cc)`,
          boxShadow: `0 8px 25px ${milestone.color}40`
        }}
      >
        <span>{milestone.icon}</span>
        
        {/* Active pulse */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: milestone.color }}
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      
      {/* Hover tooltip */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.8 }}
          whileHover={{ opacity: 1, y: -50, scale: 1 }}
          className="absolute left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm rounded-lg p-2 border border-white/10 shadow-xl min-w-max pointer-events-none"
          style={{ zIndex: 100 }}
        >
          <div className="text-center">
            <h3 className="text-white font-semibold text-xs mb-1">{milestone.title}</h3>
            <p className="text-gray-300 text-xs">{milestone.description}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

// Simple connecting path
const PathConnection = ({ start, end, isCompleted, color }) => {
  return (
    <div
      className="absolute h-0.5 rounded-full transition-all duration-1000"
      style={{
        left: `${start.x}%`,
        top: `${start.y}%`,
        width: `${Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))}%`,
        transform: `rotate(${Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI}deg)`,
        transformOrigin: 'left center',
        background: isCompleted 
          ? `linear-gradient(90deg, ${color}aa, ${color})`
          : 'rgba(255,255,255,0.2)',
        boxShadow: isCompleted ? `0 0 8px ${color}60` : 'none'
      }}
    />
  )
}

// Clean main component
const InvestmentRoadmap = () => {
  const [activeStep, setActiveStep] = useState(0)

  // Auto-advance every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % milestones.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleStepClick = (stepIndex) => {
    setActiveStep(stepIndex)
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900/20 via-slate-800/20 to-slate-900/20 rounded-xl backdrop-blur-sm border border-white/10">
      {/* Clean background grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Path connections */}
      {milestones.slice(0, -1).map((milestone, index) => (
        <PathConnection
          key={`path-${index}`}
          start={{ x: milestone.x, y: milestone.y }}
          end={{ x: milestones[index + 1].x, y: milestones[index + 1].y }}
          isCompleted={index < activeStep}
          color={milestone.color}
        />
      ))}

      {/* Milestone nodes */}
      {milestones.map((milestone, index) => (
        <MilestoneNode
          key={milestone.id}
          milestone={milestone}
          index={index}
          isActive={index === activeStep}
          onClick={handleStepClick}
        />
      ))}

      {/* Clean progress indicator */}
      <div className="absolute top-4 right-4">
        <div className="text-center">
          <div className="text-orange-400 font-bold text-lg">
            {activeStep + 1}/{milestones.length}
          </div>
          <div className="text-white text-xs opacity-75">Step</div>
        </div>
      </div>

      {/* Current step info */}
      <div className="absolute bottom-4 left-4 right-4">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-white/10"
        >
          <div className="text-center">
            <h3 className="text-white font-semibold text-sm mb-1">
              {milestones[activeStep].title}
            </h3>
            <p className="text-gray-300 text-xs">
              {milestones[activeStep].description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Step indicators */}
      <div className="absolute top-4 left-4">
        <div className="flex space-x-1">
          {milestones.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeStep 
                  ? 'bg-orange-500 scale-125' 
                  : index < activeStep 
                    ? 'bg-green-500' 
                    : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default InvestmentRoadmap 