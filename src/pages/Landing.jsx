import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import BlueBellScene from '../components/3D/scenes/BlueBellScene'

const Landing = () => {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    const timer1 = setTimeout(() => setIsLoaded(true), 500)
    const timer2 = setTimeout(() => setShowContent(true), 1000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const handleGetStarted = () => {
    navigate('/home')
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-900 to-purple-900">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <BlueBellScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-indigo-950/60 z-10 pointer-events-none" />

      {/* Floating Particles Background */}
      <div className="absolute inset-0 z-5">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="text-center max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Logo/Brand Name with Sparkle Effect */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-12 h-12 text-yellow-400" />
                  </motion.div>
                  <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 text-transparent bg-clip-text">
                      Fortune
                    </span>
                  </h1>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-12 h-12 text-yellow-400" />
                  </motion.div>
                </div>

                <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-4">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-2xl">
                    Blue Bell
                  </span>
                </h1>

                {/* Decorative Line */}
                <motion.div
                  className="w-64 h-1 mx-auto bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>

              {/* Tagline */}
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-8"
                >
                  <p className="text-2xl md:text-3xl lg:text-4xl text-blue-100 font-light mb-4 leading-relaxed">
                    Where <span className="text-yellow-300 font-semibold">Prosperity</span> Blooms Like{' '}
                    <span className="text-blue-300 font-semibold">Blue Bells</span>
                  </p>
                  <p className="text-lg md:text-xl text-blue-200/80 max-w-3xl mx-auto leading-relaxed">
                    Experience the harmony of growth and trust. Like blue bells that symbolize 
                    <span className="text-blue-300 font-medium"> gratitude, constancy, and everlasting love</span>, 
                    we nurture your financial dreams into flourishing reality.
                  </p>
                </motion.div>
              )}

              {/* Key Concepts */}
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
                >
                  <div className="bg-blue-500/10 backdrop-blur-md border border-blue-400/30 rounded-2xl p-6 hover:bg-blue-500/20 transition-all duration-300">
                    <div className="text-4xl mb-3">🌸</div>
                    <h3 className="text-xl font-semibold text-blue-200 mb-2">Blue Bell</h3>
                    <p className="text-blue-300/80 text-sm">Symbol of trust, loyalty, and everlasting growth</p>
                  </div>
                  <div className="bg-yellow-500/10 backdrop-blur-md border border-yellow-400/30 rounded-2xl p-6 hover:bg-yellow-500/20 transition-all duration-300">
                    <div className="text-4xl mb-3">💰</div>
                    <h3 className="text-xl font-semibold text-yellow-200 mb-2">Fortune</h3>
                    <p className="text-yellow-300/80 text-sm">Wealth, prosperity, and financial abundance</p>
                  </div>
                  <div className="bg-purple-500/10 backdrop-blur-md border border-purple-400/30 rounded-2xl p-6 hover:bg-purple-500/20 transition-all duration-300">
                    <div className="text-4xl mb-3">📈</div>
                    <h3 className="text-xl font-semibold text-purple-200 mb-2">Growth</h3>
                    <p className="text-purple-300/80 text-sm">Your investments bloom with consistent care</p>
                  </div>
                </motion.div>
              )}

              {/* Get Started Button */}
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <motion.button
                    onClick={handleGetStarted}
                    className="group relative px-12 py-5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-xl font-bold rounded-full overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Button Content */}
                    <span className="relative flex items-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      Get Started Now
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </span>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                  </motion.button>

                  {/* Subtitle under button */}
                  <motion.p
                    className="mt-4 text-blue-300/60 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Begin your journey to financial prosperity
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-blue-300/50 text-center"
        >
          <div className="text-xs mb-2">Discover More</div>
          <div className="w-6 h-10 border-2 border-blue-300/30 rounded-full mx-auto flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-blue-300 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Landing

