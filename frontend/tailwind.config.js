import containerQueries from "@tailwindcss/container-queries";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        primary: {
          DEFAULT: "#002349",
          100: "#86c1ff",
          200: "#469efc",
          300: "#007bff",
          400: "#0059b8",
          500: "#002349",
          600: "#001b38",
          700: "#00142a",
          800: "#000f1f",
          900: "#000b16",
        },
      },
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [containerQueries],
};
