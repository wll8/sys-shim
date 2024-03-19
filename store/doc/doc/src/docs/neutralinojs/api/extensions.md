---
title: Neutralino.extensions
---

`Neutralino.extensions` 命名空间包含了与 Neutralino 扩展相关的方法。扩展允许开发人员为 Neutralinojs 应用编写自定义后端 API。

通过`本指南`了解有关扩展的更多信息。


## extensions.dispatch(extensionId, eventName, data)
向扩展实例分派一个新事件。如果目标扩展尚未连接，Neutralino 客户端库将会将函数调用排队，并在扩展上线时发送。


### Parameters
- `extensionId` String: 扩展标识符。
- `eventName` String: 事件的名称。
- `data` Object (optional): 事件的附加数据。

```js
await Neutralino.extensions.dispatch('js.neutralino.sampleextension',
            'myTestEvent', {myData: '测试数据'});

await Neutralino.extensions.dispatch('js.neutralino.sampleextension',
            'myTestEvent');
```

## extensions.broadcast(eventName, data)
向所有已连接的扩展分派一个新事件。如果某个扩展已加载但尚未连接，则该扩展不会收到新事件。使用 [`extensions.dispatch`](#extensionsdispatchextensionid-eventname-data) 即使扩展未连接到主进程，也能发送消息。


### Parameters
- `eventName` String: 事件的名称。
- `data` Object (optional): 事件的附加数据。

```js
await Neutralino.extensions.broadcast('myTestEvent', '你好');

await Neutralino.extensions.broadcast('myTestEvent', {myData: '测试数据'});

await Neutralino.extensions.broadcast('myTestEvent');
```

## extensions.getStats()
返回关于已连接和已加载扩展的详细信息。

### Return Object (awaited):
- `loaded` String[]: 已加载扩展的数组。
- `connected` String[]: 已连接扩展的数组。这些扩展与主进程有一个活跃的基于 WebSocket 的 IPC 连接。

```js
let stats = await Neutralino.extensions.getStats();
console.log('stats: ', stats);
```
