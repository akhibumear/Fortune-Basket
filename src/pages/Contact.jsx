import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@fortunebasket.in",
      description: "Get expert help via email"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "1800-XXX-XXXX",
      description: "Speak to our investment experts"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Mumbai, India",
      description: "SEBI registered office"
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Fri 9AM-6PM",
      description: "Indian Standard Time"
    }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
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
            <MessageCircle className="h-16 w-16 text-orange-400 mx-auto mb-6" />
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions about investing? Need personalized advice? Our team of experts 
              is here to help you make informed investment decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-primary-800">
        <div className="container-custom mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-glow p-6 text-center"
                >
                  <Icon className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                  <p className="text-orange-400 font-semibold mb-2">{info.content}</p>
                  <p className="text-gray-400 text-sm">{info.description}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="card-glow p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="investment-advice">Investment Advice</option>
                    <option value="account-support">Account Support</option>
                    <option value="sip-planning">SIP Planning</option>
                    <option value="tax-saving">Tax Saving Investments</option>
                    <option value="general-inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="card-glow p-8">
                <h3 className="text-xl font-bold text-white mb-4">Quick Support</h3>
                <p className="text-gray-300 mb-6">
                  Need immediate assistance? Use our live chat feature or call our helpline 
                  for instant support from our investment experts.
                </p>
                <div className="space-y-3">
                  <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    Start Live Chat
                  </button>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    Schedule a Call
                  </button>
                </div>
              </div>

              <div className="card-glow p-8">
                <h3 className="text-xl font-bold text-white mb-4">Investment Consultation</h3>
                <p className="text-gray-300 mb-4">
                  Get personalized investment advice from our certified financial planners. 
                  Book a free consultation to discuss your financial goals.
                </p>
                <ul className="text-gray-300 text-sm space-y-2 mb-6">
                  <li>• Portfolio review and optimization</li>
                  <li>• Goal-based investment planning</li>
                  <li>• Tax-saving strategies</li>
                  <li>• Retirement planning</li>
                </ul>
                <button className="w-full btn-secondary py-3">
                  Book Free Consultation
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="section-padding bg-primary-900">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Important Information</h3>
            <div className="text-sm text-gray-400 max-w-4xl mx-auto leading-relaxed">
              <p className="mb-4">
                <strong>Regulation:</strong> Fortune Blue Bell is a SEBI-registered mutual fund distributor and complies with all regulations. 
                Your investments are held by fund houses under your name, offering an extra layer of custody safety.
              </p>
              <p>
                <strong>Risk Disclaimer:</strong> All investments are subject to market risk. The value of your portfolio will fluctuate and you may lose money. 
                Past performance is no guarantee of future results. Please read all scheme documents carefully before investing.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Contact 