---
title: Neutralino.debug
---

`Neutralino.debug` 命名空间包含应用调试工具。

## debug.log(message, type)
将消息写入 `neutralinojs.log` 文件或/和标准输出流中。

:::tip
如果您的应用程序是通过 `neu run` 运行的，您可以在终端上看到日志信息。
:::

### Parameters
- `message` String: 要记录的内容。
- `type` String (optional): 消息类型。接受的值包括 `INFO`, `WARNING`, 和 `ERROR`。默认值是 `INFO`。

```js
await Neutralino.debug.log('Hello Neutralinojs');

await Neutralino.debug.log('发生了一个错误', 'ERROR');

await Neutralino.debug.log('一条警告信息', 'WARNING');
```
