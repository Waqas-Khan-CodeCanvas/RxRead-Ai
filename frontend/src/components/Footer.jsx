import React from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-white/5 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <span className="text-white font-display font-bold text-lg">
                RxRead <span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Making healthcare accessible by helping patients understand their prescriptions in their own language.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Home',              path: '/'       },
                { label: 'Upload Prescription', path: '/upload' },
                { label: 'About Us',          path: '/about'  },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-slate-400 hover:text-teal-400 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mission */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Mission</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Built for the 1 in 3 patients who misunderstand their prescriptions. We believe language and literacy should never be a barrier to proper healthcare.
            </p>
            <div className="flex gap-3 mt-4">
              {[FiGithub, FiTwitter, FiLinkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © 2024 RxRead AI. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            Made with <FiHeart className="text-red-400" size={14} /> for better healthcare access
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer