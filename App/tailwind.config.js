// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "",
        secondary: "",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
      },
      spacing: {
        72: "18rem",
        80: "20rem",
        96: "24rem",
        128: "32rem",
      },
      screens: {
        mo: "360px",
        xs: "480px",
        xs2: "540px",
        sm: "640px",
        md: "768px",
        md2: "900px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
        "3xl": "1500px",
        "4xl": "1600px",
        "5xl": "1700px",
        "6xl": "1800px",
        full: "1920px",
      },
    },
  },
  plugins: [],
};
