/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        display: ['"Archivo"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#12161C',
          light: '#2A323D',
          muted: '#5B6675',
        },
        bone: {
          DEFAULT: '#F6F4EF',
          50: '#FAF9F6',
          100: '#F6F4EF',
          200: '#EDEAE2',
          300: '#E2DED3',
        },
        navy: {
          DEFAULT: '#0E2238',
          light: '#1A3553',
          deep: '#081826',
        },
        line: {
          DEFAULT: '#D9D5CB',
          light: '#E8E5DE',
          dark: '#C4BFB2',
        },
        signal: {
          DEFAULT: '#E8590C',
          light: '#FF7A33',
          dark: '#C4460A',
          bg: '#FFF1E8',
        },
        success: {
          DEFAULT: '#2B8A3E',
          bg: '#EBFBEE',
        },
        warning: {
          DEFAULT: '#B8860B',
          bg: '#FFF8E1',
        },
        error: {
          DEFAULT: '#C92A2A',
          bg: '#FFF0F0',
        },
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-up': 'fadeUp 0.4s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      letterSpacing: {
        'tight-display': '-0.02em',
        'tight-hero': '-0.03em',
      },
    },
  },
  plugins: [],
};
