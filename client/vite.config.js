import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        // target: 'window.location.origin',
        target: 'https://mern-estate-beta.vercel.app/',
        secure: false,
      }
    }
  },
  plugins: [react()],
})
