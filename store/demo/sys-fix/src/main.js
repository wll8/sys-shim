import './assets/main.css'

import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Sys from 'sys-shim'
import 'swiper/css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

await new Sys({log: true}).then(async main => {
  console.log(`初始化完成`, main)
  globalThis.main = main
  globalThis.ws = main.ws
  globalThis.native = main.native
}).catch(err => {
  console.error(`sys-shim 初始化失败`)
})

app.mount('#app')