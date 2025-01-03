import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'android-launchericon-192-192.png','android-launchericon-512-512.png'],
      devOptions: {
        enabled: true, // Enable PWA in development for testing
      },
      manifest: {
        name: 'QuizoSphere',
        short_name: 'Quizoo',
        description: 'A Featured Quiz At Your Fingertips',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/android-launchericon-192-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-launchericon-512-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
