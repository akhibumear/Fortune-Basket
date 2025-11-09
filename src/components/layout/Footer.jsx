import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight
} from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Team', path: '/about#team' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' }
    ],
    products: [
      { name: 'Mutual Funds', path: '/products#mutual-funds' },
      { name: 'SIP Plans', path: '/products#sip' },
      { name: 'Tax Saving', path: '/products#tax-saving' },
      { name: 'Goal Planning', path: '/products#goals' }
    ],
    tools: [
      { name: 'SIP Calculator', path: '/tools#sip-calculator' },
      { name: 'Goal Planner', path: '/tools#goal-planner' },
      { name: 'Retirement Planner', path: '/tools#retirement' },
      { name: 'Tax Calculator', path: '/tools#tax-calculator' }
    ],
    support: [
      { name: 'Help Center', path: '/faq' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Customer Support', path: '/support' },
      { name: 'Live Chat', path: '/chat' }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ]

  return (
    <footer className="bg-primary-900 border-t border-white/10">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-custom mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Market Insights
            </h3>
            <p className="text-gray-400 mb-8">
              Get expert investment tips, market updates, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <motion.input
                type="email"
                placeholder="Enter your email"
                whileFocus={{ scale: 1.02, borderColor: "rgba(249, 115, 22, 0.5)" }}
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(249, 115, 22, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-6 py-3 flex items-center justify-center relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center gap-2">
                  Subscribe
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Fortune Blue Bell</h3>
                <p className="text-sm text-gray-400">Invest with Confidence</p>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              A fintech-driven robo-advisor platform that democratizes investing, bringing institutional-grade tools to everyday investors through cutting-edge technology.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@fortunebasket.in</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 inline-block"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2"
                    >
                      {link.name}
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-orange-400"
                      >
                        →
                      </motion.span>
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 inline-block"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2"
                    >
                      {link.name}
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-orange-400"
                      >
                        →
                      </motion.span>
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Tools</h4>
            <ul className="space-y-3">
              {footerLinks.tools.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 inline-block"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2"
                    >
                      {link.name}
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-orange-400"
                      >
                        →
                      </motion.span>
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 inline-block"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2"
                    >
                      {link.name}
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-orange-400"
                      >
                        →
                      </motion.span>
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/10 pt-8 mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-6 sm:mb-0">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                )
              })}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-orange-400 transition-colors">
                Terms of Use
              </Link>
              <Link to="/disclaimer" className="hover:text-orange-400 transition-colors">
                Risk Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="border-t border-white/10 bg-primary-950">
        <div className="container-custom mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="text-sm text-gray-400">
              <p className="mb-2">
                <strong>Risk Disclaimer:</strong> All investments are subject to market risk. The value of your portfolio will fluctuate and you may lose money. 
                Past performance is no guarantee of future results.
              </p>
              <p className="mb-2">
                <strong>Regulation:</strong> Fortune Blue Bell is a SEBI-registered mutual fund distributor. 
                Your investments are held by fund houses under your name for custody safety.
              </p>
              <p>
                <strong>Tax Disclaimer:</strong> Any tax benefits depend on individual circumstances and prevailing laws. 
                Fortune Blue Bell does not provide tax advice. Please consult a tax professional.
              </p>
            </div>
            
            <div className="border-t border-white/5 pt-6">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} Fortune Blue Bell. All rights reserved. | 
                This website/app is for information purposes only and does not constitute a solicitation or offer to invest in any security. 
                Your capital is at risk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 