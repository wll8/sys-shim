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

sys-shim 目前是一个基于 windows 平台的轻量桌面应用开发框架。它可以前端开发人员无需任何 js 以外的语言，不需要安装其他语言环境，即可开发桌面程序。

无需改造现有 web 系统的架构，通过 js 即可调用系统的 api，例如使用以下语句打开计算器：

``` js
await native.process.execute("calc")
```

```component VPCard
title: 快速开始
desc: 如何使用 sys-shim
link: /docs/getting-started/your-first-app.html
```

```component VPCard
title: 案例
desc: 一些 sys-shim 开发的示例项目。
link: /demo/
```

```component VPCard
title: API 参考
desc: 有哪些 api 可以使用。
link: /docs/api/
```


