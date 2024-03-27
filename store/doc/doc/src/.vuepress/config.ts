import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'

import theme from "./theme.js";

export default defineUserConfig({  head: [
    [
      "script",
      {src: `/sys-shim-doc/assets/js/page.js`},
    ],
    [
      "script",
      { src: `/sys-shim-doc/assets/js/run.js` },
    ],
    [
      "link",
      {
        rel: `shortcut icon`,
        href: `/sys-shim-doc/favicon.ico`,
        type: `image/x-icon`,
      },
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
