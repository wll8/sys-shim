const cp = require(`node:child_process`)
const cwd = `${__dirname}/../npm-pkg/shim/win/`
cp.execSync(`${cwd}/main.exe`, {
  cwd,
  stdio: `inherit`,
})
