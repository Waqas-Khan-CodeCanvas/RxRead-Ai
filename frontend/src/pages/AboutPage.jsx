import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiGlobe, FiMic, FiEye, FiTarget, FiUsers } from 'react-icons/fi'

const TEAM = [
  { initials: 'AK', name: 'Arham Khan',    role: 'AI & Backend Lead',   color: 'from-blue-500 to-indigo-500'  },
  { initials: 'SR', name: 'Sara Rehman',   role: 'Product & UX Design',  color: 'from-teal-500 to-cyan-500'   },
  { initials: 'BM', name: 'Bilal Mahmood', role: 'Frontend Engineering', color: 'from-purple-500 to-pink-500' },
  { initials: 'NA', name: 'Nadia Akhtar',  role: 'Medical Advisor',      color: 'from-orange-500 to-red-500'  },
]

const ACCESS_GOALS = [
  { icon: <FiGlobe className="text-blue-400" />,  title: 'Language Access',    desc: 'Every prescription available in the patient\'s native language — Urdu, Pashto, Punjabi, Arabic, and more.' },
  { icon: <FiMic className="text-purple-400" />,  title: 'Audio Readout',      desc: 'Full text-to-speech support for users with low literacy or visual impairments.' },
  { icon: <FiEye className="text-teal-400" />,    title: 'Clear Typography',   desc: 'High-contrast, large-text design that works for elderly and visually impaired users.' },
  { icon: <FiHeart className="text-red-400" />,   title: 'Caregiver Support',  desc: 'Family members and caregivers can understand and manage complex medication schedules.' },
]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true },
  transition: { duration: 0.5, delay },
})

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-20">

      {/* ── Hero ─────────────────────────────── */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp()}>
            <p className="text-teal-400 font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Healthcare Should Be <span className="gradient-text">Understood</span> by Everyone
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              RxRead AI was born from a simple observation: millions of patients receive prescriptions they cannot read, in a language they don't understand, in handwriting they cannot decipher. We built the tool we wish existed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Problem Statement ─────────────────── */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="glass-card p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <FiTarget className="text-red-400" size={24} />
              <h2 className="text-2xl font-display font-bold text-white">The Problem We're Solving</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { stat: '1 in 3', desc: 'patients misunderstand their prescription instructions' },
                { stat: '50%',    desc: 'of prescriptions in Pakistan are in English only' },
                { stat: '40%',    desc: 'of medication errors are caused by misread instructions' },
              ].map((item, i) => (
                <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 text-center">
                  <p className="text-3xl font-display font-bold text-red-400 mb-2">{item.stat}</p>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-300 leading-relaxed">
              When patients cannot understand their prescriptions, they skip doses, take wrong amounts, or mix incompatible medicines. This is not a literacy problem — it's a design problem. And design problems have design solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="section-heading mb-4">Our Mission</h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              To make every prescription understandable, regardless of language, literacy level, or geography — using technology that respects patient dignity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Accuracy First',    desc: 'We never guess. Every AI output includes a confidence score. When accuracy is low, we say so clearly.' },
              { icon: '🌍', title: 'Local Languages',   desc: 'Urdu, Pashto, Punjabi, and Arabic are not "additional" features — they are core to what we build.' },
              { icon: '🔒', title: 'Privacy Always',    desc: 'Medical data is sacred. We process prescriptions without storing them. No data brokers. No ads.' },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="glass-card p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-white font-display font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accessibility Goals ───────────────── */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="section-heading mb-4">Accessibility Goals</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              We design for the most vulnerable users first. If a 70-year-old in a rural area with low literacy can use RxRead AI, it works for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ACCESS_GOALS.map((goal, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="glass-card p-6 flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
                  {goal.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{goal.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{goal.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FiUsers className="text-teal-400" size={20} />
              <h2 className="section-heading">Team Vision</h2>
            </div>
            <p className="text-slate-400 max-w-xl mx-auto">
              We are a team of engineers, designers, and healthcare advocates united by one belief: technology can close the gap between patients and their care.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="glass-card p-6 text-center">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg`}>
                  {member.initials}
                </div>
                <p className="text-white font-semibold text-sm">{member.name}</p>
                <p className="text-slate-400 text-xs mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp()} className="glass-card p-10">
            <p className="text-3xl mb-4">🤝</p>
            <h2 className="text-2xl font-display font-bold text-white mb-4">Join Our Mission</h2>
            <p className="text-slate-400 mb-8">
              Whether you're a patient, doctor, NGO, or developer — there's a role for you in making healthcare communication accessible.
            </p>
            <Link to="/upload" className="btn-primary inline-flex items-center gap-2">
              Try RxRead AI Free →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage