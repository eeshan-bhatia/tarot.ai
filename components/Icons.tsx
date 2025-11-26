'use client'

interface IconProps {
  className?: string
  size?: number
}

export function QuestionIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
      <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="17.5" r="1" fill="currentColor"/>
    </svg>
  )
}

export function CardsIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="4" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="8" y="2" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.7"/>
      <path d="M4 8H14M4 12H14M4 16H10" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  )
}

export function ReadingIcon({ className = '', size = 48 }: IconProps) {
  // Star pattern matching the exact card back design
  // Using the same polygon points: 50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
  // Scale the star to fit inside the circle, and make center dot larger
  
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      {/* Outer Circle */}
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* Inner Star - scaled to fit inside circle, centered at 50,50 */}
      <g transform="translate(50, 50) scale(0.85)">
        <path 
          d="M 0 -50 L 11 -15 L 48 -15 L 18 7 L 29 41 L 0 20 L -29 41 L -18 7 L -48 -15 L -11 -15 Z"
          fill="currentColor" 
          opacity="0.6"
          style={{
            filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))'
          }}
        />
      </g>
      {/* Center Dot - slightly smaller */}
      <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.8"/>
    </svg>
  )
}

export function CrystalBallIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="10" r="7" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
      <ellipse cx="12" cy="16" rx="8" ry="3" fill="currentColor" opacity="0.2"/>
      <path d="M8 10C8 7.79 9.79 6 12 6C14.21 6 16 7.79 16 10" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="10" r="2" fill="currentColor" opacity="0.6"/>
    </svg>
  )
}

export function AIIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Neural network / AI brain pattern */}
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <circle cx="16" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <circle cx="12" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M8 8L12 16M16 8L12 16M8 8L16 8" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.8"/>
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
    </svg>
  )
}

export function ArtIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
      <path d="M8 8L12 4L16 8L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16L12 20L16 16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  )
}

export function LightningIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" fill="currentColor" opacity="0.8"/>
      <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

export function NumberOneIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
      <path d="M12 6V18M12 6L8 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function MagicOrbIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Outer glow */}
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1"/>
      {/* Main orb */}
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* Inner glow */}
      <circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.15"/>
      {/* Mystical energy lines */}
      <path d="M12 4L12 8M12 16L12 20M4 12L8 12M16 12L20 12" 
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      {/* Diagonal energy lines */}
      <path d="M6 6L9 9M15 9L18 6M18 18L15 15M9 15L6 18" 
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      {/* Central core */}
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.6"/>
      {/* Sparkles */}
      <circle cx="8" cy="8" r="0.5" fill="currentColor" opacity="0.6"/>
      <circle cx="16" cy="8" r="0.5" fill="currentColor" opacity="0.6"/>
      <circle cx="8" cy="16" r="0.5" fill="currentColor" opacity="0.6"/>
      <circle cx="16" cy="16" r="0.5" fill="currentColor" opacity="0.6"/>
    </svg>
  )
}

