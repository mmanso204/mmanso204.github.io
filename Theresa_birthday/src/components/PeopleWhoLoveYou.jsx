import { motion } from "framer-motion"
import GlowBackground from "./PageBackground"

// ✏️ EDIT THESE — add everyone who loves Theresa
const PEOPLE = [
  { name: "Mom",        emoji: "💛", message: "My heart, always." },
  { name: "Dad",        emoji: "🌟", message: "So proud of you every day." },
  { name: "Your Name",  emoji: "🎀", message: "Best sister in the whole world!" }, // ✏️ that's you!
  { name: "Friend 1",   emoji: "🌸", message: "You make everything more fun." },
  { name: "Friend 2",   emoji: "🔥", message: "Our adventures are unmatched." },
  { name: "Friend 3",   emoji: "✨", message: "So lucky to know you." },
  { name: "Friend 4",   emoji: "🌙", message: "You light up every room." },
  { name: "Friend 5",   emoji: "💫", message: "Here for every chapter." },
]

// ✏️ Optional — set a big headline number
const LOVE_COUNT = PEOPLE.length

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const card = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

export default function PeopleWhoLoveYou() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 overflow-hidden bg-black">
      <GlowBackground color="#a855f7" intensity={0.2} />
      {/* Background scattered hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {["💛", "✨", "🌸", "💫"].map((e, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-5"
            style={{
              top: `${10 + i * 22}%`,
              left: `${5 + i * 23}%`,
              transform: `rotate(${i * 30}deg)`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div variants={card} className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2 font-mono">
            Theresa, you are loved by
          </p>
          <h2
            className="text-6xl font-black text-white leading-none"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {LOVE_COUNT}
          </h2>
          <p className="text-neutral-400 text-sm mt-1">people in this world (at least)</p>
        </motion.div>

        {/* People cards */}
        <div className="grid grid-cols-2 gap-3">
          {PEOPLE.map((person, i) => (
            <motion.div
              key={i}
              variants={card}
              className="rounded-2xl p-4 border border-white/5 flex items-start gap-3 group hover:border-white/15 transition-colors"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <span className="text-2xl mt-0.5 leading-none">{person.emoji}</span>
              <div className="min-w-0">
                <p
                  className="text-white font-bold text-sm truncate"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {person.name}
                </p>
                <p className="text-neutral-500 text-xs leading-relaxed mt-0.5 italic">
                  "{person.message}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}