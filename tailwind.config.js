/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#0B0B0D',
        card: '#111113',
        'card-hover': '#171719',
        gold: '#D4AF37',
        'gold-bright': '#F5D77A',
        champagne: '#E8C878',
        ink: {
          DEFAULT: '#F8F5EF',
          muted: '#A8A29A',
          dim: '#6F6A61',
        },
        'border-gold': 'rgba(212, 175, 55, 0.35)',
      },
      fontFamily: {
        display: ['Cinzel', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        royal: '0.35em',
        crown: '0.5em',
      },
      maxWidth: {
        royal: '1440px',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(212, 175, 55, 0.35), 0 18px 50px -20px rgba(212, 175, 55, 0.25)',
        'gold-soft': '0 10px 40px -18px rgba(212, 175, 55, 0.45)',
        'card-glow': '0 24px 60px -28px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(212, 175, 55, 0.08)',
        'card-lift':
          '0 30px 70px -24px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(212, 175, 55, 0.4), 0 0 40px -18px rgba(212, 175, 55, 0.35)',
        inset: 'inset 0 1px 0 0 rgba(248, 245, 239, 0.04)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5D77A 0%, #D4AF37 45%, #9c7b22 100%)',
        'gold-text': 'linear-gradient(180deg, #F8EAB8 0%, #E8C878 38%, #D4AF37 70%, #a07f28 100%)',
      },
      keyframes: {
        goldenPulse: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.95', transform: 'scale(1.04)' },
        },
        ringRotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        ringRotateReverse: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-150%) skewX(-18deg)' },
          '100%': { transform: 'translateX(250%) skewX(-18deg)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        softGlow: {
          '0%, 100%': { boxShadow: '0 0 0 1px rgba(212,175,55,0.25), 0 0 18px -6px rgba(212,175,55,0.35)' },
          '50%': { boxShadow: '0 0 0 1px rgba(245,215,122,0.6), 0 0 32px -4px rgba(245,215,122,0.55)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        goldenPulse: 'goldenPulse 6s ease-in-out infinite',
        ringRotate: 'ringRotate 42s linear infinite',
        ringRotateReverse: 'ringRotateReverse 60s linear infinite',
        shimmer: 'shimmer 1.1s ease-out',
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        softGlow: 'softGlow 3.5s ease-in-out infinite',
        floatSlow: 'floatSlow 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
