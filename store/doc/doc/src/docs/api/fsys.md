
## fsys.getSysDir()

返回系统目录  
可选在参数中指定子路径并返回完整路径  

## fsys.getWinDir()

返回windows目录  
可选在参数中指定子路径并返回完整路径  

## fsys.searchFile 

查找文件

### fsys.searchFile(文件名) 

检查程序根目录、当前工作目录、系统目录  
是否包含指定文件，找到则返回文件完整路径。  
不搜寻子目录

### fsys.searchFile(文件名, 目录, ...) 

检查一个或多个目录下是否包含指定文件  
如果存在返回完整路径,否则返回 null。  
不搜寻子目录

``` js
await main.native.fsys.searchFile(`desktop.ini`, `C:/Program Files`, `C:/Program Files (x86)`)
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
await main.native.fsys.searchFile(`*.txt`, `C:`, true)
/**
 * 返回
[false, 'C:\\$WINDOWS.~BT\\Sources\\appraisersdblatestoshash.txt']
 */
```

## fsys.path

提供文件路径相关函数,
在导入fsys支持库时将自动导入fsys.path

### fsys.path.addBackslash(路径) 

首先替换所有正斜杠为反斜杠  
如果目录最后面没有反斜杠,则追加反斜杠,  
这个函数实际是调用 io.joinpath(path,"/")  

``` js
await main.native.fsys.path.addBackslash(`c:/`)

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
await main.native.fsys.path.canonicalize(`C:/a/b/./c/../`)

/**
 * 返回
[false, 'C:\\a\\b']
 */
```
