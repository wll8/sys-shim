# fsys.dlg.dir

打开新版目录对话框,
XP 系统自动降级为 fsys.dlg.openDir

## fsys.dlg.dir

打开新版目录对话框,
XP 系统自动降级为 fsys.dlg.openDir

### fsys.dlg.dir(path,hwndOwner,title,okLabel,clientGuid,multiSel)

打开目录对话框,所有参数可省略,
参数@path 指定打开的目录,
参数@hwndOwner 指定父窗口,
参数@title 指定窗口标题
参数@okLabel 指定确定按钮上的文本,
参数@clientGuid 指定单独存储对话框状态的GUID,
参数@multiSel 如果为true，则允许选择多目录并返回数组,
默认仅能选择单个目录并返回选中的路径,
取消返回null

```js
path = 'C:\\sys-shim-test'
await native.fsys.createDir(path)

// 写入文件夹
path2 = `C:/sys-shim-test/test1`
await native.fsys.createDir(path2)

// 选择目录
;[, res] = await native.fsys.dlg.dir()
console.log({res})
// {res: 'C:\\sys-shim-test'}

// 指定多个文件类型打开
;[, res] =  await native.fsys.dlg.dir(path)
console.log({res})
// {res: 'C:\\sys-shim-test\\test1'}
```

