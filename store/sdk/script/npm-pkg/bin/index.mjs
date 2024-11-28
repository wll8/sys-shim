#!/usr/bin/env node

import cp from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import minimist from 'minimist'
import {fn as pack} from './pack.mjs'
import { getPath } from 'sys-shim-bin'

const binPath = getPath()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pkgPath = `${__dirname}/../../../`

const cwd = `${pkgPath}/script/npm-pkg/shim/win`
const pkg = JSON.parse(fs.readFileSync(`${pkgPath}/package.json`, `utf8`))
const argv = minimist(process.argv.slice(2))
const argv0 = argv._[0]

new Promise(async () => {
  printLogo()
  if(argv0 === `pack`) {
    await pack(argv)
  } else {
    cp.execSync(binPath, {
      cwd,
      stdio: `inherit`,
    })
  }
})


function printLogo() {
  const vTag = `version: `
  const logText = fs.readFileSync(`${__dirname}/logo.txt`, `utf8`)
  const versionLogo = logText.replace(new RegExp(`(${vTag})(.*)`), (match, $1, $2) => {
    const vStr = pkg.version
    const vLength = vStr.length
    const vLine = vLength > $2.length // 如果版本号替换到版本标志后面
      ? `${$1}${vStr}`
      : match.replace(new RegExp(`(${vTag})(.{${vLength}})`), `$1${vStr}`)
    return vLine
  })
  console.log(versionLogo)
}
