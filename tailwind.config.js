/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "thin": "ir-sans-thin",
        "ultraLight": "ir-sans-ultra-light",
        "light": "ir-sans-light",
        "regular": "ir-sans-regular",
        "medium": "ir-sans-medium",
        "demiBold": "ir-sans-demi-bold",
        "bold": "ir-sans-bold",
        "extraBold": "ir-sans-extra-bold",
        "black": "ir-sans-black"
      },

      container: {
        padding: {
          DEFAULT: '1.25rem',
          xl: '0'
        },
        center: true
      },

      screens: {
        'xs': "470px",
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      },
    },
  },
  plugins: [],
}

