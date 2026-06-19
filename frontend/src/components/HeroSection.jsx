import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiShield, FiGlobe, FiVolume2 } from "react-icons/fi";

const HeroSection = () => {
  const medicines = [
    { name: "Amoxicillin", dose: "500mg", icon: "🛡️" },
    { name: "Paracetamol", dose: "500–1000mg", icon: "💊" },
    { name: "Cetirizine", dose: "10mg", icon: "🌿" },
    { name: "Vitamin C", dose: "1000mg", icon: "⚡" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-28 overflow-hidden">
      
      {/* Background (simplified for realism) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-10 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Subtle grid (reduced intensity) */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <div className="text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/15 bg-cyan-500/10 text-cyan-300 text-sm mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            AI-powered prescription understanding
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1] mb-6"
          >
            Decode handwritten
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              medical prescriptions
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-slate-300 text-base md:text-lg leading-relaxed mb-8"
          >
            Upload a prescription and get clear medicine names, dosage details,
            and simple explanations — designed for patients, not doctors.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
          >
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-md shadow-cyan-500/20 hover:scale-[1.02] transition"
            >
              Analyze Prescription
              <FiArrowRight />
            </Link>

            <Link
              to="/about"
              className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
            >
              Learn more
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-slate-400 mb-16"
          >
            <div className="flex items-center gap-2">
              <FiShield className="text-emerald-400" />
              Privacy-first
            </div>

            <div className="flex items-center gap-2">
              <FiGlobe className="text-cyan-400" />
              Multilingual support
            </div>

            <div className="flex items-center gap-2">
              <FiVolume2 className="text-violet-400" />
              Audio guidance
            </div>
          </motion.div>

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-4xl mx-auto"
          >
            {/* <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/40">

              
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">
                    Analysis report
                  </p>
                  <h3 className="text-white font-medium text-sm mt-1">
                    Prescription processed
                  </h3>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-emerald-400 text-xs font-medium">
                    94% confidence
                  </span>
                </div>
              </div>

              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 p-5">
                {medicines.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.05] transition"
                  >
                    <div className="text-lg mb-2">{m.icon}</div>
                    <h4 className="text-white text-sm font-medium">
                      {m.name}
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">
                      {m.dose}
                    </p>
                  </div>
                ))}
              </div>
            </div> */}

            
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-[60%] h-16 bg-cyan-500/10 blur-3xl rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;