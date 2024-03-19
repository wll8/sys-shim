---
title: Neutralino.window
---

`Neutralino.window` 命名空间包含与当前原生窗口实例有关的方法。此命名空间的方法仅适用于 [`window`](/docs/configuration/modes#window) 模式。

## window.setTitle(title)
设置原生窗口的标题。

### Parameters
- `title` String (可选): 窗口标题。如果没有参数调用此函数，将清除标题。

```js
await Neutralino.window.setTitle('新标题');
```

## window.getTitle()
返回原生窗口的标题。

### Return String (awaited):
当前原生窗口实例的标题。

```js
let title = await Neutralino.window.getTitle();
console.log(`标题 = ${title}`);
```

## window.minimize()
最小化原生窗口。

```js
await Neutralino.window.minimize();
```

## window.maximize()
最大化原生窗口。

```js
await Neutralino.window.maximize();
```

## window.unmaximize()
恢复原生窗口。

```js
await Neutralino.window.unmaximize();
```

## window.isMaximized()
如果原生窗口被最大化，返回 `true`。

### Return Boolean (awaited):
- 基于当前最大化状态的 `true` 或 `false`。

```js
let status = await Neutralino.window.isMaximized();
```

## window.setFullScreen()
启用全屏模式。

```js
await Neutralino.window.setFullScreen();
```

## window.exitFullScreen()
退出全屏模式。

```js
await Neutralino.window.exitFullScreen();
```

## window.isFullScreen()
如果原生窗口处于全屏模式，返回 `true`。

### Return Boolean (awaited):
- 基于当前全屏状态的 `true` 或 `false`。

```js
let status = await Neutralino.window.isFullScreen();
```

## window.show()
显示原生窗口。

```js
await Neutralino.window.show();
```

## window.hide()
隐藏原生窗口。

```js
await Neutralino.window.hide();
```

## window.isVisible()
如果原生窗口可见，返回 `true`。

### Return Boolean (awaited):
- 基于当前可见状态的 `true` 或 `false`。

```js
let status = await Neutralino.window.isVisible();
```

## window.focus()
聚焦原生窗口。

```js
await Neutralino.window.focus();
```

## window.setAlwaysOnTop(onTop)
激活或停用置顶模式。

### Parameters

- `onTop` Boolean (可选): 说明是否应激活置顶模式。默认值是 `true`。

```js
await Neutralino.window.setAlwaysOnTop(true); // 或 setAlwaysOnTop();
await Neutralino.window.setAlwaysOnTop(false);
```

## window.move(x, y)
将原生窗口移动到给定坐标。`Neutralinojs` 的跨平台坐标系统从屏幕的左上角开始。换句话说，`x=0,y=0` 点指的是设备主屏幕的左上角。

### Parameters
- `x` Number: 水平位置的整数值。
- `y` Number: 垂直位置的整数值。

```js
await Neutralino.window.move(200, 400);
```

## window.center()
在当前显示器内居中原生应用窗口。

```js
await Neutralino.window.center();
```

## window.setIcon(icon)
为原生窗口或Dock设置图标。

### Parameters

- `icon` String: 图标路径。一个 `200x200` 的PNG图像文件在所有支持的操作系统上都工作得很好。

```js
const icon = '/resources/icons/appIcon.png';
await Neutralino.window.setIcon(icon);
```

## window.setDraggableRegion(domId)
将给定的DOM元素转换为可拖动区域。用户将能够通过拖动给定的DOM元素来拖动原生窗口。这个功能适合制作自定义窗口栏，与`无边框模式`一起使用。

### Parameters

- `domId` String | HTMLElement: DOM元素标识符。

```js
await Neutralino.window.setDraggableRegion('myCustomTitleBar');
```

## window.unsetDraggableRegion(domId)
通过移除拖动事件处理程序，将可拖动区域转换为普通的DOM元素。

### Parameters

- `domId` String | HTMLElement: DOM元素标识符。

```js
await Neutralino.window.unsetDraggableRegion('myCustomTitleBar');
```

## window.setSize(Options)
此方法设置窗口的大小。

### Options

- `width` Number (可选): 窗口宽度，以像素为单位。
- `height` Number (可选): 窗口高度，以像素为单位。
- `minWidth` Number (可选): 窗口最小宽度，以像素为单位。
- `minHeight` Number (可选): 窗口最小高度，以像素为单位。
- `maxWidth` Number (可选): 窗口最大宽度，以像素为单位。
- `maxHeight` Number (可选): 窗口最大高度，以像素为单位。
- `resizable` Boolean (可选): 一个布尔值，使窗口可调整大小或固定。

此方法总是期望宽度和高度成对出现。
例如，如果你设置了 `minWidth`，你也应该设置 `minHeight`。

```js
await Neutralino.window.setSize({
    width: 500,
    height: 200,
    maxWidth: 600,
    maxHeight: 400
});

await Neutralino.window.setSize({
    resizable: false
});
```

## window.getSize()
返回窗口大小信息。

### Return Boolean (awaited):

- `width` Number: 窗口宽度，以像素为单位。
- `height` Number: 窗口高度，以像素为单位。
- `minWidth` Number: 窗口最小宽度，以像素为单位。
- `minHeight` Number: 窗口最小高度，以像素为单位。
- `maxWidth` Number: 窗口最大宽度，以像素为单位。
- `maxHeight` Number: 窗口最大高度，以像素为单位。
- `resizable` Boolean: 说明窗口是可调整大小还是固定的。


```js
let sizeInfo = await Neutralino.window.getSize();

console.log(sizeInfo);
```

## window.getPosition()
返回窗口位置坐标。

### Return Boolean (awaited):

- `x` Number: 窗口左边缘的水平坐标。
- `y` Number: 窗口顶边缘的垂直坐标。


```js
let position = await Neutralino.window.getPosition();

console.log(position);
```

## window.create(url, WindowOptions)
创建一个原生窗口。你可以使用此方法为你的多窗口 `Neutralinojs` 应用程序创建新窗口。`Neutralinojs` 为每个原生窗口产生一个新进程。因此，一旦窗口被创建，新窗口就作为一个独立的应用程序运行。

然而，你可以使用[存储 API](./storage.md) 在窗口之间建立通讯流。

### Parameters

- `url` String: 要加载的URL。例如：`/resources/aboutWindow.html`。支持加载本地和远程应用资源。本地资源路径需要以 `/` 开头。
- `options` (可选): `WindowOptions` 类型的实例。

### WindowOptions

- `title` String: 窗口标题。
- `icon` String: 窗口图标路径。
- `fullScreen` Boolean: 设置全屏模式。
- `alwaysOnTop` Boolean: 激活最顶层模式。
- `enableInspector` Boolean: 激活开发者工具并打开web检查员窗口。
- `borderless` Boolean: 使窗口无边框。
- `maximize` Boolean: 启动窗口最大化。
- `hidden` Boolean: 隐藏窗口。
- `maximizable` Boolean: 设置窗口是否可以最大化。
- `exitProcessOnClose` Boolean: 当用户点击窗口关闭按钮时退出应用程序进程。
- `width` Number: 窗口宽度。
- `height` Number: 窗口高度。
- `x` Number: 窗口 `x` 位置。
- `y` Number: 窗口 `y` 位置。
- `minWidth` Number: 窗口最小宽度。
- `minHeight` Number: 窗口最小高度。
- `maxWidth` Number: 窗口最大宽度。
- `maxHeight` Number: 窗口最大高度。
- `processArgs` String: 新窗口进程的额外命令行参数。从`这里`检查所有支持的内部命令行参数。

### Return Object (awaited):
- `pid` Number: 进程标识符。
- `stdOut` String: 标准输出。此值总是为空，因为新窗口进程异步启动。
- `stdErr` String: 标准错误。此值总是为空，因为新窗口进程异步启动。
- `exitCode` Number: 进程的退出代码。

```js
await Neutralino.window.create('/resources/aboutWindow.html', {
    icon: '/resources/icons/aboutIcon.png',
    enableInspector: false,
    width: 500,
    height: 300,
    maximizable: false,
    exitProcessOnClose: true,
    processArgs: '--window-id=W_ABOUT'
});
```
