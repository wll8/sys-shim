import './assets/main.css'

import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Sys from 'sys-shim'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

const fn = async sys => {
  console.log(`初始化完成`, sys)
  globalThis.sys = sys
  globalThis.main = sys
  globalThis.ws = sys.ws
  globalThis.native = sys.native
}

new Promise(async () => {
  if(globalThis.sys) {
    await fn(globalThis.sys)
  } else {
    await new Sys({
      log: true,
      wsUrl: import.meta.env.DEV ? `ws://127.0.0.1:10005?token=tokentokentoken` : undefined,
    }).then(fn).catch(err => {
      console.error(`sys-shim 初始化失败`)
    })
  }
  app.mount('#app')
})
