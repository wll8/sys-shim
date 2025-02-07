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
              ``,
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
