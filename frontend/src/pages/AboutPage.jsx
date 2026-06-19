import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiGlobe,
  FiMic,
  FiEye,
  FiTarget,
  FiUsers,
} from "react-icons/fi";

const TEAM = [
  {
    initials: "WK",
    name: "Waqas Khan",
    role: "Full Stack Developer",
    description:
      "Full Stack Python + JavaScript Developer focused on building scalable web and desktop applications. Computer Science student at UET Peshawar.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    initials: "DA",
    name: "Dima Alrahal",
    role: "AI Research & Development",
    description:
      "Artificial Intelligence student passionate about machine learning, intelligent systems, and applying AI to solve real-world healthcare challenges.",
    color: "from-violet-500 to-purple-600",
  },
  {
    initials: "FU",
    name: "Farhat Ullah",
    role: "AI / ML Engineer",
    description:
      "Specialized in NLP, Generative AI, Prompt Engineering, and MLOps. Google Certified professional focused on building reliable AI systems.",
    color: "from-emerald-500 to-teal-600",
  },
];

const ACCESS_GOALS = [
  {
    icon: <FiGlobe className="text-cyan-400" />,
    title: "Language Accessibility",
    desc: "Translate medical instructions into languages patients understand, reducing confusion and improving treatment adherence.",
  },
  {
    icon: <FiMic className="text-violet-400" />,
    title: "Audio Assistance",
    desc: "Provide voice-based explanations for patients who prefer listening over reading.",
  },
  {
    icon: <FiEye className="text-emerald-400" />,
    title: "Clear Understanding",
    desc: "Transform complex medical terminology into simple and understandable explanations.",
  },
  {
    icon: <FiHeart className="text-rose-400" />,
    title: "Patient-Centered Care",
    desc: "Help patients feel more confident and informed about their medications and treatment plans.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-6">
              About RxRead AI
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Making Prescriptions
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Easier to Understand
              </span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              RxRead AI was created to help patients understand handwritten
              prescriptions, medication instructions, and treatment plans
              through AI-powered analysis, language translation, and simplified
              explanations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeUp()}
            className="glass-card p-8 md:p-12 rounded-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiTarget className="text-red-400" size={24} />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Why We Built RxRead AI
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-lg">
              Many patients struggle to understand handwritten prescriptions,
              unfamiliar medicine names, dosage instructions, and medical
              terminology. This confusion can lead to missed doses, medication
              mistakes, and unnecessary stress.
            </p>

            <p className="text-slate-400 leading-relaxed mt-6">
              Our goal is simple: turn complex prescriptions into clear,
              understandable information that helps patients make informed
              healthcare decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Mission
            </h2>

            <p className="text-slate-400 max-w-3xl mx-auto">
              To bridge the gap between medical information and patient
              understanding using accessible, reliable, and multilingual AI
              technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Accuracy",
                desc: "Provide structured prescription analysis with clear explanations.",
              },
              {
                icon: "🌍",
                title: "Accessibility",
                desc: "Support multiple languages and diverse patient needs.",
              },
              {
                icon: "🔒",
                title: "Privacy",
                desc: "Respect user data and maintain trust throughout the experience.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="glass-card p-8 text-center rounded-2xl"
              >
                <div className="text-5xl mb-5">{item.icon}</div>

                <h3 className="text-white font-semibold text-xl mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section className="py-20 px-4 bg-slate-800/20">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Accessibility First
            </h2>

            <p className="text-slate-400 max-w-2xl mx-auto">
              We believe healthcare information should be understandable for
              everyone, regardless of language, literacy level, or technical
              knowledge.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {ACCESS_GOALS.map((goal, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="glass-card p-6 flex gap-4 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                  {goal.icon}
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">
                    {goal.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {goal.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FiUsers className="text-cyan-400" size={20} />
              <span className="text-cyan-400 font-medium">Meet The Team</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built By Real People
            </h2>

            <p className="text-slate-400 max-w-2xl mx-auto">
              RxRead AI is built by a small team passionate about combining
              software engineering and artificial intelligence to improve
              healthcare accessibility.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((member, index) => (
              <motion.div
                key={index}
                {...fadeUp(index * 0.1)}
                className="glass-card p-8 rounded-3xl"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-xl font-bold mb-5`}
                >
                  {member.initials}
                </div>

                <h3 className="text-white font-semibold text-xl mb-1">
                  {member.name}
                </h3>

                <p className="text-cyan-400 text-sm mb-4">{member.role}</p>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp()}
            className="glass-card p-10 md:p-14 text-center rounded-3xl"
          >
            <div className="text-5xl mb-5">🚀</div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Try RxRead AI?
            </h2>

            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Upload a prescription and get a clearer understanding of medicines,
              dosage instructions, and treatment details in seconds.
            </p>

            <Link
              to="/upload"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/20"
            >
              Analyze Prescription
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;