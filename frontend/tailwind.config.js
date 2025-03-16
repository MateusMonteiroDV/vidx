/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,jsx}', 
    './src/components/**/*.{js,jsx}',
    './src/App.js', 
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
};