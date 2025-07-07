import React, { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Environment, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import PathCurve from './PathCurve'
import Milestone from './Milestone'
import FloatingElements from './FloatingElements'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { milestonePositions } from '../../utils/mathHelpers'

const InvestmentJourney = () => {
  const containerRef = useRef()
  const { scrollProgress, isInView } = useScrollProgress(containerRef)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Content for each milestone
  const milestoneContent = [
    {
      title: "Start Your Investment Journey",
      description: "Begin with just ₹1,000 per month. Complete simple KYC and set your financial goals in minutes.",
      features: ["Easy Onboarding", "Simple KYC Process", "Goal Setting"],
      color: "#10B981"
    },
    {
      title: "Your First SIP Success",
      description: "Congratulations! Your first systematic investment is active. Watch your money grow with expert-curated portfolios.",
      features: ["Automated Investing", "Expert Curation", "Real-time Tracking"],
      color: "#F59E0B"
    },
    {
      title: "Portfolio Growth Milestone",
      description: "₹50,000 achieved! Your diversified portfolio is working hard with low-cost passive funds and smart rebalancing.",
      features: ["Low-Cost Funds", "Auto Rebalancing", "Diversification"],
      color: "#3B82F6"
    },
    {
      title: "Dream Home Goal in Sight",
      description: "You're on track! Our goal-based planning ensures you're saving optimally for your dream home purchase.",
      features: ["Goal-Based Planning", "Timeline Optimization", "Progress Tracking"],
      color: "#8B5CF6"
    },
    {
      title: "Expert Portfolio Management",
      description: "Advanced AI algorithms and human expertise work together to optimize your investments and protect during downturns.",
      features: ["AI Optimization", "Human Expertise", "Risk Management"],
      color: "#EF4444"
    },
    {
      title: "Financial Freedom Achieved",
      description: "Congratulations! You've successfully built wealth and achieved your financial goals. Time to plan your next milestone!",
      features: ["Wealth Built", "Goals Achieved", "Future Planning"],
      color: "#F97316"
    }
  ]

  if (isMobile) {
    // Mobile fallback with 2D animations
    return (
      <section id="journey" ref={containerRef} className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-800 section-padding">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              Your <span className="text-gradient">Investment Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Follow the path from your first SIP to financial freedom
            </p>
          </motion.div>

          <div className="space-y-12">
            {milestoneContent.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
              >
                <div className="flex-1">
                  <div className="card-glow p-8">
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4"
                        style={{ backgroundColor: milestone.color }}
                      >
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-6">{milestone.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {milestone.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="bg-white/5 rounded-lg p-3 text-center">
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="journey" ref={containerRef} className="relative h-[600vh] bg-gradient-to-b from-primary-900 to-primary-800">
      {/* 3D Canvas */}
      <div className="sticky top-0 h-screen">
        <Canvas
          camera={{ 
            position: [2, 2, 5], 
            fov: 60,
            near: 0.1,
            far: 1000 
          }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F97316" />
          
          {/* Environment */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <Environment preset="night" />
          
          {/* Scroll Controls */}
          <ScrollControls pages={6} damping={0.1}>
            {/* 3D Scene Content */}
            <PathCurve scrollProgress={scrollProgress} />
            
            {/* Milestones along the path */}
            {milestonePositions.map((milestone, index) => (
              <Milestone
                key={milestone.name}
                position={milestone.t}
                data={milestoneContent[index]}
                isActive={scrollProgress >= milestone.t - 0.1 && scrollProgress <= milestone.t + 0.1}
                scrollProgress={scrollProgress}
              />
            ))}
            
            {/* Floating particles and effects */}
            <FloatingElements scrollProgress={scrollProgress} />
            
            {/* HTML Content Overlay */}
            <Scroll html>
              <div className="w-full">
                {milestoneContent.map((milestone, index) => (
                  <div
                    key={index}
                    className="h-screen flex items-center justify-end pr-8 lg:pr-16"
                    style={{ 
                      opacity: Math.abs(scrollProgress - milestonePositions[index].t) < 0.2 ? 1 : 0,
                      transition: 'opacity 0.5s ease-in-out'
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ 
                        opacity: Math.abs(scrollProgress - milestonePositions[index].t) < 0.2 ? 1 : 0,
                        x: Math.abs(scrollProgress - milestonePositions[index].t) < 0.2 ? 0 : 100
                      }}
                      transition={{ duration: 0.8 }}
                      className="max-w-md"
                    >
                      <div className="card-glow p-8">
                        <div className="flex items-center mb-4">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4"
                            style={{ backgroundColor: milestone.color }}
                          >
                            {index + 1}
                          </div>
                          <h3 className="text-2xl font-bold text-white">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-300 mb-6">{milestone.description}</p>
                        <div className="space-y-2">
                          {milestone.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center">
                              <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                              <span className="text-sm font-medium text-white">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
      
      {/* Section Header - Positioned absolutely */}
      <div className="absolute top-0 left-0 w-full z-10 section-padding pointer-events-none">
        <div className="container-custom mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Your <span className="text-gradient">Investment Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience your financial growth through an immersive 3D journey. 
              Scroll to move along the path from your first SIP to achieving your dreams.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default InvestmentJourney 