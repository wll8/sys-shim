---
title: 全局变量
---

这些 JavaScript 变量可以在任何地方使用，因为这些变量是在 window 范围内定义的。

## 预定义的全局变量

| 变量           | 描述                                                      |
| --- | --- |
| `NL_OS`       | 操作系统名称：`Linux`、`Windows` 或 `Darwin`                |
| `NL_ARCH`     | CPU 架构：`x64`、`arm`、`itanium`、`ia32` 或 `unknown`       |
| `NL_APPID`    | 应用程序标识符                                             |
| `NL_APPVERSION` | 应用程序版本                                              |
| `NL_PORT`     | 应用程序端口                                                |
| `NL_MODE`     | 应用程序的模式：`window`、`browser`、`cloud` 或 `chrome`     |
| `NL_VERSION`  | Neutralinojs 框架版本                                       |
| `NL_CVERSION` | Neutralinojs 客户端版本                                    |
| `NL_CWD`      | 当前工作目录                                                |
| `NL_PATH`     | 应用程序路径                                                |
| `NL_ARGS`     | 命令行参数                                                  |
| `NL_PID`      | 当前进程的标识符                                           |
| `NL_RESMODE`  | 应用程序资源的来源：`bundle` 或 `directory`                |
| `NL_EXTENABLED` | 如果启用了扩展，则返回 `true`                              |
| `NL_COMMIT`   | 框架二进制的发布提交哈希                                   |
| `NL_CCOMMIT`  | 客户端库的发布提交哈希                                     |
| `NL_CMETHODS` | 自定义方法标识符（返回与 [`custom.getMethods`](custom.md#customgetmethods) 相同的输出）。 |
| `NL_WSAVSTLOADED` | 如果初始窗口状态是从保存的配置加载的，则返回 `true`       |

:::tip
如果您使用夜间发布，可以使用 `NL_COMMIT` 和 `NL_CCOMMIT` 值来识别代码库快照。
:::


## 自定义全局变量

您也可以通过 `neutralino.config.json` 创建自定义全局变量，如下所示。

```json
"globalVariables": {
    "TEST": "Test Value"
}
```

可以使用 `NL_TEST` 访问上面的自定义全局变量值。您可以为自定义全局变量设置任何数据类型。请看以下例子。

```json
"globalVariables": {
    "TEST_1": 1,
    "TEST_2": null,
    "TEST_3": 3.5,
    "TEST_4": [3, 5, 4, 5],
    "TEST_5": {
        "key": "value",
        "anotherKey": 100
    }
}
```

避免覆盖预定义的全局变量。
