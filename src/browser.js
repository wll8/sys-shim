import * as RPCWebSocket from 'rpc-websockets/dist/index.browser-bundle.js'
import Sys from './sys.js'
class Sys2 extends Sys {
  constructor(wsUrl = global.ext.wsUrl) {
    return new Promise(async (resolve) => {
      const ws = new RPCWebSocket.Client(await wsUrl)
      super(ws)
      resolve(this)
    })
  }
}
global.Sys = Sys2