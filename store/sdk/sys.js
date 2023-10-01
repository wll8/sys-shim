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
  const { View, Tray, Msg } = await new Sys(ws)
  const tray = await new Tray()
  const msg = await new Msg()
  await tray.icon(`https://www.hongqiye.com/favicon.ico`)
  await tray.tip(`tiptiptip`)
  await tray.pop(`traytray`, `msgmsgmsg`, 1)
  msg.on(`hello`, (...arg) => {
    console.log(`hello`, ...arg)
  })
  tray.on(`_WM_RBUTTONUP`, () => {
    console.log(`_WM_RBUTTONUP`, )
  })
  tray.on(`_WM_LBUTTONUP`, () => {
    console.log(`_WM_LBUTTONUP`, )
  })
  const view = await new View(`${__dirname}/page.html`)
})

