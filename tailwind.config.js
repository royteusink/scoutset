const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
      },

      inset: {
        full: '100%',
        '1/2': '50%',
      },

      minWidth: theme => theme('spacing'),
      minHeight: theme => theme('spacing'),
      maxHeight: theme => theme('spacing'),
      maxWidth: theme => theme('spacing'),
    },
  },
  plugins: [],
}
