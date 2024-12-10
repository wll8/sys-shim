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
                var code = /**
                  var , option = ...
                  var optionRes = table.assignDeep({
                    preloadScript = "";
                    userDataDir = null;
                    browserArguments = null;
                  }, option)
                  var winform = win.form(text="sys-shim-app")
                  var wbPage = web.view(winform, fsys.path.full(optionRes.userDataDir, io.appData("live-control-robot")), optionRes.browserArguments);
                  winform.show()
                  wbPage = wbPage
                  var hwnd =wbPage.hwndChrome
                  // 挂载到 window.ext 上的对象
                  wbPage.external = web.json.stringify({
                    token = global.G.token;
                    wsUrl = global.G.wsUrl;
                    hwnd = hwnd;
                  })
                  // 页面每次刷新都会运行
                  var old = wbPage.preloadScript
                  wbPage.preloadScript = function(js) {
                    js = '\n\n' + js + '\n\n'
                    call(old, owner, js)
                  }
                  wbPage.preloadScript(\`(() => {
                    window._ext = chrome.webview.hostObjects.external
                    delete window.aardio
                  })()\`)
                  wbPage.preloadScript(string.load(global.G.appDataPath + "/res/browser/main.umd.min.js"))
                  wbPage.preloadScript(optionRes.preloadScript)
                  wbPage.go(optionRes.url)
                  thread.command.publish("${tag}", hwnd)
                **/
                global.G.winformSub.page.loadForm(code, ...)
              `,
              {
                preloadScript: [jsTextPre, preloadScript || jsTextDemo].join(`\n;`),
                url,
                userDataDir,
                browserArguments: null,
              },
            ],
            {
              runType: `main`,
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
