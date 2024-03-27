# fsys.remove

用于移除参数@1指定路径的目录或文件，
支持 fsys.delete 函数无法删除的畸形路径,
此函数库不在 fsys 库内需要单独导入

## fsys.remove(路径或文件)

用于移除参数@1指定路径的目录或文件，
支持 fsys.delete 函数无法删除的畸形路径,
此函数库不在 fsys 库内需要单独导入

```js
path = 'C:\\sys-shim-test'
await native.fsys.createDir(path)

// 写入文件夹，文件
path2 = `C:\\sys-shim-test\\test2`
await native.fsys.createDir(path2)

filepath = `C:\\sys-shim-test\\${Date.now()}.md`
await native.string.save(filepath, `hello`)

// 移除目录
;[, res] = await native.fsys.remove(path2)
console.log({res})
// {res: true}

// 移除文件
;[, res] =  await await native.fsys.remove(filepath)
console.log({res})
// {res: true}
```
