import { createApp } from 'vue'
import App from './App.vue'

globalThis.Sys = await {
  dev: async () => await import(`./browser.js`).then(m => m.default),
  none: async () => globalThis.Sys,
}[import.meta.env.VITE_USE_PROD_SYS_SHIM]()

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
    await new globalThis.Sys({
      log: true,
      wsUrl: import.meta.env.VITE_SERVER_BASEURL,
    }).then(fn).catch(err => {
      console.error(`sys-shim 初始化失败`)
    })
  }
  createApp(App).mount(`#app`)
})
