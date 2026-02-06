/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#fff3dd',
          400: '#d4831f',
          700: '#9b5a12'
        }
      },
      boxShadow: {
        card: '0 10px 30px rgba(40, 26, 5, 0.12)'
      }
    }
  },
  plugins: []
};
