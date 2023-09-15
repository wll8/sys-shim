const fs = require(`fs`)

const WebSocket = require(`rpc-websockets`).Client;

const ws = new WebSocket(process.env.wsUrl)
ws.on(`open`, () => {
  ws.call(`tray`).then(result => {
    ws.call(`icon`, [`${__dirname}/win-api/tray/favicon-48.ico`])
    ws.call(`tip`, [`tiptiptip`])
    ws.call(`pop`, [`traytray`, `msgmsgmsg`, 1])
  })
  ws.call(`show`, [true])
  ws.on(`_WM_RBUTTONUP`, () => {
    console.log(`_WM_RBUTTONUP`)
  })
  ws.on(`_WM_LBUTTONUP`, () => {
    console.log(`_WM_LBUTTONUP`)
  })
})

