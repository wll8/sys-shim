<h1 align="center">vue3-ts-template</h1>

一个Vue3+TS+Vite的基础项目开发模板，可以用来快速作为vue3项目搭建，减少更多的配置过程。

## 小特性

1. 集成ESlint使用[@antfu/eslint-config](https://github.com/antfu/eslint-config)可自动格式化代码文件
2. 集成了[unplugin-auto-components](https://github.com/unplugin/unplugin-vue-components)自动导入组件
3. 集成了[unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)通过配置规则自动导入模块
4. 集成了[unocss](https://github.com/unocss/unocss)一个原子化CSS引擎
5. 状态管理Pinia
6. 基于axios封装了网络请求
7. 集成scss
8. 区分了开发环境和生产环境

## 运行项目

使用node 16.0及以上的版本

### 安装依赖

```sh
pnpm install
```

### 编译重新加载开发

```sh
pnpm run dev
```
## 提交方法
由于使用了husky + commitlint对提交进行验证，需要使用如下几种方法提交

* 方法一：
```shell
pnpm run commit
```

* 方法二：提交时直接使用规范的格式
```shell
git commit -m "feat: 添加一个新特性"
```

## License

vue3-ts-template is MIT.
