import * as RPCWebSocket from 'rpc-websockets'
import SysRef from './sys.js'

globalThis.ext = globalThis.ext || JSON.parse(globalThis.process.env.ext || `{}`)
class Sys extends SysRef {
  constructor(wsUrl) {
    return new Promise(async (resolve) => {
      wsUrl = wsUrl || `${await globalThis.ext.wsUrl}?token=${await globalThis.ext.token }`
      const ws = new RPCWebSocket.Client(await wsUrl)
      const that = await super(ws)
      resolve(that)
    })
  }
}
globalThis.Sys = Sys