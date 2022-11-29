import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { VitePWA } from 'vite-plugin-pwa';
import rollupReplace from '@rollup/plugin-replace';
import * as path from 'path';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  ssr: {
    target: 'node',
    format: 'cjs',
  },
  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        'process.env.NODE_ENV': JSON.stringify('development'),
      },
    }),
    react(),
    // eslint-disable-next-line new-cap
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{ts,tsx,scss,html,ico,png,svg,jpg,js,css}'],
      },
      devOptions: {
        enabled: true,
      },
      injectRegister: 'auto',
    }),
  ],
  resolve: process.env.USE_SOURCE
    ? {
        alias: {
          '@remix-run/router': path.resolve(__dirname, '../../packages/router/index.ts'),
          'react-router': path.resolve(__dirname, '../../packages/react-router/index.ts'),
          'react-router-dom': path.resolve(__dirname, '../../packages/react-router-dom/index.tsx'),
        },
      }
    : {},
});
