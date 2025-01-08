
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin:{
        '364px':'364px', //for breadcum margin ml-[364px] 
      },

      spacing:{
        '234px':"234px", //filter column width
        952:"952px", //product column width
        1186:"1186px", //doc width
        380 :"380px",//main product image height 
        308:"308px",//main product image width and cartwidth   
        '340px':"340px", //Appbar text alignment
        '605px':"605px", //prodcut page grid width
        '403px':"403px", // product page grid width
      
      },
      colors:{
        searchbarbgcolor :"#FFFDED",//search bar background color
        sortbartexthovercolor :"#EAEAEA",
        productbarcolor : "#F9F9F9", //product bar and sort by color
        checkboxframecolor : "#616461",
        checkboxfillcolor : '#B09975'
      },
      borderWidth: {
        '0.5':"0.5px",
        '1':'1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      
    },
  },
}