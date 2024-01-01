/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        // Main colors
        C11: '#012B39',//dark blue
        C22: '#1F7A8C',//teal
        C33:'#BFDBF7' ,//lightblue
        C44 : "#F4F4F4",//grey
        C55 : "#FAFAFA",//white alt


        // Task priority colors
        highPriority:"#FF5A5A",
        mediumPriority:"#FFD15A",
        lowPriority:"#5A92FF",

      },
    },
  },
  plugins: [],
}