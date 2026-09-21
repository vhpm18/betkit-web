/** Minimal shim — real tokens live in app/assets/css/main.css via @theme inline. */
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{vue,ts,js}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        body: ['Source Sans 3', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        // Single site-wide radius scale, aligned to the Stitch reference.
        // sm=4px md=8px lg=12px xl=16px (2xl/3xl kept as overflow guards).
        'none': '0',
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
    },
  },
} satisfies Config
