import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, TrendingUp, Calculator, Users, HelpCircle, Mail, Package } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const navigationItems = [
    { name: 'Home', path: '/', icon: TrendingUp },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Tools', path: '/tools', icon: Calculator },
    { name: 'About', path: '/about', icon: Users },
    { name: 'FAQ', path: '/faq', icon: HelpCircle },
    { name: 'Contact', path: '/contact', icon: Mail },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-primary-900/95 backdrop-blur-lg border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Fortune Basket
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Invest with Confidence</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group nav-link"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-orange-500/20 text-orange-400' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <motion.div
                      animate={isActive ? { 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <Icon size={18} />
                    </motion.div>
                    <span className="font-medium">{item.name}</span>
                    
                    {/* Sparkle effect for active item */}
                    {isActive && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      />
                    )}
                  </motion.div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-6 py-2.5 text-sm font-semibold"
            >
              Start Investing
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-primary-900/98 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container-custom mx-auto px-4 py-6">
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item, index) => {
                  const isActive = location.pathname === item.path
                  const Icon = item.icon
                  
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={closeMenu}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-orange-500/20 text-orange-400' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                })}
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4 border-t border-white/10"
                >
                  <button className="w-full btn-primary py-3 text-center font-semibold">
                    Start Investing Today
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar 