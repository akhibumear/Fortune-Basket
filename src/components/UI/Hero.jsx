import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react'

const Hero = () => {
  const stats = [
    { icon: Users, value: '10K+', label: 'Happy Investors' },
    { icon: TrendingUp, value: '₹500Cr+', label: 'Assets Managed' },
    { icon: Shield, value: '99.9%', label: 'Security Uptime' }
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-indigo-900"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-8 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container-custom mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Fortune Basket – </span>
              <span className="text-gradient">Invest with Confidence</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            A tech-savvy platform that makes mutual fund investing simple and accessible. 
            Manage your investments with expert-curated portfolios built around your goals.
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-orange-400 mb-3">
                <Shield className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Low-Cost Funds</h3>
              <p className="text-gray-400 text-sm">Passive index and ETF-based mutual funds so your money works harder at minimal cost</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-amber-400 mb-3">
                <TrendingUp className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tech-Driven Insights</h3>
              <p className="text-gray-400 text-sm">Smart algorithms and human expertise analyze market data to keep you on track</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-emerald-400 mb-3">
                <Users className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Goal-Based Planning</h3>
              <p className="text-gray-400 text-sm">Personalized portfolios matched to your risk profile and financial goals</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group">
              Start Your Journey
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              View Demo
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-gray-400 mb-6 text-sm">
              Get Started • No hidden fees • No commissions
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="text-orange-400 mb-2">
                      <Icon className="h-6 w-6 mx-auto" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Scroll to explore your investment journey</p>
          <div className="w-6 h-10 border-2 border-orange-400 rounded-full mx-auto relative">
            <div className="w-1 h-3 bg-orange-400 rounded-full mx-auto mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero 