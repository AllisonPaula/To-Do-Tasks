/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#eff8ff',
          '100': '#deefff',
          '200': '#b6e1ff',
          '300': '#76c9ff',
          '400': '#2dafff',
          '500': '#0296f5',
          '600': '#0075d2',
          '700': '#005eaa',
          '800': '#005596',
          '900': '#074273',
          '950': '#042a4d',
        },
        secondary: {
          '50': '#fff9ed',
          '100': '#fff2d5',
          '200': '#fde0ab',
          '300': '#fcc975',
          '400': '#f9a73e',
          '500': '#f78f1e',
          '600': '#e8710e',
          '700': '#c0560e',
          '800': '#994413',
          '900': '#7b3a13',
          '950': '#421a08',
        },
        basic: {
          '50': 'ffffff',
        },
      },

    },
  },
  plugins: [],
}