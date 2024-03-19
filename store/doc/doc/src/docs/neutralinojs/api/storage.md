---
title: Neutralino.storage
---

`Neutralinojs` 内置了共享键值存储。它就像所有 `Neutralinojs` 模式的全局 [`LocalStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)。`Neutralinos.storage` 提供了与这个存储功能交互的方法。

:::tip
存储 API 将所有数据记录持久化到应用程序根目录下的 `.storage` 目录中。如果你想清除所有数据记录，请删除 `.storage` 目录。
:::

## storage.setData(key, data)
将数据写入 Neutralinojs 共享存储。

### Parameters

- `key` String: 唯一标识符。
- `data` Object (可选): 数据字符串。如果此值为 `null` 或 `undefined`，特定数据记录将从磁盘中擦除。

```js
await Neutralino.storage.setData('userDetails',
                        JSON.stringify({ username: 'TestValue'})
);
```

## storage.getData(key)
读取并返回给定 Neutralinojs 共享存储键的数据。

### Parameters
- `key` String: 存储数据记录标识符。

### Return String (awaited):
存储记录的数据字符串。

```js
let data = await Neutralino.storage.getData('userDetails');
console.log(`数据：${data}`);
```

## storage.getKeys()
返回所有存储键。

### Return Array (awaited):
现有存储键的字符串数组。

```js
let keys = await Neutralino.storage.getKeys();
console.log('键：', keys);
```
