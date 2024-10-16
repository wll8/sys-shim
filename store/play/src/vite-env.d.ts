/// <reference types="vite/client" />
declare interface Window {

}

// with unplugin-vue-markdown, markdown files can be treated as Vue components
declare module '*.md' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module globalThis {
  interface ISys {
    new(config?: any): any
  }
  const Sys: ISys
  const Neutralino: any

  const main: any
  const native: any
  const msg: any
  export {
    Sys,
    main,
    Neutralino,
    native,
    msg,
  }
}
