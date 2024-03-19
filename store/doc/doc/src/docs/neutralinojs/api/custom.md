---
title: Neutralino.custom
---

Neutralinojs 提供了一个扩展 API，允许使用任何编程语言编写自定义后端代码，但是扩展存在以下缺点，在多种情况下会影响应用程序：

- 扩展使用共享的 WebSocket 进行通信，所以在扩展内部无法使用直接的 C++ 引用（例如，窗口处理器）。
- 开发者需负责打包他们的扩展二进制文件。
- 基于 C++ 的扩展由于基于 WebSockets 的 IPC，其速度并不如原生 C++ 代码快。

作为替代，开发者可以下载框架的 C++ 代码，修改并重新编译它。但是，开发者可能会在同步上游代码修改时遇到问题。因此，Neutralinojs 提供了一个单独的命名空间，一个函数模板，内置助手函数（例如，获取窗口处理器，验证等），以及一个开发者指南，以便在不更新框架核心的情况下向 Neutralinojs 框架添加自定义 API。

## custom.getMethods()
返回应用开发者添加的所有自定义方法。

### Return Array (awaited):
所有自定义方法标识符的字符串数组。

```js
let methods = await Neutralino.custom.getMethods();
console.log(methods);
```


## custom.add(num1, num2, options)

:::info
这是一个示例方法，官方的 Neutralinojs 框架默认不包括这个方法。因此，您需要下载 Neutralinojs 框架的源代码，并在 [`custom`](https://github.com/neutralinojs/neutralinojs/tree/main/api/custom) 命名空间和 [`router.cpp`](https://github.com/neutralinojs/neutralinojs/blob/db457c717d789a040e70f0b8de9ddd412c8ec103/server/router.cpp#L122) 中取消注释 `add` 方法。
:::

这个方法返回两个数字的和，用于演示自定义方法。

### Parameters
- `num1` Number: 求和过程的第一个数字。
- `num2` Number: 求和过程的第二个数字。

### Options
- `addExtraFive` Boolean: 在数值结果中额外增加五。
- `addExtraTen` Boolean: 在数值结果中额外增加十。

### Return Number (awaited):
基于选项的输入数值参数的和与额外值的增加。

```js
let sum;
sum = await Neutralino.custom.add(10, 10); // 20
sum = await Neutralino.custom.add(1, 1, { addExtraFive: true, addExtraTen: true }); // 17
```

查看 `add` 方法的实现，并了解如何在 C++ 中捕获、验证和处理参数。为了编译你的 Neutralinojs 分支，你可以使用现有的 [GitHub Actions 工作流](https://github.com/neutralinojs/neutralinojs/tree/main/.github/workflows)。
