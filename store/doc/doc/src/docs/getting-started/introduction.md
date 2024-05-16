# sys-shim

## sys-shim 是什么？

sys-shim 目前是一个基于 windows 平台的轻量桌面应用开发框架，支持 win7 以上 windows 系统。它可以前端开发人员无需任何 js 以外的语言，不需要安装其他语言环境，即可开发桌面程序。

无需改造现有 web 系统的架构，通过 js 即可调用系统的 api，例如使用以下语句打开计算器：

``` js
await native.process.execute("calc")
```

## 为什么开发 sys-shim？

当我想开发一个简单的桌面程序，可是我只熟悉前端语言，由于精力有限暂时只考虑在用户较多的 windows 投入使用，我希望开发体验像在浏览器中一样，然后程序的使用体验像本地应用一样，调用本地文件、系统命令、后台运行、托盘菜单这些都没有问题。

以前使用过 electron ，由于它默认跨平台，所以开发时要求系统安装完整的编译环境，例如 `python` 和 `Visual Studio Build Tools`，既占空间，网络环境特殊安装过程缓慢又容易出错，实现一点简单的功能，打包体积动辄上百兆，总觉得得不偿失。

我调研了一些常见的方案，经过[对比](#对比)，发现他们都不适合我，所以我开发了 sys-shim 。

## 为什么选择 sys-shim？

在 Electron 和 NWjs 中，就算是写一个简单的应用，您需要安装 Node.js 和数百个依赖库。内置的 Chromium 和 Node 使得简单的应用变得臃肿。sys-shim 提供了一个轻量级 SDK，它替代了 Electron 中与操作系统交互的部分。sys-shim 不打包 Chromium，而是使用操作系统中现有的网页浏览器（例如 webview）作为界面展示。这使得通过 sys-shim 开发过程相当简单，并且产生的体积很小，通常小于 2M。

### 对比

| 名称                                                         | 前端     | 后端    | 体积/内存 MB | 放弃原因                             | 备注             |
| ------------------------------------------------------------ | -------- | ------- | ------------ | ------------------------------------ | ---------------- |
| [nodegui](https://github.com/nodegui/nodegui)                | chromium | nodejs  | 100/100      | 体积大                               |                  |
| [miniblink49](https://github.com/weolar/miniblink49)         | Chromium | nodejs  | ?/?          | 体积大                               | 仅支持 window    |
| [NWjs](https://github.com/nwjs/nw.js)                        | Chromium | nodejs  | 100/100      | 体积大                               |                  |
| [electron](https://github.com/electron/electron)             | Chromium | nodejs  | 100/100      | 体积大                               | 大项目推荐       |
| [Wails](https://wails.io/)                                   | webview  | go      | 8/?          | 需使用其他语言                       | 有 go 经验推荐   |
| [Tauri](https://github.com/tauri-apps/tauri)                 | webview  | rust    | 1/?          | 需使用其他语言                       | 有 rust 经验推荐 |
| [wpf](https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/) | 可选     | C#      | ?/?          | 需使用其他语言                       | 仅支持 window    |
| [Muon](https://github.com/ImVexed/muon)                      | Chromium | go      | 42/26        | 需使用其他语言                       |                  |
| [Sciter](https://sciter.com/)                                | Sciter   | QuickJS | 5/?          | 与普通浏览器和 nodejs 可能有差异     | 停止维护         |
| [gluon](https://github.com/gluon-framework/gluon)            | 浏览器   | nodejs  | 1/80         | 生态小，例如没有找到托盘图标实现方式 | 停止维护         |
| [neutralino](https://github.com/neutralinojs/neutralinojs)   | 浏览器   | API     | 2/60         | 生态小，示例少，没有 nodejs 生态     | 可持续关注       |

`体积/内存 MB` 为个人评估值，不建议作为参考依据。

- 更多相关框架请参考: https://github.com/sudhakar3697/awesome-electron-alternatives
- 三方对比: https://github.com/Elanis/web-to-desktop-framework-comparison

## 关于跨平台

目前 sys-shim 的 core 层不支持跨平台，不过不用担心，sys-shim 会封装一套 electron/neutralino 这些跨平台框架的 api ，当你有跨平台的需求时，可以方便进行框架切换。

即使没有跨端兼容层，至少界面和交互也是可以跨平台的，只需做极少适配即可。