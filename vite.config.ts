import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { writeFileSync, copyFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-extension-files',
      closeBundle() {
        // Copy manifest.json
        copyFileSync('manifest.json', 'dist/manifest.json');
        
        // Copy blocked.html
        copyFileSync('blocked.html', 'dist/blocked.html');
        
        // Create icons folder
        try {
          copyFileSync('icons/icon48.png', 'dist/icons/icon48.png');
          copyFileSync('icons/icon128.png', 'dist/icons/icon128.png');
        } catch (e) {
          // If icons don't exist, create placeholder icons data
          const iconData = {
            48: "icons/icon48.png",
            128: "icons/icon128.png"
          };
          console.warn('Icons not found. Extension will need icons to be added manually.');
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        background: 'src/background.ts'
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
});