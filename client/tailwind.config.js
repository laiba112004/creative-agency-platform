/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandNavy: '#0B1220',   // Deep background[cite: 7]
        brandGold: '#C9A24B',   // Primary accent[cite: 7]
        brandGoldHover: '#E0B85C',
        brandSurface: '#161F30', // Dark card surface[cite: 7]
      }
    },
  },
  plugins: [],
}