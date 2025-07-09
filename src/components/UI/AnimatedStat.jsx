import React from 'react'
import { useInView } from 'react-intersection-observer'
import useCountUp from '../../hooks/useCountUp'

const AnimatedStat = ({ value, label, duration = 2000, className = "" }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  // Parse the value to extract number and formatting
  const parseValue = (val) => {
    // Handle different formats: "₹500 Cr+", "10,000+", "12%+", "0.60%"
    const match = val.match(/([₹]?)(\d+(?:,\d{3})*(?:\.\d+)?)([%]?)([A-Za-z+]*)/);
    if (match) {
      const [, prefix, number, percentSign, suffix] = match;
      return {
        prefix: prefix || '',
        number: parseFloat(number.replace(/,/g, '')),
        percentSign: percentSign || '',
        suffix: suffix || ''
      };
    }
    return { prefix: '', number: 0, percentSign: '', suffix: '' };
  }

  const { prefix, number, percentSign, suffix } = parseValue(value)
  const animatedNumber = useCountUp(number, duration, 0, inView)

  // Format the animated number
  const formatNumber = (num) => {
    if (num >= 1000 && suffix.includes('Cr')) {
      return Math.floor(num).toLocaleString('en-IN')
    }
    if (num >= 1000) {
      return Math.floor(num).toLocaleString('en-IN')
    }
    if (percentSign) {
      return num.toFixed(num < 1 ? 2 : 0)
    }
    return Math.floor(num).toString()
  }

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="text-2xl font-bold text-orange-400">
        {prefix}{formatNumber(animatedNumber)}{percentSign}{suffix}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}

export default AnimatedStat 