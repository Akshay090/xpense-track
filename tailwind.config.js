/* eslint @typescript-eslint/no-var-requires: "off" */

const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    colors: {
      ...colors,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
