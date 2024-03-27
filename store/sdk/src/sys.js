import { deepProxy } from '@/util.js'
import Neutralino from '@/api/neutralino/index.js'
let lib = {
  encoder: undefined,
  decoder: undefined,
}
let ws = undefined

/**
 * 获取 uuid
 * @returns
 */
function getUuid () {
  if (typeof crypto === `object`) {
    if (typeof crypto.randomUUID === `function`) {
      return crypto.randomUUID()
    }
    if (typeof crypto.getRandomValues === `function` && typeof Uint8Array === `function`) {
      const callback = (c) => {
        const num = Number(c)
        return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16)
      }
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, callback)
    }
  }
  let timestamp = new Date().getTime()
  let perforNow = (typeof performance !== `undefined` && performance.now && performance.now() * 1000) || 0
  return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
    let random = Math.random() * 16
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0
      timestamp = Math.floor(timestamp / 16)
    } else {
      random = (perforNow + random) % 16 | 0
      perforNow = Math.floor(perforNow / 16)
    }
    return (c === `x` ? random : (random & 0x3) | 0x8).toString(16)
  })
}

/**
 * 获取字符串的字节长度
 * @param {*} str
 * @returns
 */
function getStringByteLength(str) {
  return lib.encoder.encode(str).length
}

function isUTF8MultiByteStart(byte) {
  // 如果字节的高位为11，则是多字节字符的起始字节
  return (byte & 0xC0) === 0xC0
}

function isUTF8MultiByteContinuation(byte) {
  // 如果字节的高位为10，则是多字节字符的延续字节
  return (byte & 0xC0) === 0x80
}

function sliceStringByBytes(str, sliceLength) {
  const uint8Array = lib.encoder.encode(str)
  let slices = []
  let start = 0

  while (start < uint8Array.length) {
    let end = start + sliceLength
    if (end > uint8Array.length) {
      end = uint8Array.length
    } else {
      // 确保不在多字节字符中间断开
      while (end > start && isUTF8MultiByteContinuation(uint8Array[end - 1])) {
        end--
      }
      // 如果我们在多字节字符的起始处中止，则再次前移
      if (end > start && isUTF8MultiByteStart(uint8Array[end - 1])) {
        end--
      }
    }

    const slice = uint8Array.subarray(start, end)
    slices.push(lib.decoder.decode(slice))
    start = end // 设置下次分片的起始位置
  }

  return slices
}

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
    this.win = this.native.win
    this.fsys = this.native.fsys
  }
  get api() {
    return {
      neutralino: async () => {
        const res = await new Neutralino(this)
        return res
      },
    }
  }
  get form() {
    return this.native.win.form._forms[this.hwnd]
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
  constructor(_ws, _lib) {
    lib = _lib
    ws = _ws
    super()
    this.ws = _ws
    /**
     * hack
     * 以分步传输的形式避免传参过大的错误
     * https://github.com/wll8/sys-shim/issues/3
     */
    const call = ws.call
    ws.call = async (action, arg) => {
      if(action === `run`) {
        const strArg = JSON.stringify(arg)
        const uuid = `fn${getUuid().replace(/-/g, ``)}`
        // chrome 分片大小
        const chromeWsSize = 131000 / 2
        // 预留空间，例如 rpc 协议包装
        const reserved = 1000
        const limit = Math.floor(chromeWsSize) - reserved
        const chunkList = sliceStringByBytes(strArg, limit)
        const chunkListSize = chunkList.length
        // 否则分段发送
        for (let index = 0; index < chunkListSize; index++) {
          const chunk = chunkList[index]
          await call.bind(ws)(`run`, [
            `
            var arg = ...
            var uuid = arg[1]
            var chunk = arg[2]
            global.G[uuid] = global.G[uuid] || ""
            global.G[uuid] ++= chunk
            `,
            [uuid, chunk],
          ])
        }
        // 函数拦截参考 lib/util/_.aardio apply 的实现
        arg = [
          `
            var arg = global.G["${uuid}"] ? web.json.parse(global.G["${uuid}"]) : null;
            global.G["${uuid}"] = null

            var code = table.unpack(arg)
            var fnArg = {table.unpack(arg, 2, -1)}
            return loadcode(code)(table.unpack(fnArg))
          `,
        ]
      }
      return call.bind(ws)(action, arg)
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
        resolve(this)
      })
    })
  }
}

export default Sys
