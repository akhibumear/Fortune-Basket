import React from 'react'
import { motion } from 'framer-motion'
import { Users, Target, Shield, Award } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Vision",
      description: "We believe investing should be easy and empowering for everyone, not just experts. Fortune Basket was founded to democratize investing, bringing institutional-grade tools to everyday investors."
    },
    {
      icon: Users,
      title: "Our Mission", 
      description: "We combine decades of financial experience with cutting-edge technology. Our mission is to help you achieve more with less effort, from your first SIP to your long-term retirement plan."
    },
    {
      icon: Shield,
      title: "Our Values",
      description: "We hold ourselves to the highest standards of transparency and security. Your data and money are safe with us, backed by SEBI regulation and institutional-grade security."
    },
    {
      icon: Award,
      title: "Our Expertise",
      description: "Our team includes veterans of banking, asset management, and software engineering, backed by a parent company with 20+ years in financial services."
    }
  ]

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
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-gradient">Fortune Basket</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A passionate group of finance professionals, data scientists, and user-experience designers 
              working together to democratize investing through cutting-edge technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-primary-800">
        <div className="container-custom mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-glow p-8"
                >
                  <Icon className="h-12 w-12 text-orange-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default About 