#!/usr/bin/env node

const cp = require(`child_process`)
const cwd = `${__dirname}/../npm-pkg/shim/win/`
cp.execSync(`${cwd}/main.exe`, {
  cwd,
  stdio: `inherit`,
})
