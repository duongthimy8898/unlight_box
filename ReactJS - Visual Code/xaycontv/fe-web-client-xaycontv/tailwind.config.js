/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  safelist: ["tb:*", "lt:*", "dt:*", "bs:*"],
  theme: {
    extend: {
      screens: {
        tb: "640px", // Tablet (481 -> 960px)
        lt: "1024px", // Laptop (961 -> 1440px)
        dt: "1536px", // Desktop (1441 -> 1920px)
        bs: "1921px", // Big screen (>1920px)
      },
    },
  },
  plugins: [],
};
