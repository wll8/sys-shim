---
title: Neutralino.os
---

`Neutralino.os` 命名空间包含与用户操作系统相关的方法。

## os.execCommand(command, options)
执行一个命令并返回输出。

### Parameters
- `command` String: 将要执行的命令。

### Options
- `background` Boolean: 若设置为 `true`，则在后台执行命令并立即解析Promise。这个选项使得进程从API函数调用中分离，因此如果你需要稍后连接到新创建的进程，请考虑使用 `os.spawnProcess`。
- `stdIn` String: 标准输入字符串。
- `cwd` String: 当前工作目录。

### Return Object (awaited):
- `pid` Number: 进程标识符。
- `stdOut` String: 标准输出。
- `stdErr` String: 标准错误。
- `exitCode` Number: 进程的退出代码。

```js
let info = await Neutralino.os.execCommand('python --version');
console.log(`你的Python版本：${info.stdOut}`);

await Neutralino.os.execCommand('npm start', { background: true });
```

## os.spawnProcess(command, cwd)
在后台基于一个命令生成进程，并让开发者控制它。

### Parameters
- `command` String: 在新进程中执行的命令。
- `cwd` String (可选): 当前工作目录。

### Return Object (awaited):
- `id` Number: Neutralino专用的进程标识符。此值用于通过本地API控制进程。
- `pid` Number: 操作系统的进程标识符。

```js
let pingProc = await Neutralino.os.spawnProcess('ping neutralino.js.org');

Neutralino.events.on('spawnedProcess', (evt) => {
    if(pingProc.id == evt.detail.id) {
        switch(evt.detail.action) {
            case 'stdOut':
                console.log(evt.detail.data);
                break;
            case 'stdErr':
                console.error(evt.detail.data);
                break;
            case 'exit':
                console.log(`Ping进程已终止，退出代码：${evt.detail.data}`);
                break;
        }
    }
});
```

## os.updateSpawnedProcess(id, action, data)
根据提供的操作和数据更新生成的进程。如果无法更新进程，则抛出 `NE_OS_UNLTOUP`。

### Parameters
- `id` Number: Neutralino专用的进程标识符。
- `action` String: 要执行的操作。仅接受以下值：
    - `stdIn`: 通过标准输入流向进程发送数据。
    - `stdInEnd`: 关闭标准输入流文件描述符。
    - `exit`: 终止进程。
- `data` Object (可选): `action` 的额外数据。如果 `action` 是 `stdIn`，则发送标准输入字符串。

```js
let nodeProc = await Neutralino.os.spawnProcess('node');

Neutralino.events.on('spawnedProcess', (evt) => {
    if(nodeProc.id == evt.detail.id) {
        switch(evt.detail.action) {
            case 'stdOut':
                console.log(evt.detail.data); // 10
                break;
            case 'stdErr':
                console.error(evt.detail.data);
                break;
            case 'exit':
                console.log(`Node.js进程已终止，退出代码：${evt.detail.data}`);
                break;
        }
    }
});

await Neutralino.os.updateSpawnedProcess(nodeProc.id, 'stdIn', 'console.log(5 + 5);');
await Neutralino.os.updateSpawnedProcess(nodeProc.id, 'stdInEnd');
```

## os.getSpawnedProcesses()
返回所有生成的进程。

### Return Object (awaited):
一个`SpawnedProcess`对象的数组。

#### SpawnedProcess
- `id` Number: Neutralino专用的进程标识符。
- `pid` Number: 操作系统的进程标识符。

```js
await Neutralino.os.spawnProcess('ping neutralino.js.org');
await Neutralino.os.spawnProcess('ping codezri.org');

let processes = await Neutralino.os.getSpawnedProcesses();
console.log(processes);
```

## os.getEnv(key)
提供给定环境变量的值。

### Parameters
- `key` String: 环境变量的名称。

### Return String (awaited):
给定环境变量的值。如果环境变量未定义，则返回空字符串。

```js
let value = await Neutralino.os.getEnv('USER');
console.log(`USER = ${value}`);
```

## os.getEnvs()
返回所有环境变量及其值。

### Return Object (awaited):
以键值对形式的环境变量详情。

```js
let envs = await Neutralino.os.getEnvs();
console.log(envs);
```


## os.showOpenDialog(title, options)
显示文件打开对话框。你可以使用这个函数来获取现有文件的路径。

### Parameters
- `title` String (可选): 对话框的标题。

### Options
- `filters` Filter[] (可选): 一个Filter对象数组，用于过滤文件列表。
- `multiSelections` (可选): 启用多选。
- `defaultPath` String (可选): 对话框显示的初始路径/文件名。

#### Filter
- `name` String: 过滤器名称。
- `extensions` String: 文件扩展名数组。例如：`['jpg', 'png']`

### Return Object (awaited):
选中的条目数组。

```js
let entries = await Neutralino.os.showOpenDialog('打开图表', {
  defaultPath: '/home/my/directory/',
  filters: [
    {name: '图片', extensions: ['jpg', 'png']},
    {name: '所有文件', extensions: ['*']}
  ]
});
console.log('您已选择:', entries);
```

## os.showSaveDialog(title, options)
显示文件保存对话框。您可以使用这个函数来获取创建新文件的路径。

### Parameters
- `title` String (可选): 对话框的标题。

### Options
- `filters` Filter[] (可选): 一个Filter对象数组，用于过滤文件列表。
- `forceOverwrite` Boolean (可选): 跳过文件覆盖警告消息。
- `defaultPath` String (可选): 对话框显示的初始路径/文件名。

#### Filter
- `name` String: 过滤器名称。
- `extensions` String[]: 文件扩展名数组。例如：`['jpg', 'png']`

### Return String (awaited):
选中的文件名。

```js
let entry = await Neutralino.os.showSaveDialog('保存文件', {
  defaultPath: 'untitled.jpg',
  filters: [
    {name: '图片', extensions: ['jpg', 'png']},
    {name: '所有文件', extensions: ['*']}
  ]
});
console.log('您已选择:', entry);
```


## os.showFolderDialog(title)
显示文件夹打开对话框。

### Parameters
- `title` String (可选): 对话框的标题。

### Options
- `defaultPath` String (可选): 对话框显示的初始路径。

### Return String (awaited):
选中的文件夹。

```js
let entry = await Neutralino.os.showFolderDialog('选择安装目录', {
  defaultPath: '/home/my/directory/'
});
console.log('您已选择:', entry);
```

## os.showNotification(title, content, icon)
显示一个通知消息。

### Parameters
- `title` String: 通知标题。
- `content` String: 通知内容。
- `icon` String (可选): 图标名称。接受的值有：`INFO`, `WARNING`, `ERROR` 和 `QUESTION`。默认值为 `INFO`。

```js
await Neutralino.os.showNotification('你好世界', '它运行正常！祝你有美好的一天');

await Neutralino.os.showNotification('哎呀 :/', '出了些问题', 'ERROR');
```

## os.showMessageBox(title, content, choice, icon)
显示一个消息框。

### Parameters
- `title` String: 消息框的标题。
- `content` String: 消息框的内容。
- `choice` String (可选): 消息框按钮。接受的值有：`OK`, `OK_CANCEL`, `YES_NO`, `YES_NO_CANCEL`, `RETRY_CANCEL`, 和 `ABORT_RETRY_IGNORE`。默认值为 `OK`。
- `icon` String (可选): 图标名称。接受的值有：`INFO`, `WARNING`, `ERROR`, 和 `QUESTION`。默认值为 `INFO`。

### Return String (awaited):
用户的 `choice`。

```js
await Neutralino.os.showMessageBox('你好', '欢迎');

let button = await Neutralino.os
            .showMessageBox('确认',
                            '你确定你要退出吗？',
                            'YES_NO', 'QUESTION');
if(button == 'YES') {
    Neutralino.app.exit();
}
```

## os.setTray(options)
创建/更新托盘图标和菜单。

### Options
- `icon` String: 托盘图标路径。例如：`/resources/icons/trayIcon.png`。一个 `20x20` 尺寸的PNG图像文件在所有支持的操作系统上都能很好工作。
- `menuItems` TrayMenuItem[]: `TrayMenuItem` 对象数组。

#### TrayMenuItem

- `id` String (可选): 每个菜单项的唯一标识符。
- `text` String: 菜单项的标签。这是一个必填字段。使用 `-`（连字符）字符表示菜单分隔符。
- `isDisabled` Boolean (可选): 一个布尔标志，用于禁用/启用特定菜单项。
- `isChecked` Boolean (可选): 一个布尔标志，用于标记特定菜单项为选中状态。

```js
let tray = {
  icon: '/resources/icons/trayIcon.png',
  menuItems: [
    {id: "about", text: "关于"},
    {text: "-"},
    {id: "quit", text: "退出"}
  ]
};

await Neutralino.os.setTray(tray);
```

## os.getPath(name)
返回已知的平台特定文件夹，如下载、音乐、视频等。

### Parameters
- `title` String: 文件夹的名称。接受的值有：`config`, `data`, `cache`, `documents`, `pictures`, `music`, `video`, `downloads`, `savedGames1`, 和 `savedGames2`。对无效的文件夹名抛出 `NE_OS_INVKNPT`。

### Return String (awaited):
路径。

```js
let downloadsPath = await Neutralino.os.getPath('downloads');
console.log(`下载文件夹：${downloadsPath}`);
```

## os.open(url)
用默认的网页浏览器打开一个URL。

:::tip
如果你的应用正在默认的网页浏览器中运行，这个方法将打开一个新标签页。
:::

### Parameters

- `url` String: 要打开的URL。

```js
Neutralino.os.open('https://neutralino.js.org');
```
