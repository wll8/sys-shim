---
title: Neutralino.filesystem
---

`Neutralino.filesystem` 命名空间包含了文件处理的方法。

## filesystem.createDirectory(path)
递归地创建一个或多个目录。如果无法创建目录，将抛出 `NE_FS_DIRCRER` 异常。

### Parameters
- `path` String: 新目录路径。

```js
await Neutralino.filesystem.createDirectory('./newDirectory');

await Neutralino.filesystem.createDirectory(NL_PATH + '/myFolder/api/fs');
```

## filesystem.remove(path)
移除一个目录或文件。如果给定的路径是一个目录，此函数将递归删除该目录的所有内容。
如果无法删除，将抛出 `NE_FS_REMVERR` 异常。

### Parameters

- `path` String: 目录或文件路径。

```js
await Neutralino.filesystem.remove('./tmpDirectory');
await Neutralino.filesystem.remove('./tmpFile.txt');
```

## filesystem.writeFile(filename, data)
写入文本文件。如果写入文件时出错，将抛出 `NE_FS_FILWRER` 异常。

### Parameters
- `filename` String: 文件名。
- `data` String: 文件内容。

```js
await Neutralino.filesystem.writeFile('./myFile.txt', 'Sample content');
```

## filesystem.appendFile(filename, data)
向文件追加文本内容。如果写入文件时出错，将抛出 `NE_FS_FILWRER` 异常。如果提供的文件不存在，
此函数将创建一个新文件并写入 `data`。

### Parameters
- `filename` String: 文件名。
- `data` String: 要追加的内容。

```js
await Neutralino.filesystem.appendFile('./myFile.txt', 'Sample ');
await Neutralino.filesystem.appendFile('./myFile.txt', 'content');
```

## filesystem.writeBinaryFile(filename, data)
写入二进制文件。如果写入文件时出错，将抛出 `NE_FS_FILWRER` 异常。

### Parameters
- `filename` String: 文件名。
- `data` ArrayBuffer: 二进制文件内容，以 [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 形式。

```js
let rawBin = new ArrayBuffer(1);
let view = new Uint8Array(rawBin);
view[0] = 64; // 将 ASCII '@' 保存到二进制文件中

await Neutralino.filesystem.writeBinaryFile('./myFile.bin', rawBin);
```

## filesystem.appendBinaryFile(filename, data)
向文件追加二进制数据。如果写入文件时出错，将抛出 `NE_FS_FILWRER` 异常。如果提供的文件不存在，
此函数将创建一个新文件并写入 `data`。

### Parameters
- `filename` String: 文件名。
- `data` ArrayBuffer: 要追加的二进制内容，以 [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 形式。

```js
let rawBin = new ArrayBuffer(1);
let view = new Uint8Array(rawBin);
view[0] = 64; // 将 ASCII '@' 保存到二进制文件中

await Neutralino.filesystem.appendBinaryFile('./myFile.bin', rawBin);
await Neutralino.filesystem.appendBinaryFile('./myFile.bin', rawBin);
```

## filesystem.readFile(filename)
读取文本文件。如果读取文件时出错，将抛出 `NE_FS_FILRDER` 异常。

### Parameters

- `filename` String: 文件名。
- `pos` Number (optional): 文件光标位置，以字节为单位。
- `size` Number (optional): 文件读取缓冲区大小，以字节为单位。

### Return String (awaited):
文件内容。

```js
let data = await Neutralino.filesystem.readFile('./myFile.txt');
console.log(`Content: ${data}`);

let data = await Neutralino.filesystem.readFile('./myFile.txt', {
    pos: 2,
    size: 10
});
console.log(`Content: ${data}`);
```

## filesystem.readBinaryFile(filename)
读取二进制文件。如果读取文件时出错，将抛出 `NE_FS_FILRDER` 异常。

### Parameters

- `filename` String: 文件名。
- `pos` Number (optional): 文件光标位置，以字节为单位。
- `size` Number (optional): 文件读取缓冲区大小，以字节为单位。

### Return Object (awaited):
二进制文件内容，以 [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 形式。

```js
let data = await Neutralino.filesystem.readBinaryFile({
  fileName: './myFile.bin'
});
let view = new Uint8Array(data);

console.log('Binary content: ', view);
```

## filesystem.openFile(filename)
创建一个可读文件流。如果打开文件时出错，将抛出 `NE_FS_FILOPER` 异常。

### Parameters

- `filename` String: 文件名。

### Return Number (awaited):
文件流标识符。

```js
let fileId = await Neutralino.filesystem.openFile('./myFile.txt');
console.log(`ID: ${fileId}`);
```

## filesystem.updateOpenedFile(id, action, data)
调用文件流操作。如果框架无法更新流，将抛出 `NE_FS_UNLTOUP` 异常。调用此方法可读取和查找已打开的文件（即可读流）。

### Parameters
- `id` Number: 文件流标识符。
- `action` String: 要执行的操作。仅接受以下值：
    - `read`: 从文件流中读取一个字节段。
    - `readBinary`: 与 `read` 行为相同，但使用二进制读取模式。
    - `readAll`: 触发 `read` 操作，直到文件流光标位置达到 [EOF](https://en.wikipedia.org/wiki/End-of-file)。
    - `readAllBinary`: 与 `readAll` 行为相同，但使用二进制读取模式。
    - `seek`: 设置文件光标位置。
    - `close`: 关闭并释放文件处理资源。
- `data` Object (optional): `action` 的额外数据。如果 `action` 是 `read`、`readBinary`、`readAll` 或 `readAllBinary`，发送缓冲区大小（默认为 256 字节）。如果操作是 `seek`，则发送文件流光标位置。

```js
let fileId = await Neutralino.filesystem.openFile('./myFile.txt');

let content = '';
Neutralino.events.on('openedFile', (evt) => {
  if(evt.detail.id == fileId) {
    switch(evt.detail.action) {
      case 'data':
        content += evt.detail.data;
        break;
      case 'end':
        console.log(content);
        break;
    }
  }
});

// 将文件流光标设置到第 10 个字节
await Neutralino.filesystem.updateOpenedFile(fileId, 'seek', 10);
// 从光标位置读取 2 个字节
await Neutralino.filesystem.updateOpenedFile(fileId, 'read', 2);
// 读取下一个字节直到光标达到 EOF（缓冲区大小：2）
await Neutralino.filesystem.updateOpenedFile(fileId, 'readAll', 2);
```

## filesystem.getOpenedFileInfo(id)
返回文件流详情。如果文件流标识符无效，将抛出 `NE_FS_UNLTFOP` 异常。

### Parameters

- `id` Number: 文件流标识符。

### Return Object (awaited):
- `id` Number: 文件流标识符。
- `eof` Boolean: 如果流达到 EOF，则变为 `true`。
- `pos` Number: 文件流光标位置。
- `lastRead` Number: 最后读取的字节数。

```js
let info = await Neutralino.filesystem.getOpenedFileInfo(0);
console.log(info);
```

## filesystem.createWatcher(path)
创建一个文件系统监视器。如果无法创建监视器，将抛出 `NE_FS_UNLCWAT` 异常。如果给定路径已经有活跃的监视器，此函数将返回现有的监视器标识符。

### Parameters

- `path` String: 目录路径。

### Return Number (awaited):
文件监视器标识符。

```js
let watcherId = await Neutralino.filesystem.createWatcher(NL_PATH);
Neutralino.events.on('watchFile', (evt) => {
    if(watcherId == evt.detail.id) {
        console.log(evt.detail);
    }
});
console.log(`ID: ${watcherId}`);
```

## filesystem.removeWatcher(watcherId)
移除一个文件系统监视器。如果无法移除监视器，将抛出 `NE_FS_NOWATID` 异常。

### Parameters

- `watcherId` Number: 文件监视器标识符。

### Return Number (awaited):
文件监视器标识符。

```js
let watcherId = await Neutralino.filesystem.createWatcher(NL_PATH);
console.log(`ID: ${watcherId}`);
await Neutralino.filesystem.removeWatcher(watcherId);
```

## filesystem.getWatchers()
返回已创建文件监视器的信息。

### Return Object (awaited):
`FileWatcher` 对象数组。

### FileWatcher
- `id` Number: 监视器标识符。
- `path` String: 文件监视器路径。


```js
let watchers = await Neutralino.filesystem.getWatchers();
for(let watcher of watchers) {
    console.log(watcher);
}
```

## filesystem.readDirectory(path, options)
读取目录内容。如果路径不存在，将抛出 `NE_FS_NOPATHE` 异常。

### Parameters

- `path` String: 文件/目录路径。

### options
- `recursive` Boolean: 递归读取子目录。默认值为 `false`。

### Return Object (awaited):
`DirectoryEntry` 对象数组。

### DirectoryEntry

  - `entry` String: 文件名。
  - `type` String: 条目类型（`FILE` 或 `DIRECTORY`）。

```js
let entries = await Neutralino.filesystem.readDirectory(NL_PATH);
console.log('Content: ', entries);
```

## filesystem.copy(source, destination)
将文件或目录复制到新位置。如果系统无法复制路径，将抛出 `NE_FS_COPYERR` 异常。

### Parameters

- `source` String: 源路径。
- `destination` String: 目的路径。

```js
await Neutralino.filesystem.copy('./source.txt', './destination.txt');
await Neutralino.filesystem.copy('./myDir', './myDirCopy');
```

## filesystem.move(source, destination)
将文件或目录移动到新位置。如果系统无法重命名路径，将抛出 `NE_FS_MOVEERR` 异常。

### Parameters

- `source` String: 源路径。
- `destination` String: 目的路径。

```js
await Neutralino.filesystem.move('./source.txt', './destination.txt');
await Neutralino.filesystem.move('./myDir', './myFolder');
```

## filesystem.getStats(path)
返回给定路径的文件统计信息。如果给定路径不存在或无法访问，将抛出 `NE_FS_NOPATHE` 异常。
因此，您可以使用此方法来检查文件或目录的存在。

### Parameters

- `path` String: 文件或目录路径。

### Return Object (awaited):
- `size` Number: 大小，以字节为单位。
- `isFile` Boolean: 如果路径是普通文件，则为 `true`。
- `isDirectory` Boolean: 如果路径是目录，则为 `true`。
- `createdAt` Number: 在 Windows 上，返回文件创建时间的 Unix 毫秒值 &mdash; 在 Unix 或类 Unix 平台上，返回最后 [inode](https://en.wikipedia.org/wiki/Inode) 修改时间的 Unix 毫秒值。
- `modifiedAt` Number: 文件最后修改时间的 Unix 毫秒值。

```js
let stats = await Neutralino.filesystem.getStats('./sampleVideo.mp4');
console.log('Stats:', stats);
