const RPCWebSocket = require(`rpc-websockets`)
import SysRef from './sys.js'
class Sys extends SysRef {
  constructor(wsUrl = global.process.env.wsUrl) {
    return new Promise(async (resolve) => {
      const ws = new RPCWebSocket.Client(await wsUrl)
      const that = await super(ws)
      resolve(that)
    })
  }
}
global.Sys = Sys