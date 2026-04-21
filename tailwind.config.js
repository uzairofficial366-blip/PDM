/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pdmGreen: {
          50: "#f2f9e6",
          100: "#e0f0c3",
          200: "#c5e291",
          300: "#a8d25f",
          400: "#8ec535",
          500: "#76B82A",
          600: "#5f9421",
          700: "#4a7219",
          800: "#365212",
          900: "#22330b",
        },
        pdmBlue: {
          50: "#e8f0f7",
          100: "#c5d8eb",
          200: "#91b5d4",
          300: "#5d92bc",
          400: "#2f74a9",
          500: "#114B73",
          600: "#0d3d5e",
          700: "#0a2f48",
          800: "#062132",
          900: "#03131e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
