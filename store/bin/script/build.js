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

cp.execSync(`npx shx rm -rf dist`, {...execOpt})
cp.execSync(`npx shx mkdir dist`, {...execOpt})
cp.execSync(`npx rollup --config rollup.config.js`, {...execOpt})
cp.execSync(`npx shx cp ../main.exe dist/`, {...execOpt})
cp.execSync(`npx shx cp ../readme.md ./`, {...execOpt})
cp.execSync(`npm pack`, {...execOpt})
cp.execSync(`npx shx rm ./readme.md`, {...execOpt})