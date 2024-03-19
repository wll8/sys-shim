---
sidebar: false
---

# 如何参与

## 运行

我们建议[使用 github 进行协作](https://www.zhihu.com/question/39721968/answer/801943406)。

- 点击 fock
- clone 代码到本地

### 准备环境

1. 准备 node 环境和依赖：

- [安装 node](https://nodejs.org/dist/v18.19.0/node-v18.19.0-x64.msi)
- 安装 pnpm

``` sh
npm i -g pnpm@8.12.1 --registry=https://registry.npmmirror.com
```

2. 下载 [main.exe](https://github.com/wll8/sys-shim/releases/download/example/main.exe) 到根目录。

### 安装依赖和运行项目
``` sh
# 安装根目录依赖
pnpm i

# 安装文档安依赖
cd doc
pnpm i

# 在根目录运行项目
cd ..
pnpm run dev
```

## 开发

请参考 [todo](/docs/api/overview.html#todo)。