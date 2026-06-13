import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import bundleAnalyzer from "vite-bundle-analyzer";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    bundleAnalyzer({
      openAnalyzer: false,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("react")) {
            return "react";
          }

          if (id.includes("@tanstack/react-query")) {
            return "query";
          }

          if (id.includes("@tanstack/react-router")) {
            return "router";
          }
        },
      },
    },
  },
  server: {
    port: 5174,
    host: "0.0.0.0",
    allowedHosts: ["*", "0.0.0.0"],
  },
});
