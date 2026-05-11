import { useEffect, useState } from "react"
import { motion, animate } from "framer-motion"

import Start from "./components/start_screen"
import YearInNumbers from "./components/YearInNumbers.jsx"
import TopMemories from "./components/TopMemories.jsx"
import HerAnthem from "./components/HerAnthem.jsx"
import ThisIsYou from "./components/ThisIsYou.jsx"
import WhatsNext from "./components/WhatsNext.jsx"
import HappyBirthday from "./components/HappyBirthday.jsx"

const COLORS = [
  "#a855f7",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#a855f7",
  "#f97316",
]

function App() {
  const [active, setActive] = useState(0)
  const [color, setColor] = useState(COLORS[0])

  // smooth color transitions
  useEffect(() => {
    const controls = animate(color, COLORS[active], {
      duration: 1.2,
      onUpdate: (latest) => setColor(latest),
    })

    return () => controls.stop()
  }, [active])

  // simple scroll tracking (snap-based)
  useEffect(() => {
    const handler = () => {
      const index = Math.round(window.scrollY / window.innerHeight)
      setActive(index)
    }

    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory relative">

      {/* 🌈 GLOBAL ORB BACKGROUND (ONLY ONCE) */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-black">
        <motion.div
          className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
            filter: "blur(80px)",
            opacity: 0.5,
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Slides */}
      <section className="h-screen snap-start flex items-center justify-center">
        <Start />
      </section>

      <section className="h-screen snap-start">
        <YearInNumbers />
      </section>

      <section className="h-screen snap-start">
        <TopMemories />
      </section>

      <section className="h-screen snap-start">
        <HerAnthem />
      </section>

      <section className="h-screen snap-start">
        <ThisIsYou />
      </section>

      <section className="h-screen snap-start">
        <WhatsNext />
      </section>

      <section className="h-screen snap-start">
        <HappyBirthday />
      </section>

    </main>
  )
}

export default App