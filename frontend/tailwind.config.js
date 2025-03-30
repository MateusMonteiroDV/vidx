/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/App.js',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--sidebar-border))',
        background: 'hsl(var(--sidebar))',
        foreground: 'hsl(var(--sidebar-foreground))',
        ring: 'hsl(var(--sidebar-ring))'
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme('colors.border', 'currentColor')
      })
    }
  },
  plugins: [require("tailwindcss-animate")]
};
