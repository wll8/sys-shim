import cp from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 输出目录
const resDir = `${__dirname}/../../bin/res/`

const execOpt = {
  cwd: __dirname,
  stdio: `inherit`,
}

// 生成 main.exe 所需资源
cp.execSync(`npm run gen.npm`, {...execOpt})
cp.execSync(`npx shx mkdir -p ${resDir}/browser/`, {...execOpt})
cp.execSync(`npx shx mkdir -p ${resDir}/node/`, {...execOpt})
cp.execSync(`npx shx cp ./npm-pkg/browser/main.umd.min.js ${resDir}/browser/main.umd.min.js`, {...execOpt})
cp.execSync(`npx shx cp ./npm-pkg/node/main.min.cjs ${resDir}/node/main.min.cjs`, {...execOpt})
fs.writeFileSync(`${resDir}/node/index.cjs`, `globalThis.Sys = require('./main.min.cjs')`)

console.info(`现在你可以编译出 main.exe 了`)
