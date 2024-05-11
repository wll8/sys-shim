import Sys from 'sys-shim'

new Sys({
  log: true,
  wsUrl: `ws://127.0.0.1:10005?token=tokentokentoken`,
}).then(async main => {
  globalThis.native = main.native
  globalThis.native.win.msgbox(`hello`, `title`)
}).catch(err=> {
  console.err(`err`, err)
})
