import cp from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as util from './util.js'
import process from 'node:process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

new Promise(async () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'))
  const binVersion = pkg.binVersion
  const path7za = await util.getPath7za()
  const fileName = `neutralinojs-v${binVersion}.zip`
  const exeName = pkg.exeName

  util.exec(`echo npx shx rm -rf temp/`)
  util.exec(`npx shx mkdir temp/`)
  util.exec(`wget -c https://github.com/neutralinojs/neutralinojs/releases/download/v${binVersion}/neutralinojs-v${binVersion}.zip`, {cwd: `./temp`})
  util.exec(`"${path7za}" e -aos "${fileName}" "${exeName}"`, {cwd: `./temp/`})
  util.exec(`npx shx rm -rf dist/`)
  util.exec(`npx rollup --config rollup.config.js`)
  util.exec(`npx shx mv temp/${exeName} dist/main.exe`)
})

