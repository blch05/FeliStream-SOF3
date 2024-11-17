import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['webtorrent']
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5173'
    }
  }
})
