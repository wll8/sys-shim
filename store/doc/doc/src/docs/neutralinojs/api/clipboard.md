---
title: Neutralino.clipboard
---

`Neutralino.clipboard` 命名空间提供了访问系统剪贴板的功能。

## clipboard.writeText(text)
将文本写入系统剪贴板。

### Parameters

- `text` String: 要存储到系统剪贴板的文本。

```js
await Neutralino.clipboard.writeText('Test value');
```

## clipboard.readText()
读取并返回系统剪贴板中的文本。

### Return String (awaited):
从系统剪贴板中存储的文本。


```js
let clipboardText = await Neutralino.clipboard.readText();
console.log(`Text: ${clipboardText}`);
```
