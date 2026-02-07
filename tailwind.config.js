/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4f8',
          100: '#e0e9f5',
          400: '#1e3a8a',
          700: '#0c1e3e'
        }
      },
      boxShadow: {
        card: '0 10px 30px rgba(15, 23, 42, 0.15)'
      }
    }
  },
  plugins: []
};
