import React from 'react'
import { motion } from 'framer-motion'

const FeatureCard = ({ icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="glass-card p-6 group cursor-default hover:border-white/20 transition-all duration-300"
    >
      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
        {icon}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2 font-display">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default FeatureCard