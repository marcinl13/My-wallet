/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#073B4C",
      secondary: "#118AB2",
      emerald: "#06D6A0",
      sunglow: "#FFD166",
      crayola: "#EF476F",
      white: "#FFFFFF",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        md: "768px",
      },
    },
    extend: {
      minWidth: { expensePill: "120px" },
      minHeight: { expensePill: "110px" },
    },
  },
  plugins: [],
};

