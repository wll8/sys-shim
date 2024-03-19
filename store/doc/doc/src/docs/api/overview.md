---
title: 原生API概览
---

## globalThis.ext

当通过 main.exe 加载时，会得到一个全局对象 ext，在浏览器环境下，该对象是一个 Promise（返回json）, 在 nodejs 中是一个 json。

json 内容为:

- ext.wsUrl

当前 json-rpc 的 url 地址。你可以通过 `socket` 来配置 ip/port/token 。

- ext.toekn

当前 json-rpc 的 token。


``` json
{
    "hwnd": 198610,
    "token": "36A07471-F13D-4048-91ED-E7A36BF2D8A8",
    "wsUrl": "ws://192.168.1.253:7788"
}
```

## globalThis.Sys

当通过 main.exe 加载时，会得到一个全局对象 Sys，实例化此对象后，即可使用 sys-shim 提供的 api。

- 参数为：wsUrl 地址，默认为 ext.wsUrl 。
- 返回值：main 对象。

### main.ws

ws 连接后的 rpc 实例。

### main.api

这是对三方 api 的封装，默认包含 neutralino 。

### main.native

调用原生方法，返回一个 Promise 数组，第一项为失败信息，后面为运行成功的返回值。示例：

``` js
await main.native.win.msgbox(`hello`)
```


## todo

`原生 API` 是指通过 js 可调用的原生方法。为了让开发者不用再花精力去关注原生 api 的使用。所以这里对大部分原生 api 进行 js 调用验证后，统一在此进行对每个 api 进行文档化描述。


为了让描述更容易理解，需要对原始文档进行变更，包括但不限于：

- 错别字修正。
- 格式修正：例如参数逗号后空格、参数语义化等。
- 对于难理解的概念进行适当批注。

此 todo 用于标记工作进度和需求。

-  `// 跳过` 表示暂无需关注，不予理睬。
- 已完成文档和验证的，使用 `- [x]` 标记。


### fsys
- [ ] fsys.WIN32_FIND_DATA -- // 跳过
- [ ] fsys.attrib(文件路径, , 文件属性) 
- [ ] fsys.attrib(文件路径, 文件属性) 
- [ ] fsys.attrib(文件路径) 
- [ ] fsys.copy 
- [ ] fsys.copy(源路径, 目标路径, FOF选项, 进度标题, 父窗口句柄) 
- [ ] fsys.createDir(目录路径, 是否清空重建) 
- [ ] fsys.createParentDir(路径) 
- [ ] fsys.delete 
- [ ] fsys.delete(路径, FOF选项, 进度标题, 父窗口句柄) 
- [ ] fsys.deleteEx 
- [ ] fsys.deleteEx(路径, FOF选项, 进度标题, 父窗口句柄) 
- [ ] fsys.enum(目录路径, 通配符, , 目录回调函数) 
- [ ] fsys.enum(目录路径, 通配符, 回调函数, 是否处理子目录) 
- [ ] fsys.enum(目录路径, 通配符, 回调函数, 目录筛选函数) 
- [ ] fsys.formatSize 
- [ ] fsys.formatSize(字节长度) 
- [ ] fsys.formatSize(字节长度低位, 字节长度高位) 
- [ ] fsys.fromFileTime 
- [ ] fsys.fromFileTime(FILETIME结构体) 
- [ ] fsys.getCurDir() 
- [ ] fsys.getDrive() 
- [ ] fsys.getExtensionName(路径) 
- [ ] fsys.getFileName(文件路径) 
- [ ] fsys.getParentDir(路径) 
- [ ] fsys.getSpecial(_CSIDL__) 
- [ ] fsys.getSpecialDefault(_CSIDL__) 
- [x] fsys.getSysDir() 
- [ ] fsys.getTempDir() 
- [x] fsys.getWinDir() 
- [ ] fsys.gmatch(文件路径, 查找串) 
- [ ] fsys.idListFromPath(路径) 
- [ ] fsys.isDir(路径) 
- [ ] fsys.isHidden(文件路径) 
- [ ] fsys.isReadonly(文件路径) 
- [ ] fsys.isSystem(文件路径) 
- [ ] fsys.joinpath(根目录, 不定个数子路径) 
- [ ] fsys.list(目录路径, 模式匹配, 通配符) 
- [ ] fsys.longpath(路径) 
- [ ] fsys.move 
- [ ] fsys.move(源路径, 目标路径, FOF选项, 进度标题, 父窗口句柄) 
- [ ] fsys.opError -- // 跳过
- [ ] fsys.opFlags -- // 跳过
- [ ] fsys.pathFromIdList(PIDL名称ID, 是否释放PIDL) 
- [ ] fsys.rename 
- [ ] fsys.rename(源路径, 目标路径, FOF选项) 
- [ ] fsys.replace(文件路径, 查找串, 替换串, 替换次数) 
- [x] fsys.searchFile 
- [x] fsys.searchFile(文件名) 
- [x] fsys.searchFile(文件名, 目录, ...) 
- [x] fsys.searchFile(文件名, 目录, true) 
- [ ] fsys.setAttributes(文件路径, 文件属性) 
- [ ] fsys.setCurDir(目录) 
- [ ] fsys.shortpath(路径) 
- [ ] _CSIDL_COMMON_FAVORITES -- // 跳过
- [ ] _CSIDL_COOKIES -- // 跳过
- [ ] _CSIDL_HISTORY -- // 跳过
- [ ] _CSIDL_INTERNET_CACHE -- // 跳过
- [ ] _CSIDL_TEMPLATES -- // 跳过
- [ ] findDataObject.cAlternateFileName -- // 跳过
- [ ] findDataObject.cFileName -- // 跳过
- [ ] findDataObject.dwFileAttributes -- // 跳过
- [ ] findDataObject.ftCreationTime -- // 跳过
- [ ] findDataObject.ftLastAccessTime -- // 跳过
- [ ] findDataObject.ftLastWriteTime -- // 跳过
- [ ] findDataObject.nFileSizeHigh -- // 跳过
- [ ] findDataObject.nFileSizeLow -- // 跳过

### fsys.path

- [x] fsys.path.addBackslash(路径) 
- [x] fsys.path.canonicalize(路径, 是否处理短路径) 
- [ ] fsys.path.cmp(路径, 比较路径) 
- [ ] fsys.path.commonPrefix(路径, 路径2) 
- [ ] fsys.path.compact(文件路径, 显示像素宽度) 
- [ ] fsys.path.eofBackslash(文件路径) 
- [ ] fsys.path.full(path) 
- [ ] fsys.path.full(path, root) 
- [ ] fsys.path.isDir(路径) 
- [ ] fsys.path.ischild(目录, 路径) 
- [ ] fsys.path.long(路径) 
- [ ] fsys.path.relative(路径, 目录, 返回路径是否以斜杠开始) 
- [ ] fsys.path.relativeTo(参考路径, 目标路径, 参考路径属性, 目标路径属性) 
- [ ] fsys.path.removeBackslash(路径) 
- [ ] fsys.path.replaceDir(路径, 根目录, 新的根目录) 
- [ ] fsys.path.replaceFile(路径, 新文件名) 
- [ ] fsys.path.short(路径) 
- [ ] fsys.path.validName(路径) 

