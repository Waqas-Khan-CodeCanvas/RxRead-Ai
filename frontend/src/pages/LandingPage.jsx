import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroSection   from '../components/HeroSection'
import FeatureCard   from '../components/FeatureCard'
import TestimonialCard from '../components/TestimonialCard'
import { features, howItWorksSteps, testimonials } from '../data/mockData'

const LandingPage = () => {
  return (
    <div className="bg-slate-900">
      {/* ── Hero ─────────────────────────────── */}
      <HeroSection />

      {/* ── How It Works ─────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-teal-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Simple Process
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-heading"
            >
              How MediRead AI Works
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                {/* Connector line between steps */}
                {i < howItWorksSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] right-[-50%] h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}

                <div className="flex justify-center mb-5">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-teal-500/20 border border-white/10 rounded-2xl flex items-center justify-center text-4xl">
                      {step.icon}
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>
                </div>
                <h3 className="text-white font-display font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────── */}
      <section className="py-24 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Everything You Need
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-heading"
            >
              Built for Every Patient
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 mt-3 max-w-xl mx-auto"
            >
              From rural villages to urban hospitals, MediRead AI helps everyone understand their healthcare.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats band ───────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '94%',    label: 'Average Accuracy' },
              { value: '5',      label: 'Languages Supported' },
              { value: '<5s',    label: 'Analysis Time' },
              { value: '1 in 3', label: 'Patients Misread Rx' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl font-display font-bold gradient-text mb-1">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────── */}
      <section className="py-24 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Real Stories
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-heading"
            >
              Trusted by Patients & Doctors
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600/20 to-teal-600/20 border border-white/10 rounded-3xl p-12"
          >
            <p className="text-4xl mb-4">💊</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Understand Your Prescription?
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Upload a photo right now — no account needed. Get a full breakdown of your medicines in seconds.
            </p>
            <Link to="/upload" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
              Upload Prescription Free →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage