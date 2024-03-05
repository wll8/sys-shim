import { createApp } from 'vue'
import App from './App.vue'
import './browser.js'

const ws = window.ext.wsUrl ? undefined : `ws://127.0.0.1:7788`
new Sys(ws).then(async main => {
  console.log(`初始化完成`, main)
  window.Neutralino = await main.api.neutralino()
  window.main = main
  window.msg = new main.Msg()
  createApp(App).mount('#app')
})