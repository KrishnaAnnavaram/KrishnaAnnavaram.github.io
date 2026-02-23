'use client'

export function GradientFallback() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      {/* Secondary orbs for depth */}
      <div
        className="orb"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2), transparent)',
          bottom: '30%',
          right: '20%',
          animationDelay: '-8s',
          animationDuration: '12s',
        }}
      />
    </div>
  )
}
