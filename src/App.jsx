import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'

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
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch-all route - redirect any unknown paths to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      
      {!isLandingPage && <Footer />}
      {!isLandingPage && <ScrollToTop />}
    </div>
  )
}

function App() {
  // Get the base path from Vite config for GitHub Pages deployment
  const basename = import.meta.env.MODE === 'production' ? '/Fortune-Blue-Bell' : ''
  
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