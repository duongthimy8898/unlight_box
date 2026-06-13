import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
// import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["chrome 49", "safari 9", "opera 36", "android 4.4", "IE 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    // visualizer({ open: true, gzipSize: true, brotliSize: true }),
  ],
  server: {
    host: "0.0.0.0", // 👈 Cho phép truy cập từ mọi IP
    port: 5173, // (tuỳ chỉnh, mặc định là 5173)
  },
  build: {
    rollupOptions: {
      output: {
        // JS chunks
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",

        // Assets (CSS, fonts, images…)
        assetFileNames: ({ name }) => {
          if (!name) return "assets/[name]-[hash][extname]";

          if (/\.(css)$/.test(name)) {
            return "assets/css/[name]-[hash][extname]";
          }

          if (/\.(woff2?|ttf|eot|otf)$/.test(name)) {
            return "assets/fonts/[name]-[hash][extname]";
          }

          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(name)) {
            return "assets/images/[name]-[hash][extname]";
          }

          // fallback
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
