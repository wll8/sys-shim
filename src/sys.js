import {
  deepProxy,
  removeLeft,
  isUTF8MultiByteContinuation,
  isUTF8MultiByteStart,
  getUuid,
  sliceStringByBytes,
 } from '@/util.js'
import Neutralino from '@/api/neutralino/index.js'
let lib = {
  encoder: undefined,
  decoder: undefined,
}
let ws = undefined

class Base {
  constructor() {
    this.native = deepProxy({cb: (list) => {
      return new Promise(async (res) => {
        function strFix (str) {
          return /^\d+$/.test(str) ? `[${str}]` : `.${str}`
        }
        let code = list.reduce((acc, {type, key, arg = []}) => {
          if(type === `get`) {
            acc = acc + strFix(key)
          }
          if(type === `apply`) {
            acc = acc + `${strFix(key)}(${arg.map(_ => JSON.stringify(_)).join(`, `)})`
          }
          return acc
        }, ``).slice(1)
        code = `
          return ${code}
        `
        let runRes = await ws.call(`run`, [code])
        res(runRes)
      })
    }})
  }
  get api() {
    return {
      neutralino: async () => {
        const res = await new Neutralino(this)
        return res
      },
    }
  }
}

class Tray extends Base {
  constructor(...arg) {
    super()
    this.key = `tray`
    return new Promise(async (resolve) => {
      const hwnd = await ws.call(`${this.key}.create`, arg)
      this.hwnd = hwnd
      resolve(this)
    })
  }
  on(key, fn) {
    ws.call(`${this.key}.on`, [this.hwnd, key])
    return ws.on(`${this.hwnd}.${key}`, fn)
  }
  off(key) {
    ws.call(`${this.key}.off`, [this.hwnd, key])
  }
}
class View extends Base {
  constructor(...arg) {
    super()
    this.key = `view`
    return new Promise(async (resolve) => {
      const hwnd = await ws.call(`${this.key}.create`, arg)
      this.hwnd = hwnd
      resolve(this)
    })
  }
}
class Msg extends Base {
  constructor(...arg) {
    super()
    return this
  }
  on(key, fn) {
    return ws.on(key, (arg) => {
      fn(...arg)
    })
  }
  off(key) {
    return ws.off(key)
  }
  /**
   * hack
   * 以分步传输的形式避免传参过大的错误
   * https://github.com/wll8/sys-shim/issues/3
   */
  emit(...arg) {
    return ws.call(`run`, [
      `
      global.G.rpcServer.publish(...);
      `,
      ...arg,
    ])
  }
}
class Sys extends Base {
  constructor(cfg) {
    cfg.log = cfg.log === true ? (log) => {
      log.startTime && console.group(log.id)
      let [code = ``, ...codeArg] = log.reqRaw
      const [err, ...resArg] = log.resRaw
      if(log.startTime) {
        code = code.trim().replace(/^return\s+/, ``)
        console.log(code)
        codeArg.length && console.table(codeArg)
      }
      if(log.endTime) {
        err ? console.error(err) : console.log(...resArg)
        console.groupEnd(log.id)
      }
    } : cfg.log
    lib = cfg.lib
    ws = cfg.ws
    super()
    this.ws = cfg.ws
    this.ignoreLog = [`log`] // 不要被推送到日志记录器的事件标志
    const getBaseLog = () => ({
      id: ``, // 当前运行的 id
      action: ``, // 当前动作
      startTime: ``, // 当前 id 开始时间
      endTime: ``, // 当前 id 结束时间
      reqRaw: [], // 待发送给服务器的，当 action 为 run 时，第一项为代码，其他项为参数
      resRaw: [], // 接收到的服务器响应，第一项为是否错误，其他项为返回值
    })
    /**
     * hack
     * 以分步传输的形式避免传参过大的错误
     * https://github.com/wll8/sys-shim/issues/3
     */
    const call = ws.call
    ws.call = async (action, arg = []) => {
      const id = `fn${getUuid().replace(/-/g, ``)}`
      let log = {
        ...getBaseLog(),
        id,
        action,
        startTime: Date.now(),
        reqRaw: arg,
      }
      !this.ignoreLog.includes(arg[1]) && this.msg.emit(`log`, log)
      return new Promise(async (res) => {
        const resRaw = await call.bind(ws)(action, arg)
        let log = {
          ...getBaseLog(),
          id,
          action,
          endTime: Date.now(),
          resRaw,
        }
          !this.ignoreLog.includes(arg[1]) && this.msg.emit(`log`, log)
          res(resRaw)
      })
    }
    return new Promise(async (resolve, reject) => {
      if (typeof Sys.instance === `object`) {
        return Sys.instance
      }
      Sys.instance = this
      ws.on(`open`, async () => {
        this.Tray = Tray
        this.View = View
        this.Msg = Msg
        this.msg = await new Msg()
        cfg.log && this.msg.on(`log`, cfg.log)
        resolve(this)
      })
    })
  }
}

export default Sys
