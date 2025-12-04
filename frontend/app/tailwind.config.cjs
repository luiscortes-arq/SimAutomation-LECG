/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hermosillo: {
          darkBlue: '#1a2b4b',
          mediumBlue: '#254467',
          stateBlue: '#4a6fa5',
          palm: '#6c7d47',
          paleBlue: '#a0b4d0',
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'fade-in': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

