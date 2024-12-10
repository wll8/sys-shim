<template>
  <div class="page">loading...</div>
</template>

<script setup>
const ws = globalThis.ws
new Promise(async () => {
  console.log(111, window.sys.hwnd)
  const [, winformInfo] = await ws.call(
    `run`,
    [
      `
          var winform = win._form.getForm(${window.sys.hwnd})
          winform.show(false)
          return {
            left: winform.left,
            top: winform.top,
            right: winform.right,
            bottom: winform.bottom,
          }
  `,
    ],
    {
      runType: `main`,
    },
  )
  custom(winformInfo)

  function custom(winformInfo) {
    const boxUrl = location.origin + location.pathname + `#/page1`
    const arg = {
      title: document.title,
      boxUrl,
      toExit: true, // 关闭时是否退出主程序
    }
    console.log(`winformInfo`, winformInfo)
    ws.call(
      `run`,
      [
        `
        var winformInfo = global.G.config.form
        var arg = ...
        var winformSub = win.form({
          text: arg.title;
          right: 1400;
          bottom: 900;
        })
        global.G.winformSub = winformSub
        global.G.winformSub.orphanWindow()
        global.G.winformSub.add(
          page={
            cls="custom";
            transparent=1;
            z=2
          };
          box={
            cls="custom";
            left=50;
            top=100;
            right=900;
            bottom=700;
            ah=1;
            aw=1;
            transparent=1;
            z=1
          }
        )

        var wbBox  = web.view( global.G.winformSub.box )
        global.G.winformSub.wbBox = wbBox
        // 挂载到 window.ext 上的对象
        global.G.winformSub.wbBox.external = web.json.stringify({
          token = global.G.token;
          wsUrl = global.G.wsUrl;
          hwnd = global.G.winformSub.hwnd;
        })
        // 页面每次刷新都会运行
        var old = global.G.winformSub.wbBox.preloadScript
        global.G.winformSub.wbBox.preloadScript = function(js) {
          js = '\n\n' + js + '\n\n'
          call(old, owner, js)
        }
        global.G.winformSub.wbBox.preloadScript(\`(() => {
          window._ext = chrome.webview.hostObjects.external
          delete window.aardio
        })()\`)
        global.G.winformSub.wbBox.preloadScript(string.load(global.G.appDataPath + "/res/browser/main.umd.min.js"))
        global.G.winformSub.wbBox.go(arg.boxUrl)
        global.G.winformSub.text = global.G.winformSub.wbBox.xcall("() => document.title")
        global.G.winformSub.wbBox.defaultBackgroundColor = 0
        global.G.winformSub.onClose = function() {
          if(arg.toExit) global.G.killAll()
        }
        global.G.winformSub.show();
`,
        arg,
      ],
      {
        runType: `main`,
      },
    )
  }
})
</script>

<style scoped lang="less">
.page {
  // background-color: #ccc;
}
</style>
