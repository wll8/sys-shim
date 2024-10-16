#!/usr/bin/env node

import cp from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import minimist from 'minimist'
import {fn as pack} from './pack.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const cwd = `${__dirname}/../shim/win`
const argv = minimist(process.argv.slice(2))
const argv0 = argv._[0]

new Promise(async () => {
  if(argv0 === `pack`) {
    await pack(argv)
  } else {
    cp.execSync(`${cwd}/main.exe`, {
      cwd,
      stdio: `inherit`,
    })
  }
})
