import cp from 'node:child_process'
import process from 'node:process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const exec = (cmd, arg) => {
  const execOpt = {
    cwd: __dirname,
    stdio: `inherit`,
  }
  try {
    cp.execSync(cmd, { ...execOpt, ...arg })
  } catch (error) {
    console.log(String(error))
  }
}
const config = {
  development: {
    page: `http://127.0.0.1:5173/init.html`,
    isObfuscate: false,
  },
  production: {
    page: `http://127.0.0.1:7800/live/init.html`,
    isObfuscate: false,
  },
}[process.env.NODE_ENV || `production`]

// 是否打包 server
const isServer = false

// 是否打包 dist
const isDist = false

new Promise(async () => {
  if (isDist) {
    exec(`npm run build:fe`)
  } else {
    // ...exec(`npx shx rm -rf dist`)
  }
  exec(`npx shx mkdir dist`)
  if (isServer) {
    exec(`npx shx mkdir -p dist/server`)
    exec(`npx ncc build server/run.cjs -m -o dist && npx shx mv dist/index.cjs dist/server/run.cjs`)
  }
  exec(`npx shx mkdir -p dist/lib`)
  exec(`npx shx cp -rf lib/* dist/lib/`)

  fs.writeFileSync(
    `./dist/package.json`,
    JSON.stringify(
      {
        browserArguments: `--disable-web-security --allow-running-insecure-content`,
        pageShow: false,
        form: {
          right: `1000`,
          bottom: `600`,
        },
        page: config.page,
      },
      null,
      2,
    ),
  )

  exec(`npx sys-shim pack --input dist --out live-control-robot`)
})
