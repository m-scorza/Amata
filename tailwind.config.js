/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        amata: {
          black: '#0a0a0a',
          dark: '#141414',
          card: '#1a1a1a',
          gold: '#D4A843',
          'gold-dark': '#C49B3C',
          green: '#2D5A3D',
          'green-light': '#3A7D52',
        },
      },
    },
  },
  plugins: [],
};
