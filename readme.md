<div align="center">
  <a href="https://wll8.github.io/sys-shim-doc/">
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

调研了一些常见的方案，发现他们都不适合，所以就开发了此项目 。


## 贡献

如果你想参与这个项目的开发，建议准备如下环境：

- node v18.19.0
- vscode v1.94.2
- pnpm v9

目录结构说明：

<pre>
<a href="./store/">store/</a>
  <a href="./store/bin/">bin/</a> - 提供服务调用的二进制程序源码。
  <a href="./store/demo/">demo/</a> - 一些使用示例。
  <a href="./store/doc/">doc/</a> - 项目和使用文档源码。
  <a href="./store/play/">play/</a> - 游乐场程序。
  <a href="./store/sdk/">sdk/</a> - js api 源码。
</pre>