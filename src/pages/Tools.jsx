import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  Target, 
  PiggyBank, 
  TrendingUp,
  Calendar,
  DollarSign,
  BarChart3,
  Percent,
  ArrowRight
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const Tools = () => {
  const [activeCalculator, setActiveCalculator] = useState('sip')
  const { state, actions } = useApp()

  // SIP Calculator Logic
  const calculateSIP = (amount, years, rate) => {
    const monthlyRate = rate / 100 / 12
    const months = years * 12
    const futureValue = amount * (((Math.pow(1 + monthlyRate, months)) - 1) / monthlyRate) * (1 + monthlyRate)
    const totalInvestment = amount * months
    const returns = futureValue - totalInvestment
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      returns: Math.round(returns)
    }
  }

  // Goal Calculator Logic
  const calculateGoal = (targetAmount, years, currentAmount = 0) => {
    const rate = 12 // Assuming 12% annual return
    const monthlyRate = rate / 100 / 12
    const months = years * 12
    
    const futureValueOfCurrent = currentAmount * Math.pow(1 + rate/100, years)
    const remainingAmount = targetAmount - futureValueOfCurrent
    
    let monthlySIP = 0
    if (remainingAmount > 0) {
      monthlySIP = remainingAmount * monthlyRate / (((Math.pow(1 + monthlyRate, months)) - 1) * (1 + monthlyRate))
    }
    
    return {
      monthlySIP: Math.round(monthlySIP),
      futureValueOfCurrent: Math.round(futureValueOfCurrent),
      totalRequired: Math.round(remainingAmount)
    }
  }

  const calculators = [
    {
      id: 'sip',
      name: 'SIP Calculator',
      icon: Calendar,
      description: 'Project how regular SIP investments grow over time',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'goal',
      name: 'Goal Planner',
      icon: Target,
      description: 'Break down your goals into achievable targets',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'lumpsum',
      name: 'Lump Sum Calculator',
      icon: DollarSign,
      description: 'Estimate future value of one-time investment',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      id: 'tax',
      name: 'Tax Saving Calculator',
      icon: Percent,
      description: 'Calculate tax deductions through ELSS investment',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'retirement',
      name: 'Retirement Planner',
      icon: PiggyBank,
      description: 'Forecast corpus needed for retirement',
      gradient: 'from-indigo-500 to-blue-500'
    }
  ]

  // SIP Calculator Component
  const SIPCalculator = () => {
    const [sipAmount, setSipAmount] = useState(state.calculatorData.sip.amount)
    const [sipYears, setSipYears] = useState(state.calculatorData.sip.duration)
    const [sipRate, setSipRate] = useState(state.calculatorData.sip.expectedReturn)
    
    const result = calculateSIP(sipAmount, sipYears, sipRate)

    const updateSIPData = () => {
      actions.updateCalculatorData('sip', {
        amount: sipAmount,
        duration: sipYears,
        expectedReturn: sipRate
      })
    }

    return (
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">Monthly SIP Amount (₹)</label>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={sipAmount}
              onChange={(e) => setSipAmount(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>₹500</span>
              <span className="text-orange-400 font-semibold">₹{sipAmount.toLocaleString()}</span>
              <span>₹50,000</span>
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Investment Period (Years)</label>
            <input
              type="range"
              min="1"
              max="30"
              value={sipYears}
              onChange={(e) => setSipYears(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>1 Year</span>
              <span className="text-orange-400 font-semibold">{sipYears} Years</span>
              <span>30 Years</span>
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Expected Return (%)</label>
            <input
              type="range"
              min="8"
              max="20"
              step="0.5"
              value={sipRate}
              onChange={(e) => setSipRate(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>8%</span>
              <span className="text-orange-400 font-semibold">{sipRate}%</span>
              <span>20%</span>
            </div>
          </div>

          <button
            onClick={updateSIPData}
            className="btn-primary w-full py-3"
          >
            Save Calculation
          </button>
        </div>

        <div className="card-glow p-6">
          <h3 className="text-xl font-bold text-white mb-6">Investment Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Investment</span>
              <span className="text-white font-semibold">₹{result.totalInvestment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Estimated Returns</span>
              <span className="text-emerald-400 font-semibold">₹{result.returns.toLocaleString()}</span>
            </div>
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span className="text-white">Maturity Value</span>
                <span className="text-orange-400 font-bold text-xl">₹{result.futureValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Visual Chart */}
          <div className="mt-6">
            <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${(result.totalInvestment / result.futureValue) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Investment</span>
              <span>Returns</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Goal Planner Component
  const GoalPlanner = () => {
    const [targetAmount, setTargetAmount] = useState(state.calculatorData.goal.targetAmount)
    const [timeHorizon, setTimeHorizon] = useState(state.calculatorData.goal.timeHorizon)
    const [currentSavings, setCurrentSavings] = useState(0)
    
    const result = calculateGoal(targetAmount, timeHorizon, currentSavings)

    return (
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">Goal Amount (₹)</label>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="100000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>₹1L</span>
              <span className="text-orange-400 font-semibold">₹{(targetAmount/100000).toFixed(1)}L</span>
              <span>₹1Cr</span>
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Time Horizon (Years)</label>
            <input
              type="range"
              min="1"
              max="30"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>1 Year</span>
              <span className="text-orange-400 font-semibold">{timeHorizon} Years</span>
              <span>30 Years</span>
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Current Savings (₹)</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              placeholder="Enter current savings"
            />
          </div>
        </div>

        <div className="card-glow p-6">
          <h3 className="text-xl font-bold text-white mb-6">Goal Plan</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Goal Amount</span>
              <span className="text-white font-semibold">₹{targetAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Current Savings Value</span>
              <span className="text-emerald-400 font-semibold">₹{result.futureValueOfCurrent.toLocaleString()}</span>
            </div>
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span className="text-white">Required Monthly SIP</span>
                <span className="text-orange-400 font-bold text-xl">₹{result.monthlySIP.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
              Financial <span className="text-gradient">Tools & Calculators</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Our interactive suite of financial calculators helps you plan and stay on track. 
              Make informed decisions and adjust your strategy as your life changes.
            </p>
          </motion.div>

          {/* Calculator Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {calculators.map((calc, index) => {
              const Icon = calc.icon
              return (
                <motion.button
                  key={calc.id}
                  onClick={() => setActiveCalculator(calc.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative flex items-center space-x-3 px-6 py-3 rounded-lg transition-all duration-300 overflow-hidden ${
                    activeCalculator === calc.id
                      ? 'text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {activeCalculator === calc.id && (
                    <motion.div
                      layoutId="activeCalculator"
                      className="absolute inset-0 bg-orange-500 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold">{calc.name}</span>
                  </span>
                </motion.button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Calculator Content */}
      <section className="section-padding bg-primary-800">
        <div className="container-custom mx-auto">
          {/* Active Calculator Header */}
          <motion.div
            key={activeCalculator}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {(() => {
              const calc = calculators.find(c => c.id === activeCalculator)
              const Icon = calc.icon
              return (
                <>
                  <div className={`w-20 h-20 bg-gradient-to-r ${calc.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">{calc.name}</h2>
                  <p className="text-gray-300 text-lg">{calc.description}</p>
                </>
              )
            })()}
          </motion.div>

          {/* Calculator Component */}
          <motion.div
            key={activeCalculator}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {activeCalculator === 'sip' && <SIPCalculator />}
            {activeCalculator === 'goal' && <GoalPlanner />}
            {activeCalculator === 'lumpsum' && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">Lump Sum Calculator</div>
                <div className="text-white">Coming Soon...</div>
              </div>
            )}
            {activeCalculator === 'tax' && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">Tax Saving Calculator</div>
                <div className="text-white">Coming Soon...</div>
              </div>
            )}
            {activeCalculator === 'retirement' && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">Retirement Planner</div>
                <div className="text-white">Coming Soon...</div>
              </div>
            )}
          </motion.div>
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
              Ready to Put Your Plan into Action?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Now that you've calculated your investment needs, take the next step and start investing with Fortune Blue Bell.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center gap-2 text-white group-hover:text-white">
                  Start Investing Now
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 text-white hover:bg-white/30 px-8 py-4 rounded-lg font-semibold transition-colors relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative">Speak to an Expert</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Tools 