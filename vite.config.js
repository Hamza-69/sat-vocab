import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          confetti: ['canvas-confetti']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    outDir: 'dist'
  },
  base: '/'
}) 