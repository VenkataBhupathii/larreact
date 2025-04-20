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
    // Correct the outDir to properly resolve the path for Laravel's public directory
    outDir: '../syncsaga-api/public/build',  // Output built files to Laravel's public/build directory
    emptyOutDir: true,  // Clears out the build folder before building
    manifest: true ,
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
