import { createApp } from 'vue'
import App from './App.vue'

// 从开发环境引入
// import Sys from './browser.js'

// 从发布的包里引入
import Sys from 'sys-shim'

new Sys({log: true}).then(async main => {
  console.log(`初始化完成`, main)
  // globalThis.Neutralino = await main.api.neutralino()
  globalThis.main = main
  globalThis.native = main.native
  globalThis.msg = new main.Msg()
  createApp(App).mount(`#app`)
}).catch(err => {
  console.error(`初始化错误`, err)
})
