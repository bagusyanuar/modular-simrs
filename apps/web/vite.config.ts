import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true, // otomatis buka browser setelah build
      gzipSize: true, // tampilkan ukuran setelah gzip
      brotliSize: true, // tampilkan ukuran setelah brotli
      filename: 'dist/stats.html',
      template: 'treemap',
    }),
  ],
});
