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
fs.writeFileSync(`./dist/package.json`, JSON.stringify({
  "browserArguments": "--disable-web-security --allow-running-insecure-content",
  "form": {
    "right": "1000",
    "border": "thin",
    "bottom": "600"
  },
  "page": "index.html"
}, null, 2))
cp.execSync(`npx sys-shim pack --input dist`, {...execOpt})
