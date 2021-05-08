 // tailwind.config.js
 
 module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
    colors: {
      ligth_green: '#CCFFCB',
      green_selected: '#36C667',
      green_letter: '#06AC5D',
      green_button: '#1CB56B',
      ligth_red: '#FFB8B8',
      red_button:'#D30000',
      red_letter:'#B51C1C',
      ligth_gray_button: '#A1A1A1',
      ligth_gray: '#F5F6F8',
      icon_gray : '#C2CFE0'
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