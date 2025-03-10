import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
        
  server: {
    host: 'localhost', // Ensure this matches your setup
    port: 3000,
    hmr: {
      protocol: 'ws', // Use WebSocket for HMR
      host: 'localhost',
      port: 3000,
    },
    watch: {
      usePolling: true, // Enable polling if file changes aren't detected
      interval: 100, // Optional: Adjust the polling interval
    },
  },
});
