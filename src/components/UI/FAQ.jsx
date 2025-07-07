import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0)

  const faqs = [
    {
      question: "How do I start investing?",
      answer: "Open an account in a few minutes and complete our simple KYC process. Once approved, you can immediately start a SIP or make a lump-sum investment. Our app will guide you step by step through the entire process."
    },
    {
      question: "Can I withdraw money anytime?",
      answer: "Yes. Mutual funds are generally liquid. You can redeem your investments at any time without penalty. Fund houses usually process redemptions within 1–3 business days. However, ELSS funds have a 3-year lock-in period."
    },
    {
      question: "Are my investments safe?",
      answer: "Fortune Basket is a SEBI-registered mutual fund distributor. We partner only with regulated asset management companies. Your funds are held by independent custodians, just as they would be directly with the fund. That said, all investing carries market risk – the value of your investments can go down as well as up."
    },
    {
      question: "What fees does Fortune Basket charge?",
      answer: "We charge a simple annual fee (0.60% p.a.) to manage your portfolio, with no hidden charges. This fee is built into the platform so you always see net returns. There are no transaction fees or exit loads beyond what the funds themselves charge. We believe in full transparency."
    },
    {
      question: "What risks should I be aware of?",
      answer: "Like any stock-market-linked investment, mutual funds involve risk. The value of your investments can go down as well as up. You should invest only after reading the fund's scheme documents. We provide all required information so you can make informed choices. We also recommend diversifying across different fund types to mitigate risk."
    },
    {
      question: "How do I get help if I have questions?",
      answer: "Our customer support team is ready to assist via email or chat. We also have a detailed Help Center and educational resources built into the app. If you prefer a human touch, our advisors can speak with you directly to clarify any doubts at no extra cost."
    },
    {
      question: "What is the minimum investment amount?",
      answer: "You can start investing with as little as ₹1,000 per month through SIPs. For lump sum investments, the minimum amount varies by fund but typically starts from ₹5,000. This makes investing accessible to everyone."
    },
    {
      question: "How often can I monitor my investments?",
      answer: "You can monitor your portfolio 24/7 through our real-time dashboard. Get instant reports, performance charts, and goal progress updates. We also send smart notifications to keep you informed about important developments."
    },
    {
      question: "What makes Fortune Basket different?",
      answer: "We combine low-cost passive investing with smart technology and human expertise. Our platform offers goal-based planning, automated rebalancing, and transparent fee structure. We focus on index funds and ETFs to minimize costs while maximizing market exposure."
    },
    {
      question: "Can I change my SIP amount or frequency?",
      answer: "Yes, you have complete flexibility to modify your SIP amount, change frequency, or pause/resume SIPs anytime. Our platform makes it easy to adjust your investments as your financial situation changes."
    }
  ]

  const categories = [
    { name: "Getting Started", icon: "🚀", count: 3 },
    { name: "Safety & Security", icon: "🛡️", count: 2 },
    { name: "Fees & Charges", icon: "💰", count: 2 },
    { name: "Platform Features", icon: "⚡", count: 3 }
  ]

  return (
    <section id="faq" className="section-padding bg-gradient-to-b from-primary-900 to-primary-800">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about investing with Fortune Basket
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <div key={index} className="card-glow p-4 text-center hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-sm font-semibold text-white mb-1">{category.name}</div>
              <div className="text-xs text-gray-400">{category.count} questions</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-glow overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <Minus className="h-5 w-5 text-orange-400" />
                      ) : (
                        <Plus className="h-5 w-5 text-orange-400" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Help */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="card-glow p-6"
              >
                <div className="flex items-center mb-4">
                  <HelpCircle className="h-6 w-6 text-orange-400 mr-3" />
                  <h3 className="text-lg font-semibold">Need More Help?</h3>
                </div>
                <p className="text-gray-300 mb-4 text-sm">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="space-y-3">
                  <button className="btn-primary w-full py-2 text-sm">
                    Chat with Support
                  </button>
                  <button className="btn-secondary w-full py-2 text-sm">
                    Email Us
                  </button>
                </div>
              </motion.div>

              {/* Investment Tips */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card-glow p-6"
              >
                <h3 className="text-lg font-semibold mb-4">💡 Investment Tips</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Start early to benefit from compounding
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Diversify across different fund types
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Stay invested for the long term
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Review and rebalance periodically
                  </li>
                </ul>
              </motion.div>

              {/* Legal Notice */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="card-glow p-6"
              >
                <h3 className="text-lg font-semibold mb-4">⚠️ Important Notice</h3>
                <div className="text-xs text-gray-400 space-y-2">
                  <p>Investments are subject to market risks. Please read all scheme information carefully before investing.</p>
                  <p>Past performance is not indicative of future returns. No returns are guaranteed.</p>
                  <p>Fortune Basket is registered with SEBI/AMFI and complies with all regulatory requirements.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card-glow p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Our expert team is available to help you understand investing and choose the right strategy for your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3">
                Talk to an Expert
              </button>
              <button className="btn-secondary px-8 py-3">
                View Help Center
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ 