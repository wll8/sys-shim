---
title: Neutralino.computer
---

`Neutralino.computer` 命名空间包含与用户硬件相关的方法。

## computer.getMemoryInfo()
返回系统内存统计数据，单位为字节。

### Return Object (awaited):

- `physical` Object: 物理内存信息。
    - `total` Number: 物理内存总量。
    - `available` Number: 可用物理内存量。
- `virtual` Object: 虚拟内存信息。
    - `total` Number: 虚拟内存总量。
    - `available` Number: 可用虚拟内存量。

```js
let memoryInfo = await Neutralino.computer.getMemoryInfo();
console.log(`RAM size: ${memoryInfo.physical.total}B`);
```

## computer.getArch()
返回 CPU 架构标识符：`x64` (x86 64位/arm64)，`ia32` (x86 32位)，`arm`，`itanium`，
或 `unknown`。

### Return String (awaited):
CPU 架构。


```js
let arch = await Neutralino.computer.getArch();
console.log(arch);
```

## computer.getKernelInfo()
返回操作系统内核信息。

### Return Object (awaited):
- `variant` String: 内核类型：`Linux`，`Darwin`，`Windows NT`，或 `Unknown`。
- `version` String: 版本采用 `<major>.<minor>.<patch>-<build_number>` 格式。


```js
let kernelInfo = await Neutralino.computer.getKernelInfo();
console.log(`Kernel: ${kernelInfo.variant}`);
```

## computer.getOSInfo()
返回操作系统信息。

### Return Object (awaited):
- `name` String: 操作系统名称。
- `description` String: 操作系统描述。
- `version` String: 版本采用 `<major>.<minor>.<patch>-<build_number>` 格式。


```js
let osInfo = await Neutralino.computer.getOSInfo();
console.log(`OS: ${kernelInfo.name}`);
```

## computer.getCPUInfo()
返回 CPU 信息。

### Return Object (awaited):
- `vendor` String: 供应商名称。
- `model` String: 型号名称。
- `frequency` Number: 当前 CPU 频率，单位为赫兹 (Hz)。
- `architecture` String: CPU 架构名称。返回值与 `getArch` 函数相同。
- `logicalThreads` Number: CPU 并行模型中逻辑线程的数量。
- `physicalCores` Number: CPU 中物理核心的数量。
- `physicalUnits` Number: 主板上物理 CPU 硬件单元的数量。


```js
let cpuInfo = await Neutralino.computer.getCPUInfo();
console.log(`CPU model: ${cpuInfo.model}`);
```

## computer.getDisplays()
返回所有连接显示器的信息。

### Return Object (awaited):
`Display` 对象的数组。

### Display
- `id` Number: 虚拟显示标识符。
- `resolution` Object: 显示分辨率信息。
    - `width` Number: 显示宽度。
    - `height` Number: 显示高度。
- `dpi` Number: DPI（每英寸点数）值。
- `bpp` Number: BPP（每像素位数）值（也称为色深）。
- `refreshRate` Number: 刷新率，单位为赫兹 (Hz)。


```js
let displays = await Neutralino.computer.getDisplays();
for(let display of displays) {
    console.log(display);
}
```

## computer.getMousePosition()
返回当前鼠标光标位置。

### Return Object (awaited):
- `x` Number: 距屏幕左边缘的距离，单位为像素。
- `y` Number: 距屏幕顶边缘的距离，单位为像素。


```js
let pos = await Neutralino.computer.getMousePosition();
console.log(`Pos: ${pos.x}, ${pos.y}`);
```
