import cp from 'child_process'
const [buildType = `production`] = process.argv.splice(2)
cp.execSync(`npx shx rm -rf %temp%/sys-shim`, {stdio: `inherit`})
cp.execSync(`npx shx rm -rf ./win-api/res/`, {stdio: `inherit`})
const buildObj = {
  production() {
    cp.execSync(`npx webpack --entry ./src/node.js --output-path ./win-api/res/node --mode production --target node`, {stdio: `inherit`})
    cp.execSync(`npx webpack --entry ./src/browser.js --output-path ./win-api/res/browser --mode production --target web`, {stdio: `inherit`})
  },
  development() {
    cp.execSync(`npx webpack --devtool source-map --entry ./src/node.js --output-path ./win-api/res/node --mode development --target node`, {stdio: `inherit`})
    cp.execSync(`npx webpack --devtool source-map --entry ./src/browser.js --output-path ./win-api/res/browser --mode development --target web`, {stdio: `inherit`})
  },
}
buildObj[buildType]()
cp.execSync(`npx shx cp ./example/base/page.html ./win-api/res/page.html`, {stdio: `inherit`})
cp.execSync(`npx shx cp ./example/base/loading.html ./win-api/res/loading.html`, {stdio: `inherit`})
cp.execSync(`npx shx rm -rf ./win-api/res/**/*.LICENSE.txt`, {stdio: `inherit`})
