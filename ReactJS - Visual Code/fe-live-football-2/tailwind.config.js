/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Bao phủ toàn bộ src
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        floating: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 1s ease-out",
        floating: "floating 3s ease-in-out infinite",
      },
      dropShadow: {
        glow: "0 0 10px rgba(255,255,255,0.8)",
      },
    },
  },
  // plugins: [require("@tailwindcss/line-clamp")],
};
