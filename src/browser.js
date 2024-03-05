import * as RPCWebSocket from 'rpc-websockets/dist/index.browser-bundle.js'
import SysRef from './sys.js'

// 当在 webview 中打开时, 有 ext 对象
globalThis.ext = Promise.resolve(await (globalThis.ext || {}))

const lib = {
  encoder: new globalThis.TextEncoder(),
  decoder: new globalThis.TextDecoder(),
}

class Sys extends SysRef {
  constructor(wsUrl) {
    return new Promise(async (resolve) => {
      wsUrl = wsUrl || `${await globalThis.ext.wsUrl}?token=${await globalThis.ext.token }`
      const ws = new RPCWebSocket.Client(await wsUrl)
      // 使用 await 等待 super 返回的 promise 结束, 否则 this 是一个 promise, 不能赋值
      const that = await super(ws, lib)
      that.hwnd = await globalThis.ext.hwnd
      resolve(that)
    })
  }
}
globalThis.Sys = Sys
