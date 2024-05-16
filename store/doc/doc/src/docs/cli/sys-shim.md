---
title: sys-shim 命令行
---

## pack

打包为 sys-shim 应用。


### --input
打包路径。

必填。

可以是网络 url，由 http:// 或 https:// 开头。也可以是本地目录。

### --icon
本地图标路径。

默认值：主域下面的 favicon.ico 作为应用图标。

### --out
输出文件名。

默认值：当前域名或目录名。

### --unzip
安装路径。

默认值：系统软件安装目录下，例如 `Program Files (x86)\sys-shim-app\初始文件名` 。

如果值为带路径前缀的相对路径，例如 `.\demo`，则解压到运行位置。
如果值为绝对路径，例如 `C\demo`，则解压到绝对路径。

### --password
指定程序的资源提取密码。

默认值：空。

