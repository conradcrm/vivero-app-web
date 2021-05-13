 // tailwind.config.js
 
 module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false,
   theme: {
    colors: { // t = text, b = button, s = select
      ligth_green: '#CCFFCB',
      s_green: '#36C667',
      t_green: '#06AC5D',
      b_green: '#1CB56B',
      ligth_red: '#FFB8B8',
      b_red:'#D30000', //button
      t_red:'#B51C1C', //text
      b_ligth_gray: '#A1A1A1',
      ligth_gray: '#F5F6F8',
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