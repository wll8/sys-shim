document.addEventListener(`DOMContentLoaded`, async () => {
  new window.Sys().then(async main => {
    window.sys = main
    // 编程式设置窗口图标
    const tabIcon = `./favicon.ico`
    const [, exist] = await window.sys.native.io.exist(tabIcon)
    exist && await window.sys.native.win.image.setIcon(window.sys.hwnd, tabIcon)
  })
})
