---
title: 您的第一个 sys-shim 应用
---


### 方式一：直接开发

这个方式适用于体验，无需任何开发环境。

下载 [main.exe](https://github.com/wll8/sys-shim/releases/download/example/main.exe) 文件打开，会看到如下界面：

这个界面是通过同目录下的 html 文件实现的。使用您喜欢的编辑器编辑 html 文件并保存，然后重新运行 main.exe 即可看到修改结果。

:::tip
为了增加启动速度，会像浏览器一样缓存 html 文件，如果没有看到最新结果，可以按 `F5` 刷新一下页面。
:::


### 方式二：直接转换现有网页(开发中)

如果要把已上线的网页转换为 sys-shim 应用，可以直接运行命令：



**第一步 在您的网页里使用系统 api**

例如，实现点击某按钮时打开计算器：

``` js
// 在您的网页里添加一个按钮，点击时执行以下 js 代码
window.shim.native.process.execute("calc")
```

**下一步 安装 sys-shim**

假设您已安装了 nodejs 。

``` sh
npm i -g sys-shim
```

**下一步 将网页转换为 sys-shim 应用**

``` sh
sys-shim pack --input https://example.com/index.html
```

运行该命令后，在当前目录会输出一个应用程序。运行后点击您的按钮，即可看到计算器被打开。

实际上该命令在转换时自动在您的网页里引用了 sys-shim 的 sdk 并进行了初始化。更多转换时的配置，可以查看文档：`// todo`

### 方式三：在任意项目中引用 sys-shim

您也可以把 sys-shim 引入到您的项目中，例如使用如下代码：

- 安装: 运行命令 `npm i sys-shim`
- 导入: 
  - esm 方式 `import Sys from 'sys-shim'`
  - cjs 方式 `const Sys = require('sys-shim')`
  - umd 方式 `<script src="./node_modules/sys-shim/browser/main.umd.min.js"></script>`
- 启动 main.exe: 运行命令 `npx sys-shim`
- 使用:
  ``` js
  new Sys({
    log: true,
    wsUrl: 'ws://127.0.0.1:10005?token=tokentokentoken',
  }).then(shim => {
    shim.native.win.msgbox(`hello`, `title`) // 调用系统 api
  })
  ```

wsUrl 是 main.exe 启动后生成的 websocket 地址。

:::tip
如果您的应用是[由 main.exe 启动](.// todo)的，那么不需要配置 wsUrl。
:::

### 方式四：使用脚手架模板开发(开发中)

为了快速开发各种应用，我们提供了一些模板，您可以基于模板快速投入开发。

- 命令行
- 服务
- 界面
  - vue 模板
  - react 模板
