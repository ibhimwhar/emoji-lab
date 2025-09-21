/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // enable dark mode with `class`
  theme: {
    extend: {
      colors: {
        cyan: {
          400: "#22d3ee",
        },
        indigo: {
          500: "#a78bfa",
        },
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale(1)", opacity: 1 },
          "50%": { transform: "scale(1.02)", opacity: 0.9 },
        },
      },
      animation: {
        pulse: "pulse 8s infinite",
      },
    },
  },
  plugins: [],
};
