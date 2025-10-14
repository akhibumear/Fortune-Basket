import React from 'react'
import { motion } from 'framer-motion'
import { 
  Smartphone, 
  Shield, 
  TrendingUp, 
  Users, 
  Target, 
  BarChart3,
  Clock,
  Award
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Easy Onboarding",
      description: "Sign up online in minutes, complete a simple KYC, and set your financial goals instantly.",
      details: ["Quick registration", "Digital KYC process", "Goal-based setup"],
      color: "bg-emerald-500"
    },
    {
      icon: Target,
      title: "Personalized Portfolios",
      description: "Pick an investment style or goal-based plan. Our experts build diversified portfolios for you.",
      details: ["Risk-based allocation", "Goal-oriented planning", "Expert curation"],
      color: "bg-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Low-Cost, Passive Funds",
      description: "We use low-cost passive mutual funds and ETFs for broad market exposure at minimal fees.",
      details: ["Index funds", "ETF-based approach", "Minimal expense ratios"],
      color: "bg-orange-500"
    },
    {
      icon: BarChart3,
      title: "Tech-Driven Insights",
      description: "Smart algorithms and human expertise constantly analyze market data to optimize your returns.",
      details: ["AI-powered analysis", "Human oversight", "Continuous optimization"],
      color: "bg-purple-500"
    },
    {
      icon: Shield,
      title: "Ethical Investing",
      description: "Choose ESG/ethical portfolios that invest in companies with positive social impact.",
      details: ["ESG screening", "Impact investing", "Values-aligned portfolios"],
      color: "bg-green-500"
    },
    {
      icon: Clock,
      title: "Real-Time Tracking",
      description: "Monitor portfolio performance and goal progress 24/7 with instant reports and alerts.",
      details: ["Live dashboard", "Progress tracking", "Smart notifications"],
      color: "bg-indigo-500"
    }
  ]

  return (
    <section id="features" className="section-padding bg-gradient-to-b from-primary-800 to-primary-900">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Key <span className="text-gradient">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to invest with confidence and achieve your financial goals
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="card-glow p-8 h-full hover:scale-105 transition-all duration-300">
                  {/* Icon */}
                  <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature Details */}
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-400">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              How It <span className="text-gradient">Works</span>
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Get started with Fortune Blue Bell in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up",
                description: "Create your account and complete KYC verification online"
              },
              {
                step: "02", 
                title: "Set Goals",
                description: "Define your financial objectives and risk tolerance"
              },
              {
                step: "03",
                title: "Get Portfolio",
                description: "Receive your personalized, expert-curated investment plan"
              },
              {
                step: "04",
                title: "Start Growing",
                description: "Begin your SIPs and watch your wealth grow over time"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent"></div>
                  )}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card-glow p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-orange-400 mr-3" />
              <h3 className="text-2xl font-bold">Start Your Investment Journey</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Join thousands of investors who trust Fortune Blue Bell to grow their wealth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3">
                Get Started Now
              </button>
              <button className="btn-secondary px-8 py-3">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features 