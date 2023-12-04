<div align="center">
    <a href="https://github.com/wll8/sys-shim/blob/pre/doc.md">
        文档
    </a>
  &nbsp;|&nbsp;
    <a href="https://github.com/wll8/sys-shim/releases/tag/example">
        示例
    </a>
</div>

<br />

简单的使用前端语言即可快速开发桌面程序，占用内存和程序体积都很不足 1M。

## 为什么

我想开发一个简单的桌面程序，只使用前端语言开发，暂只考虑在 windows 上运行，我希望开发体验像在浏览器中一样，然后程序的样子像是本地应用一样，调用本地文件、系统命令、后台运行、托盘菜单这些都没有问题。

我[调研了一些常见的方案](#方案对比)，发现他们都不适合我，所以我开发了适合自己的 [xxxx](#我的选择) 。

## 如何使用

下载 [main](https://github.com/wll8/sys-shim/releases/download/example/main.exe) 文件打开，编辑生成的 page.html 文件。 更多功能请[查阅文档](https://github.com/wll8/sys-shim/blob/pre/doc.md)和[示例](https://github.com/wll8/sys-shim/releases/tag/example)。

## 方案对比

| 名称        | 前端            | 后端       | 体积 MB | 内存 MB | 放弃原因                             | 官网                                                  | 备注          |
| ----------- | --------------- | ---------- | ------- | ------- | ------------------------------------ | ----------------------------------------------------- | ------------- |
| ?           | ?               | ?          | ?       | ?       | ?                                    | ?                                                     |               |
| nodegui     | chromium        | nodejs     | 100     | 100     | 体积大                               | https://github.com/nodegui/nodegui                    |               |
| miniblink49 | Chromium        | nodejs     | ?       | ?       | 体积大                               | https://github.com/weolar/miniblink49                 | 仅支持 window |
| NW.js       | Chromium        | nodejs     | 100     | 100     | 体积大                               | https://github.com/nwjs/nw.js                         |               |
| electron    | Chromium        | nodejs     | 100     | 100     | 体积大                               | https://github.com/electron/electron                  |               |
| Wails       | webview         | go         | 8M      | ?       | 需其他语言                           | https://wails.io/                                     |               |
| Tauri       | webview         | rust       | 1       | ?       | 需其他语言                           | https://github.com/tauri-apps/tauri                   |               |
| Qt          | 可选            | C++        | 30      | ?       | 需其他语言                           | https://sciter.com/                                   |               |
| wpf         | 可选            | C#         | ?       | ?       | 需其他语言                           | https://learn.microsoft.com/zh-cn/dotnet/desktop/wpf/ | 仅支持 window |
| Muon        | Chromium        | go         | 42      | 26      | 需其他语言                           | https://github.com/ImVexed/muon                       |               |
| Sciter      | Sciter          | QuickJS    | 5       | ?       | 与普通浏览器和 nodejs 可能有差异     | https://quark.sciter.com/                             |               |
| gluon       | 浏览器          | nodejs     | 1       | 80      | 生态小，例如没有找到托盘图标实现方式 | https://github.com/gluon-framework/gluon              |               |
| neutralino  | 浏览器          | API        | 2M      | 60      | 没有 nodejs 生态                     | https://github.com/neutralinojs/neutralinojs          |               |
| xxxx        | WebView2/浏览器 | api/nodejs | 1       | 1       | ?                                    | https://github.com/wll8/sys-shim                      | 仅支持 window |

- 更多相关框架请参考: https://github.com/sudhakar3697/awesome-electron-alternatives
- 三方对比: https://github.com/Elanis/web-to-desktop-framework-comparison

## 我的选择

实现方式请参考：[electron 和 tauri 都不想用，那就自己写个想用的吧](https://juejin.cn/post/7304538151480803366) 。

### 渲染

可以从程序配置中显示声明是使用浏览器还是 webview。

- WebView2
  - 支持 Win7,Win8,Win10,Win11+。
  - 没有 WebView2 控件的系统会自动安装。
  - winin10 1803 以及之后的系统微软早已自动推送 WebView2。版本小于 1803 的 Win10 很罕见可以忽略不计。
  - Win11 已自带 WebView2。
  - 如果 WebView2 安装失败，自动回退到 WebView1，WebView1 是 Win10 1803+/Win11 自带的控件。
  - 如果 WebView2 和 WebView1 都不可用，会自动回退到浏览器方案。

- 浏览器  
  使用系统上已安装的 Chromium 内核浏览器（例如 edge、2345、360）来渲染页面，如果未安装，会自动安装 Edge。

### 后端

- api  
  默认提供常见的操作接口。例如文件、网络、系统、进程、鼠标、键盘、窗口等。

- nodejs  
  你也可以选择添加 nodejs 来进行文件、进程等所有生态的所有操作。

- service  
  若你的程序需要后台静默运行、自启动等，可以添加此控件。

### 体积内存

根据上面的分析可见，如果你只需要使用前端语言来写界面，能与系统进行基本的交互，通常情况下程序体积在 1MB 左右。
