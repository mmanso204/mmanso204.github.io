import { motion } from "framer-motion"
import GlowBackground from "./PageBackground"

// ✏️ EDIT THESE — personality traits that define Theresa
const TRAITS = [
  { word: "Bold",    size: "xl" },
  { word: "Kind",     size: "lg" },
  { word: "Hilarious",  size: "md" },
  { word: "100% ghanaian",       size: "xl" },
  { word: "Sleepy",size: "lg" },
  { word: "ambiverted",      size: "md" },
  { word: "annoyed",   size: "sm" },
  { word: "Best sister",       size: "lg" },
  { word: "overstimulated",       size: "sm" },
  { word: "Strong",     size: "xl" },
]

const VIBE = "Equal parts chaos and sunshine — that's Theresa."

const sizeMap = {
  xl: "text-5xl md:text-6xl",
  lg: "text-3xl md:text-4xl",
  md: "text-xl md:text-2xl",
  sm: "text-base md:text-lg",
}

// Different animation durations for organic feel
const durations = {
  xl: "3s",
  lg: "2.5s",
  md: "2s",
  sm: "1.8s",
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const word = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function ThisIsYou() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-8 overflow-hidden bg-black">
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        
        @keyframes breathe-lg {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes breathe-md {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        
        @keyframes breathe-sm {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        
        .animate-breathe-xl {
          animation: breathe ${durations.xl} ease-in-out infinite;
        }
        
        .animate-breathe-lg {
          animation: breathe-lg ${durations.lg} ease-in-out infinite;
        }
        
        .animate-breathe-md {
          animation: breathe-md ${durations.md} ease-in-out infinite;
        }
        
        .animate-breathe-sm {
          animation: breathe-sm ${durations.sm} ease-in-out infinite;
        }
        
        /* Different delays for each word to create wave effect */
        .word-0 { animation-delay: 0s; }
        .word-1 { animation-delay: 0.15s; }
        .word-2 { animation-delay: 0.3s; }
        .word-3 { animation-delay: 0.45s; }
        .word-4 { animation-delay: 0.6s; }
        .word-5 { animation-delay: 0.75s; }
        .word-6 { animation-delay: 0.9s; }
        .word-7 { animation-delay: 1.05s; }
        .word-8 { animation-delay: 1.2s; }
        .word-9 { animation-delay: 1.35s; }
        
        /* Will-change for smoother animation */
        .word-animated {
          will-change: transform;
        }
      `}</style>

      <GlowBackground color="#a855f7" intensity={0.2} />

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-center mb-8 text-neutral-500 font-mono">
          this is you
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-3 mb-8">
          {TRAITS.map((trait, i) => (
            <motion.div
              key={i}
              variants={word}
              className={`word-${i % 10}`}
            >
              <span
                className={`
                  font-black text-white leading-tight select-none inline-block
                  ${sizeMap[trait.size]}
                  animate-breathe-${trait.size}
                  word-animated
                `}
                style={{
                  fontFamily: "'Syne', sans-serif",
                  opacity: trait.size === "sm" ? 0.5 : trait.size === "md" ? 0.7 : 1,
                  display: 'inline-block',
                }}
              >
                {trait.word}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={word}
          className="text-center border-t border-white/10 pt-6"
        >
          <p className="text-neutral-400 text-sm italic leading-relaxed max-w-sm mx-auto">
            "{VIBE}"
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}