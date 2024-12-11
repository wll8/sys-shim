import './assets/main.css'

import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

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
import { getUserId } from '@/util.js'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia.use(piniaPluginPersistedstate))
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
  globalThis.userId = await getUserId()
}

new Promise(async () => {
  if (globalThis.sys) {
    await fn(globalThis.sys)
  } else {
    await new Sys({
      log: process.env.NODE_ENV === `development`,
      wsUrl: config.sysShimWs,
    })
      .then(fn)
      .catch((err) => {
        console.error(`sys-shim 初始化失败`, err)
      })
  }
  app.mount(`#app`)
})
