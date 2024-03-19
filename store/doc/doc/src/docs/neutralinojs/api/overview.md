---
title: 概览
---

Neutralinojs 为开发者提供了一个 JavaScript 客户端库（也称为 Neutralino.js），以便通过 Neutralinojs 服务器与本地操作进行交互。
JavaScript 客户端的实现位于 neutralino.js JavaScript 文件中。
因此，您的 Neutralinojs 项目中需要有客户端库。

客户端库将其 JavaScript API 暴露给浏览器的 window 范围，您可以通过 `Neutralino` 或 `window.Neutralino` 从原生 JavaScript 或任何前端框架访问它们。

假设您需要从操作系统获取环境变量值。您可以调用 [`Neutralino.os.getEnv`](os.md#osgetenvkey) JavaScript 方法。一旦您调用 `getEnv` 方法，客户端库将通过 WebSocket 消息调用 Neutralinojs 服务器。之后，Neutralinojs 服务器将执行本地操作以获取给定的环境变量。
一旦 Neutralinojs 服务器完成任务，它就会发送一个带有环境变量值的 WebSocket 消息。
最后，客户端库会解析一个带有从服务器收到的结果的承诺。

客户端库维护一个任务池，通过 UUID 字符串将服务器消息映射到匹配的请求。

Neutralinojs 使用此通信机制为您提供许多本地操作，适用于所有`模式`。

## 本地 API 命名空间

- [Neutralino.app](./app.md)
- [Neutralino.clipboard](./clipboard.md)
- [Neutralino.computer](./computer.md)
- [Neutralino.debug](./debug.md)
- [Neutralino.events](./events.md)
- [Neutralino.extensions](./extensions.md)
- [Neutralino.filesystem](./filesystem.md)
- [Neutralino.init](./init.md)
- [Neutralino.os](./os.md)
- [Neutralino.storage](./storage.md)
- [Neutralino.updater](./updater.md)
- [Neutralino.window](./window.md)
