'use client'

interface IconProps {
  className?: string
  size?: number
}

export function QuestionIcon({ className = '', size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
      <path d="M12 8C10.34 8 9 9.34 9 11C9 12.66 10.34 14 12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="17" r="1" fill="currentColor"/>
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
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
      <path d="M12 4L13.5 9.5L19 11L13.5 12.5L12 18L10.5 12.5L5 11L10.5 9.5L12 4Z" 
        fill="currentColor" opacity="0.6"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
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

