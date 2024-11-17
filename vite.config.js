// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/places': {
        target: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api\/places/, '');
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            const url = new URL(proxyReq.path, 'http://dummy.com');
            url.searchParams.append('key', process.env.VITE_GOOGLE_PLACE_API_KEY);
            proxyReq.path = `${url.pathname}${url.search}`;
          });
        }
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174
  }
});
