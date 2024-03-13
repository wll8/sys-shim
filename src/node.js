import * as RPCWebSocket from 'rpc-websockets'
import util from 'util'
import SysRef from '@/sys.js'

globalThis.ext = globalThis.ext || JSON.parse(globalThis.process.env.ext || `{}`)

const lib = {
  encoder: new (util.TextEncoder)(`utf-8`),
  decoder: new (util.TextDecoder)(`utf-8`),
}

class Sys extends SysRef {
  constructor(wsUrl) {
    return new Promise(async (resolve) => {
      wsUrl = wsUrl || `${await globalThis.ext.wsUrl}?token=${await globalThis.ext.token }`
      const ws = new RPCWebSocket.Client(await wsUrl)
      const that = await super(ws, lib)
      resolve(that)
    })
  }
}
globalThis.Sys = Sys