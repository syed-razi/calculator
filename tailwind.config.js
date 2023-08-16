/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["digital-7", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
