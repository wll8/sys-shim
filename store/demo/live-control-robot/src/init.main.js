import { sleep } from '@/util.js'

const fn = async (sys) => {
  console.log(`初始化完成`, sys)
  globalThis.sys = sys
  globalThis.main = sys
  globalThis.shim = sys
  globalThis.ws = sys.ws
  globalThis.native = sys.native
  start()
}

new Promise(async () => {
  await sleep(500)
  if (globalThis.sys) {
    await fn(globalThis.sys)
  } else {
    await new globalThis.Sys({
      log: false,
    })
      .then(fn)
      .catch((err) => {
        console.error(`sys-shim 初始化失败`, err)
      })
  }
})
async function start() {
  const ws = globalThis.ws

  console.log(111, window.sys.hwnd)
  const [, winformInfo] = await ws.call(
    `run`,
    [
      ``,
    ],
    {
      runType: `main`,
    },
  )
  custom(winformInfo)

  function custom(winformInfo) {
    const boxUrl =
      process.env.NODE_ENV === `development`
        ? `http://127.0.0.1:5173/index.html#/page1`
        : `http://127.0.0.1:7800/live/index.html#/page1`
    const arg = {
      title: document.title,
      boxUrl,
      toExit: true, // 关闭时是否退出主程序
    }
    console.log(`winformInfo`, winformInfo)
    ws.call(
      `run`,
      [
        ``,
        arg,
      ],
      {
        runType: `main`,
      },
    )
  }
}
