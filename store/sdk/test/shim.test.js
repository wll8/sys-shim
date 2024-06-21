import { describe, expect, test } from 'vitest'
import Sys from '@/node'
import fetch from 'node-fetch'
import fs from 'node:fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { sleep, getCodeId } from '@/util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const curInt8Array = [...new Int8Array(fs.readFileSync(__filename))]
const curStr = Buffer.from(curInt8Array).toString(`utf8`)

/**
 * 测试原生 shim 提供的方法
 * 例如 shim.util
 */
await new Sys({ log: false, wsUrl: `ws://127.0.0.1:10005?token=tokentokentoken` }).then(async shim => {
  describe.todo(`测试`, () => {
  })
})
