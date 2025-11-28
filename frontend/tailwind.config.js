/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#38b2ac', // Teal-500
        secondary: '#2c7a7b', // Teal-700
        accent: '#4fd1c5', // Teal-400
        'bg-app': '#f0fdfa', // Teal-50
      },
      fontFamily: {
        fredoka: ['Fredoka'],
        nunito: ['Nunito'],
      }
    },
  },
  plugins: [],
}
