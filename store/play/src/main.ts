import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import 'virtual:uno.css'
import './assets/css/index.scss'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

if (globalThis.Sys) {
  new globalThis.Sys({ log: true }).then(async (main: any) => {
    globalThis.Neutralino = await main.api.neutralino()
    globalThis.main = main
    globalThis.native = main.native
    globalThis.msg = new main.Msg()
  })
}
