
## sys-shim-bin

把系统 api 封装为可执行程序，并提供服务供 webview 调用。

## 开发

```bat
:: 进入 script 目录
cd script

:: 安装依赖
pnpm i

:: 生成 npm 包
pnpm build
```

## 使用

命令行：

``` bat
:: 运行原始 bin 文件
sys-shim-bin
```

API：

``` js
const { getPath }  = require("sys-shim-bin");

```

**getPath** -- 获取可执行文件路径。


## 鸣谢

- [neutralinojs](https://neutralino.js.org/)
