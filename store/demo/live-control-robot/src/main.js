import './assets/main.css'

import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'

import Sys from 'sys-shim'

import App from './App.vue'
import router from './router'
import config from '@/config.js'
import http from '@/http.js'

const app = createApp(App)
app.use(createPinia().use(createPersistedState()))
app.use(router)
app.use(ElementPlus)
app.use(Avue, { axios: http })

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const fn = async (sys) => {
  console.log(`初始化完成`, sys)
  globalThis.sys = sys
  globalThis.main = sys
  globalThis.shim = sys
  globalThis.ws = sys.ws
  globalThis.native = sys.native
}

new Promise(async () => {
  if (globalThis.sys) {
    await fn(globalThis.sys)
  } else {
    await new Sys({
      log: true,
      wsUrl: config.sysShimWs,
    })
      .then(fn)
      .catch((err) => {
        console.error(`sys-shim 初始化失败`, err)
      })
  }
  app.mount(`#app`)
})
