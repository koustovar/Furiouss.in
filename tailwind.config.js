/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a', // Dark theme background
        surface: '#121212',
        primary: '#3b82f6', // Example generic primary, will refine
        secondary: '#64748b',
        accent: '#f43f5e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Premium font feeling
      }
    },
  },
  plugins: [],
}
