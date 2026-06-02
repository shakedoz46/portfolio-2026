/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F9F9F7',
        foreground: '#1A1A1A',
        muted: '#6B6B6B',
      },
      fontFamily: {
        sans: ['Bricolage Grotesque', 'Inter', 'system-ui', 'sans-serif'],
        editorial: ['Bricolage Grotesque', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        editorial: '52rem',
      },
      lineHeight: {
        relaxed: '1.8',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
