import { defineConfig } from 'vite'
import { join } from "path"
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': join(__dirname, `src`),
    },
  },
  plugins: [vue()],
  css: {
    devSourcemap: true, // this one
  },
  server: {
    host: `0.0.0.0`,
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
})
