# fsys.lnk

快捷方式 

## fsys.lnk.getMsiTarget(lnk文件路径) 

获取MSI创建的 Advertised 快捷方式指向的实际目标路径

```js
// 得到桌面路径
path = "F:/桌面/aardio.lnk"
// 默认打开
;[, res] = await native.fsys.lnk.getMsiTarget(path)
console.log({res})
// {res: undefined}
```

## fsys.lnk.getTarget(lnk文件路径) 

获取快捷方式指向的目标路径,
支持Advertised Shortcut

```js
// 得到桌面路径快捷方式
path = "F:/桌面/aardio.lnk"
// 默认打开
;[, res] = await native.fsys.lnk.getTarget(path)
console.log({res})
// {res: 'F:\\company-code\\files\\aardio\\aardio.exe'}
```

## fsys.lnk.search

查找文件或快捷方式。
成功返回启动路径与参数

### fsys.lnk.search(目标文件名或参数, 快捷方式标题)

全部参数可选,至少输入一个参数
参数@1也可以是指定多个文件名的数组,
搜索快捷方式的文件名与标题支持模式匹配或忽略大小写的文本比，
直接搜索文件则必须精确匹配文件名。 

按下列顺序搜索文件:
如果未指定标题则先调用 fsys.searchFile 在 EXE 目录及系统目录搜索，
接着搜索桌面快捷方式、应用程序快捷方式

```js
// 通过目录文件名或参数
;[, res] = await native.fsys.lnk.search('edge')
console.log({res})
// {res: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'}

// 通过快捷方式查询
;[, res] = await native.fsys.lnk.search('', 'edge')
console.log({res})
// {res: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'}
```
 
## fsys.lnk.searchInDesktop

 在桌面查找文件或快捷方式。
 成功返回启动路径与参数

### fsys.lnk.searchInDesktop(目标文件名或参数, 快捷方式标题)

全部参数可选,至少输入一个参数
参数@1也可以是指定多个文件名的数组。
搜索快捷方式的文件名与标题支持模式匹配或忽略大小写的文本比较，
直接搜索文件则必须精确匹配文件名

```js
// 默认打开
;[, res] = await native.fsys.lnk.searchInDesktop('edge')
console.log({res})
// {res: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'}

;[, res] = await native.fsys.lnk.searchInDesktop('', "edge")
console.log({res})
// {res: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'}
```
## fsys.lnk.searchLnk

在桌面搜索快捷方式并返回路径

### fsys.lnk.searchLnk(文件名或参数, 快捷方式标题, 0)

在桌面搜索快捷方式并返回路径
参数@3可省略。
成功返回启动路径与参数

```js
// 默认打开
;[, res] = await native.fsys.lnk.searchLnk("code.exe",'Visual Studio Code', 0)
console.log({res})
// {res: 'C:\\Users\\windyeasy\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe'}
```

### fsys.lnk.searchLnk(文件名或参数, 快捷方式标题, 2)

在开始菜单应用程序目录搜索快捷方式。
 成功返回启动路径与参数

```js
// 默认打开
;[, res] = await native.fsys.lnk.searchLnk("code.exe",'Visual Studio Code', 2)
console.log({res})
// {res: 'C:\\Users\\windyeasy\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe'}
```

