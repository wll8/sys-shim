import * as RPCWebSocket from 'rpc-websockets/dist/index.browser-bundle.js'
import SysRef from '@/sys.js'

globalThis.ext = globalThis.ext || new Promise(async (resolve) => {
  globalThis.ext = JSON.parse((await globalThis._ext) || `{}`)
  delete globalThis._ext
  resolve(globalThis.ext)
})

const lib = {
  encoder: new globalThis.TextEncoder(),
  decoder: new globalThis.TextDecoder(),
}

class Sys extends SysRef {
  constructor(user = {}) {
    user = typeof(user) === `string` ? {wsUrl: user} : user
    return new Promise(async (resolve) => {
      globalThis.ext = await globalThis.ext
      user.wsUrl = user.wsUrl || `${globalThis.ext.wsUrl}?token=${globalThis.ext.token }`
      const ws = new RPCWebSocket.Client(user.wsUrl)
      const that = await super({
        ...user,
        ws,
        lib,
      })
      // todo 只有通过 exe 加载时才会有，应在后面的版本中删除
      that.hwnd = globalThis.ext.hwnd
      resolve(that)
    })
  }
}
export default Sys
