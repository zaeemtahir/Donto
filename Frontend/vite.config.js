// vite.config.js
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), svgrPlugin()],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.jsx'), // Adjust this based on your actual entry file
    },
    hmr: {
      // ... hmr options (https://vitejs.dev/config/#build-hmr)
    },
  },
});
