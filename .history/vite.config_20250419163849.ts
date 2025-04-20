import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::", // Allow network access to Vite dev server
    port: 8081, // Avoid conflict with Laravel's 8000
  },
  build: {
    outDir: path.resolve(__dirname, "../syncsaga-api/public/build"),
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: "src/main.tsx", // Entry file
      output: {
        // Fix Laravel not finding the manifest by removing .vite/ nesting
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
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
