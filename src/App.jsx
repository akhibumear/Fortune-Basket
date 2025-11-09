import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/UI/LoadingScreen'
import ScrollToTop from './components/UI/ScrollToTop'
import ScrollProgress from './components/UI/ScrollProgress'

// Page Components
import Landing from './pages/Landing'
import Home from './pages/Home'
import Products from './pages/Products'
import Tools from './pages/Tools'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'

// Context
import { AppProvider } from './context/AppContext'

// Error Boundary
import ErrorBoundary from './components/UI/ErrorBoundary'

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

// Layout wrapper to conditionally show/hide navbar and footer
const AppLayout = () => {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  return (
    <div className="App min-h-screen bg-primary-900 text-white">
      {!isLandingPage && <ScrollProgress />}
      {!isLandingPage && <Navbar />}
      
      <main className="relative">
        <Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Landing />} />
              <Route 
                path="/home" 
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Home />
                  </motion.div>
                } 
              />
              <Route 
                path="/products" 
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Products />
                  </motion.div>
                } 
              />
              <Route 
                path="/tools" 
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Tools />
                  </motion.div>
                } 
              />
              <Route 
                path="/about" 
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <About />
                  </motion.div>
                } 
              />
              <Route 
                path="/faq" 
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <FAQ />
                  </motion.div>
                } 
              />
              <Route 
                path="/contact" 
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Contact />
                  </motion.div>
                } 
              />
              {/* Catch-all route - redirect any unknown paths to landing */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      
      {!isLandingPage && <Footer />}
      {!isLandingPage && <ScrollToTop />}
    </div>
  )
}

function App() {
  // Get the base path from Vite config for GitHub Pages deployment
  const basename = import.meta.env.MODE === 'production' ? '/Fortune-Basket' : ''
  
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router basename={basename}>
          <AppLayout />
        </Router>
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App 