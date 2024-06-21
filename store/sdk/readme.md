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

简单的使用前端语言即可快速开发桌面程序，程序体积小于 1M。

## 为什么

想开发一个简单的桌面程序，只使用前端语言开发，暂只考虑在 windows 上运行，希望开发体验像在浏览器中一样，然后程序的样子像是本地应用一样，调用本地文件、系统命令、后台运行、托盘菜单这些都没有问题。

[调研了一些常见的方案](#方案对比)，发现他们都不适合，所以就开发了此项目 。

## 如何使用

### 方式一：直接开发

这个方式适用于体验，无需任何开发环境。

- 第一步：下载 [main](https://github.com/wll8/sys-shim/releases/download/example/main.exe) 文件打开；
- 第二步：当前目录生成了名为 page.html 的文件，你可以在这个文件里写界面或调用系统 API 。

### 方式二：单独引用

- 安装:  `npm i sys-shim`
- 导入: 
  - esm 方式 `import Sys from 'sys-shim'`
  - cjs 方式 `const Sys = require('sys-shim')`
  - umd 方式 `<script src="./node_modules/sys-shim/browser/main.umd.min.js"></script>`
- 使用:

``` js
new Sys('ws://127.0.0.1:10005?token=tokentokentoken').then(main => {
  main.native.win.msgbox(`hello`, `title`)
})
```

### 方式三：使用脚手架模板开发

- [命令行](https://wll8.github.io/sys-shim-doc/docs/cli/sys-shim.html)
- 服务
- 界面


## 贡献

如果你想参与这个项目的开发。

node v18.19.0

``` bat
rem 安装依赖
pnpm i

rem 生成库文件 sys.js
pnpm gen.res

rem 获取 main.exe, 可以通过编译或下载得到
pnpm main:build

rem 启动项目
pnpm dev

rem 发布 npm
pnpm gen.npm.push

```

## todo

- [ ] feat: buffer 自动转换
- [ ] fix: 应正确接收稀疏返回值
  - 例如： `return {1, null, 3}` 
- [ ] feat: 流式传输数据
  - 例如： 实时向 native 保存下载的数据