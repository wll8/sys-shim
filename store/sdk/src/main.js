import { createApp } from 'vue'
import App from './App.vue'

// 从开发环境引入
// import Sys from './browser.js'

// 从发布的包里引入
import Sys from 'sys-shim'

const fn = async sys => {
  console.log(`初始化完成`, sys)
  globalThis.sys = sys
  globalThis.main = sys
  globalThis.ws = sys.ws
  globalThis.native = sys.native
  globalThis.msg = new sys.Msg()
}

new Promise(async () => {
  if(globalThis.sys) {
    await fn(globalThis.sys)
  } else {
    await new Sys({
      log: true,
      wsUrl: `ws://127.0.0.1:10005?token=tokentokentoken`,
    }).then(fn).catch(err => {
      console.error(`sys-shim 初始化失败`)
    })
  }
  createApp(App).mount(`#app`)
})
