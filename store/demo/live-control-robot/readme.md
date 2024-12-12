# 网站助手

一个基于 sys-shim/vue3 开发的程序，程序体积1MB。可以在你的网页中自动注入脚本，实现一些自动化操作。支持多网页、多配置、多脚本。


## 开发

``` bat
:: 安装依赖
pnpm i

:: 运行接口
npx mm

:: 运行界面 -- 可以直接在 app 或浏览器中实时修改实时更新， devtools 调试。
pnpm run dev

:: 生成界面, 可以选择部署到服务器还是打包到 exe 里，默认是部署到服务器方式， http://127.0.0.1:7800/live/init.html 。
pnpm run build:fe

:: 把界面生成 exe
pnpm run build

:: 运行生成的 exe
```

## 相关视频

- [安装、运行、开发](https://www.bilibili.com/video/BV1E5qbY2EbX/)
- [打包、发布](https://www.bilibili.com/video/BV1J5qbY2EVX/)
- [运行打包后的程序](https://www.bilibili.com/video/BV1jJqbYVEZx/)

## 提示

- 因为有数据服务, 所以需要开启 mm 程序。
- 如果运行后没有任何界面, 可以搜索 `pageShow` 把配置改成 `true`。
  