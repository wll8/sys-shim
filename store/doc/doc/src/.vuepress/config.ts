import { defineUserConfig } from "vuepress";
import { getDirname, path } from 'vuepress/utils'
const __dirname = getDirname(import.meta.url)
import { viteBundler } from '@vuepress/bundler-vite'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'


import theme from "./theme.js";
const myPlugin = (options) => {
  return (app) => {
    return {
      name: 'vuepress-plugin-bar',
      define: {
        __GLOBAL_BOOLEAN__: true,
        __GLOBAL_STRING__: 'foobar',
        __GLOBAL_OBJECT__: { foo: 'bar' },
      },
      onInitialized() {
      },
      onPrepared() {
      },
      extendsMarkdown(md, app) {
        const old = md.render
        md.render = (token, ...arg) => {
          token = `${token}\n<RenderedHack />`
          let res = old(token, ...arg)
          return res
        }
      },
      extendsPage(page) {
      },
      setup() {
      },
      onGenerated() {
      },
    }
  }
}


export default defineUserConfig({  head: [
    [
      "script",
      {src: `/sys-shim-doc/assets/js/page.js`},
    ],
    [
      "script",
      {src: `/sys-shim-doc/assets/js/run.js`},
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
    registerComponentsPlugin({
      components: {
        RenderedHack: path.resolve(__dirname, './components/RenderedHack.vue'),
      },
    }),
    myPlugin({}),
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
