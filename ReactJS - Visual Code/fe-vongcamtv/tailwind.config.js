/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      zIndex: {
        100: "100",
        900: "900",
      },
      screens: {
        tb: "640px",
        lt: "1024px",
        dt: "1280px",
        xdt: "1560px",
      },
      keyframes: {
        "bounce-advanced": {
          "0%, 100%": {
            transform: "translateY(0) scale(1,1)",
          },
          "25%": {
            transform: "translateY(-30px) scale(1.05, 0.95)",
          },
          "50%": {
            transform: "translateY(-60px) scale(0.95, 1.05)",
          },
          "75%": {
            transform: "translateY(-30px) scale(1.05, 0.95)",
          },
        },
        "spin-pattern": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "shadow-scale": {
          "0%, 100%": { transform: "scaleX(1)", opacity: "0.3" },
          "50%": { transform: "scaleX(1.4)", opacity: "0.1" },
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "zoom-in": {
          "0%": { transform: "scale(0.975)", opacity: "0.975" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "bounce-advanced": "bounce-advanced 1s infinite ease-in-out",
        "spin-pattern": "spin-pattern 1s infinite linear",
        "shadow-scale": "shadow-scale 1s infinite ease-in-out",
        "gradient-x": "gradient-x 5s ease infinite",
        "zoom-in": "zoom-in 0.3s ease-out forwards",
      },
      backgroundSize: {
        200: "200% 200%",
      },
    },
  },
  plugins: [],
};
