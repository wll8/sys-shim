---
title: 概览
---

## globalThis.ext

当通过 main.exe 加载时，会得到一个全局对象 ext，在浏览器环境下，该对象是一个 Promise（返回json）, 在 nodejs 中是一个 json。

json 内容为:

- ext.wsUrl

当前 json-rpc 的 url 地址。你可以通过 `socket` 来配置 ip/port/token 。

- ext.toekn

当前 json-rpc 的 token。


``` json
{
    "hwnd": 198610,
    "token": "36A07471-F13D-4048-91ED-E7A36BF2D8A8",
    "wsUrl": "ws://192.168.1.253:7788"
}
```

## globalThis.Sys

当通过 main.exe 加载时，会得到一个全局对象 Sys，实例化此对象后，即可使用 sys-shim 提供的 api。

- 参数为：wsUrl 地址，默认为 ext.wsUrl 。
- 返回值：main 对象。

### main.ws

ws 连接后的 rpc 实例。

### main.api

这是对三方 api 的封装，默认包含 neutralino 。

### main.native

调用原生方法，返回一个 Promise 数组，第一项为失败信息，后面为运行成功的返回值。示例：

``` js
await main.native.win.msgbox(`hello`)
```

[常用原生 API 文档](../roadmap.md)