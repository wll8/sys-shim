# fsys.path

提供文件路径相关函数,
在导入fsys支持库时将自动导入fsys.path

### fsys.path.addBackslash(路径) 

首先替换所有正斜杠为反斜杠  
如果目录最后面没有反斜杠,则追加反斜杠,  
这个函数实际是调用 io.joinpath(path,"/")  

``` js
await native.fsys.path.addBackslash(`c:/`)

/**
 * 返回
[false, 'c:\\']
 */
```

### fsys.path.canonicalize(路径, 是否处理短路径) 

转换为完整路径,  
并对路径进行归一化处理,参数2可选(默认为true),  
扩展和适当置换路径中包含的所有".."和"."  
该函数保证除分区根目录外保证尾部不为斜杠  

``` js
await native.fsys.path.canonicalize(`C:/a/b/./c/../`)

/**
 * 返回
[false, 'C:\\a\\b']
 */
```

### fsys.path.cmp(路径, 比较路径)

比较两个路径是否指向同一位置,
任何一个参数为null时返回-1,
返回值意义与 string.cmp()函数相同,
路径相同则返回0,注意在条件表达式中为false 

更准确的检测相同或不同的路径是否指向同一真实文件,
应使用fsys.fileInfo函数

``` js
path = 'C:/sys-shim-test/test-path-cmp'
path1 = 'C:/sys-shim-test/test-path-cmp/../test-path-cmp/'
await native.fsys.createDir(path)
// 路径指向同一个
;[, res1] = await native.fsys.path.cmp(path, path1)
// 路径指向不同位置
;[, res2] = await native.fsys.path.cmp(path, `${path}/../`)

console.log({res1, res2})
// {res1: 0, res2: -1}
```

### fsys.path.commonPrefix(路径, 路径2)

返回两个文件路径的公共前缀目录
该函数失败保证返回的是一个目录比以斜杠结尾,失败返回null,
在比较以前自动对路径归一化处理,忽略大小写

``` js
;[, res1] = await native.fsys.path.commonPrefix(`C:/sys-shim-test/test`, `C:/sys-shim-test/test2`)
console.log(res1)

// C:\sys-shim-test\
```

### ~~fsys.path.compact(文件路径, 显示像素宽度)~~

截断路径来适合一定数目的像素

参考： https://learn.microsoft.com/en-us/windows/win32/api/shlwapi/nf-shlwapi-pathcompactpatha

### fsys.path.eofBackslash(文件路径)

首先替换所有正斜杠为反斜杠
检测路径尾部是否有反斜杠

```js
await native.fsys.path.eofBackslash(`C:/sys-shim-test/test/test1-1/`)
/**
 * 返回
 [false, 30]
 */
await native.fsys.path.eofBackslash(`C:/sys-shim-test/test\\test1-1`)
/**
 * 返回
 [false]
 */
await native.fsys.path.eofBackslash(`C:/sys-shim-test/test\\test1-1\\`)
/**
 * 返回
 [false, 30]
 */
```

### fsys.path.full(path)

如果路径是绝对路径则返回该路径（不作任何转换）,
否则返回null

```js
await native.fsys.path.full(`C:/sys-shim-test/test/test1-1/`)
/**
 * 返回
 [false, 'C:/sys-shim-test/test/test1-1/']
 */
await native.fsys.path.full(`./src`)
/**
 * 返回
 [false]
 */
```

### fsys.path.full(path, root)

如果path是相对路径，并且不以/、\、~等字符开始,
则返回io.joinpath(root,path)
否则转换为绝对路径返回

```js
await native.fsys.path.full(`./src`, "C:/test")
/**
 * 返回
 [false, 'C:\\test\\src']
 */
await native.fsys.path.full("F:/company-code/tmp/test/test1-1", "C:/test")
/**
 * 返回
 [false, 'F:/company-code/tmp/test/test1-1']
 */
await native.fsys.path.full("./src", "test")
/**
 * 返回
 [false, 'F:\\company-code\\sys-shim-core\\test\\src']
 */
```

### fsys.path.isDir(路径)

如果文件路径存在并且是一个目录,
或者路径路径以斜杠、反斜杠结束返回真

```js
path = "C:/sys-shim-test/test"
filenamepath = "C:/sys-shim-test/test/test1.txt"
// 添加路径
await native.fsys.createDir(path)
// 判断文件
;[, res1] = await native.fsys.path.isDir(filenamepath)
/**
 * 返回
 [false, false]
 */
;[, res2] = await native.fsys.path.isDir("C:/sys-shim-test/test/")
/**
 * 返回
 [false, true]
 */
console.log({res1, res2})
// {res1: false, res2: true}
```

### fsys.path.ischild(目录, 路径)

检测参数@2指定的路径是否在参数@1指定的目录之下

```js
await native.fsys.path.ischild("C:/sys-shim-test/", "C:/sys-shim-test/test/")
/**
 * 返回
 [false, true]
 */
await native.fsys.path.ischild("C:/sys-shim-test/", "/test/")
/**
 * 返回
 [false, false]
 */
```

### fsys.path.long(路径)

转为长路径

```js
await native.fsys.path.long("./src")
/**
 * 返回
 [false, 'F:\\company-code\\sys-shim-core\\src']
 */

path = 'C:/sys-shim-test/program files/'
await native.fsys.createDir(path)
// 获取短路径
;[,shortpath] = await native.fsys.shortpath(path)
// 将短路径转为长路径
await native.fsys.path.long(shortpath)
/**
 * 返回
 [false, 'C:\\sys-shim-test\\program files\\']
 */
```

### fsys.path.relative(路径, 目录, 返回路径是否以斜杠开始)

将路径转换为指定目录下层的相对路径,
在比较以前自动对路径归一化处理,忽略大小写
相同路径则返回空字符串,不是该目录下的路径则返回null
参数三可选,默认首字符为斜杠

```js
await native.fsys.path.relative("C:/sys-shim-test/", "C:/sys-shim-test/", true)
/**
 * 返回
 [false, '\\tmp\\']
 */
await native.fsys.path.relative("C:/sys-shim-test/", "C:/sys-shim-test/", false)
/**
 * 返回
 [false, 'tmp\\']
 */
```

### fsys.path.relativeTo(参考路径, 目标路径, 参考路径属性, 目标路径属性)

自参数@1指定的路径得到一个相对路径指向目标路径
注意相对路径不一定是子目录,如果是上层目录使用 ../ 表示
路径属性可为0,或 _FILE_ATTRIBUTE_DIRECTORY,可省略

```js
await native.fsys.path.relativeTo("C:/sys-shim-test", "C:/sys-shim-test/")
/**
 * 返回
 [false, '..\\']
 */
await native.fsys.path.relativeTo("C:/sys-shim-test", "C:/sys-shim-test/test")
/**
 * 返回
 [false, '.\\test']
 */
```

### fsys.path.removeBackslash(路径)

首先转换为完整路径,替换所有正斜杠为反斜杠
移除路径最后面的反斜杠,并返回新路径以及尾字符
如果尾字符为反斜杠并已移除,第二个返回值为空字符
如果是分区号后的反斜杠或路径只有一个反斜杠,第二个返回值为反斜杠

```js
await native.fsys.path.removeBackslash("C:/sys-shim-test/")
/**
 * 返回
 [false, 'C:/sys-shim-test']
 */
```

### fsys.path.replaceDir(路径, 根目录, 新的根目录)

将路径转换为参数2指定根目录下的相对路径
再将其转换为新的根目录下的绝对路径

```js
await native.fsys.path.replaceDir("F:/sys-shim-test", "F:/", "C:/")
/**
 * 返回
 [false, 'C:\\sys-shim-test\\tmp']
 */
```

### fsys.path.replaceFile(路径, 新文件名)

替换路径中的文件名部分

```js
await native.fsys.path.replaceFile("C:/sys-shim-test/test/test1-1.txt", "test2-1.txt")
/**
 * 返回
 [false, 'C:\\sys-shim-test\\test\\test2-1.txt']
 */
```

### fsys.path.short(路径)

转为短路径
如果文件不存在,返回空值,
短文件名指向会因实际文件数变更,所以不能把短路径存入数据库 

存在特定文件目录无法获取短路径且返回包含空格的长路径的可能性
如无必要，不建议使用或依赖此函数，正确使用 process 等可以自动
转义路径参数中的空格。

短路径与长路径的区别: [https://zhidao.baidu.com/question/458582247.html](https://zhidao.baidu.com/question/458582247.html)

```js
path = 'C:/sys-shim-test/program files/'

await native.fsys.createDir(path)
await native.fsys.path.short(path)
/**
 * 返回
 [false, 'C:\\SYS-SH~1\\tmp\\PROGRA~1\\']
 */
```

### fsys.path.validName(路径)

检测文件名是否合法,
返回修正后的合法名称
传入非字符串参数直接返回空值

```js
await native.fsys.path.validName("test.txt")
/**
 * 返回
 [false, 'test.txt']
 */
await native.fsys.path.validName("test|test1.txt")
/**
 * 返回
 [false, 'testtest1.txt']
 */
```
