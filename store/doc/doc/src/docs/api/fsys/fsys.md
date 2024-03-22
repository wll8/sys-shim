# fsys

下面的演示代码创建文件统一在 `C:/sys-shim-test/` 文件夹下，我们先创建它。

``` js
await native.fsys.createDir(`C:/sys-shim-test/`)
```

## fsys.attrib

添加，移除，获取文件属性

### fsys.attrib(文件路径, undefined, 文件属性)

添加文件属性
参数一为文件路径
参数三 可以用 | 操作符连接多个属性
成功返回新属性,失败返回null

文档属性文档：[https://learn.microsoft.com/zh-cn/windows/win32/fileio/file-attribute-constants](https://learn.microsoft.com/zh-cn/windows/win32/fileio/file-attribute-constants)

```js
path = `C:/sys-shim-test/${Date.now()}.txt`
await native.string.save(path, `hello`)

;[, res1] = await native.fsys.isHidden(path)

// 为文件添加隐藏属性
await native.fsys.attrib(path, undefined, 0x2)
;[, res2] = await native.fsys.isHidden(path)

console.log({res1, res2})

// {res1: 0, res2: 2}
```

### fsys.attrib(文件路径, 文件属性)

移除件属性
参数一为文件路径
参数二可以用 | 操作符连接多个属性
成功返回新属性,失败返回null

文档属性文档：[https://learn.microsoft.com/zh-cn/windows/win32/fileio/file-attribute-constants](https://learn.microsoft.com/zh-cn/windows/win32/fileio/file-attribute-constants)

```js
path = `C:/sys-shim-test/${Date.now()}.txt`
await native.string.save(path, `hello`)

;[, res1] = await native.fsys.isHidden(path)

// 为文件添加隐藏属性
await native.fsys.attrib(path, undefined, 0x2)
;[, res2] = await native.fsys.isHidden(path)

console.log({res1, res2})

// {res1: 0, res2: 2, res3: 0}

// 为文件移除文件属性
await native.fsys.attrib(path, 0x2)
;[, res3] = await native.fsys.isHidden(path)

console.log({res1, res2, res3})
// {res1: 0, res2: 2, res3: 0}
```

### fsys.attrib(文件路径)

返回文件属性,
以_FILE_ATTRIBUTE_前缀的常量标志各属性
注意:WIN10 新版存在设为隐藏文件后变只读的问题
参数为空字符串、null、不存在的路径都会 返回 -1

文档属性文档：[https://learn.microsoft.com/zh-cn/windows/win32/fileio/file-attribute-constants](https://learn.microsoft.com/zh-cn/windows/win32/fileio/file-attribute-constants)

```js
path = `C:/sys-shim-test/${Date.now()}.txt`
await native.string.save(path, `hello`)

// 为文件添加隐藏属性
await native.fsys.attrib(path, undefined, 0x2)
// 获取文件属性
;[, res1] = await native.fsys.attrib(path)
console.log({res1})
// {res1: 34}
```

## fsys.copy

复制文件或目录,
此函数失败返回 false 时可用 fsys.opError 获取错误代码 

注意：包含不可见字符的错误路径可用「工具>文本文件>十六进制编辑器」
或 string.hex 函数查看

### fsys.copy(源路径, 目标路径)

复制文件或目录,
源路径参数可以是多个路径组成的数组,其他参数可选。
如果目标路径已存在或源路径含通配符则复制到目标目录下面,
否则复制文件或目录到参数@2指定的目标路径。 

如果目标路径的父目录可能不存在，请先用 io.createDir 创建该目录

```js
path = `C:/sys-shim-test/test/`
filename = `${Date.now()}.txt`
filepath = path + filename

await native.fsys.createDir(path)
await native.string.save(filepath, `hello`)

await native.fsys.copy(filepath, `${filepath}.copy.txt`)
;[, res1] = await native.string.load(`${filepath}.copy.txt`)

console.log({res1})

// {res1: 'hello'}
```

## fsys.createDir(目录路径) 

创建目录并返回创建成功的完整文件路径
可创建多层目录, 参数二可选 

```js
path = `C:/sys-shim-test/${Date.now()}`

;[, res1] = await native.fsys.isDir(path)
await native.fsys.createDir(path)
;[, res2] = await native.fsys.isDir(path)

console.log({res1, res2})

// {res1: false, res2: 16}
```

## fsys.createParentDir(路径)

创建指定路径的父目录.

```js
path = `C:/sys-shim-test/${Date.now()}/test`

;[, res1] = await native.fsys.createParentDir(path)

console.log({res1})

// {res1: 'C:\\sys-shim-code\\tmp\\1710905499024\\'}
```

## fsys.delete

删除文件或目录,成功返回 true

### fsys.delete(路径)

删除文件或目录,成功返回 true,
删除含畸形路径的目录请改用 fsys.remove 函数。
此函数失败返回 false 时可用 fsys.opError 获取错误代码

```js
path = `C:/sys-shim-test/test/${Date.now()}.txt`
await native.fsys.createParentDir(path)
await native.string.save(path, `hello`)
;[, res1] = await native.string.load(path)

await native.fsys.delete(path)

;[, res2] = await native.string.load(path)

console.log({res1, res2})

// {res1: 'hello', res2: undefined}
```

## fsys.deleteEx

删除文件或目录,成功返回true,
此函数失败返回 false 时可用 fsys.opError 获取错误代码

## fsys.deleteEx(路径)

删除文件,成功返回true,
路径参数只能是字符串,其他参数可选
如果删除失败,则在下次系统重启时删除文件,
重启删除目录之前必须先清空目录,
重启删除文件的顺序与调用时的顺序相同

```js
path = `C:/sys-shim-test/test/${Date.now()}.txt`
await native.fsys.createParentDir(path)
await native.string.save(path, `hello`)

;[, res1] = await native.string.load(path)

await native.fsys.deleteEx(path)
;[, res2] = await native.string.load(path)

console.log({res1, res2})

// {res1: 'hello', res2: undefined}
```

## fsys.formatSize

转换字节长度到适合的最大单位表示的文本,
单位使用 bytes,KB,MB,GB等

### fsys.formatSize()

该函数参数支持math.size64支持的所有参数类型

```js
await native.fsys.formatSize()
/**
 * 返回
 [false, '0 字节']
 */

```

### fsys.formatSize(字节长度)

转换字节长度到适合的最大单位表示的文本,
单位使用 bytes,KB,MB,GB等

```js
await native.fsys.formatSize(100)
/**
 * 返回
[false, '100 字节']
 */
```

### fsys.formatSize(字节长度低位, 字节长度高位)

转换字节长度到适合的最大单位( bytes,KB,MB,GB等 )
低位用于表示4GB以下的长度,高位以4GB为最小单位表示长度

```js
await native.fsys.formatSize(100, 2)
/**
 * 返回
[false, '8.00 GB']
 */
```

## fsys.getCurDir()

获取当前目录。 

当前目录易被改动，导致相对路径（例如 "./res/"）位置变化。
路径首字符用单个斜杠或反斜杆表示「应用程序根目录」的写法更可靠，
例如：（例如 "/res/"）。
很多组件（例如文件对话框）都可能会悄悄改变当前目录

```js
await native.fsys.getCurDir()
/**
 * 返回
[false, 'F:\\company-code\\sys-shim-core\\']
 */
```
## fsys.getDrive()

返回应用程序所在分区,以冒号结束

```js
await native.fsys.getDrive()
/**
 * 返回
[false, 'F:']
 */
```

## fsys.getExtensionName(路径)

返回文件后缀名,转换为小写.
无后缀名则返回null空值

```js
await native.fsys.getExtensionName("C:/sys-shim-test/test3-1.txt")
/**
 * 返回
[false, 'txt`']
 */
```

## fsys.getFileName(文件路径)

返回路径的所指向的文件名(或目录名称)
```js
path = "C:/sys-shim-test/"
filepath = path + 'test3.txt'
await native.fsys.getFileName(filepath)
/**
 * 返回
[false, 'test3.txt']
 */
await native.fsys.getFileName(path)
/**
 * 返回
[false, 'sys-shim-test']
 */
```

## fsys.getParentDir(路径)

返回指定路径的父目录

```js
path = "C:/sys-shim-test/test3/"
filepath = `${path}test3-1.txt`
await native.fsys.getParentDir(filepath)
/**
 * 返回
[false, 'C:/sys-shim-test/test3/']
 */
await native.fsys.getParentDir(path)
/**
 * 返回
[false, 'C:/sys-shim-test/']
 */
```

## fsys.getTempDir()

返回临时目录,
注意拼接目录与子路径应当使用 io.joinpath 函数
获取临时文件路径应当改用 io.tmpname 函数

```js
await native.fsys.getTempDir()
/**
 * 返回
[false, 'C:\\Users\\WINDYE~1\\AppData\\Local\\Temp']
 */
```

## ~~fsys.idListFromPath(路径)~~

路径转换为名称ID(PIDL)\路径必须存在

## fsys.isDir(路径)

路径是否目录
调用attrib检查目标路径是否具有_FILE_ATTRIBUTE_DIRECTORY属性
参数为空字符串或 null 返回 false 

包含不可见字符的错误路径可用「工具>文本文件>十六进制编辑器」
或 string.hex 函数查看

```js
path = "C:/sys-shim-test/"
filepath = `${path}test3-1.txt`
await native.fsys.isDir(path)
/**
 * 返回
[false, 16]
 */
await native.fsys.isDir(filepath)
/**
 * 返回
[false, false]
 */
```

## fsys.isHidden(文件路径)

是否隐藏文件
调用attrib检查文件是否具有_FILE_ATTRIBUTE_HIDDEN属性
注意:WIN10 新版存在设为隐藏文件后变只读的问题

```js
path = `C:/sys-shim-test/${Date.now()}.txt`
await native.createParentDir(path)
await native.string.save(path, `hello`)

;[, res1] = await native.fsys.isHidden(path)

// 为文件添加隐藏属性
await native.fsys.attrib(path, undefined, 0x2)
;[, res2] = await native.fsys.isHidden(path)

console.log({res1, res2})

// {res1: 0, res2: 2}

// 没有创建的文件
newpath = `C:/sys-shim-test/${Date.now()}.txt`
await native.fsys.isHidden(newpath)
/**
 * 返回
[false, false]
 */
```

## fsys.isReadonly(文件路径)

文件是否只读
调用attrib检查文件是否具有_FILE_ATTRIBUTE_READONLY属性

```js
path = "C:/sys-shim-test/test3/test3-1.txt"
await native.fsys.createDir(path)

// 判断可读文件
;[, res1] = await native.fsys.isReadonly(path)
// 设置为只读文件
await native.fsys.attrib(path, undefined, 0x1)
// 判断只读文件
;[, res2] = await native.fsys.isReadonly(path)
console.log({res1, res2})
// {res1: 0, res2: 1}
```

## fsys.isSystem(文件路径)

是否系统文件
调用attrib检查文件是否具有_FILE_ATTRIBUTE_SYSTEM属性

```js
path = "C:/sys-shim-test/test3/test3-2.txt"
await native.fsys.createDir(path)

// 判断非系统系统文件
;[, res1] = await native.fsys.isSystem(path)

// 设置为系统文件
await native.fsys.attrib(path, undefined, 0x4)
;[, res2] = await native.fsys.isSystem(path)
console.log({res1, res2})
// {res1: 0, res2: 4}
```

## fsys.joinpath(根目录, 不定个数子路径)

注意根目录不可以圆点字符开始
可追加任意个子路径参数,如果子路径是绝对路径则返回子路径
拼接时可以使用空参数,但不可全部参数为空

```js
await native.fsys.joinpath("C:/", "/test", "/test1-1")
/**
 * 返回
[false, 'C:\\test\\test1-1']
 */
```

## fsys.list(目录路径, 模式匹配, 通配符)

搜索当前目录下的文件，不搜索子目录下的文件,
返回符合条件的文件名数组,子目录数组，以及全部子目录数组。
注意有三个返回值,数组中使用文件名为键存放对应完整路径的值。
除参数@1以外其他参数可选，
参数@2使用模式匹配语法匹配文件名，模式匹配会成为第三个返回值的匹配条件,
通配符默认值是"*.*",也可以传入包含多个通配符的数组,通配符对第三个返回值无效

参数2：模式匹配使用正则表达式语法匹配

```js
path = `C:/sys-shim-test/test3/`
filenames = [
  "test3-1.txt",
  "test3-2.txt",
  "test3-4.txt",
  "test3-5.txt"
]
for (let filename of filenames){
  await native.fsys.createDir(path)
  await native.string.save(path+filename, `hello`) 
}
;[, ...args] = await native.fsys.list(path, `*?`, '*.txt')
console.log(args)
/**
 * 返回
[
  // 文件名数组
  [
    "test3-1.txt",
    "test3-2.txt",
    "test3-4.txt",
    "test3-5.txt"
  ], 
  [], // 子目录数组
  []  // 全部子目录数组
]
 */
```

## fsys.longpath(路径)

转换为完整路径,并将短文件名转换为长文件名

```js

await native.fsys.longpath("C:/SYS-SH~1/")
/**
 * 返回
[false, 'C:\\sys-shim-test\\']
 */
await native.fsys.longpath("test.txt")
/**
 * 返回
[false, 'D:\\git2\\sys-shim-doc\\test.txt']
 */
```

## fsys.move

移动文件或目录。
此函数失败返回 false 时可用 fsys.opError 获取错误代码

### fsys.move(源路径, 目标路径)

移动文件或目录,
源路径参数可以是多个路径组成的数组,其他参数可选。
如果目标路径已存在或源路径含通配符则移动到目标目录下面,
否则复制文件或目录到参数@2指定的目标路径。 

如果目标路径的父目录可能不存在，请先用 io.createDir 创建该目录 

```js
path = "C:/sys-shim-test/test-move1/"
path2 = "C:/sys-shim-test/test-move2/"
filename = "test-move1-1.txt"
filepath = path + filename
filepath2 = path2 + filename
// 创建目录
await native.fsys.createDir(path)
await native.fsys.createDir(path2)

// 写入文件
await native.string.save(filepath, "hello")
// 开始文件不存在
;[, res1] = await native.string.load(filepath2) 
// 移动文件
await native.fsys.move(filepath, path2)
/**
 * 返回
 [false, true]
 */
// 移动后文件存在了
;[,res2] = await native.string.load(filepath2) 
console.log({res1, res2})
// {res1: undefined, res2: 'hello'}
```

## fsys.rename

重命名文件或目录,
此函数失败返回 false 时可用 fsys.opError 获取错误代码

### fsys.rename(源路径, 目标路径, FOF选项)

重命名文件或目录,其他参数可选 
FOF选项为 0 或 不指定该选项但 fsys.opFlags 为 0
则显示操作界面与错误信息

```js
path = "C:/sys-shim-test/test-rename/"
filename = path + 'test-rename1.txt'
refilename = path + 'test-rename2.txt'
await native.fsys.createDir(path)
await native.string.save(filename, "hello")

// 表示需要重命名文件不存在
;[,res1] = await native.string.load(refilename)
// 重命名文件
await native.fsys.rename(filename, refilename)
/**
 * 返回
 [false, true]
 */
// 文件已经被重命名不存在
;[,res2] = await native.string.load(filename)
// 加载已经重命名文件
;[,res3] = await native.string.load(refilename)
console.log({res1, res2, res3})
// {res1: undefined, res2: undefined, res3: 'hello'}
```
## fsys.replace(文件路径, 查找串, 替换串, 替换次数)

替换文件内容,
查找串支持模式匹配,\支持所有string.replace函数支持的替换串格式,
不指定替换次数则替换所有匹配串 

成功返回替换次数，否则返回 null

```js
path = 'C:/sys-shim-test/test-replace/test-replace1.txt'
await native.fsys.createParentDir(path)
await native.string.save(path, "replace\nreplace\nreplace")
;[,res1] = await native.string.load(path)
await native.fsys.replace(path, "replace", "rp")
/**
 * 返回
 [false, 3]
 */
;[,res2] = await native.string.load(path)
console.log({res1, res2})
// {res1: 'replace\nreplace\nreplace', res2: 'rp\nrp\nrp'}
```

* 替换并设置替换次数

```js
path = "C:/sys-shim-test/test-replace/test-replace2.txt"
await native.fsys.createParentDir(path)
await native.string.save(path, "replace\nreplace\nreplace\nreplace")
;[,res1] = await native.string.load(path)
await native.fsys.replace(path, "replace", "rp", 3)
/**
 * 返回
 [false, 3]
 */
;[,res2] = await native.string.load(path)
console.log({res1, res2})
// {res1: 'replace\nreplace\nreplace\nreplace', res2: 'rp\nrp\nrp\nreplace'}
```

## fsys.setCurDir(目录)

设置当前目录。 

当前目录易被改动，导致相对路径（例如 "./res/"）位置变化。
路径首字符用单个斜杠或反斜杆表示「应用程序根目录」的写法更可靠，
例如：（例如 "/res/"）。
很多组件（例如文件对话框）都可能会悄悄改变当前目录

```js
;[, res1] = await native.fsys.getCurDir()
await native.fsys.setCurDir("../")
;[, res2] = await native.fsys.getCurDir()

console.log({res1, res2})

// {res1: 'D:\\git2\\sys-shim-doc\\', res2: 'D:\\git2\\'
```

## fsys.shortpath(路径)

转换为短路径,
如果文件不存在,返回空值,
短文件名指向会因实际文件数变更,所以不能把短路径存入数据库 

存在特定文件目录无法获取短路径且返回包含空格的长路径的可能性
如无必要，不建议使用或依赖此函数，正确使用 process 等可以自动 
转义路径参数中的空格

```js
// 创建路径
path = 'C:/sys-shim-test/program files/'

await native.fsys.createDir(path)
await native.fsys.shortpath(path)
/**
 * 返回
[false, 'C:\\SYS-SH~1\\PROGRA~1\\']
 */
```

## fsys.getSysDir()

返回系统目录  
可选在参数中指定子路径并返回完整路径  

```js
await native.fsys.getSysDir()
/**
 * 返回
[false, 'C:\\WINDOWS\\SysWOW64']
 */
```

## fsys.getWinDir()

返回windows目录  
可选在参数中指定子路径并返回完整路径  

```js
await native.fsys.getWinDir()
/**
 * 返回
[false, 'C:\\WINDOWS']
 */
```

## fsys.searchFile 

查找文件

### fsys.searchFile(文件名) 

检查程序根目录、当前工作目录、系统目录  
是否包含指定文件，找到则返回文件完整路径。  
不搜寻子目录


```js
await native.fsys.searchFile(`explorer.exe`)
/**
 * 返回
[false, 'C:\\WINDOWS\\SysWOW64\\explorer.exe']
 */
```


### fsys.searchFile(文件名, 目录, ...) 

检查一个或多个目录下是否包含指定文件  
如果存在返回完整路径,否则返回 null。  
不搜寻子目录

``` js
await native.fsys.searchFile(`desktop.ini`, `C:/Program Files`, `C:/Program Files (x86)`)
/**
 * 返回
[false, 'C:\\Program Files\\desktop.ini']
 */
```

### fsys.searchFile(文件名, 目录, true) 

在指定目录以及其子目录下搜寻指定文件，  
如果存在返回完整路径,否则返回 null。   

内部调用 fsys.enum 查找，参数 @1 支持 "*","?" 等通配符  

``` js
await native.fsys.createDir(`C:/sys-shim-test/a`)
await native.fsys.createDir(`C:/sys-shim-test/b`)
await native.string.save(`C:/sys-shim-test/a/file.txt`, "hello")

await native.fsys.searchFile(`*.txt`, `C:/sys-shim-test`, true)
/**
 * 返回
[false, 'C:\\sys-shim-test\\a\\file.txt']
 */
```
