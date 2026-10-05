/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

// Colors are defined as RGB channels in src/styles/global.css so Tailwind's
// opacity modifiers (bg-ink/60, text-fg/80, ...) keep working.
const rgb = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        ink: {
          DEFAULT: rgb('ink'),
          900: rgb('ink'),
          800: rgb('ink-2'),
          700: rgb('ink-3'),
          600: rgb('ink-4'),
        },
        fg: {
          DEFAULT: rgb('fg'),
          muted: rgb('fg-muted'),
          subtle: rgb('fg-subtle'),
        },
        line: {
          DEFAULT: 'rgb(var(--fg) / 0.08)',
          strong: 'rgb(var(--fg) / 0.14)',
        },
        brand: {
          indigo: rgb('indigo'),
          violet: rgb('violet'),
          pink: rgb('pink'),
          coral: rgb('coral'),
          teal: rgb('teal'),
          amber: rgb('amber'),
          sky: rgb('sky'),
          lime: rgb('lime'),
        },
      },
      fontFamily: {
        sans: ['"Geist Variable"', ...defaultTheme.fontFamily.sans],
        mono: ['"Geist Mono Variable"', ...defaultTheme.fontFamily.mono],
        serif: ['"Instrument Serif"', ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        'display-2xl': ['clamp(3.1rem, 8.6vw, 8.25rem)', { lineHeight: '0.92', letterSpacing: '-0.05em' }],
        'display-xl': ['clamp(2.6rem, 6.4vw, 6rem)', { lineHeight: '0.96', letterSpacing: '-0.045em' }],
        'display-lg': ['clamp(2.25rem, 4.8vw, 4.25rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'display-md': ['clamp(1.9rem, 3.4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        'display-sm': ['clamp(1.5rem, 2.4vw, 2.125rem)', { lineHeight: '1.12', letterSpacing: '-0.03em' }],
        eyebrow: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.16em' }],
      },
      maxWidth: {
        site: '80rem',
        prose: '68ch',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.6)', opacity: '0.9' },
          '80%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        'spin-slow': {
          to: { transform: 'rotate(1turn)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        shimmer: 'shimmer 6s linear infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
      },
    },
  },
  plugins: [],
};
