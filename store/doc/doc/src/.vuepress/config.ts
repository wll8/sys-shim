import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'

import theme from "./theme.js";

const preload = `
if(globalThis.Sys) {
  new globalThis.Sys().then(async main => {
    globalThis.main = main
    globalThis.native = main.native
    globalThis.Neutralino = await main.api.neutralino()
  })
} else {
  console.warn('使用 main.exe 加载此文档后可以直接运行示例')
}
`
export default defineUserConfig({  head: [
    [
      "script",
      {},
      preload,
    ],
  ],
  bundler: viteBundler({
    viteOptions: {
      plugins: [],
      server: {}
    },
  }),
  base: "/",

  lang: "zh-CN",
  title: "sys-shim",
  description: "hongqiye 的sys-shim",

  theme,

  plugins: [
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
