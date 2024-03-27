# fsys.dlg

系统文件对话框。 

请注意：文件对话框会改变当前目录，导致相对路径（例如 "./res/"）位置变化。

路径首字符用单个斜杠或反斜杆表示「应用程序根目录」的写法更可靠，
例如：（例如 "/res/"）。 

可以使用 fsys.setCurDir 函数设置当前目录，
很多组件（例如文件对话框）都可能会悄悄改变当前目录。
而「应用程序根目录」则是固定不变的

## fsys.dlg.open

打开选择单文件对话框

###  fsys.dlg.open(指定文件类型, 对话框标题, 默认目录, 父窗口, 选项参数, 默认文件名)

打开选择单文件对话框，所有参可选。
 文件类型以竖线分隔,并以坚线分隔类型说明与后缀名,例如
"所有文件|*.*|文本文件|*.txt;*.md|" 

一个类型说明匹配多个后缀名应以分号分隔

如果选择文件返回文件路径，否则返回空

```js
// 默认打开
;[, res1] = await native.fsys.dlg.open()
console.log({res1})
// {res1: 'F:\\company-code\\sys-shim-doc\\README.md'}

// 指定单个文件类型打开
;[, res] =  await native.fsys.dlg.open("*.md|*.md")
console.log({res})
// {res: 'F:\\company-code\\sys-shim-doc\\README.md'}

// 指定多个文件类型打开
;[, res] =  await native.fsys.dlg.open("*.md|*.md;*.js|*.js")
console.log({res})
// {res: 'F:\\company-code\\sys-shim-doc\\run.js'}

// 指定对话框标题
;[, res] =  await native.fsys.dlg.open("*.md|*.md;", "选择md文件")
console.log({res})
// {res: 'F:\\company-code\\sys-shim-doc\\README.md'}

/**
 * 指定默认目录
 */ 
// 创建目录
path = "C:/sys-shim-test/"
await native.fsys.createDir(path)
filepath = `C:/sys-shim-test/${Date.now()}.md`
await native.string.save(filepath, `hello`)
;[, res] =  await native.fsys.dlg.open("*.md|*.md;","选择md文件", path)
console.log({res})
// {res: 'C:\\sys-shim-test\\1711089428189.md'}
```

## fsys.dlg.openDir

打开选择目录对话框，
建议改用 fsys.dlg.dir

### fsys.dlg.openDir()

打开选择目录对话框，
建议改用 fsys.dlg.dir

```js
// 默认打开
;[, res] = await native.fsys.dlg.openDir()
console.log({res})
// {res: 'C:\\sys-shim-test'}
```


### fsys.dlg.openDir(目录, 父窗口, 标题, 窗口标题)

打开选择目录对话框,
所有参数都是可选参数,支持unicode字符串

```js
path = 'C:\\sys-shim-test'
await native.fsys.createDir(path)
// 选择目录, 设置标题
;[, res] = await native.fsys.dlg.openDir(path,,"打开标题")
console.log({res})
// {res: 'C:\\sys-shim-test'}
```

##  fsys.dlg.openEx

打开选择多文件对话框

### fsys.dlg.openEx(指定文件类型, 对话框标题, 默认目录, 父窗口, 选项参数, 缓冲区大小)

打开选择多文件对话框，所有参数可选。
 文件类型以竖线分隔,并以坚线分隔类型说明与后缀名,例如
"所有文件|*.*|文本文件|*.txt;*.md|" 

一个类型说明匹配多个后缀名应以分号分隔，
第一个返回值为一个数组,包含一个或多个被选定的文件路径
多选则会返回第二个数组值,包含被选目录路径以及多个文件名

```js
path = 'C:\\sys-shim-test'
await native.fsys.createDir(path)

// 写入文件
filepath = `C:/sys-shim-test/${Date.now()}.md`
filepath2 = `C:/sys-shim-test/${Date.now()}.js`

await native.string.save(filepath, `hello`)
await native.string.save(filepath2, `const msg = 'hello'; console.log(msg)`)

// 选择目录
;[, res] = await native.fsys.dlg.openEx()
console.log({res})
// {res: ['C:\\sys-shim-test\\1711089428189.md']}

// 指定多个文件类型打开
;[, res] =  await native.fsys.dlg.openEx("*.md|*.md;*.js|*.js", "选择文件", path)
console.log({res})
// {res: ['C:\\sys-shim-test\\1711089428189.md', 'C:\\sys-shim-test\\1711416380382.js']}
```

## fsys.dlg.save

显示保存文件对话框框
覆盖已存在的文件时不显示确认对话框。

### fsys.dlg.save()

显示保存文件对话框框
覆盖已存在的文件时不显示确认对话框。

```js
path = 'C:\\sys-shim-test'
await native.fsys.createDir(path)
// 写入文件
filepath = `C:/sys-shim-test/${Date.now()}.js`
await native.string.save(filepath, `const msg = 'hello'; console.log(msg)`)
// 选择目录
;[, res] = await native.fsys.dlg.save()
console.log({res})
// {res: 'C:\\sys-shim-test\\1711416380382.js'}
```

### fsys.dlg.save(指定文件类型, 对话框标题, 默认目录, 父窗口, 选项参数, 默认文件名)

显示保存文件对话框框,所有参数为可选参数
 文件类型以竖线分隔,并以坚线分隔类型说明与后缀名,例如
"所有文件|*.*|文本文件|*.txt;*.md|" 

一个类型说明匹配多个后缀名应以分号分隔

```js
path = 'C:\\sys-shim-test'
await native.fsys.createDir(path)

// 写入文件
filepath = `C:/sys-shim-test/${Date.now()}.md`

await native.string.save(filepath, `hello`)

// 指定多个文件类型打开
;[, res] =  await native.fsys.dlg.save("*.md|*.md;*.js|*.js", "选择文件", path)
console.log({res})
// {res: 'C:\\sys-shim-test\\1711089428189.md'}
```

## fsys.dlg.saveOp

显示保存文件对话框框,
覆盖已存在的文件时显示确认对话框（overwrite prompt）

### fsys.dlg.saveOp(指定文件类型, 对话框标题, 默认目录, 父窗口, 默认文件名)

显示保存文件对话框框,
覆盖已存在的文件时显示确认对话框。 

所有参数为可选参数
 文件类型以竖线分隔,并以坚线分隔类型说明与后缀名,例如
"所有文件|*.*|文本文件|*.txt;*.md|" 

一个类型说明匹配多个后缀名应以分号分隔

```js
path = 'C:\\sys-shim-test'
await native.fsys.createDir(path)

// 写入文件
filepath = `C:/sys-shim-test/${Date.now()}.md`
filepath2 = `C:/sys-shim-test/${Date.now()}.js`

await native.string.save(filepath, `hello`)
await native.string.save(filepath2, `const msg = 'hello'; console.log(msg)`)

// 选择目录
;[, res] = await native.fsys.dlg.saveOp()
console.log({res})
// {res: 'C:\\sys-shim-test\\1711089428189.md'}

// 指定多个文件类型打开
;[, res] =  await native.fsys.dlg.saveOp("*.md|*.md;*.js|*.js", "选择文件", path)
console.log({res})
// {res: 'C:\\sys-shim-test\\1711416380382.js'}
```


