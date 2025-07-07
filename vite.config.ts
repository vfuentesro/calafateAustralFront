import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    proxy: {
      '/compra': 'http://localhost:8000',
      '/getnet': 'http://localhost:8000',
      '/api': 'http://localhost:8000',
      '/auth': 'http://localhost:8000',
    }
  }
})
