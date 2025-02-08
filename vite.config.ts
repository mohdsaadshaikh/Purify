import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { writeFileSync, copyFileSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-extension-files",
      closeBundle() {
        // Copy manifest.json
        copyFileSync("manifest.json", "dist/manifest.json");

        // Copy blocked.html
        copyFileSync(
          "public/blocked-pages/blocked.html",
          "dist/blocked-pages/blocked.html"
        );
        copyFileSync(
          "public/blocked-pages/defaultBlocked.html",
          "dist/blocked-pages/defaultBlocked.html"
        );
        copyFileSync(
          "public/blocked-pages/blocked.css",
          "dist/blocked-pages/blocked.css"
        );

        // Create icons folder
        try {
          copyFileSync("public/assets/icon48.png", "dist/icons/icon48.png");
          copyFileSync("public/assets/icon16.png", "dist/icons/icon16.png");
          copyFileSync("public/assets/icon128.png", "dist/icons/icon128.png");
        } catch (e) {
          // If icons don't exist, create placeholder icons data
          const iconData = {
            16: "assets/icon16.png",
            48: "assets/icon48.png",
            128: "assets/icon128.png",
          };
          console.warn(
            "Icons not found. Extension will need icons to be added manually."
          );
        }
      },
    },
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
        background: "src/background.ts",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  publicDir: "public",
});
