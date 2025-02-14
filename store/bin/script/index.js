import fs from 'node:fs'
import path from "node:path";
import process from 'node:process'

import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 获取可执行文件路径
 * @returns 
 */
export function getPath() {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'))
  if (process.platform === "win32") {
    return path.join(`${__dirname}/../${pkg.bin[`sys-shim-bin`]}`);
  } else if (process.platform === "darwin") {
    return ``
  } else {
    return ``
  }
}
