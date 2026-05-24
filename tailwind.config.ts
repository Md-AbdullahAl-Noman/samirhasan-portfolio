import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0B1220',
          alt: '#0F1A2E',
          lift: '#1A2540',
        },
        surface: {
          DEFAULT: 'rgba(37, 99, 235, 0.05)',
          strong: 'rgba(37, 99, 235, 0.14)',
        },
        ink: {
          DEFAULT: '#F8FAFC',
          2: '#E2E8F0',
          3: '#64748B',
        },
        accent: {
          DEFAULT: '#2563EB',
          light: '#60A5FA',
          bright: '#3B82F6',
          deep: '#1E40AF',
          dim: 'rgba(37, 99, 235, 0.12)',
          glow: 'rgba(96, 165, 250, 0.40)',
        },
        gold: {
          DEFAULT: '#D4B068',
          light: '#E8C870',
          soft: 'rgba(212, 176, 104, 0.15)',
        },
        line: {
          DEFAULT: 'rgba(96, 165, 250, 0.10)',
          strong: 'rgba(96, 165, 250, 0.22)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        site: '1280px',
        prose: '680px',
        wide: '1440px',
      },
      letterSpacing: {
        ultra: '-0.030em',
        wide2: '0.18em',
      },
      animation: {
        'pulse-slow': 'dot-pulse 3s ease-in-out infinite',
        float: 'float 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%,100%': { boxShadow: '0 0 40px rgba(37,99,235,0.6), 0 0 80px rgba(96,165,250,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(37,99,235,0.8), 0 0 120px rgba(212,176,104,0.4)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
