
## sys-shim-bin

把系统 api 封装为可执行程序，并提供服务供 webview 调用。

## 开发

```bat
:: 使用 ide 编译出 main.exe

:: 进入 script 目录
cd script

:: 安装依赖
pnpm i

:: 生成 npm 包
pnpm build
```

## 如果没有编译环境

如果没有编译环境可以直接下载已编译好的最新 main.exe 文件, 从 https://registry.npmmirror.com/sys-shim-bin/-/sys-shim-bin-0.0.2-1.tgz 链接下载并解压里面的 dist 到 script/ 下.