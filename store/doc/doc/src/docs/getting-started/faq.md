---
title: 常见问答
---

## 性能

sys-shim 使用 WebSocket 与 main.exe 进行交互，有以下几个环节：

- js 代码构建环节
- websocket 通信环节
- main.exe 代码加载和执行环节

对于单个同步调用，例如调用 main.exe 中的方法进行数组裁剪，在 `Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz` 上调用以下代码 10 次，平均每次耗时在 50ms 左右。

``` js
console.time()
console.log(await native.table.unpack([1,2,Date.now()], 2))
console.timeEnd() // 44.8 ms
```

实际上像裁剪数组这类需要处理数据的操作，直接使用 js 现有的方法即可，只有调用系统 api 时，才应使用 sys-shim 的方法，例如使用以下代码获取 cpu 商标，用于也在 50ms 左右：

``` js
console.time()
console.log(await native.sys.cpu.getBrand())
console.timeEnd() // 49.2 ms
```

即使遇到耗时的操作利用 js 的 async 语法有效避免，例如：

``` js
console.time()
await main.native.sleep(5000).then(() => console.log('同步运行完成了'))
console.timeEnd() // 5054.5 ms

console.time()
main.native.sleep(5000).then(() => console.log('异步运行完成了'))
console.timeEnd() // 0.6 ms
```

效率较低的场景是需要与操作系统进行极其频繁且同步交互的场景，例如在遍历目录时，在每个回调函数里根据根据函数返回值决定是否继续遍历：

``` js
let num = 0
let list = []
console.time()
await native.fsys.enum( `C:/`, `*.*`, async function (dir, filename, fullpath, findData) {
    num = num + 1
    list.push(fullpath || dir)
    if(num >= 10) {
      return false
    }
  },
  false,
)
console.timeEnd() // 527.7 ms
console.log({num, list})
```

上面代码的逻辑是，遍历数量等于 10 时停止遍历。由于每次遍历，都要经过完整的 main.exe/js 通信过程，所以 10 个文件就耗时 500ms 左右，也就是一秒才能遍历 20 个文件。对于要求快速扫描目录文件的场景来说，效率很低。

好在这些场景不是大多数程序和大多数操作都会涉及到的事情，而且也有很简单的处理方法，例如直接在当前页面使用原生代码或你熟悉的[其他语言](// todo)来完成。

例如使用原生语言遍历 5000 个文件，耗时为 300ms 左右：

``` js
console.time()
let [, num, cur] = await main.ws.call(`run`, [`
  var num = 0
  var cur = null
  var size = ...
  fsys.enum("C:/", "*.*", function (dir, filename, fullpath, findData) {
    num = num + 1
    cur = fullpath || dir
    if(num >= size) {
      return false
    }
  },
  true
  )
  return num, cur
`, 5000])
console.timeEnd() // 334.5 ms
console.log({num, cur})
```

## 安全

由于 main.exe 启动后，暴露了一个 websocket 接口，连接到此接口的任何程序都可以通过它运行系统命令，所以在一些杀毒程序看来，这是十分危险的，因为它向外暴露了接口来操作计算机资源，导致杀毒软件会提示 main.exe 为病毒程序。

而实际上，我们为此做出了一些设计来避免非法操作：

- main.exe 启动的 websocket/http 接口只绑定到本机 IP 域下，即同一个局域网下的其他设备和公网无法访问到这个接口。
- 程序启动时，会随机生成一个 token，就算能访问 websocket 接口，也需要通过 token 的正确性验证才可以连接。
- 对于 web 环境中，就算页面已经允许跨域，已经知道 token，也可以配置允许连接的域名来阻止未经授权的域名连接 websocket 接口。

你发布的程序应尽量本地化，虽然 main.exe 可以让你的线上页面获得访问用户本地资源的能力，但你也应承担起保护用户安全的责任。避免你的线上页面被加入恶意代码，如果对用户造成伤害，你将可能会承担法律责任。

## 稳定

sys-shim 默认情况下，所有操作都是在子线程中运行的，子线程出现错误时并不会导致整个应用崩溃，也不会影响主进程的运行。

## 兼容

sys-shim 的兼容性支持 win7/win8/win10/win11 版本，并严格遵循语义化版本规范进行更新，避免引入不兼容的改动。你可以通过依赖锁来指定任意版本，点击这里查看[历史版本和更新日志](https://www.npmjs.com/package/sys-shim?activeTab=versions)。

