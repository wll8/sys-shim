---
title: Neutralino.app
---

`Neutralino.app` 命名空间包含了与当前应用实例相关的方法。

## app.exit(exitCode)
终止运行中的应用程序。

### Parameters

- `exitCode` Number: 进程的退出代码。默认值总是 `0`（成功）。

```js
await Neutralino.app.exit(130);

await Neutralino.app.exit();
```

## app.killProcess()
结束应用程序进程。如果应用程序变得无响应，你可以使用这个方法立即终止进程。建议使用 `exit()` 方法来正确关闭你的应用程序。

```js
await Neutralino.app.killProcess();
```

## app.restartProcess(options)
重新启动当前应用实例。

### Options
- `args` String: 需要传递给新应用实例进程的额外命令行参数。

```js
await Neutralino.app.restartProcess();

await Neutralino.app.restartProcess({ args: '--restarted' });
```

## app.getConfig()
以 JSON 对象形式返回当前应用配置。

### Return Object (awaited):
当前应用配置。有时，这个配置对象与你的配置文件不完全相同，因为框架在多种情况下更新配置，如通过 CLI 参数覆盖配置和使用 `0` 作为端口。

```js
let config = await Neutralino.app.getConfig();
console.log('URL = ', config.url);
```

## app.broadcast(eventName, data)
向所有应用实例派发一个新事件。

### Parameters

- `eventName` String: 事件的名称。
- `data` Object (optional): 事件的额外数据。

```js
await Neutralino.app.broadcast('myTestEvent', 'Hello');

await Neutralino.app.broadcast('myTestEvent', {myData: 'Test data'});

await Neutralino.app.broadcast('myTestEvent');
```

## app.readProcessInput(readAll)
从应用程序进程的标准输入流读取字符串数据。

### Parameters

- `readAll` Boolean (optional): 如果设置为 `true`，框架将读取整个标准流。否则，只返回一行。此选项的默认值为 `false`。

```js
let name = await Neutralino.app.readProcessInput();
console.log(`Hello ${name}`);
```

### Return String (awaited):
标准输入流数据。

## app.writeProcessOutput(data)
将字符串数据写入应用程序进程的标准输出流。

### Parameters

- `data` String: 要写入的数据。

```js
await Neutralino.app.writeProcessOutput('Enter your name: ');
let name = await Neutralino.app.readProcessInput();
await Neutralino.app.writeProcessOutput(`Hello ${name}\n`);
```

## app.writeProcessError(data)
将字符串数据写入应用程序进程的标准错误流。

### Parameters

- `data` String: 要写入的数据。

```js
await Neutralino.app.writeProcessError('This message goes to stderr');
```
