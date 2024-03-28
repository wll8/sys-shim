import { createApp } from 'vue'
import App from './App.vue'
import './browser.js'

new globalThis.Sys({log: true}).then(async main => {
  console.log(`初始化完成`, main)
  globalThis.Neutralino = await main.api.neutralino()
  globalThis.main = main
  globalThis.native = main.native
  globalThis.msg = new main.Msg()
  createApp(App).mount(`#app`)
})
