window.addEventListener(`sys-shim-init`, (event) => {
  const sys = event.detail.message
  const ws = sys.ws
  ws.on(`action.智能客服.文字回复.频率`, (...arg) => {
    console.log(`action.智能客服.文字回复.频率`, ...arg)
  })
  console.log(`sys-shim-init 初始化完成`, sys)
  sys.native.win.msgbox(document.title || `hello`)
})
