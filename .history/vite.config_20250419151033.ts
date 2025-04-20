import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",  // Set this to make the development server accessible
    port: 8081,  // React Vite server runs on a different port to avoid conflicts with Laravel (running on 8000)
  },
  build: {
    outDir: path.resolve(__dirname, "../C:\Users\user\Desktop\syncsaga-api"),  // Output built files to Laravel's public directory
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
