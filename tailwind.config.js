/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
        xl: "12px",
      },
    },
  },
};
