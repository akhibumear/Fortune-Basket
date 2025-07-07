import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Marketing Manager",
      location: "Mumbai",
      rating: 5,
      text: "Fortune Basket made investing easy and even fun. I can track my goals on the app and see my money grow over time. The portfolio recommendations match my risk appetite perfectly!",
      avatar: "PS",
      color: "bg-blue-500"
    },
    {
      name: "Rajiv Malhotra",
      role: "Software Engineer",
      location: "Bengaluru",
      rating: 5,
      text: "As a busy professional, I love Fortune Basket's auto-SIP feature. I set it up once and forget it, knowing my investments are handled by experts. The app's insights alerts keep me informed without any extra work.",
      avatar: "RM",
      color: "bg-emerald-500"
    },
    {
      name: "Anjali Singh",
      role: "Teacher",
      location: "Delhi",
      rating: 5,
      text: "I was new to mutual funds and a bit scared to start. Fortune Basket's guided process and friendly support helped me understand everything. Now I feel confident planning for my child's education through SIPs.",
      avatar: "AS",
      color: "bg-purple-500"
    },
    {
      name: "Vikram Patel",
      role: "Consultant",
      location: "Pune",
      rating: 5,
      text: "The goal planner is a game-changer. I saw exactly how much I needed to save for retirement and could adjust my SIP easily. Kudos to Fortune Basket for making finance so user-friendly.",
      avatar: "VP",
      color: "bg-orange-500"
    },
    {
      name: "Meera Reddy",
      role: "Doctor",
      location: "Hyderabad",
      rating: 5,
      text: "Fortune Basket's tax-saving ELSS funds helped me optimize my tax planning while building wealth. The platform is transparent and the customer service is excellent.",
      avatar: "MR",
      color: "bg-indigo-500"
    },
    {
      name: "Arjun Gupta",
      role: "Entrepreneur",
      location: "Gurgaon",
      rating: 5,
      text: "The low-cost approach and tech-driven insights impressed me. As someone who values efficiency, Fortune Basket delivers exactly what it promises - smart investing made simple.",
      avatar: "AG",
      color: "bg-amber-500"
    }
  ]

  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: "👥" },
    { label: "Assets Under Management", value: "₹500 Cr+", icon: "💰" },
    { label: "Average Returns", value: "12%+", icon: "📈" },
    { label: "Customer Satisfaction", value: "4.8/5", icon: "⭐" }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-gradient-to-b from-primary-800 to-primary-900">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied investors who trust Fortune Basket with their financial future
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="card-glow p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-orange-400/20">
              <Quote size={48} />
            </div>

            {/* Testimonial Content */}
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-amber-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-gray-100 leading-relaxed text-center mb-8">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-center">
                <div className={`${testimonials[currentTestimonial].color} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}>
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-400">
                    {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-orange-500 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`card-glow p-6 hover:scale-105 transition-all duration-300 cursor-pointer ${
                index === currentTestimonial ? 'ring-2 ring-orange-500' : ''
              }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                "{testimonial.text}"
              </p>

              {/* Customer */}
              <div className="flex items-center">
                <div className={`${testimonial.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card-glow p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Join Our Growing Community
            </h3>
            <p className="text-gray-300 mb-6">
              Become part of thousands of investors who are building wealth with Fortune Basket
            </p>
            <button className="btn-primary px-8 py-3">
              Start Your Success Story
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials 