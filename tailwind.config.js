/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B9D',
        secondary: '#FFE66D',
        accent: '#4ECDC4',
        dark: '#1A1A1A',
        light: '#F8F9FA'
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'sans-serif'],
      }
    },
  },
  plugins: [],
}