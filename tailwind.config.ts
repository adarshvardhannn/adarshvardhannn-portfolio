import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
        muted: 'hsl(var(--muted))',
        accent: 'hsl(var(--accent))',
        accent2: 'hsl(var(--accent-2))',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(68, 255, 153, 0.14), 0 0 40px rgba(68, 255, 153, 0.08)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '25%': { transform: 'translate3d(-2%, -1%, 0)' },
          '50%': { transform: 'translate3d(1%, 2%, 0)' },
          '75%': { transform: 'translate3d(2%, -1%, 0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translate3d(0, 28px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        grain: 'grain 12s steps(8) infinite',
        pulseGlow: 'pulseGlow 3.6s ease-in-out infinite',
        revealUp: 'revealUp 0.7s ease both',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at 20% 20%, rgba(77, 255, 131, 0.15), transparent 34%), radial-gradient(circle at 80% 10%, rgba(123, 255, 196, 0.12), transparent 22%), radial-gradient(circle at 50% 60%, rgba(255, 255, 255, 0.04), transparent 36%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
