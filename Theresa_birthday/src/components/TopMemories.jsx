import { useState } from "react"
import photo0 from "../assets/foto.jpg"
import photo1 from "../assets/foto1.jpg"
import photo2 from "../assets/foto2.jpg"
import photo3 from "../assets/foto3.jpg"
import photo4 from "../assets/foto4.jpg"
import photo5 from "../assets/foto5.jpg"
import photo6 from "../assets/foto6.jpg"
import photo7 from "../assets/foto7.jpg"
import photo8 from "../assets/foto8.jpg"
import photo9 from "../assets/foto9.jpg"
import photo10 from "../assets/foto10.jpg"
import photo11 from "../assets/foto11.jpg"
import GlowBackground from "./PageBackground"

const MEMORIES = [
  { image: photo0, caption: "Memory 0 📸" },
  { image: photo1, caption: "Memory 1 🎉" },
  { image: photo2, caption: "Memory 2 ✨" },
  { image: photo3, caption: "Memory 3 🌟" },
  { image: photo4, caption: "Memory 4 💫" },
  { image: photo5, caption: "Memory 5 🎈" },
  { image: photo6, caption: "Memory 6 🎊" },
  { image: photo7, caption: "Memory 7 🎀" },
  { image: photo8, caption: "Memory 8 🎁" },
  { image: photo9, caption: "Memory 9 🎯" },
  { image: photo10, caption: "Memory 10 🎨" },
  { image: photo11, caption: "Memory 11 🎭" },
]

// Split into 3 rows, cycling through all photos with offsets
const row1 = [...MEMORIES, ...MEMORIES]
const row2 = [...MEMORIES.slice(4), ...MEMORIES, ...MEMORIES.slice(0, 4)]
const row3 = [...MEMORIES.slice(8), ...MEMORIES, ...MEMORIES.slice(0, 8)]

function InfiniteRow({ photos, direction = 1, speed = 35, onSelect }) {
  // Duplicate for seamless loop
  const track = [...photos, ...photos]
  const itemW = 180  // px width of each card
  const gap = 12
  const totalW = photos.length * (itemW + gap)

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-3"
        style={{
          width: "max-content",
          animation: `slide-${direction > 0 ? "left" : "right"} ${speed}s linear infinite`,
        }}
      >
        {track.map((mem, i) => (
          <div
            key={i}
            onClick={() => onSelect(mem)}
            className="relative rounded-2xl overflow-hidden cursor-pointer shrink-0 group"
            style={{ width: itemW, height: 130 }}
          >
            <img src={mem.image} alt={mem.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
              <p className="text-white text-xs font-medium leading-tight">{mem.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TopMemories() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden gap-3">
      <GlowBackground color="#edd464" intensity={0.6} />

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes slide-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slide-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Title */}
      <div className="relative z-10 text-center mb-2">
        <h2 className="text-5xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
          Top Memories
        </h2>
      </div>

      {/* Three sliding rows */}
      <div className="relative z-10 w-full flex flex-col gap-3">
        <InfiniteRow photos={row1} direction={1}  speed={40} onSelect={setSelected} />
        <InfiniteRow photos={row2} direction={-1} speed={32} onSelect={setSelected} />
        <InfiniteRow photos={row3} direction={1}  speed={38} onSelect={setSelected} />
      </div>

      {/* Left / right fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-20"
        style={{ background: "linear-gradient(to right, black, transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-20"
        style={{ background: "linear-gradient(to left, black, transparent)" }} />

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white text-2xl font-bold px-3 py-1 hover:opacity-70"
          >
            ✕
          </button>
          <div className="max-w-4xl w-full px-4" onClick={e => e.stopPropagation()}>
            <img
              src={selected.image}
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
            <p className="text-center text-white mt-3 text-sm">{selected.caption}</p>
          </div>
        </div>
      )}
    </div>
  )
}