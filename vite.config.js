import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

// dev: base = '/'  →  http://localhost:5173/
// build: base = '/winter-dev-archive/'  →  GitHub Pages 경로
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/winter-dev-archive/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}));
