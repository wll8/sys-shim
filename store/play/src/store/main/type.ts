export type RunCodeType = 'browser' | 'node' | 'native'
export interface IExecInfo {
  env: {
    'node-sys.js'?: string
    'browser-sys.js'?: string
    'main.exe'?: string
  }
  code: {
    browser?: string
    node?: string
    native?: string
  }
}
export interface IExecInfoActionOptions {
  type?: RunCodeType // 执行代码类型
  code?: string
}
