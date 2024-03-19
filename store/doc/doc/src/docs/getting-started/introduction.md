# sys-shim

## sys-shim 是什么？

sys-shim 目前是一个基于 windows 平台的轻量级且可移植的桌面应用开发框架。
它允许您使用 JavaScript、HTML 和 CSS 开发轻量级的桌面应用。
您可以通过任何编程语言扩展 sys-shim（通过扩展 ws）。

## 为什么选择 sys-shim？

在 Electron 和 NWjs 中，您需要安装 Node.js 和数百个依赖库。内置的 Chromium 和 Node
使得简单的应用变得臃肿。sys-shim 提供了一个轻量级且可移植的 SDK，它是 Electron 和
NW.js 的替代品。sys-shim 不打包 Chromium，并使用操作系统中现有的
网页浏览器库（例如 webview）。sys-shim 实现了一个用于本地操作的 WebSocket 连接，并嵌入了
一个静态 web 服务器来提供 web 内容。此外，它还提供了一个内置
`JavaScript 客户端库`供开发者使用。

## 突出特性

- 应用开发者无需编译。
- 用户无需额外依赖。
- 支持本地功能：读取文件，运行系统命令等。
- 与基于 chromium-node 的框架相比资源消耗更少。
- 简单灵活的开发环境。

