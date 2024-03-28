在空目录中运行 main.exe，会默认生成 page.html 文件，可以修改此文件来进行功能测试。

如果需要配置，可以在同目录下创建 package.json 文件。可用的配置有：

## 配置

### main

类型: string

默认为空，可以指定本地文件 js，由 main.exe 自动加载 nodejs 执行，如果当前目录存在 sys.js 文件可自动读取。

### page


类型: string

为空时自动使用 page.html，可以指定本地 html 文件或线上 url。

### preloadScript

页面加载前执行的 js 文件路径。同目录下 preload.js 文件会被主动调用。

注，此时页面 dom 还未形成，可通过以下方法监听 dom 加载完成：

``` js
document.addEventListener('DOMContentLoaded', async function() {});
```

### loading

类型: string | false

指定用于展示启动动画的 html 文件。如果不需要，请配置为 false。

### pageExit

类型: boolean

默认为 true，主窗口退出时，是否退出程序。

### pageShow

类型: boolean

是否展示主窗口，默认为 false。

### socket

类型: object

#### socket.ip

类型: string

websocket 协议所绑定的网卡，默认自动。

#### socket.port

类型: string

websocket 协议所绑定的端口，默认自动。


### http

类型: object

#### http.ip

类型: string

http 协议所绑定的网卡，默认自动。

#### http.port

类型: string

http 协议所绑定的端口，默认自动。

### debug

类型: boolean

是否展示控制台输出。

### browserArguments

类型: string

webview 命令行参数。

### nodeArguments

类型: string

nodejs 命令行参数。

### preloadScript

类型: string

webview 预加载的 js。

### token

类型: boolean/string

默认 true，指定 websocket 链接密钥。

### originRegExp

类型: string

允许访问 websocket 的域匹配正则，默认本域才可访问。

### originRegExpMode

类型: string

允许访问 websocket 的域匹配正则匹配模式，默认 `ig`。

### form

类型: object

主窗口配置信息。


#### form.parent

类型: object

设置主窗口的上层窗口，例如实现无任务栏窗口，内容同 form。


#### form.right

类型: number

窗口的宽。

#### form.bottom

类型: number

窗口的高。

#### form.topmost

类型: number

可选值：1。

窗口置顶。

#### form.maximize

类型: number

可选值：1。

最大化。


#### form.title

类型: string

窗口标题。

#### form.border

类型: string

可选值 `none`

窗口边框。

#### form.mode

类型: string

可选值 `popup`，`child`

窗口模式。

#### form.exmode

类型: string

可选值 `toolwindow`，`none`

窗口扩展模式。

## api

无论是加载 js 还是 html，都可以通过 `new Sys()` 方法来调用 main.exe 提供的 api。

Sys 默认自动读取 `global.ext.wsUrl` 和 `global.ext.token` 进行初始化，你也可以传入自己的 wsUrl 进行初始化。

``` js
new Sys().then(obj => {
  // 初始化后得到的对象 obj
})
```

sys 的参数:

- string 时为 wsUrl
- object 时为 {wsUrl, log}
  - log 值可为函数或布尔值，函数接收 log 对象，为 true 时使用内置日志函数，log对象属性如何。
    ``` js
    const getBaseLog = () => ({
      id: ``, // 当前运行的 id
      action: ``, // 当前动作
      startTime: ``, // 当前 id 开始时间
      endTime: ``, // 当前 id 结束时间
      reqRaw: [], // 待发送给服务器的，当 action 为 run 时，第一项为代码，其他项为参数
      reqFormat: [], // 实际发送给服务器的，可能分片发送
      resRaw: [], // 接收到的服务器响应，第一项为是否错误，其他项为返回值
    })
    ```

初始化完成后，会得到对象 obj，属性为：

### ws

#### ws.call()

调用 main.exe 暴露的方法。

参数：方法名, [方法参数1, 方法参数2..]

示例：通过 run 方法运行原生代码。

``` js

// 退出所有进程
{
ws.call(`run`, [`G.killAll()`])
}

{
// 创建目录
const dir = `C:/my/`
await ws.call(`run`, [
`
var arg = ...
fsys.createDir(arg)
`, dir])
}

{
// 下载文件
const url = "https://download.microsoft.com/download/7/4/A/74A33AB3-B6F3-435D-8E3E-0A9FD574347F/services-on-server-install-worksheet.xlsx"
vm.res = await ws.call(`run`, [
`
var arg = ...
var remoteFile = inet.httpFile(arg ,"C:/my/")
return remoteFile.download()
`, url])
}

{
// 打开记事本
vm.res = await ws.call(`run`, [
`
process.execute("notepad")
`])
}


{
// 运行命令行
vm.res = await ws.call(`run`, [
`
process.popen("cmd /k rd /s /q C:\\my")
`, url])
}

```

示例：通过 ws 发送和订阅消息。

``` js

// 发送消息
ws.call(`base.publish`, [key, msg1, msg2...])

// 监听消息
 ws.on(key, fn)

// 停止监听消息
ws.off(key)
```

### Msg

应用内通信。

```js

const msg = Msg()
// 监听信息
msg.on(`hello`, console.log)

// 发送信息
msg.emit(`hello`, `ace`)

// 取消监听
msg.off(`hello`)
```

### View

编程式创建窗口。

```js
const view = await new main.View(`http://baidu.com`, {
  form: {
    text: `win Form`,
  },
})
view.form.show() // 显示窗口
```

### Tray

编程式创建托盘。

示例实现创建并更改托盘图标，点击托盘图标隐藏显示窗口。

```js
let tray = await new window.main.Tray()
ws.call(`run`, [
  `
  var arg = ...
  win.form._forms[arg.hwnd].tray.icon = G.getIcon(arg.icon)
`,
  {
    icon: `https://www.hongqiye.com/favicon.ico`, // 设置托盘图标
    hwnd: await tray.form.hwnd.then, // 托盘句柄
  },
])
tray.form.tray.tip = `tiptiptip` // 设置托盘 tip
tray.form.tray.pop(`traytray`, `msgmsgmsg`, 1) // 设置托盘 pop

// 监听托盘左键菜单
tray.on(`_WM_LBUTTONUP`, async () => {

  // 判断窗口是否隐藏
  const [, isVisible] = await win.isVisible(view.hwnd)
  if (!isVisible) {
    // 前置窗口
    await win.showForeground(view.hwnd)
  } else {
    // 隐藏窗口
    await view.form.show(false)
  }
})

// 监听托盘右键菜单
tray.on(`_WM_RBUTTONUP`, async () => {
  ws.call(`run`, [`G.killAll()`])
})
```

## 封装 api

实际上，所有 api 都是可以通过 ws.run 来封装的。所以你可以通过 ws.run 来封装自己的 api，例如窗口、托盘操作、消息传递等。

## 开发

node v18.19.0

``` bat
rem 安装依赖
pnpm i

rem 生成库文件 sys.js
pnpm sys

rem 获取 main.exe，可以通过编译或下载得到
pnpm main:build

rem 调试 api
pnpm dev
```

另外，任何程序，不管是浏览器还是 nodejs 都可以通过 main.exe 提供的 websocket api 来调用系统功能。

例如，可以在开发阶段，可以在 package.json 中指定 api 的连接方式：

``` json
{
  "debug": true,
  "socket": {
    "port": 7788
  },
  "token": false,
  "pageShow": true
}
```

然后在自己的程序中连接 ws://localhost:7788 即可与 main.exe 进行交互。在数据目录例如 `C:/Users/用户名/AppData/Local/sys-shim/程序码/RES`中，有 browser/mian.js 和 node/main.js 文件，它们是实现 new Sys() 的代码。

所以你可以自己的程序中，例如 node 程序，引用 main.js 文件来调用 main.exe 。

``` js
require(`数据目录/res/node/main.js`)
new Sys(`ws://localhost:7788`).then(async main => {
  await main.native.msgbox(`hello`)
})
```

## todo

- 可控制 loading 页面什么时候关闭，例如虽然 page 页面显示了，但并未满足可用状态，手动判断满足后，才关闭 loading，才显示 page


## neutralinojs api 封装

- Neutralino.app
  - [x] app.exit -- 注：退出码暂未实现
  - [x] app.killProcess
  - [ ] app.restartProcess
  - [x] app.getConfig
  - [ ] app.broadcast
  - [ ] app.readProcessInput
  - [ ] app.writeProcessOutput
  - [ ] app.writeProcessError
- Neutralino.clipboard
  - [x] clipboard.writeText
  - [x] clipboard.readText
- Neutralino.computer

- Neutralino.debug

- Neutralino.events
  - [x] events.on
  - [x] events.off
  - [x] events.dispatch -- 注：暂不实现
  - [x] events.broadcast

- Neutralino.extensions

- Neutralino.filesystem

- Neutralino.init

- Neutralino.os
  - [x] os.execCommand
  - [x] os.spawnProcess
  - [ ] os.updateSpawnedProcess
  - [ ] os.getSpawnedProcesses
  - [x] os.getEnv
  - [x] os.getEnvs
  - [x] os.showOpenDialog
  - [x] os.showSaveDialog
  - [x] os.showFolderDialog
  - [ ] os.showNotification
  - [x] os.showMessageBox
  - [ ] os.setTray
  - [x] os.getPath
  - [x] os.open
- Neutralino.storage

- Neutralino.updater

- Neutralino.window
