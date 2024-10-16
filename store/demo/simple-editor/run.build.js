import cp from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const execOpt = {
  cwd: __dirname,
  stdio: `inherit`,
}

cp.execSync(`npx vite build`, {...execOpt})
fs.copyFileSync(`./node_modules/sys-shim/script/npm-pkg/shim/win/main.exe`, `./dist/main.exe`)
fs.renameSync(`./dist/index.html`, `./dist/page.html`)
cp.execSync(`start dist`, {...execOpt})
