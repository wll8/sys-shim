import cp from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const execOpt = {
  cwd: __dirname,
  stdio: `inherit`,
}

// 生成 main.exe 所需资源
cp.execSync(`npm run gen.npm`, {...execOpt})
cp.execSync(`npx shx mkdir -p ../win-api/res/browser/`, {...execOpt})
cp.execSync(`npx shx mkdir -p ../win-api/res/node/`, {...execOpt})
cp.execSync(`npx shx cp ./npm-pkg/browser/main.umd.min.js ../win-api/res/browser/main.umd.min.js`, {...execOpt})
cp.execSync(`npx shx cp ./npm-pkg/node/main.min.cjs ../win-api/res/node/main.min.cjs`, {...execOpt})
fs.writeFileSync(`${__dirname}/../win-api/res/node/index.cjs`, `globalThis.Sys = require('./main.min.cjs')`)

console.info(`现在你可以编译出 main.exe 了`)
