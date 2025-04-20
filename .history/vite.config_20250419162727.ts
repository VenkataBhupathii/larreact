import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Update this path to the absolute path of your Laravel public directory
const LARAVEL_PUBLIC_PATH = "C:/Users/user/Desktop/syncsaga-api/public/build";

export default defineConfig({
  server: {
    host: "::",
    port: 8081,
  },
  build: {
    outDir: LARAVEL_PUBLIC_PATH,
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      output: {
        manifestFileName: 'manifest.json'
      }
    }
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});