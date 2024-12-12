import cp from 'node:child_process'
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

exec(`npx shx rm -rf dist`)
exec(`npx vite build`)
exec(`npx shx rm -rf dist/upload`)
