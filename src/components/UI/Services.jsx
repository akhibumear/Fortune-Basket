import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PieChart, 
  TrendingUp, 
  Calculator, 
  Shield, 
  Target, 
  Users,
  Home,
  GraduationCap,
  Car,
  Plane
} from 'lucide-react'

const Services = () => {
  const [activeTab, setActiveTab] = useState('products')

  const products = [
    {
      icon: TrendingUp,
      title: "Equity, Debt & Hybrid Mutual Funds",
      description: "Access curated funds in large-cap, mid-cap, sectoral, debt, and balanced categories.",
      features: ["Large-cap funds", "Mid-cap growth", "Sectoral exposure", "Debt instruments", "Balanced portfolios"],
      color: "bg-blue-500"
    },
    {
      icon: PieChart,
      title: "Systematic Investment Plans (SIPs)",
      description: "Automate investing with easy SIP plans. Choose amount and frequency for hassle-free investing.",
      features: ["Automated investing", "Flexible amounts", "Monthly/quarterly", "Easy management", "Goal tracking"],
      color: "bg-emerald-500"
    },
    {
      icon: Shield,
      title: "Tax-Saving Funds (ELSS)",
      description: "Invest in ELSS funds to save on taxes under Sec. 80C with efficient tax-saving portfolios.",
      features: ["Section 80C benefits", "3-year lock-in", "Equity exposure", "Tax optimization", "Professional management"],
      color: "bg-purple-500"
    },
    {
      icon: Target,
      title: "Goal-Based Plans",
      description: "Save for specific goals like retirement, education, or buying a home with optimal strategy.",
      features: ["Retirement planning", "Education funds", "Home purchase", "Timeline optimization", "Custom allocation"],
      color: "bg-orange-500"
    },
    {
      icon: Users,
      title: "Custom Portfolios",
      description: "Work one-on-one with our advisors for tailored investment plans and personalized strategies.",
      features: ["Personal advisor", "Custom allocation", "Regular reviews", "Risk assessment", "Flexible approach"],
      color: "bg-indigo-500"
    }
  ]

  const calculators = [
    {
      icon: Calculator,
      title: "SIP Calculator",
      description: "See how your monthly SIPs can grow over time with different rates of return",
      link: "#sip-calculator"
    },
    {
      icon: Target,
      title: "Goal Planner",
      description: "Map investments to life goals and visualize your progress towards achieving them",
      link: "#goal-planner"
    },
    {
      icon: Shield,
      title: "Tax-Saving Calculator",
      description: "Estimate tax savings with ELSS investments and maximize your deductions",
      link: "#tax-calculator"
    },
    {
      icon: TrendingUp,
      title: "Lumpsum Calculator",
      description: "Calculate potential returns for one-time investments across different time horizons",
      link: "#lumpsum-calculator"
    },
    {
      icon: Home,
      title: "Retirement Planner",
      description: "Forecast retirement corpus needed and see if your portfolio is on track",
      link: "#retirement-planner"
    }
  ]

  const goalTypes = [
    {
      icon: Home,
      title: "Dream Home",
      description: "Plan and save for your home purchase with targeted investment strategies",
      timeline: "5-10 years",
      color: "bg-blue-500"
    },
    {
      icon: GraduationCap,
      title: "Child's Education",
      description: "Secure your child's educational future with dedicated education funds",
      timeline: "10-18 years",
      color: "bg-emerald-500"
    },
    {
      icon: Users,
      title: "Retirement",
      description: "Build a substantial retirement corpus for financial independence",
      timeline: "20-30 years",
      color: "bg-purple-500"
    },
    {
      icon: Car,
      title: "Vehicle Purchase",
      description: "Save for your dream car with short to medium-term investment plans",
      timeline: "2-5 years",
      color: "bg-orange-500"
    },
    {
      icon: Plane,
      title: "Travel & Vacation",
      description: "Fund your travel dreams with flexible savings and investment options",
      timeline: "1-3 years",
      color: "bg-indigo-500"
    }
  ]

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-primary-900 to-primary-800">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Products & <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A full suite of mutual-fund based investment services designed to help you achieve your financial goals
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-primary-800/50 rounded-xl p-2 backdrop-blur-sm relative">
            {[
              { id: 'products', label: 'Investment Products' },
              { id: 'goals', label: 'Goal-Based Planning' },
              { id: 'calculators', label: 'Tools & Calculators' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-orange-500 rounded-lg shadow-lg"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Investment Products Tab */}
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => {
                const Icon = product.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="card-glow p-8 h-full hover:scale-105 transition-all duration-300">
                      <div className={`${product.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4">
                        {product.title}
                      </h3>
                      
                      <p className="text-gray-300 mb-6">
                        {product.description}
                      </p>

                      <ul className="space-y-2">
                        {product.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                            <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Goal-Based Planning Tab */}
        {activeTab === 'goals' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Plan for Life's Important Milestones</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Whether you're saving for a home, your child's education, or retirement, our goal-based investment plans help you achieve your dreams systematically.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {goalTypes.map((goal, index) => {
                const Icon = goal.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="card-glow p-8 h-full hover:scale-105 transition-all duration-300">
                      <div className={`${goal.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4">
                        {goal.title}
                      </h3>
                      
                      <p className="text-gray-300 mb-4">
                        {goal.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Timeline:</span>
                        <span className="text-sm font-semibold text-orange-400">{goal.timeline}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Calculators Tab */}
        {activeTab === 'calculators' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Financial Planning Tools</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Use our interactive calculators to plan your investments and visualize your financial future
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {calculators.map((calculator, index) => {
                const Icon = calculator.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <a href={calculator.link} className="block">
                      <div className="card-glow p-8 h-full hover:scale-105 transition-all duration-300 cursor-pointer">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-4">
                          {calculator.title}
                        </h3>
                        
                        <p className="text-gray-300">
                          {calculator.description}
                        </p>

                        <div className="mt-6 text-orange-400 font-semibold group-hover:text-orange-300 transition-colors">
                          Try Calculator →
                        </div>
                      </div>
                    </a>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card-glow p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Investment Journey?
            </h3>
            <p className="text-gray-300 mb-6">
              Whether you're saving regularly or investing a lump sum, Fortune Blue Bell has a solution designed to help you achieve your financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3">
                Explore Products
              </button>
              <button className="btn-secondary px-8 py-3">
                Try Our Calculators
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 