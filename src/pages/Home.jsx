import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  Smartphone, 
  Shield, 
  BarChart3, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Star,
  Play,
  ChevronRight,
  Sparkles,
  LineChart,
  PiggyBank,
  Trophy,
  Lock
} from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'

// Helper function to convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const Home = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 200], [1, 0])

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const lastUpdateRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = performance.now()
      // Throttle to ~60fps max and avoid excessive re-renders
      if (now - lastUpdateRef.current < 16) return
      lastUpdateRef.current = now
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Precompute particle seeds once to prevent layout shift/flicker
  const particleSeeds = useMemo(() =>
    Array.from({ length: 100 }).map(() => {
      const colors = [
        { main: '#60a5fa', glow: '#3b82f6' }, // blue-400, blue-600
        { main: '#a78bfa', glow: '#9333ea' }, // purple-400, purple-600
        { main: '#f472b6', glow: '#db2777' }, // pink-400, pink-600
        { main: '#22d3ee', glow: '#0891b2' }, // cyan-400, cyan-600
        { main: '#818cf8', glow: '#4f46e5' }, // indigo-400, indigo-600
        { main: '#a78bfa', glow: '#7c3aed' }, // violet-400, violet-600
      ]
      const colorSet = colors[Math.floor(Math.random() * colors.length)]
      return {
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 8 + 4, // Increased from 1-5 to 4-12 pixels
        dx: Math.random() * 100 - 50,
        dy: Math.random() * 100 - 50,
        dur: Math.random() * 10 + 10,
        color: colorSet.main,
        glowColor: colorSet.glow,
        opacity: Math.random() * 0.4 + 0.3, // 0.3 to 0.7 opacity
        blur: Math.random() * 2 + 1, // 1-3px blur for glow effect
      }
    }),
  [])

  // Precompute currency symbol seeds
  const currencySymbols = useMemo(() =>
    Array.from({ length: 30 }).map(() => {
      const symbols = ['₹', '$', '€', '£', '¥']
      const symbol = symbols[Math.floor(Math.random() * symbols.length)]
      const colors = [
        { text: '#fbbf24', glow: '#f59e0b' }, // amber-400, amber-500
        { text: '#34d399', glow: '#10b981' }, // emerald-400, emerald-500
        { text: '#60a5fa', glow: '#3b82f6' }, // blue-400, blue-600
        { text: '#a78bfa', glow: '#9333ea' }, // purple-400, purple-600
        { text: '#f472b6', glow: '#db2777' }, // pink-400, pink-600
      ]
      const colorSet = colors[Math.floor(Math.random() * colors.length)]
      return {
        symbol: symbol,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 20 + 24, // 24-44px font size
        dx: Math.random() * 80 - 40,
        dy: Math.random() * 80 - 40,
        dur: Math.random() * 15 + 15, // 15-30 seconds
        rotation: Math.random() * 360,
        color: colorSet.text,
        glowColor: colorSet.glow,
        opacity: Math.random() * 0.3 + 0.2, // 0.2 to 0.5 opacity
      }
    }),
  [])

  const features = [
    {
      icon: Target,
      title: "Smart Goal Planning",
      description: "Set and achieve your financial goals with AI-powered insights and personalized investment strategies.",
      gradient: "from-blue-600 to-cyan-500",
      delay: 0.1
    },
    {
      icon: LineChart,
      title: "Real-Time Analytics",
      description: "Track your portfolio performance with advanced analytics and interactive charts updated in real-time.",
      gradient: "from-purple-600 to-pink-500",
      delay: 0.2
    },
    {
      icon: PiggyBank,
      title: "Automated SIP",
      description: "Set it and forget it. Our automated SIP system invests for you, building wealth systematically.",
      gradient: "from-emerald-600 to-teal-500",
      delay: 0.3
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Your investments are protected with 256-bit encryption and multi-layer security protocols.",
      gradient: "from-orange-600 to-amber-500",
      delay: 0.4
    },
    {
      icon: Trophy,
      title: "Expert Management",
      description: "Professionally managed portfolios by certified financial advisors with 20+ years experience.",
      gradient: "from-indigo-600 to-blue-500",
      delay: 0.5
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Manage your entire portfolio on the go with our intuitive mobile app. Invest anytime, anywhere.",
      gradient: "from-rose-600 to-pink-500",
      delay: 0.6
    }
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Marketing Professional",
      company: "Tech Corp",
      text: "Fortune Blue Bell transformed how I invest. The automated SIP feature and real-time tracking give me confidence in my financial future.",
      avatar: "PS",
      rating: 5,
      returns: "+18.5%",
      period: "12 months"
    },
    {
      name: "Rajiv Mehta",
      role: "Software Engineer",
      company: "Startup Inc",
      text: "As a busy professional, I needed something simple yet powerful. Fortune Blue Bell's AI recommendations are spot-on!",
      avatar: "RM",
      rating: 5,
      returns: "+22.3%",
      period: "18 months"
    },
    {
      name: "Anjali Desai",
      role: "Business Owner",
      company: "Retail Business",
      text: "The goal-based planning helped me systematically build my retirement fund. Best investment decision I've made!",
      avatar: "AD",
      rating: 5,
      returns: "+15.7%",
      period: "24 months"
    }
  ]

  const stats = [
    { value: "500Cr+", label: "AUM", icon: TrendingUp, color: "text-blue-400" },
    { value: "15K+", label: "Investors", icon: Users, color: "text-emerald-400" },
    { value: "18.5%", label: "Avg Returns", icon: BarChart3, color: "text-orange-400" },
    { value: "0.60%", label: "Low Fees", icon: Award, color: "text-purple-400" }
  ]

  const benefits = [
    { text: "Zero account opening charges", icon: CheckCircle },
    { text: "Start with just ₹500", icon: CheckCircle },
    { text: "Instant portfolio setup", icon: CheckCircle },
    { text: "24/7 customer support", icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),transparent_50%)]" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particleSeeds.map((p, i) => {
            const rgb = hexToRgb(p.color)
            const glowRgb = hexToRgb(p.glowColor)
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  background: rgb ? `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity}), transparent 70%)` : p.color,
                  boxShadow: glowRgb ? `0 0 ${p.blur * 3}px ${p.blur * 1.5}px rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0.6)` : `0 0 ${p.blur * 3}px ${p.blur * 1.5}px ${p.glowColor}60`,
                  filter: `blur(${p.blur * 0.5}px)`,
                }}
                animate={{
                  y: [0, p.dy],
                  x: [0, p.dx],
                  opacity: [0, p.opacity, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: p.dur,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )
          })}
        </div>

        {/* Floating Currency Symbols */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {currencySymbols.map((symbol, i) => {
            const rgb = hexToRgb(symbol.color)
            const glowRgb = hexToRgb(symbol.glowColor)
            
            return (
              <motion.div
                key={`symbol-${i}`}
                className="absolute font-bold select-none"
                style={{
                  left: `${symbol.left}%`,
                  top: `${symbol.top}%`,
                  fontSize: `${symbol.size}px`,
                  color: symbol.color,
                  textShadow: glowRgb 
                    ? `0 0 ${symbol.size * 0.5}px rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0.8), 0 0 ${symbol.size}px rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0.4)`
                    : `0 0 ${symbol.size * 0.5}px ${symbol.glowColor}80`,
                  filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))',
                }}
                animate={{
                  y: [0, symbol.dy],
                  x: [0, symbol.dx],
                  opacity: [0, symbol.opacity, 0],
                  scale: [0.5, 1, 0.5],
                  rotate: [symbol.rotation, symbol.rotation + 360],
                }}
                transition={{
                  duration: symbol.dur,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {symbol.symbol}
              </motion.div>
            )
          })}
        </div>

        {/* Mouse Follow Effect */}
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          animate={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15), transparent 50%)`,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 container mx-auto px-4 pt-28 pb-16"
          style={{ opacity }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0, y: y1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-6"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">India's Smartest Investment Platform</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="text-white">Your Wealth</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  Grows Here
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Invest smartly with AI-powered portfolios, automated SIPs, and expert guidance. Start building your fortune today.
              </motion.p>

              {/* Benefits List */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-2 gap-3 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl overflow-hidden shadow-xl"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative flex items-center gap-2">
                      Start Investing
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </Link>

                <Link to="/tools">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Try Calculator
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
              style={{ y: y2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                    >
                      <Icon className={`w-8 h-8 ${stat.color} mb-4`} />
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Floating Card */}
              <motion.div
                className="absolute -top-10 -right-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-2xl w-64 hidden lg:block"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6" />
                  <span className="font-semibold">Live Returns</span>
                </div>
                <div className="text-3xl font-bold">+18.5%</div>
                <div className="text-sm opacity-90">Average Annual Growth</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-sm">Scroll to explore</span>
            <ChevronRight className="w-5 h-5 rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-4"
            >
              <span className="text-sm text-purple-300 font-medium">Why Choose Us</span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"> Smart Investors</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to build, track, and grow your wealth in one platform
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const animation = useScrollAnimation(0.2, true, feature.delay)
              
              return (
                <motion.div
                  key={index}
                  ref={animation.ref}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>

                  {/* Arrow Icon */}
                  <motion.div
                    className="absolute bottom-6 right-6 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm mb-4"
            >
              <span className="text-sm text-emerald-300 font-medium">Success Stories</span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Trusted by
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text"> 15,000+ Investors</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See how Fortune Blue Bell is helping people achieve their financial dreams
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + i * 0.1, type: "spring" }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>

                {/* Returns Badge */}
                <div className="absolute top-6 right-6 bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="text-emerald-400 text-sm font-semibold">{testimonial.returns}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-16 h-16 text-yellow-300 mx-auto mb-6" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                Ready to Start Your Journey?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              >
                Join 15,000+ smart investors who are building their wealth with Fortune Blue Bell
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                  >
                    Get Started Now
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    Talk to Expert
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-6 mt-8 text-white/80"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  <span className="text-sm">Bank-Grade Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">SEBI Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span className="text-sm">Award Winning</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
