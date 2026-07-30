/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          900: '#0b0b14',
          800: '#111122',
          700: '#1a1a3a',
          primary: '#3b82f6', // Azul NASA / Cósmico
        }
      }
    },
  },
  plugins: [],
}