/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C18653",
        secondary: "#383B38",
        tertiary: "#FFE8D6",
        back: ""
      },
      backgroundImage: {
        'gradient': 'linear-gradient(315deg, #2b4162 0%, #12100e 74%)',
      },
      fontFamily: {
        sans: ['Outfit', 'ui-sans', 'system-ui'],        
        Cedarville: ['Cedarville Cursive', 'ui-serif', 'Georgia'],
        Arizonia: ['Arizonia', 'ui-monospace', 'Menlo'],
        Sofia: ['Sofia','cursive'],
        nunito: ['Nunito Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}