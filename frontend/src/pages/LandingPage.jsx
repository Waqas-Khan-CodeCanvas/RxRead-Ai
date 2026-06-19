import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import HeroSection from '../components/HeroSection'
import FeatureCard from '../components/FeatureCard'
import TestimonialCard from '../components/TestimonialCard'

import { features, howItWorksSteps, testimonials } from '../data/mockData'

const LandingPage = () => {
  return (
    <div className="bg-slate-900 text-white">

      {/* ── Hero ─────────────────────────────── */}
      <HeroSection />

      {/* ── How It Works ─────────────────────── */}
      <section className="py-28 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-teal-400 text-xs tracking-[0.2em] uppercase mb-3"
            >
              Simple Process
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-semibold tracking-tight"
            >
              How RxRead AI Works
            </motion.h2>

            <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm md:text-base">
              A quick 3-step flow designed to feel effortless for anyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {howItWorksSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                {/* connector line (lighter, less aggressive) */}
                {i < howItWorksSteps.length - 1 && (
                  <div className="hidden md:block absolute top-14 left-[60%] w-full h-px bg-white/5" />
                )}

                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
                      {step.icon}
                    </div>

                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-xs flex items-center justify-center font-semibold">
                      {i + 1}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-2">
                  {step.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────── */}
      <section className="py-28 px-4 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-blue-400 text-xs uppercase tracking-[0.2em] mb-3">
              Everything You Need
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold">
              Built for Every Patient
            </h2>

            <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
              From rural clinics to urban hospitals, clarity in healthcare should feel universal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* ── Stats ─────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 'AI', label: 'Powered Analysis' },
              { value: '5+', label: 'Languages Supported' },
              { value: '<5s', label: 'Processing Time' },
              { value: '24/7', label: 'Always Available' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <p className="text-2xl md:text-3xl font-semibold text-cyan-300 mb-1">
                  {stat.value}
                </p>
                <p className="text-slate-400 text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Testimonials ─────────────────────── */}
      <section className="py-28 px-4 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-purple-400 text-xs uppercase tracking-[0.2em] mb-3">
              Real Stories
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold">
              Trusted by Patients & Doctors
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ─────────────────────────────── */}
      <section className="py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-transparent p-12 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-40 blur-2xl bg-cyan-500/10" />

            <div className="relative z-10">

              <div className="text-4xl mb-5">💊</div>

              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Understand your prescription instantly
              </h2>

              <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto mb-8">
                Upload a prescription and get clear instructions, dosage details,
                and multilingual explanations in seconds.
              </p>

              <Link
                to="/upload"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition"
              >
                Upload Prescription →
              </Link>

            </div>
          </motion.div>

        </div>
      </section>

    </div>
  )
}

export default LandingPage