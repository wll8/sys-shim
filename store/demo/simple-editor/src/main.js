import { createApp } from 'vue'
import App from './App.vue'
import Sys from 'sys-shim'

new Sys({log: true}).then(async main => {
  console.log(`初始化完成`, main)
  globalThis.main = main
  globalThis.ws = main.ws
  globalThis.native = main.native
  createApp(App).mount(`#app`)
}).catch(err => {
  alert(`sys-shim 初始化失败`)
  createApp(App).mount(`#app`)
})
