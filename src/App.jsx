import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/ui/LoadingScreen'

// Page Components
import Home from './pages/Home'
import Products from './pages/Products'
import Tools from './pages/Tools'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'

// Context
import { AppProvider } from './context/AppContext'

// Error Boundary
import ErrorBoundary from './components/ui/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <div className="App min-h-screen bg-primary-900 text-white">
            <Navbar />
            
            <main className="relative">
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Suspense>
            </main>
            
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App 