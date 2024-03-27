if(globalThis.Sys) {
  new globalThis.Sys().then(async main => {
    globalThis.main = main
    globalThis.native = main.native
    globalThis.Neutralino = await main.api.neutralino()
    const [, hwnd] = await main.form.hwnd
    const title = 'sys-shim 文档'
    const icon = "https://www.hongqiye.com/favicon.ico"
    const obj = {hwnd, title, icon}
    console.log(obj)
  
    await main.ws.call('run', [`
      var arg = ...
      win.form._forms[arg.hwnd].text = arg.title
      win.form._forms[arg.hwnd].setIcon(arg.icon)
    `, obj])
  })
} else {
  console.group(
    "%c提示:",
    "background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 4px ;"
  );
  console.log( "你可以直接下载 https://github.com/wll8/sys-shim-doc/releases/download/v0.0.1/sys-shim-doc.exe" );
  console.log( "然后 F12 打开控制台，测试 api 调用" );
  console.log( "例如 native.process('mspaint')" );
  console.log( "由于应用未签名，可能报毒，介意误下" );
  console.groupEnd();
}
