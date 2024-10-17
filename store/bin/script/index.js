import path from "node:path";
import process from 'node:process'

import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function getPath() {
  if (process.platform === "win32") {
    return path.join(`${__dirname}/main.exe`);
  } else if (process.platform === "darwin") {
    return ``
  } else {
    return ``
  }
}
