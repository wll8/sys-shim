const RPCWebSocket = require(`rpc-websockets`)
const Sys = require(`./sys.js`)
class Sys2 extends Sys {
  constructor(wsUrl = process.env.wsUrl) {
    return new Promise(async (resolve) => {
      const ws = new RPCWebSocket.Client(await wsUrl)
      super(ws)
      resolve(this)
    })
  }
}
global.Sys = Sys2