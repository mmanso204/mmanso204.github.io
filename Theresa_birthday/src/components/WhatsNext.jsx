import { motion } from "framer-motion"
import GlowBackground from "./PageBackground"

// ✏️ EDIT THESE — wishes and predictions for Theresa's year ahead
const WISHES = [
  {
    type: "wish",          // "wish" | "prediction" | "hope"
    icon: "💼",
    text: "That the house market is forgiving and you can buy a house",
  },
  {
    type: "prediction",
    icon: "🌍",
    text: "When you are gone you will visit once a year",
  },
  {
    type: "wish",
    icon: "🎉",
    text: "You will grow with Gods grace and arrive where you want to go",
  },
  {
    type: "hope",
    icon: "💛",
    text: "That you always know how deeply loved you are",
  },
  {
    type: "prediction",
    icon: "✨",
    text: "That 2026-2027 will be your best year yet",
  },
  {
    type: "wish",
    icon: "🥺",
    text: "For some food and maybe some money for your little borther",
  },
]

const typeColors = {
  wish:       { bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)", label: "wish",       labelColor: "#a855f7" },
  prediction: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", label: "prediction", labelColor: "#f59e0b" },
  hope:       { bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.2)",  label: "hope",       labelColor: "#22c55e" },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function WhatsNext() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-8 overflow-hidden bg-black">
      {/* Shooting star background effect */}
      <GlowBackground color="#a855f7" intensity={0.2} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 rounded-full"
            style={{
              height: `${30 + i * 10}px`,
              background: "linear-gradient(to bottom, transparent, #ffffff20)",
              top: `${5 + i * 15}%`,
              left: `${10 + i * 14}%`,
              transform: "rotate(45deg)",
            }}
            animate={{ opacity: [0, 0.6, 0], y: [0, 30] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2 + i * 0.8,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-lg"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div variants={item} className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2 font-mono">
            for the year ahead
          </p>
          <h2
            className="text-5xl font-black text-white leading-none"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            What's{" "}
            <span className="text-transparent" style={{ WebkitTextStroke: "1px #ffffff55" }}>
              Next
            </span>
          </h2>
        </motion.div>

        {/* Wishes list */}
        <div className="flex flex-col gap-3">
          {WISHES.map((wish, i) => {
            const colors = typeColors[wish.type]
            return (
              <motion.div
                key={i}
                variants={item}
                className="flex items-start gap-4 rounded-2xl p-4 border"
                style={{ background: colors.bg, borderColor: colors.border }}
              >
                <span className="text-2xl leading-none mt-0.5 shrink-0">{wish.icon}</span>
                <div className="min-w-0">
                  <span
                    className="text-xs font-mono uppercase tracking-wider"
                    style={{ color: colors.labelColor }}
                  >
                    {colors.label}
                  </span>
                  <p className="text-white/90 text-sm mt-0.5 leading-relaxed">{wish.text}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}