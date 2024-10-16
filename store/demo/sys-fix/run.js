import process from 'node:process'
import fs from 'node:fs'

const sleep = time => new Promise(resolve => setTimeout(resolve, time || 1e3))
new Promise(async () => {
  const { ProcessManager } = await import(`@wll8/process-manager`)
  const cp = new ProcessManager({
    bin: `cmd.exe`,
    arg: [
      `/c`,
      `npx vite`,
    ],
  })
  cp.on(`stdout`, (data = ``) => {
    const [, url] = data.match(/Network:\s+(.*)\n/) || []
    url && runExe(url)
  })
  cp.on(`close`, () => {
    // ...
  })

  async function runExe(url) {
    if ( globalThis.runing ) {
      return undefined
    }

    globalThis.runing = true
    const text = fs.readFileSync(`./package.json`, `utf8`)
    const textJson = JSON.parse(text)
    textJson.page = url
    fs.writeFileSync(`./package.json`, JSON.stringify(textJson, null, 2))
    await sleep()
    const cp = new ProcessManager({
      bin: `node_modules/sys-shim/script/npm-pkg/shim/win/main.exe`,
      autoReStart: false,
    })
    cp.on(`close`, () => {
      process.exit()
    })
    await sleep()
    fs.writeFileSync(`./package.json`, text)
  }
})
