import { fileURLToPath, URL } from 'node:url'

import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS({ // 使用Unocss
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
      ],
    }),
    VueDevTools(),
  ],
  css: {
    devSourcemap: true, // this one
  },
  server: {
    host: `0.0.0.0`,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
