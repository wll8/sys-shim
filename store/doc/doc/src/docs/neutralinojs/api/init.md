---
title: Neutralino.init
---

`init` 不是命名空间，它是一个函数，用于初始化 Neutralinojs 应用程序。

## init()

应用程序开发者需要在使用任何原生 API 函数之前，通过 JavaScript 源文件显式调用此方法。当调用 `init` 函数时，它会执行以下任务。

- 异步启动与 Neutralinojs 服务器的 WebSocket 连接。
- 如果提供了 `--neu-dev-auto-reload` 标志（`neu run` 命令会设置此标志），则注册自动重载事件处理程序。
- 在 `window` 范围内定义 `NL_CVERSION`，包含客户端库版本。

您可以在调用 `init` 函数之后立即调用原生 API，如下所示。

```js
Neutralino.init();

Neutralino.os.showMessageBox('Welcome', 'Hello Neutralinojs');
```

如果你愿意，也可以用 `ready` 事件回调函数来包装立即执行的原生调用。

```js
Neutralino.init();

Neutralino.events.on('ready', () => {
    Neutralino.os.showMessageBox('Welcome', 'Hello Neutralinojs');
});
```

:::info
Neutralinojs 客户端库通常会在 WebSocket 连接建立后，将原生 API 调用排队并发送到服务器。因此，您并不总是需要使用 `ready` 事件回调。
:::
