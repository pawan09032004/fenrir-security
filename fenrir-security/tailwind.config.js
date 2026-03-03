/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0CC8A8',
        critical: '#EF4444',
        high: '#F97316',
        medium: '#EAB308',
        low: '#22C55E',
        dark: {
          bg: '#0F0F0F',
          bgSecondary: '#1A1A1A',
          bgTertiary: '#262626',
          border: '#333333',
        },
        light: {
          bg: '#FFFFFF',
          bgSecondary: '#F5F5F5',
          bgTertiary: '#E5E5E5',
          border: '#E5E5E5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

