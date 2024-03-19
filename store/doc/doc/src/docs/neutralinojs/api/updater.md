---
title: Neutralino.updater
---

`Neutralino.updater` 命名空间包含与内置自动更新程序相关的方法。`Neutralinojs` 提供了内置的客户端更新机制。因此，您甚至可以在不调用第三方更新服务、操作系统级服务或其他二进制文件/脚本的情况下更新 `Neutralinojs` 应用程序。

通过`此指南`了解更多关于扩展的信息。

## updater.checkForUpdates(url)
从给定的URL检查最新更新。URL应返回一个有效的 `Neutralinojs` 更新清单，并包含 `Content-Type: application/json` 头。对于无效的清单抛出 `NE_UP_CUPDMER`，对于网络连接问题抛出 `NE_UP_CUPDERR`。

### Parameters

- `url` String: 获取更新清单的URL。

### Return Object (awaited):
更新清单。

```js
let url = 'https://example.com/updates/manifest.json';
let manifest = await Neutralino.updater.checkForUpdates(url);
```

## updater.install()
从下载的更新清单中安装更新。如果清单没有加载，将抛出 `NE_UP_UPDNOUF`。如果更新安装过程失败，此函数将抛出 `NE_UP_UPDINER`。

```js
let url = 'https://example.com/updates/manifest.json';
let manifest = await Neutralino.updater.checkForUpdates(url);

if(manifest.version != NL_APPVERSION) {
    await Neutralino.updater.install();
}
else {
    console.log('您正在使用最新版本！');
}
```
