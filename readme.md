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

## 参考

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

```
