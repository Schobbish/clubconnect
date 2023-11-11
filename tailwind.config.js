/** @type {import('tailwindcss').Config} */
/* eslint-disable */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "2xs": "16rem",
        "3xs": "12rem"
      }
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#fff",
      black: "#000",
      gray: "#ccc",
      green: "#688F73",
      orange: {
        200: "#FEE9DA",
        500: "#FF9447"
      },
      red: "#F00"
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      mono: ["'PT Mono'", ...defaultTheme.fontFamily.mono]
    }
  },
  plugins: []
};
