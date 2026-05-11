import { motion } from "framer-motion"
import GlowBackground from "./PageBackground"

const NAME = "Theresa"
const BIRTHDAY = "1996-05-11" // YYYY-MM-DD

const today = new Date()
const birth = new Date(BIRTHDAY)
const ageMs = today - birth
const ageYears = Math.floor(ageMs / (1000 * 60 * 60 * 24 * 365.25)+1)
const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24) * 0.3)



const STATS = [
  { value: ageYears, label: "years old" },
  { value: ageDays.toLocaleString(), label: "days of sleeping late" },
  { value: "1000+" , label: "Burned food eaten" },
  { value: "6+", label: "vacations" },
  { value: 34000, label: "meters walked on treadmall (not really) "},

]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function YearInNumbers() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-8 overflow-hidden bg-black">
      {/* Subtle grid background */}
      <GlowBackground color="#d265e6" intensity={0.6} />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div variants={item} className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2 font-mono">
            {NAME}'s wrapped
          </p>
          <h2
            className="text-5xl font-black text-white leading-none"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Theresa's
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px #ffffff55" }}>
              Stats
            </span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              className="border border-white/10 rounded-2xl p-6 flex flex-col gap-1"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <span
                className="text-4xl font-black text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-neutral-400 uppercase tracking-widest font-mono">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}