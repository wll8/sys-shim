window.addEventListener(`sys-shim-init`, (event) => {
  const sys = event.detail.message
  window.sys = sys
  const ws = sys.ws
  ws.on(`action.智能客服.文字回复.频率`, (...arg) => {
    console.log(`变化了`, ...arg)
  })
  console.log(`sys-shim-init 初始化完成`, sys)
  sys.native.win.msgbox(document.title || `hello`)
})
