import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  PieChart, 
  Shield, 
  Target, 
  Calendar,
  Calculator,
  Users,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Zap,
  Award
} from 'lucide-react'

const Products = () => {
  const products = [
    {
      icon: PieChart,
      title: "Equity, Debt & Hybrid Funds",
      description: "Access curated fund portfolios across large-cap, mid-cap, thematic (sector), and diversified categories. Our experts select funds best suited to your chosen risk level, leveraging diversification to manage volatility.",
      features: [
        "Large-cap funds for stable blue-chip stocks",
        "Mid-cap funds for growth opportunities", 
        "Sectoral funds for technology, healthcare focus",
        "Hybrid funds mixing equity and debt"
      ],
      gradient: "from-blue-500 to-cyan-500",
      link: "/products/funds"
    },
    {
      icon: Calendar,
      title: "Systematic Investment Plans (SIPs)",
      description: "Automate your investments with SIPs. Decide an amount and frequency (e.g. ₹500/month) and we invest it for you. SIPs encourage disciplined saving and compound growth.",
      features: [
        "Start with as little as ₹500/month",
        "Flexible frequency options",
        "Automatic portfolio rebalancing",
        "Power of compounding over time"
      ],
      gradient: "from-emerald-500 to-teal-500",
      link: "/products/sip"
    },
    {
      icon: Shield,
      title: "Tax-Saving Funds (ELSS)",
      description: "Invest in Equity-Linked Savings Schemes (ELSS) to reduce income tax under Section 80C (up to ₹1.5 lakh/year). ELSS funds historically offer higher long-term returns around 11–12% average over 10 years.",
      features: [
        "Tax deduction up to ₹1.5 lakh under 80C",
        "3-year lock-in period",
        "Potential for higher returns",
        "Professional fund management"
      ],
      gradient: "from-orange-500 to-amber-500",
      link: "/products/elss"
    },
    {
      icon: Target,
      title: "Goal-Based Plans",
      description: "Save systematically for specific goals like retirement, child's education, or buying a home. Our goal planners estimate the corpus needed and suggest optimal fund mix and SIPs.",
      features: [
        "Retirement planning solutions",
        "Children's education funds",
        "Home buying goals",
        "Customized investment strategies"
      ],
      gradient: "from-purple-500 to-pink-500",
      link: "/products/goals"
    },
    {
      icon: Users,
      title: "Custom Advice",
      description: "If you need personalized guidance, our human advisors can craft a bespoke portfolio strategy. They use data-driven insights and consult with you at no extra fee to fine-tune your plan.",
      features: [
        "One-on-one consultation",
        "Personalized portfolio design",
        "Regular review meetings",
        "No additional advisory fees"
      ],
      gradient: "from-indigo-500 to-blue-500",
      link: "/products/advisory"
    }
  ]

  const benefits = [
    {
      icon: BarChart3,
      title: "Instant Diversification",
      description: "Mutual funds and ETFs let you gain instant diversification by pooling hundreds or thousands of securities, spreading risk across many holdings."
    },
    {
      icon: Zap,
      title: "Professional Management",
      description: "Expert fund managers use sophisticated research and analysis to make investment decisions, so you don't have to pick individual stocks."
    },
    {
      icon: Award,
      title: "Low-Cost Approach",
      description: "Our focus on passive index funds keeps costs minimal, with expense ratios often under 0.20% annually compared to higher active fund fees."
    }
  ]

  const stats = [
    { value: "₹500 Cr+", label: "Assets Under Management", icon: TrendingUp },
    { value: "10,000+", label: "Happy Investors", icon: Users },
    { value: "12%+", label: "Average Returns", icon: BarChart3 },
    { value: "0.60%", label: "Management Fee", icon: Calculator }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Investment <span className="text-gradient">Products & Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Fortune Blue Bell offers a full suite of mutual fund investment options, each managed to fit your goals. 
              From equity funds to systematic investment plans, we have everything you need to build wealth.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="card-glow p-6 text-center cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold text-white mb-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-primary-800">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Investment Solutions</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose from our comprehensive range of investment products designed to meet every financial goal and risk appetite.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {products.map((product, index) => {
              const Icon = product.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card-glow p-8 h-full group cursor-pointer"
                >
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${product.gradient} flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors">
                    {product.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.05 }}
                        className="flex items-start space-x-3 group/item"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        </motion.div>
                        <span className="text-gray-300 text-sm group-hover/item:text-gray-200 transition-colors">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Link 
                    to={product.link}
                    className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold group-hover:translate-x-2 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-primary-900">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose Our <span className="text-gradient">Investment Approach</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              All portfolios emphasize diversification and professional management to reduce risk while pursuing long-term growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
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
              Ready to Start Investing?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Choose the investment product that matches your goals and risk appetite. Our experts are here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/tools" className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative flex items-center gap-2 text-white group-hover:text-white">
                    Use Our Calculators
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Calculator className="h-5 w-5" />
                    </motion.div>
                  </span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact" className="bg-white/20 text-white hover:bg-white/30 px-8 py-4 rounded-lg font-semibold transition-colors relative overflow-hidden group inline-block">
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative">Speak to an Advisor</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Products 