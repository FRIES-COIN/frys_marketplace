/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 2s linear infinite",
        move: "move 5s linear infinite",
      },
      fontFamily: {
        title: ["Ubuntu", "sans-serif"],
        body: ['"Space Mono"', "monospace"],
      },
      colors: {
        background: "#0d0c0c",
        primary: "#f9a505",
      },
      keyframes: {
        move: {
          "0%": { transform: "translateX(-200px)" },
          "100%": { transform: "translateX(200px)" },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
