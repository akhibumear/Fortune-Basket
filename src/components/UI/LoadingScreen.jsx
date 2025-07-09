import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, BarChart3, PieChart, DollarSign } from 'lucide-react'

const LoadingScreen = () => {
  const icons = [TrendingUp, BarChart3, PieChart, DollarSign]
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0.3, 0.6, 0.4, 0.3]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + i * 10}%`
            }}
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo with Pulse Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.div 
            className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 0 rgba(249, 115, 22, 0.4)",
                "0 0 0 20px rgba(249, 115, 22, 0)",
                "0 0 0 0 rgba(249, 115, 22, 0)"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <TrendingUp className="h-10 w-10 text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-3xl font-bold text-white mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Fortune Basket
          </motion.h1>
          
          <motion.p 
            className="text-orange-400 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Invest with Confidence
          </motion.p>
        </motion.div>

        {/* Animated Icons Circle */}
        <motion.div 
          className="relative w-40 h-40 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '50% 50%',
              }}
              animate={{
                rotate: [0, -360],
                x: [0, Math.cos((index * Math.PI) / 2) * 60],
                y: [0, Math.sin((index * Math.PI) / 2) * 60],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.2
              }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
              >
                <Icon className="h-6 w-6 text-orange-400" />
              </motion.div>
            </motion.div>
          ))}
          
          {/* Center Dot */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-4 h-4 bg-orange-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        {/* Loading Progress */}
        <motion.div 
          className="w-64 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Progress Bar Background */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div 
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Loading Text */}
          <motion.div 
            className="text-white/80 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Preparing your investment dashboard...
          </motion.div>
        </motion.div>

        {/* Floating Numbers */}
        <div className="absolute inset-0 pointer-events-none">
          {['₹', '%', '↗', '📈'].map((symbol, index) => (
            <motion.div
              key={index}
              className="absolute text-orange-400/30 text-2xl font-bold"
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 1,
                ease: "easeInOut"
              }}
              style={{
                left: `${20 + index * 20}%`,
                top: `${30 + (index % 2) * 40}%`
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen 