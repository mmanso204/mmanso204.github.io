import { motion } from "framer-motion"
import { useState, useRef } from "react"
import album from "../assets/Makoma.jpg"
import songFile from "../assets/Makoma.mp3"
import GlowBackground from "./PageBackground"

const SONG = {
  title: "Makoma",
  artist: "King Paluta",
  album: "Give Time Some Time",
  year: "2024",
  why: "IDK - but you put it on a lot",
  albumArt: album,
  accentColor: "#f59e0b",
}

export default function HerAnthem() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef(null)

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }

    setPlaying(!playing)
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return

    const percent = (audio.currentTime / audio.duration) * 100
    setProgress(percent)
  }

  const handleLoadedMetadata = () => {
    const audio = audioRef.current
    if (!audio) return

    setDuration(audio.duration)
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width

    audio.currentTime = percent * audio.duration
    setProgress(percent * 100)
  }

  const formatTime = (t) => {
    if (!t || isNaN(t)) return "0:00"
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-8 overflow-hidden bg-black">
      {/* Background glow */}
      <GlowBackground color="#a855f7" intensity={0.2} />

      <motion.div
        className="relative z-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Label */}
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6 font-mono text-center">
          Probably favorite song
        </p>

        {/* Album art */}
        <motion.div
          className="w-full aspect-square rounded-2xl mb-6 overflow-hidden"
          style={{ boxShadow: `0 30px 80px ${SONG.accentColor}40` }}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={SONG.albumArt}
            alt={SONG.album}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Info */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-black text-white">
              {SONG.title}
            </h3>
            <p className="text-neutral-400 text-sm">{SONG.artist}</p>
          </div>

          <motion.button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full flex items-center justify-center text-black font-bold"
            style={{ background: SONG.accentColor }}
            whileTap={{ scale: 0.9 }}
          >
            {playing ? "⏸" : "▶"}
          </motion.button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div
            className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: SONG.accentColor,
              }}
            />
          </div>

          <div className="flex justify-between mt-1 text-xs text-neutral-600 font-mono">
            <span>{formatTime((progress / 100) * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Why */}
        <div
          className="rounded-xl p-4 border"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-mono mb-1">
            why this song
          </p>
          <p className="text-sm text-neutral-300 italic">
            "{SONG.why}"
          </p>
        </div>
      </motion.div>

      {/* Audio */}
      <audio
        ref={audioRef}
        src={songFile}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
      />
    </div>
  )
}