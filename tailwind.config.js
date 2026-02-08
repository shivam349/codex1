/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        makhana: {
          50: '#FFF8F0',
          100: '#FDF2E6',
          200: '#F5DCC8',
          300: '#ECC8A6',
          400: '#E8B896',
          500: '#C67C2E',
          600: '#B8701F',
          700: '#8B5E34',
          800: '#6B4423',
          900: '#4A2F1A',
        },
        earth: {
          50: '#FAFAF8',
          100: '#F5F5F1',
          200: '#E8E5DE',
          300: '#D9D5CB',
          400: '#C4BDB0',
          500: '#8B5E34',
          600: '#755027',
          700: '#5D401D',
          800: '#483113',
          900: '#3A250F',
        },
        accent: {
          50: '#FFF9E6',
          100: '#FFECE3',
          200: '#FFDB99',
          300: '#FFCD61',
          400: '#F59E0B',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
          800: '#78350F',
          900: '#78350F',
        },
      },
      boxShadow: {
        card: '0 10px 30px rgba(107, 68, 35, 0.1)',
        soft: '0 4px 15px rgba(107, 68, 35, 0.08)',
      }
    }
  },
  plugins: []
};
