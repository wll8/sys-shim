---
title: 错误码
---

如果某个特定的原生 API 调用失败，Neutralinojs 客户端库会用一个错误对象拒绝挂起的 Promise。

错误对象有以下结构：

```js
{
    code: "<code>",
    message: "<message>"
}
```

- `code` String: 错误代码。
- `message` String: 错误信息

## 原生 API 错误代码

| 错误代码                      | 信息                                          | 抛出位置
| --------------------------- | ------------------------------------------------- | --------
| `NE_FS_DIRCRER`             | 无法创建目录。                    | `os.createDirectory`
| `NE_FS_REMVERR`             | 无法移除路径。                    | `os.remove`
| `NE_OS_TRAYIER`             | 无法初始化托盘菜单。通常在 GNU/Linux 系统中没有应用指示器库时抛出此错误。 | `os.setTray`
| `NE_FS_FILRDER`             | 文件读取错误。                    | `filesystem.readFile`, `filesystem.readBinaryFile`
| `NE_FS_FILWRER`             | 文件写入错误。                    | `filesystem.writeFile`, `filesystem.writeBinaryFile`
| `NE_FS_FILOPER`             | 文件打开错误。                    | `filesystem.openFile`
| `NE_FS_UNLTOUP`             | 无法更新打开的文件 ID。          | `filesystem.updateOpenedFile`
| `NE_FS_UNLTFOP`             | 无法找到打开的文件 ID。          | `filesystem.getOpenedFileInfo`
| `NE_FS_NOPATHE`             | 没有文件或目录。                  | `filesystem.getStats`, `filesystem.readDirectory`
| `NE_FS_COPYERR`             | 复制错误。                        | `filesystem.copy`
| `NE_FS_MOVEERR`             | 移动错误。                        | `filesystem.move`
| `NE_FS_UNLCWAT`             | 无法创建观察者。                  | `filesystem.createWatcher`
| `NE_FS_NOWATID`             | 无法找到观察者。                  | `filesystem.removeWatcher`
| `NE_OS_UNLTOUP`             | 由于无效的进程标识符或操作，无法更新生成的进程。 | `os.updateSpawnedProcess`
| `NE_OS_INVMSGA`             | 无效的消息框参数。                | `os.showMessageBox`
| `NE_OS_INVKNPT`             | 无效的平台路径名称。              | `os.getPath`
| `NE_ST_INVSTKY`             | 无效的存储键。                    | `storage.getData`, `storage.setData`
| `NE_ST_STKEYWE`             | 存储写入错误。                    | `storage.setData`
| `NE_RT_INVTOKN`             | 无效的访问令牌。                  | `all`
| `NE_RT_NATPRME`             | 没有权限执行提供的原生方法。      | `all`
| `NE_RT_APIPRME`             | 没有权限使用原生 API。            | `all`
| `NE_RT_NATRTER`             | 原生方法运行时错误。常由缺少参数引起。 | `all`
| `NE_RT_NATNTIM`             | 原生方法未实现。                  | `internal`
| `NE_CL_NSEROFF`             | Neutralino 服务器无法访问。       | `all`
| `NE_EX_EXTNOTC`             | 扩展尚未连接                       | `extensions.dispatch`
| `NE_UP_CUPDMER`             | 无效的更新清单或应用程序ID不匹配  | `updater.checkForUpdates`
| `NE_UP_CUPDERR`             | 无法获取更新清单                   | `updater.checkForUpdates`
| `NE_UP_UPDNOUF`             | 没有加载更新清单                   | `updater.install`
| `NE_UP_UPDINER`             | 更新安装错误                       | `updater.install`
