/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          dark: '#0B132B',
          navy: '#1C2541',
          blue: '#1E3A8A',
          primary: '#1D4ED8',
          accent: '#2563EB',
          surface: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          badge: '#EEF2F6',
          text: '#0F172A',
          muted: '#64748B',
          saffron: '#D97706',
          emerald: '#059669',
          crimson: '#DC2626',
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
