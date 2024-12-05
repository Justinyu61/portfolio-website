import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import process from 'process'

// https://vite.dev/config/
export default defineConfig({
  // plugins: [vue()]  // 移除 vueDevTools 測試
  plugins: [vue(), vueDevTools()],
  base: '/portfolio-website/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    'process.env': process.env, // 在瀏覽器中定義 process.env
  },
})
