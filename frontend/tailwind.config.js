/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        // ssm:"18px",
        // ssmm:"30px",
        // sm:'100px',
        // lg:'130px',
        // xl:'200px',
        1100:'1100px'
      }
    },
  },
  plugins: [],
}