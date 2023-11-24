const RPCWebSocket = require(`rpc-websockets`)
import SysRef from './sys.js'

global.ext = global.ext || JSON.parse(global.process.env.ext || `{}`)
class Sys extends SysRef {
  constructor(wsUrl) {
    return new Promise(async (resolve) => {
      wsUrl = wsUrl || `${await global.ext.wsUrl}?token=${await global.ext.token }`
      const ws = new RPCWebSocket.Client(await wsUrl)
      const that = await super(ws)
      resolve(that)
    })
  }
}
global.Sys = Sys