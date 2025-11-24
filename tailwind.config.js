/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['var(--font-cinzel)', 'serif'],
        'playfair': ['var(--font-playfair)', 'serif'],
        'crimson': ['var(--font-crimson)', 'serif'],
      },
      colors: {
        'midnight-black': '#000011',
        'midnight-deep': '#000018',
        'midnight-blue': '#0a0a1a',
        'moonlight': '#ffffff',
        'moon-silver': '#e5e7eb',
        'lake-blue': '#3b82f6',
        'lake-deep': '#1e40af',
        'mystic-purple': '#6366f1',
        'mystic-indigo': '#4f46e5',
        'water-teal': '#06b6d4',
        'ancient-white': '#ffffff',
        'ancient-silver': '#e5e7eb',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'moonlit-lake': 'linear-gradient(180deg, #0a0e27 0%, #0f172a 50%, #1e293b 100%)',
      },
    },
  },
  plugins: [],
}

