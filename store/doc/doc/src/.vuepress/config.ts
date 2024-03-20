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
  console.group(
    "%c提示提示提示:",
    "background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 4px ;"
  );
  console.log( "你可以直接下载 https://github.com/wll8/sys-shim-doc/releases/download/v0.0.1/sys-shim-doc.exe" );
  console.log( "然后 F12 打开控制台，测试 api 调用" );
  console.log( "例如 native.process('mspaint')" );
  console.log( "由于应用未签名，可能报毒，介意误下" );
  console.groupEnd();
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
  base: "/sys-shim-doc/",

  lang: "zh-CN",
  title: "sys-shim",
  description: "hongqiye 的sys-shim",

  theme,

  plugins: [
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
