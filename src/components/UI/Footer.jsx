import React from 'react'
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
  Youtube,
  ArrowUp
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerSections = [
    {
      title: "Products",
      links: [
        "Mutual Funds",
        "SIP Plans",
        "ELSS Funds",
        "Goal-Based Plans",
        "Custom Portfolios"
      ]
    },
    {
      title: "Resources",
      links: [
        "SIP Calculator",
        "Goal Planner",
        "Tax Calculator",
        "Investment Guide",
        "Market Insights"
      ]
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Our Team",
        "Careers",
        "Press Releases",
        "Awards"
      ]
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Contact Us",
        "Live Chat",
        "FAQ",
        "Tutorials"
      ]
    }
  ]

  const legalLinks = [
    "Privacy Policy",
    "Terms of Use",
    "Risk Disclosure",
    "Regulatory Information",
    "Grievance Redressal"
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ]

  return (
    <footer className="bg-primary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-custom mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Logo */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gradient">
                    Fortune Basket
                  </span>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  A tech-savvy platform that makes mutual fund investing simple and accessible. 
                  We combine low-cost passive funds with expert insights to help you achieve your financial goals.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-400">
                    <Mail className="h-4 w-4 mr-3 text-orange-400" />
                    <span className="text-sm">support@fortunebasket.com</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Phone className="h-4 w-4 mr-3 text-orange-400" />
                    <span className="text-sm">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="h-4 w-4 mr-3 text-orange-400" />
                    <span className="text-sm">Mumbai, Maharashtra, India</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a 
                          href="#" 
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 pt-8 border-t border-primary-700"
          >
            <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Get market insights, investment tips, and portfolio updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-primary-800 border border-primary-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors"
                />
                <button className="btn-primary px-6 py-2 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Legal Disclaimers */}
        <div className="bg-primary-800/50 border-t border-primary-700">
          <div className="container-custom mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-6"
            >
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Important Legal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-400 leading-relaxed">
                <div>
                  <p className="mb-3">
                    <strong>Market Risk:</strong> Investments are subject to market risks. Please read all scheme information and related documents carefully before investing. Past performance is not indicative of future returns.
                  </p>
                  <p>
                    <strong>Regulation:</strong> Fortune Basket is registered with SEBI/AMFI and complies with all regulatory requirements. Your investments are held with fund houses under your name.
                  </p>
                </div>
                <div>
                  <p className="mb-3">
                    <strong>No Guarantees:</strong> No warranties or representations are made about future returns. Please invest only after considering your personal goals and risk tolerance.
                  </p>
                  <p>
                    <strong>Tax Disclaimer:</strong> Tax benefits depend on individual circumstances and prevailing laws, which may change. Fortune Basket does not provide tax advice.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bg-primary-900 border-t border-primary-700">
          <div className="container-custom mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-sm text-gray-400 mb-4 lg:mb-0"
              >
                © 2024 Fortune Basket. All rights reserved. | SEBI Reg. No: INZ000123456
              </motion.div>

              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-wrap justify-center lg:justify-end gap-4 mb-4 lg:mb-0"
              >
                {legalLinks.map((link, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex space-x-4"
              >
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-orange-500 to-amber-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  )
}

export default Footer 