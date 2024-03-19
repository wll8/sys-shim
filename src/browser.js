import * as RPCWebSocket from 'rpc-websockets/dist/index.browser-bundle.js'
import SysRef from '@/sys.js'

globalThis.ext = globalThis.ext || new Promise(async (resolve) => {
  try {
    globalThis.ext = JSON.parse(await globalThis._ext)
    delete globalThis._ext
  } catch (error) {
    // ...
  }
  resolve(globalThis.ext)
})

const lib = {
  encoder: new globalThis.TextEncoder(),
  decoder: new globalThis.TextDecoder(),
}

class Sys extends SysRef {
  constructor(wsUrl) {
    return new Promise(async (resolve) => {
      globalThis.ext = await globalThis.ext
      wsUrl = wsUrl || `${globalThis.ext.wsUrl}?token=${globalThis.ext.token }`
      const ws = new RPCWebSocket.Client(wsUrl)
      const that = await super(ws, lib)
      that.hwnd = globalThis.ext.hwnd
      resolve(that)
    })
  }
}
globalThis.Sys = Sys
