/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#691f74",
        secondary: "#FFF0D9",
        error: "#EF4444",
        success: "#22c55e",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
