
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

import laravel from 'laravel-vite-plugin';
import { componentTagger } from "lovable-tagger";


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",  // Set this to make the development server accessible
    port: 8081,  // React Vite server runs on a different port to avoid conflicts with Laravel (running on 8000)
  },
  build: {
    // Correct the outDir to properly resolve the path for Laravel's public directory
    outDir: path.resolve(__dirname, "../syncsaga-api/public/build"),  // Output built files to Laravel's public/build directory
    emptyOutDir: true,  // Clears out the build folder before building
    manifest: "manifest.json" ,
  },
  plugins: [
    laravel({
      input: ['resources/js/app.js'],
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
