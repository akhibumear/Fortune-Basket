import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
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
  Star
} from 'lucide-react'

// 3D Components
import InvestmentRoadmap from '../components/3D/scenes/InvestmentRoadmap'
import LoadingScreen from '../components/UI/LoadingScreen'
import AnimatedStat from '../components/UI/AnimatedStat'
import useScrollAnimation from '../hooks/useScrollAnimation'

// Enhanced Feature Card Component with Scroll Animation
const FeatureCard = ({ feature, Icon, index }) => {
  const animation = useScrollAnimation(0.2, true, index * 0.1)
  
  return (
    <motion.div
      ref={animation.ref}
      {...animation.fadeInUp}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="card-glow p-8 group cursor-pointer feature-card"
    >
      <motion.div 
        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}
        whileHover={{ 
          rotate: 5,
          scale: 1.1
        }}
      >
        <Icon className="h-8 w-8 text-white" />
      </motion.div>
      <motion.h3 
        className="text-xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors duration-300"
        layoutId={`feature-title-${index}`}
      >
        {feature.title}
      </motion.h3>
      <motion.p 
        className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        {feature.description}
      </motion.p>
    </motion.div>
  )
}

// Enhanced Testimonial Card with Animated Stars
const TestimonialCard = ({ testimonial, index }) => {
  const animation = useScrollAnimation(0.2, true, index * 0.2)
  
  return (
    <motion.div
      ref={animation.ref}
      {...animation.fadeInUp}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
      className="card-glow p-8 testimonial-card relative"
    >
      {/* Rating Stars */}
      <motion.div 
        className="flex items-center mb-4"
        initial={{ opacity: 0 }}
        animate={animation.inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: index * 0.2 + 0.5 }}
      >
        {[...Array(testimonial.rating)].map((_, starIndex) => (
          <motion.div
            key={starIndex}
            initial={{ scale: 0, rotate: -180 }}
            animate={animation.inView ? { 
              scale: 1, 
              rotate: 0,
              transition: { 
                delay: index * 0.2 + 0.7 + starIndex * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15
              }
            } : { scale: 0, rotate: -180 }}
          >
            <Star className="h-5 w-5 text-orange-400 fill-current" />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex items-center mb-6">
        <motion.div 
          className={`${testimonial.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4`}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {testimonial.avatar}
        </motion.div>
        <div>
          <motion.div 
            className="font-semibold text-white"
            layoutId={`testimonial-name-${index}`}
          >
            {testimonial.name}
          </motion.div>
          <div className="text-gray-400 text-sm">{testimonial.role}</div>
          <div className="text-orange-400 text-xs">{testimonial.location}</div>
        </div>
      </div>
      
      <motion.p 
        className="text-gray-300 leading-relaxed"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        "{testimonial.text}"
      </motion.p>

      {/* Quote Icon */}
      <motion.div 
        className="absolute top-4 right-4 text-orange-400/20 text-4xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        "
      </motion.div>
    </motion.div>
  )
}

const Home = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Easy, Automated Management",
      description: "Once your portfolio is set up, our system monitors and automatically rebalances it to stay aligned with your goals. You benefit from good markets and are shielded in downturns.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Personalized Portfolios",
      description: "Choose an investment style or specific goal (retirement, education). We select funds matched to your profile with professionally managed funds for instant diversification.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: BarChart3,
      title: "Low Fees",
      description: "By using mainly passive index/ETF funds, we eliminate high active management costs. Index funds charge only 0.1–0.2% annually, with our simple 0.60% p.a. management fee.",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: Zap,
      title: "Real-Time Tracking",
      description: "Our app gives 24/7 access to your portfolio. See live performance charts, check goal progress, and receive alerts. Interactive calculators show investment growth over time.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Ethical Investing",
      description: "We offer ESG portfolios for values-driven investors. ESG funds can make an impact beyond your portfolio by aligning with environmental, social, and governance goals.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Award,
      title: "Expert Management",
      description: "Our algorithmic engine builds diversified portfolios based on your risk tolerance. We focus on broad passive investments to capture market growth at very low cost.",
      gradient: "from-rose-500 to-red-500"
    }
  ]

  const testimonials = [
    {
      name: "Priya S.",
      role: "Marketing Manager",
      text: "Fortune Blue Bell made investing easy and even fun. I can track my goals on the app and see my money grow over time. The portfolio recommendations match my risk appetite perfectly!",
      avatar: "PS",
      color: "bg-blue-500",
      rating: 5,
      location: "Mumbai"
    },
    {
      name: "Rajiv M.",
      role: "Software Engineer",
      text: "I love Fortune Blue Bell's auto-SIP feature. I set it up once and forget it, knowing my investments are handled by experts. The app's insights keep me informed without extra work.",
      avatar: "RM",
      color: "bg-emerald-500",
      rating: 5,
      location: "Bangalore"
    },
    {
      name: "Anjali S.",
      role: "Teacher",
      text: "As a beginner, Fortune Blue Bell's guided process and support helped me learn the ropes. Now I feel confident planning for my child's education through SIPs.",
      avatar: "AS",
      color: "bg-purple-500",
      rating: 5,
      location: "Delhi"
    }
  ]

  const stats = [
    { value: "₹500 Cr+", label: "Assets Under Management" },
    { value: "10,000+", label: "Happy Investors" },
    { value: "12%+", label: "Average Returns" },
    { value: "0.60%", label: "Management Fee" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        {/* Content */}
        <div className="relative container-custom mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-white">Invest with</span>
                <br />
                <span className="text-gradient bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Confidence
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-300 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Fortune Blue Bell is a fintech-driven robo-advisor platform that simplifies mutual fund investing. 
                Our easy online onboarding lets you sign up and complete KYC in minutes.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link to="/products" className="btn-primary px-8 py-4 text-lg font-semibold flex items-center justify-center group">
                  Start Investing Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/tools" className="btn-secondary px-8 py-4 text-lg font-semibold">
                  Try Our Calculators
                </Link>
              </motion.div>

              {/* Quick Stats with Count-up Animation */}
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {stats.map((stat, index) => (
                  <AnimatedStat
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    duration={2000 + index * 200} // Stagger the animations
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* 3D Investment Roadmap */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:block relative h-96"
            >
              <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-primary-800 to-primary-700 rounded-lg flex items-center justify-center"><div className="loading-spinner"></div></div>}>
                <InvestmentRoadmap />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-to-b from-primary-800 to-primary-900">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose <span className="text-gradient">Fortune Blue Bell</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We combine decades of financial experience with cutting-edge technology to make investing simple and effective.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <FeatureCard 
                  key={index} 
                  feature={feature} 
                  Icon={Icon} 
                  index={index} 
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Mobile App Promo Section */}
      <section className="section-padding bg-gradient-to-b from-primary-900 to-primary-800 relative overflow-hidden">
        <div className="container-custom mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Invest on the Go with Our <span className="text-gradient">Mobile App</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Track your portfolio, make investments, and monitor your financial goals anytime, anywhere with our feature-rich mobile application.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: Smartphone, title: "Real-time Portfolio Tracking", desc: "Monitor your investments 24/7" },
                  { icon: TrendingUp, title: "Smart Notifications", desc: "Get alerts on market movements" },
                  { icon: Shield, title: "Bank-level Security", desc: "Your data is always protected" }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#download"
                  className="btn-primary px-6 py-3 inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download App
                  <Smartphone className="ml-2 h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#features"
                  className="btn-secondary px-6 py-3 inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Features
                </motion.a>
              </div>
            </motion.div>

            {/* Floating Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Phone Frame */}
                <motion.div 
                  className="relative w-64 h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 floating-element"
                  animate={{ 
                    y: [0, -10, 0],
                    rotateY: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Screen */}
                  <div className="w-full h-full bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 rounded-[2.5rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="h-8 bg-black/20 flex items-center justify-between px-4 text-white text-xs">
                      <span>9:41</span>
                      <span>●●●</span>
                    </div>
                    
                    {/* App Content */}
                    <div className="p-4 space-y-4">
                      <div className="text-center">
                        <h3 className="text-white font-bold text-lg">Fortune Blue Bell</h3>
                        <p className="text-gray-300 text-sm">Portfolio: ₹2,45,000</p>
                      </div>
                      
                      {/* Animated Chart */}
                      <motion.div 
                        className="h-32 bg-white/10 rounded-lg p-4 relative overflow-hidden"
                        animate={{ 
                          background: [
                            "rgba(255,255,255,0.1)", 
                            "rgba(249,115,22,0.1)", 
                            "rgba(255,255,255,0.1)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <motion.div 
                          className="absolute bottom-4 left-4 w-2 bg-orange-500 rounded"
                          animate={{ height: ["20%", "60%", "40%", "80%", "30%"] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div 
                          className="absolute bottom-4 left-8 w-2 bg-orange-400 rounded"
                          animate={{ height: ["40%", "80%", "20%", "70%", "50%"] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="absolute bottom-4 left-12 w-2 bg-orange-300 rounded"
                          animate={{ height: ["60%", "30%", "90%", "40%", "70%"] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                        />
                        <motion.div 
                          className="absolute bottom-4 left-16 w-2 bg-amber-500 rounded"
                          animate={{ height: ["30%", "70%", "50%", "90%", "60%"] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        />
                      </motion.div>
                      
                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <div className="text-orange-400 text-xl font-bold">+12.5%</div>
                          <div className="text-gray-300 text-xs">Returns</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <div className="text-emerald-400 text-xl font-bold">₹5K</div>
                          <div className="text-gray-300 text-xs">Monthly SIP</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full"></div>
                </motion.div>

                {/* Floating Elements Around Phone */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full opacity-60"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-16 -left-6 w-6 h-6 bg-amber-400 rounded-full opacity-40"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div 
                  className="absolute -bottom-6 right-8 w-4 h-4 bg-emerald-500 rounded-full opacity-50"
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0.9, 0.5]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-primary-900">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What Our <span className="text-gradient">Investors Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied investors who trust Fortune Blue Bell with their financial future.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="section-padding bg-gradient-to-r from-orange-500 to-amber-500 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-32 right-16 w-16 h-16 bg-white/10 rounded-full"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, -180, -360]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-12 h-12 bg-white/10 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
              y: [0, -20, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="container-custom mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-white/20 rounded-full px-6 py-2 mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Target className="h-5 w-5 text-white mr-2" />
              </motion.div>
              <span className="text-white font-medium">Start Your Wealth Building Journey</span>
            </motion.div>

            <motion.h2 
              className="text-4xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Ready to Start Your{" "}
              <motion.span
                className="relative inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(255,255,255,0.8)",
                    "0 0 0px rgba(255,255,255,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Investment Journey?
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Join <motion.span 
                className="font-bold"
                animate={{ color: ["#ffffff", "#fef3c7", "#ffffff"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                10,000+ investors
              </motion.span> who trust Fortune Blue Bell for their financial future. 
              Start with as little as ₹500 and watch your wealth grow.
            </motion.p>

            {/* Interactive Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link 
                  to="/products" 
                  className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center group relative overflow-hidden"
                >
                  {/* Ripple effect background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-100 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0, borderRadius: "50%" }}
                    whileHover={{ 
                      scale: 1.5,
                      borderRadius: "0%",
                      transition: { duration: 0.3 }
                    }}
                  />
                  <span className="relative z-10">Start Investing Now</span>
                  <motion.div
                    className="relative z-10 ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/tools" 
                  className="bg-white/20 text-white hover:bg-white/30 px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center group border border-white/30 hover:border-white/50 transition-all duration-300"
                >
                  <BarChart3 className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                  Calculate Your Returns
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center items-center gap-8 text-white/80"
            >
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">SEBI Registered</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">10,000+ Investors</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Award className="h-5 w-5" />
                <span className="text-sm font-medium">0.60% Management Fee</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Action Indicators */}
        <motion.div
          className="absolute bottom-8 right-8 text-white/60"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-sm font-medium mb-2">Scroll up to explore</div>
          <motion.div
            animate={{ rotate: 180 }}
            className="mx-auto w-6 h-6"
          >
            <ArrowRight className="w-full h-full transform rotate-90" />
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  )
}

export default Home 