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
  const view = await new View(`${__dirname}/page.html`)
})

