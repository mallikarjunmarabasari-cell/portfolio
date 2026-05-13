import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
import path from "path";

const port = process.env.PORT ? Number(process.env.PORT) : 5173;

export default defineConfig({
  plugins: [
    react(),
    // tailwindcss(), // Temporarily disabled due to Windows lightningcss issue
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "public"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: true,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  preview: {
    port,
    host: true,
  },
});
