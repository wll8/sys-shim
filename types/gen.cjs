const fs = require(`fs`)
const cp = require(`child_process`)
const util = require(`./util.cjs`)
const basePath = `C:/Users/win/Downloads/aardio_v35.69.2/aardio_v35.69.2/`
fs.mkdirSync(`${__dirname}/dist/`, {recursive: true})

new Promise(async () => {
  const glob = await import(`glob`)
  const prettier = await import(`prettier`)
  const fileList = await glob.glob(`${basePath}/**/*.aardio`)
  let okList = []
  let errList = []
  await Promise.all(fileList.map((filePath) => {
    return new Promise(async (ok) => {
      const dtsPath = `${filePath}.d.ts`
      const { dtsText } = util.getFleDts(filePath)
      fs.writeFileSync(dtsPath, dtsText)
      const formatted = await prettier.format(dtsText, {parser: `typescript`}).catch(err => {
        errList.push(dtsPath)
        return ``
      }).then(res => {
        // console.log(`resres`, res)
        okList.push(dtsPath)
        return res
      })
      console.log(`formatted`, formatted.length)
      // fs.writeFileSync(dtsPath, formatted || dtsText)
      ok()
    })
  }))
  // console.log(`res`, {errList, okList})
  // cp.execSync(`npx prettier ${basePath}/**/*.aardio.d.ts --write`, {stdio: `inherit`})
})