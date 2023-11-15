import * as RPCWebSocket from 'rpc-websockets/dist/index.browser-bundle.js'
import SysRef from './sys.js'

// 当在 webview 中打开时, 有 ext 对象
global.ext = global.ext || {}
class Sys extends SysRef {
  constructor(wsUrl) {
    return new Promise(async (resolve) => {
      wsUrl = wsUrl || `${await global.ext.wsUrl}?token=${await global.ext.token }`
      const ws = new RPCWebSocket.Client(await wsUrl)
      // 使用 await 等待 super 返回的 promise 结束, 否则 this 是一个 promise, 不能赋值
      const that = await super(ws)
      that.hwnd = await global.ext.hwnd
      resolve(that)
    })
  }
}
global.Sys = Sys
