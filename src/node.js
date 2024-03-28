import * as RPCWebSocket from 'rpc-websockets'
import util from 'util'
import SysRef from '@/sys.js'

try {
  globalThis.ext = globalThis.ext || JSON.parse(globalThis.process.env._ext)
  delete globalThis.process.env._ext
} catch (error) {
  // ...
}

const lib = {
  encoder: new (util.TextEncoder)(`utf-8`),
  decoder: new (util.TextDecoder)(`utf-8`),
}

class Sys extends SysRef {
  constructor(user = {}) {
    user = typeof(user) === `string` ? {wsUrl: user} : user
    return new Promise(async (resolve) => {
      user.wsUrl = user.wsUrl || `${globalThis.ext.wsUrl}?token=${globalThis.ext.token }`
      const ws = new RPCWebSocket.Client(user.wsUrl)
      const that = await super({
        ...user,
        ws,
        lib,
      })
      resolve(that)
    })
  }
}
globalThis.Sys = Sys
