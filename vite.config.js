import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'android-launchericon-192-192.png', 'android-launchericon-512-512.png'],
      devOptions: {
        enabled: true, // Enable PWA in development for testing
      },
      manifest: {
        name: 'QuizoSphere',
        short_name: 'Quizoo',
        description: 'A Featured Quiz At Your Fingertips',
        start_url: '/',
        display: "standalone", 
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            "src": "/android-launchericon-72-72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "/android-launchericon-96-96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "/android-launchericon-128-128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "/android-launchericon-144-144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "/android-launchericon-152-152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "/android-launchericon-192-192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/android-launchericon-384-384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "/android-launchericon-512-512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]

      },
    }),
  ],
});
