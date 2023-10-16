import * as RPCWebSocket from 'rpc-websockets/dist/index.browser-bundle.js'
import * as Sys from './sys.js'
class Sys2 extends Sys {
  constructor(wsUrl = window.ext.wsUrl) {
    return new Promise(async (resolve) => {
      const ws = new RPCWebSocket.Client(await wsUrl)
      super(ws)
      resolve(this)
    })
  }
}
window.Sys = Sys2