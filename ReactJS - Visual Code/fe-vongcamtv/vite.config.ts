import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "Chrome >= 49", "Safari >= 9"],
      polyfills: true,
      modernPolyfills: true,
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
  server: {
    // allowedHosts: ["lambda-frederick-rack-nonprofit.trycloudflare.com"],
  },
});
