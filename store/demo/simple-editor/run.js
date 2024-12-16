import process from 'node:process'
import child_process from 'node:child_process'
import fs from 'node:fs'
import { getPath } from 'sys-shim-bin'
const sysShimBinPath = getPath()
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time || 1e3))

new Promise(async () => {
  const VITE_SERVER_BASEURL = `ws://127.0.0.1:10005?token=tokentokentoken`
  const { ProcessManager } = await import(`@wll8/process-manager`)
  const treeKill = (await import(`tree-kill`)).default
  const cpVite = new ProcessManager({
    bin: `cmd.exe`,
    arg: [`/k`, `npx vite`],
    spawnOption: {
      env: {
        VITE_SERVER_BASEURL,
      },
    },
  })
  cpVite.on(`stdout`, (data = ``) => {
    const [, url] = data.match(/Network:\s+(.*)\n/) || []
    url && runExe(url)
  })
  cpVite.on(`close`, () => {
    process.exit()
  })

  async function runExe(url) {
    url = `${url}/init.html`
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
    child_process.exec(sysShimBinPath, (...arg) => {
      treeKill(process.pid, `SIGKILL`, (err) => {
        process.exit()
      })
    })
    await sleep()
    fs.writeFileSync(`./package.json`, text)
  }
})
