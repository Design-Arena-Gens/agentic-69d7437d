import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)']
      },
      colors: {
        brand: {
          50: '#f2f6ff',
          100: '#e4edff',
          200: '#c7d9ff',
          300: '#a3bdff',
          400: '#7f9dff',
          500: '#5877ff',
          600: '#4157db',
          700: '#2f3fb7',
          800: '#1f2a93',
          900: '#131c78'
        }
      },
      boxShadow: {
        glow: '0 10px 30px rgba(88, 119, 255, 0.35)'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 0 0 rgba(88, 119, 255, 0.6)' },
          '50%': { opacity: '1', boxShadow: '0 10px 30px rgba(88, 119, 255, 0.3)' }
        }
      },
      animation: {
        pulseGlow: 'pulseGlow 3s ease-in-out infinite'
      }
    }
  },
  darkMode: 'class',
  plugins: []
};

export default config;
