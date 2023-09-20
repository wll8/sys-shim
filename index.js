const fs = require(`fs`)
const cp = require(`child_process`)

console.log(`已启动了`)
setInterval(() => {
  const now = String(Date.now())
  console.log(`now`, now)
  fs.writeFileSync(`./temp.txt`, now)
}, 1000);

const WebSocket = require(`rpc-websockets`).Client;

console.log(`ws`, process.env.wsUrl)
const ws = new WebSocket(process.env.wsUrl)
ws.on(`open`, () => {
  ws.call(`tray.create`).then(hwnd => {
    console.log(hwnd)
    ws.call(`tray.icon`, [hwnd, `${__dirname}/win-api/main/favicon-48.ico`])
    ws.call(`tray.tip`, [hwnd, `tiptiptip`])
    ws.call(`tray.pop`, [hwnd, `traytray`, `msgmsgmsg`, 1])
    ws.on(`tray._WM_RBUTTONUP`, (hwnd) => {
      console.log(`_WM_RBUTTONUP`, hwnd)
    })
    ws.on(`tray._WM_LBUTTONUP`, (hwnd) => {
      console.log(`_WM_LBUTTONUP`, hwnd)
    })
    ws.call(`view.create`, [`${__dirname}/index.html`])
  })
})

