export default function GlowBackground({ color, intensity = 0.5, size = 700 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* base black */}
      <div className="absolute inset-0 bg-black" />

      {/* soft glow orb */}
      <div
        className="absolute left-1/2 top-1/2 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
          filter: "blur(60px)", // lighter than before (important for performance)
          opacity: intensity,
          willChange: "transform",
        }}
      />
    </div>
  )
}