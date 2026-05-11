import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// ✏️ EDIT THESE
const NAME = "Theresa"
const MESSAGE = "Wishing you a year as beautiful, bright, and unstoppable as you are. We love you endlessly." // ✏️ your message
const FROM = "With love, from everyone who's lucky to know you 💛" // ✏️ sign-off

const CONFETTI_COLORS = ["#f59e0b", "#a855f7", "#ec4899", "#22c55e", "#38bdf8", "#ffffff"]
const CONFETTI_COUNT = 60

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
      size: 4 + Math.random() * 6,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotate: Math.random() * 360,
      shape: Math.random() > 0.5 ? "circle" : "square",
    }))
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "1px",
          }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [p.rotate, p.rotate + 720],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default function HappyBirthday() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-8 overflow-hidden bg-black">
      <Confetti />

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, #f59e0b 0%, #a855f7 40%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 text-center max-w-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Emoji burst */}
        <motion.div
          className="text-5xl mb-6 flex justify-center gap-2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        >
          🎂✨🎉
        </motion.div>

        {/* Main text */}
        <motion.h2
          className="font-black text-white leading-none mb-2"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(3rem, 12vw, 6rem)",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          Happy
        </motion.h2>

        <motion.h2
          className="font-black leading-none mb-2"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(3rem, 12vw, 6rem)",
            color: "transparent",
            WebkitTextStroke: "2px #f59e0b",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          Birthday
        </motion.h2>

        <motion.h2
          className="font-black text-white leading-none mb-8"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(3rem, 12vw, 6rem)",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          {NAME} 🌟
        </motion.h2>

        {/* Message */}
        <motion.p
          className="text-neutral-300 text-base leading-relaxed mb-6 max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {MESSAGE}
        </motion.p>

        {/* Sign off */}
        <motion.p
          className="text-neutral-500 text-sm italic font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          {FROM}
        </motion.p>
      </motion.div>
    </div>
  )
}