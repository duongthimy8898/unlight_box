import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() ],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version), // hoặc Date.now()
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash][extname]",
      },
    },
  },
  server: {
    host: '0.0.0.0',
    fs: { strict: false },
  },
});
