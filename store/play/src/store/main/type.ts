export type RunCodeType = 'browser' | 'node' | 'native'
export interface ICode {
  browser?: string
  node?: string
  native?: string
}

export interface IExecInfo {
  env: {
    'node-sys.js'?: string
    'browser-sys.js'?: string
    'main.exe'?: string
  }
  code: ICode
}

export interface IExecInfoActionOptions {
  type: RunCodeType // 执行代码类型
  code: ICode
}
