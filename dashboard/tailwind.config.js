/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        samsung: {
          blue: '#1428A0',
          dark: '#0A1854',
        },
      },
    },
  },
  plugins: [],
}
