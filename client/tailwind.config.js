const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.coolGray,
      indigo: colors.indigo,
      white: colors.white,
    },
    extend: {},
  },
  variants: {
    extend: {
      overflow: ['hover'],
    },
  },
  plugins: [],
};
