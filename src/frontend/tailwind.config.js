/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        background:  'oklch(var(--background) / <alpha-value>)',
        foreground:  'oklch(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT:    'oklch(var(--card) / <alpha-value>)',
          foreground: 'oklch(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT:    'oklch(var(--popover) / <alpha-value>)',
          foreground: 'oklch(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT:    'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT:    'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT:    'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT:    'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT:    'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)',
        },
        border:  'oklch(var(--border) / <alpha-value>)',
        input:   'oklch(var(--input) / <alpha-value>)',
        ring:    'oklch(var(--ring) / <alpha-value>)',
        cream:        'oklch(var(--cream) / <alpha-value>)',
        lavender:     'oklch(var(--lavender) / <alpha-value>)',
        'lavender-light': 'oklch(var(--lavender-light) / <alpha-value>)',
        blush:        'oklch(var(--blush) / <alpha-value>)',
        'blush-light':'oklch(var(--blush-light) / <alpha-value>)',
        plum:         'oklch(var(--plum) / <alpha-value>)',
        'plum-dark':  'oklch(var(--plum-dark) / <alpha-value>)',
        gold:         'oklch(var(--gold) / <alpha-value>)',
      },
      fontFamily: {
        script:  ['Dancing Script', 'cursive'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Lora', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
      },
      boxShadow: {
        'gold': '0 0 0 2px rgba(255,215,0,0.4)',
        'card': '0 8px 32px rgba(114,9,183,0.2)',
        'hero': '0 0 40px rgba(114,9,183,0.5), 0 0 80px rgba(247,37,133,0.3)',
        'glow-purple': '0 0 20px rgba(155,93,229,0.6), 0 0 40px rgba(114,9,183,0.4)',
        'glow-pink': '0 0 20px rgba(247,37,133,0.6), 0 0 40px rgba(247,37,133,0.3)',
      },
      animation: {
        'balloon': 'balloon-float 4s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
