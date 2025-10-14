import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  const faqs = [
    {
      question: "How do I start investing?",
      answer: "Open a Fortune Blue Bell account online or via our app in just a few minutes. Complete a simple KYC (Know Your Customer) form and submit any required documents (like ID and proof of address). Once approved, you can immediately set up a SIP or make a lump-sum investment. Our onboarding flow and app guidance will walk you through each step."
    },
    {
      question: "Can I withdraw money anytime?",
      answer: "Yes. Mutual funds are generally liquid. You can redeem your investments at any time, subject to standard processing times. Fund houses usually complete redemptions within 1–3 business days. Keep in mind, however, that mutual fund values can rise or fall during that period due to market movements."
    },
    {
      question: "Are my investments safe?",
      answer: "We are a SEBI-registered mutual fund distributor and all our fund partners are AMFI- or SEBI-regulated asset management companies. Your invested funds are held in your name by independent custodians (the fund houses or trustee companies), just as they would be if you invested directly. We never have custody of your cash or securities. That said, market risk applies: your portfolio's value can go down as well as up."
    },
    {
      question: "What fees does Fortune Blue Bell charge?",
      answer: "We charge a simple annual management fee (for example, 0.60% p.a.) to cover our services; there are no hidden fees or commissions. This fee is built into the platform so you always see your net returns. We do not charge separate transaction fees or exit loads beyond the nominal charges inherent in the mutual funds themselves. Our fee structure is fully transparent and competitive with other robo-advisors."
    },
    {
      question: "What risks should I be aware of?",
      answer: "All equity-linked investments carry risk. The value of any mutual fund can go down as well as up with market fluctuations. As an investor, you should read each fund's Scheme Information Document to understand its objectives and risks. We provide these documents and a performance history for every fund. Diversification helps mitigate risk by spreading investments across multiple funds and asset classes, but it does not eliminate it. Please invest only amounts you can afford to keep invested for the long term."
    },
    {
      question: "How do I get help if I have questions?",
      answer: "Our customer support team is ready to assist via email or live chat in the app. We also provide a detailed in-app Help Center and educational blog resources. If you prefer speaking to an expert, our advisors are available for consultation (at no extra cost) to discuss your goals and any questions you have."
    }
  ]

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
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
        <div className="container-custom mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HelpCircle className="h-16 w-16 text-orange-400 mx-auto mb-6" />
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Find answers to common questions about investing with Fortune Blue Bell. 
              Can't find what you're looking for? Contact our support team.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-primary-800">
        <div className="container-custom mx-auto max-w-4xl">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-glow overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-orange-400" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">No FAQs found matching your search.</div>
              <button
                onClick={() => setSearchTerm('')}
                className="text-orange-400 hover:text-orange-300 font-semibold"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="container-custom mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-white/90 mb-6">
              Our support team is here to help you get started with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-500 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                Contact Support
              </button>
              <button className="bg-white/20 text-white hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors">
                Live Chat
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default FAQ 