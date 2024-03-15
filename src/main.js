import { createApp } from 'vue'
import App from './App.vue'
import './browser.js'

const ws = globalThis.ext.wsUrl ? undefined : `ws://127.0.0.1:7788`
new globalThis.Sys(ws).then(async main => {
  console.log(`初始化完成`, main)
  globalThis.Neutralino = await main.api.neutralino()
  globalThis.main = main
  globalThis.msg = new main.Msg()
  createApp(App).mount(`#app`)
})
