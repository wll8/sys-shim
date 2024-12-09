import jsTextPre from './jsText.pre.js?raw'
import jsTextDemo from './jsText.demo.js?raw'

const useHook = () => {
  return {
    async openUrl(opt) {
      const { url, preloadScript = ``, userDataDir } = opt
      const ws = globalThis.shim.ws
      const view = () => {
        return new Promise((resolve, reject) => {
          const tag = `id${Math.random()}`
          ws.on(tag, ([hwnd]) => {
            console.log(`hwnd`, hwnd)
            resolve(hwnd)
          })
          ws.call(
            `run`,
            [
              `
                var option = ...
                var optionRes = table.assignDeep({
                  preloadScript = "";
                  userDataDir = null;
                  browserArguments = null;
                }, option)
                var winform = win.form(text="sys-shim";right=1300;bottom=800;)
                var hwnd = winform.hwnd
                var wb = web.view(winform, optionRes.userDataDir, optionRes.browserArguments);
                winform.wb = wb
                // 挂载到 window.ext 上的对象
                winform.wb.external = web.json.stringify({
                  token = global.G.token;
                  wsUrl = global.G.wsUrl;
                  hwnd = hwnd;
                })
                // 页面每次刷新都会运行
                var old = winform.wb.preloadScript
                winform.wb.preloadScript = function(js) {
                  js = '\n\n' + js + '\n\n'
                  call(old, owner, js)
                }
                winform.wb.preloadScript(\`(() => {
                  window._ext = chrome.webview.hostObjects.external
                  delete window.aardio
                })()\`)
                winform.wb.preloadScript(string.load(global.G.appDataPath + "/res/browser/main.umd.min.js"))
                winform.wb.preloadScript(optionRes.preloadScript)
                winform.wb.go(optionRes.url)
                winform.text = wb.xcall("() => document.title")
                winform.show();
                thread.command.publish("${tag}", hwnd)
              `,
              {
                preloadScript: [jsTextPre, preloadScript || jsTextDemo].join(`\n;`),
                url,
                userDataDir,
                browserArguments: null,
              },
            ],
            {
              runType: `raw`,
            },
          )
        })
      }
      const hwnd = await view()
      return hwnd
    },
  }
}
export default useHook
