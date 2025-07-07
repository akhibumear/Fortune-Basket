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
  Target
} from 'lucide-react'

// 3D Components
import HeroScene from '../components/3D/scenes/HeroScene'
import InvestmentRoadmap from '../components/3D/scenes/InvestmentRoadmap'
import LoadingScreen from '../components/ui/LoadingScreen'

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
      text: "Fortune Basket made investing easy and even fun. I can track my goals on the app and see my money grow over time. The portfolio recommendations match my risk appetite perfectly!",
      avatar: "PS",
      color: "bg-blue-500"
    },
    {
      name: "Rajiv M.",
      role: "Software Engineer",
      text: "I love Fortune Basket's auto-SIP feature. I set it up once and forget it, knowing my investments are handled by experts. The app's insights keep me informed without extra work.",
      avatar: "RM",
      color: "bg-emerald-500"
    },
    {
      name: "Anjali S.",
      role: "Teacher",
      text: "As a beginner, Fortune Basket's guided process and support helped me learn the ropes. Now I feel confident planning for my child's education through SIPs.",
      avatar: "AS",
      color: "bg-purple-500"
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
      {/* Hero Section with 3D */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />}>
            <HeroScene />
          </Suspense>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container-custom mx-auto px-4 py-20">
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
                Fortune Basket is a fintech-driven robo-advisor platform that simplifies mutual fund investing. 
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

              {/* Quick Stats */}
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-orange-400">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
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
              Why Choose <span className="text-gradient">Fortune Basket</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We combine decades of financial experience with cutting-edge technology to make investing simple and effective.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card-glow p-8 group cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
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
              Join thousands of satisfied investors who trust Fortune Basket with their financial future.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card-glow p-8"
              >
                <div className="flex items-center mb-6">
                  <div className={`${testimonial.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="container-custom mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join Fortune Basket today and take the first step towards financial freedom with expert-guided investing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center">
                Start Investing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/tools" className="bg-white/20 text-white hover:bg-white/30 px-8 py-4 rounded-lg font-semibold transition-colors">
                Calculate Your Returns
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home 