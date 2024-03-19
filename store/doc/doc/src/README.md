---
navbar: true
sidebar: false

breadcrumb: false
pageInfo: false
contributors: false
editLink: false
lastUpdated: false
prev: false
next: false
comment: false
footer: true

backtotop: false
---

sys-shim 目前是一个基于 windows 平台的轻量级且可移植的桌面应用开发框架。
它允许您使用 JavaScript、HTML 和 CSS 开发轻量级的桌面应用。
您可以通过任何编程语言扩展 sys-shim（通过扩展 ws）。

你可以直接在控制台调用 api，例如：

``` js
await main.native.win.msgbox(`hello`)
await Neutralino.os.execCommand('node --version')
```