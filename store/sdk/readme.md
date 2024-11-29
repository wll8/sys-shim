# sys-shim-sdk

## 开发

```bat
:: 启动服务端
npm run sys-shim

:: 启动前端
npx vite

:: 调试 cli
npm run sys-shim pack -- --input https://example.com/
```

## 使用

``` js
// npm i sys-shim

import Sys from 'sys-shim'
new Sys({
  log: true,
  wsUrl: 'ws://127.0.0.1:10005?token=tokentokentoken',
}).then(shim => {
  shim.native.process(`notepad`) // 调用系统记事本
})
```

## 发布

``` bat
:: 生成 sdk 到 /store/bin/res
npm run gen.res

:: 生成 npm 包
npm run gen.npm.pack
```
