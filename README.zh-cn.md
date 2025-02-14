<div align="center">
  <a href="./store/doc/doc/src/README.md">
    文档
  </a>
&nbsp;|&nbsp;
  <a href="./store/demo/">
    示例
  </a>
</div>

<br />

您可以使用简单的前端语言快速开发桌面应用程序，程序大小不到1M。

## 特点

- 无需使用JavaScript以外的任何语言；使用JavaScript调用系统API。
- 超轻量级，小于1M。
- 超简单，无需安装复杂的开发环境即可开发和生成程序。
- 系统接口开箱即用。例如，读写本地文件、执行系统命令、后台运行、托盘菜单等。

## 贡献

如果您想参与本项目的开发，建议准备以下环境：

- node v18.19.0
- vscode v1.94.2
- pnpm v9

目录结构说明：

<pre>
<a href="./store/">store/</a>
  <a href="./store/bin/">bin/</a> - 提供服务调用的二进制程序源代码。
  <a href="./store/demo/">demo/</a> - 一些使用示例。
  <a href="./store/doc/">doc/</a> - 项目和使用文档的源代码。
  <a href="./store/play/">play/</a> - 游乐场程序。
  <a href="./store/sdk/">sdk/</a> - JavaScript API的源代码。
</pre>

## 致谢

- [LuaRT](https://github.com/samyeyo/LuaRT)