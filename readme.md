一个便于开发桌面应用的程序。

- 界面 -- 使用电脑自带的浏览器渲染。
- 服务 -- 使用 nodejs 生态。使用创建 http 服务。
- 系统 -- 实用程序。例如托盘、通知、自启动注册。

## 为什么

- 依赖三方语言 --
- 依赖系统编译 --
- 超大体积 --
- 依赖某类浏览器 --
  - Gluon node16.x Chrome、Firefox、Edge

## 优化
- 资源
  - rpc-ws.js
    - 目录
    - cdn
  - sys.js
    - 内嵌
  - node.js
    - 目录
    - 系统
    - 自动安装，指定版本

## 使用
### 页面与 nodejs 通信


``` js
const msg = await new Sys(ws).Msg()
msg.on(`hello`, console.log)
msg.emit(`hello`, `ace`)
msg.off(`hello`)
```


## 流程

由 start.exe 启动, start.exe 从文件中读取配置，例如入口文件 main.js.

main.js 可以创建页面、托盘、服务。

## 结构

- index.js
- sys.exe
  - 界面
  - 托盘
  - 系统
    - 服务 -- nssm
    - 鼠标
    - 剪贴板
    - 打印
    - 设置
  - 通知 -- node-notifier

## 右键菜单
  - https://bbs.125.la/thread-14567679-1-1.html
  - https://blog.51cto.com/u_15127641/4094253
  - http://blog.silence.pink/p/windows-context-menu/
  - https://learn.microsoft.com/zh-cn/windows/win32/shell/context-menu
  - https://www.codeproject.com/Articles/22012/Explorer-Shell-Context-Menu
  - https://stackoverflow.com/questions/10668456/how-to-show-windows-explorer-context-right-click-menu

## 参考

- 判断页面可见状态 webview 中不可用 https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API
- 如何使用 JS“取消悬停”具有活动 :hover 的元素 https://www.quora.com/How-to-unhover-an-element-with-an-active-hover-with-JS
- 很棒的 Electron.js 替代品 https://github.com/sudhakar3697/awesome-electron-alternatives
- https://www.jianshu.com/p/4dd28767ba8c
- 托盘图标处理 https://github.com/aardio/Ghips
- https://www.aardio.net/read-251.html
- https://github.com/sfatihk/electron-tray-window
- https://github.com/tauri-apps/tray-icon
- https://github.com/getlantern/systray
- https://blog.wavesxa.com/archives/golang-tuo-pan-cai-dan-ying-yong-ji-da-kai-xi-tong-mo-ren-liu-lan-qi
- 使用字符串动态调用函数 https://bbs.aardio.com/forum.php?mod=viewthread&tid=11257
- 如何让主窗体不在任务栏显示 https://bbs.aardio.com/forum.php?mod=viewthread&tid=9059&page=1#pid48596

## 配置示例

在同目录下的 package.json 中可进行以下配置:

- main
  nodejs 文件入口。

- page
  webview 文件入口。

- browserArguments
  webview 的启动参数。

- preloadScript
  webview 的预加载 js。

- userDataDir
  webview 用户目录。

- socket
  - ip
  - port

- form
  winform 的默认参数。

## 实现

### 逻辑





### 其他

- 一级方法和属性，使用 A 语言调用 B 语言的方法，读取和设置属性
- 多级方法和属性，使用 A 语言编写 B 语言
  - 运行时？
  - 链式调用？
- 自动注入所有依赖，例如 rpc-websockets，sys.js


```
// 无边框 winform
var winform = win.form(text="WebView2";border="none")
winform.add()

//添加阴影边框 - 实现无边框下的阴影缩放功能
import win.ui.shadow;
win.ui.shadow(winform);

// 透明功能不可动态设置

//窗口透明
winform.transparent(true);

//webView2 控件透明
wb.defaultBackgroundColor = 0;

//加载远程资源
wb.go("https://test.html")

//等待页面加载完成后，执行下面的Javascript
wb.waitEle("body","
aardio.winform.show()
");

//参数@3 可指定 Chromium 启动参数， 多个参数以空格分开
var wb = web.view(winform,,"--proxy-server=SOCKS5://IP地址:端口  --accept-lang=zh-CN");


//设置窗口缩放范围
import win.ui.minmax;
win.ui.minmax(winform);

// 窗体鼠标穿透
winform.modifyStyleEx(,0x20/*_WS_EX_TRANSPARENT*/ | 0x80000/*_WS_EX_LAYERED*/ );

// 获取窗口大小和位置
win.getPos


winform.setPos(500, 1010) // 移动窗口位置
win.setForeground( hwnd ); // 移动窗口到最前面
win.setActive(hwnd) // 激活窗口
win.setTopmost( hwnd ); // 置顶

// 监听焦点失去

tracker = win.ui.tracker(winform)
tracker.onFocusLost = function(hFocus){
	console.log("onFocusLost")
}

// 虚拟文件和模板
externalServer.httpHandler["/test.html"]


```
