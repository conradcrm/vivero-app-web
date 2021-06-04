 // tailwind.config.js
 
 module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false,
   theme: {
    colors: { // t = text, b = button, s = select
      ligthgreen100: "#CCFFCB",
      ligthgreen: '#00CC55',
      mediumgreen: '#00C476',
      darkgreen: '#00A976',
      
      ligthred: '#FFD2D2',
      mediumred:'#D30000', //button
      darkred:'#D21212', //text
      
      b_ligth_gray: '#A1A1A1',
      ligth_gray: '#F5F6F8',
      gray:'#EEF0F4',
      icon_gray: '#C2CFE0',
      white: '#FFFFFF',
      black: '#000000'
    },
    fontFamily: {
      poppins :['Poppins', 'sans-serif'],
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
     extend: {},
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }