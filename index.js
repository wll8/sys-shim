const fs = require(`fs`)
const cp = require(`child_process`)

console.log(`已启动了`)
setInterval(() => {
  const now = String(Date.now())
  console.log(`now`, now, process.argv.join(`, `))
  fs.writeFileSync(`./temp.txt`, now)
}, 1000);

const WebSocket = require(`rpc-websockets`).Client;

console.log(`ws`, process.env.wsUrl)
const ws = new WebSocket(process.env.wsUrl)
new Promise(async ()=> {
  const { View, Tray } = await new Sys(ws)
  const tray = await new Tray()
  await tray.icon(`${__dirname}/win-api/main/favicon-48.ico`)
  await tray.tip(`tiptiptip`)
  await tray.pop(`traytray`, `msgmsgmsg`, 1)
  tray.on(`_WM_RBUTTONUP`, () => {
    console.log(`_WM_RBUTTONUP`, )
  })
  tray.on(`_WM_LBUTTONUP`, () => {
    console.log(`_WM_LBUTTONUP`, )
  })
  const view = await new View(`${__dirname}/index.html`)
})

