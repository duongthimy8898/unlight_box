/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  safelist: [
    "bg-blue-500",
    "hover:bg-blue-600",
    "bg-yellow-500",
    "hover:bg-yellow-600",
    "bg-green-500",
    "hover:bg-green-600",
    "mb:*",
    "tb:*",
    "lt:*",
    "bs:*",
    // thêm các class dynamic khác
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // Gán Inter làm font mặc định
      },
      screens: {
        tb: "640px", // Tablet (481 -> 960px)
        lt: "1024px", // Laptop (961 -> 1440px)
        dt: "1536px", // Desktop (1441 -> 1920px)
        bs: "1920px", // Big screen (>1920px)
      },
      keyframes: {
        "jump-scale": {
          "0%": { transform: "translateY(0) scale(1)" },
          "30%": { transform: "translateY(-8px) scale(1.2)" },
          "60%": { transform: "translateY(0) scale(1)" },
          "100%": { transform: "translateY(0) scale(1)" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "jump-scale": "jump-scale 0.5s ease-out",
        "gradient-x": "gradient 3s ease infinite",
      },
    },
  },
  plugins: [],
};
