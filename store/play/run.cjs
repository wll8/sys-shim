const fs = require('node:fs')
const process = require('node:process')
const child_process = require('node:child_process')
const treeKill = require('tree-kill')
const { getPath } = require('sys-shim-bin')

const sysShimBinPath = getPath()
const sleep = time => new Promise(resolve => setTimeout(resolve, time || 1e3))
const { ProcessManager } = require(`@wll8/process-manager`)
const cp = new ProcessManager({
  bin: `cmd.exe`,
  arg: [
    `/c`,
    `npx vite`,
  ],
})
cp.on(`stdout`, (data = ``) => {
  // eslint-disable-next-line regexp/no-super-linear-backtracking
  const [, url] = data.match(/Network:\s+(.*)\n/) || []
  url && runExe(url)
})
cp.on(`close`, () => {
  // ...
})

async function runExe(url) {
  if (globalThis.runing) {
    return undefined
  }

  globalThis.runing = true

  const text = fs.readFileSync(`./package.json`, `utf8`)
  let textJson = JSON.parse(text)
  textJson = {
    ...textJson,
    page: url,
    token: `tokentokentoken`,
    browserArguments: `--disable-web-security --allow-running-insecure-content`,
    originRegExp: `.*`,
    form: {
      right: `1000`,
      bottom: `600`,
    },
    socket: {
      port: 10005,
    },
  }
  fs.writeFileSync(`./package.json`, JSON.stringify(textJson, null, 2))
  await sleep()
  child_process.exec(sysShimBinPath, () => {
    treeKill(process.pid, `SIGKILL`, () => {
      process.exit()
    })
  })
  await sleep()
  fs.writeFileSync(`./package.json`, text)
}
