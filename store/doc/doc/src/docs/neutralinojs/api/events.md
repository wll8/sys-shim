---
title: Neutralino.events
---

`Neutralino.events` 命名空间包含了与原生事件处理相关的方法。这些事件通常是由基于原生状态变化的 Neutralinojs 服务器发起的。

## Event types

| Event id                    | Description                                             | Available modes | Additional data
| --------------------------- | ------------------------------------------------------- | -------- | -------
| `ready`                     | 当客户端库与 Neutralino 服务器连接时发生。  | `all` | `null`
| `trayMenuItemClicked`       | 当用户点击托盘菜单项时发生。        | `all` | `TrayMenuItem`
| `windowClose`               | 当用户关闭窗口时发生。                 | `window` | `null`
| `windowFocus`               | 当窗口获得焦点时发生。                 | `window` | `null`
| `windowBlur`                | 当窗口失去焦点状态时发生。                 | `window` | `null`
| `serverOffline`             | 当 Neutralino 服务器离线时发生 | `all` | `null`
| `clientConnect`             | 当新客户端访问应用程序时发生。        | `all` | 总客户端数
| `clientDisconnect`          | 当已连接的客户端离开应用程序时发生。  | `all` | 总客户端数
| `appClientConnect`          | 当新的应用程序实例开始时发生。          | `all` | 总应用客户端数
| `appClientDisconnect`       | 当应用程序实例结束时发生。               | `all` | 总应用客户端数
| `extClientConnect`          | 当新的扩展连接时发生。                   | `all` | 扩展标识符
| `extClientDisconnect`       | 当扩展断开连接时发生。                   | `all` | 扩展标识符
| `extensionReady`            | 当扩展准备好与应用通信时发生。    | `all` | 扩展标识符
| `spawnedProcess`            | 当生成的进程有更新时发生。  | `all` | [`SpawnedProcess`](os.md#spawnedprocess) 带有 `action`（`stdOut`, `stdErr`, 和 `exit`）和 `data`（STDOUT, STDERR 或退出代码）
| `openedFile`                | 对每个读取操作以及每当流游标到达 EOF 时发生。 | `all` | 文件流标识符带有 `action`（`data`, `dataBinary`, 和 `end`）和 `data`（流块内容）
| `watchFile`                 | 根据监视器对每个文件系统变更事件发生时。 | `all` | 文件监视器标识符带有 `action`（`add`, `delete`, `modified`, 和 `moved`），`dir` 和 `filename`
## events.on(eventName, handler)
注册一个新的事件处理程序。


### Parameters

- `eventName` String: 事件的名称。
- `handler` Function: 当给定事件发生时将被调用的函数。Neutralinojs 将使用一个 [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) 实例调用处理程序，并将附加数据附到 `detail` 键上。

```js
function onTrayMenuItemClicked(event) {
  console.log(`Event data: ${event.detail}`);
}
await Neutralino.events.on('trayMenuItemClicked', onTrayMenuItemClicked);
```

## events.off(eventName, handler)
注销一个事件处理程序。


### Parameters

- `eventName` String: 事件的名称。
- `handler` Function: 函数引用。

```js
await Neutralino.events.off('trayMenuItemClicked', onTrayMenuItemClicked);
```

## events.dispatch(eventName, data)
向当前应用实例分派一个新事件。Neutralinojs 客户端在内部使用这个 JavaScript 函数调用来分派原生事件。


### Parameters

- `eventName` String: 事件的名称。
- `data` Object (optional): 事件的附加数据。

```js
await Neutralino.events.dispatch('myTestEvent', {myData: '测试数据'});
```

## events.broadcast(eventName, data)
向所有客户端（包括应用和扩展客户端）分派一个新事件。


### Parameters

- `eventName` String: 事件的名称。
- `data` Object (optional): 事件的附加数据。

```js
await Neutralino.events.broadcast('myTestEvent', '你好');

await Neutralino.events.broadcast('myTestEvent', {myData: '测试数据'});

await Neutralino.events.broadcast('myTestEvent'); // 不带任何数据负载
```
