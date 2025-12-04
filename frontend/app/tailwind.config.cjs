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
          darkBlue: '#254467',  // PMS 7696C
          orange: '#E65A28',    // PMS 2026C
          mediumBlue: '#3f6183', // PMS 2152
          stateBlue: '#6990AB', // PMS 2170
          paleBlue: '#BFD1E5',  // PMS 657
          gray: '#67727A',      // PMS 430
          steelBlue: '#5C7488', // PMS 5405
          teal: '#1A5E63',      // PMS 5473C
          seaweed: '#028090',   // PMS 5473C (Variant)
          palm: '#6C7D47',      // PMS 7490
          gold: '#EFB628',      // PMS 7409C
          red: '#C42021',       // PMS 711
          taupe: '#54494B',     // PMS 438
          wine: '#542344',      // PMS 525
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

