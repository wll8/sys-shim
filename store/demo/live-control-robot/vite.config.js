import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: `./dist/`,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, `index.html`),
        init: path.resolve(__dirname, `init.html`),
      },
    },
  },
  envDir: `./env`,
  base: `./`,
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS({
      // 使用Unocss
      presets: [presetUno(), presetAttributify(), presetIcons()],
    }),
    // VueDevTools(),
  ],
  css: {
    devSourcemap: true, // this one
  },
  server: {
    host: `0.0.0.0`,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL(`./src`, import.meta.url)),
    },
  },
})
