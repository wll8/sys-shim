import DeepProxy from 'proxy-deep'
const encoder = typeof TextEncoder === 'undefined' ? new (require('util').TextEncoder)('utf-8') : new TextEncoder();
const decoder = typeof TextDecoder === 'undefined' ? new (require('util').TextDecoder)('utf-8') : new TextDecoder();


let ws = undefined

/**
 * 获取字符串的字节长度
 * @param {*} str 
 * @returns 
 */
function getStringByteLength(str) {
  return encoder.encode(str).length;
}

function isUTF8MultiByteStart(byte) {
  // 如果字节的高位为11，则是多字节字符的起始字节
  return (byte & 0xC0) === 0xC0;
}

function isUTF8MultiByteContinuation(byte) {
  // 如果字节的高位为10，则是多字节字符的延续字节
  return (byte & 0xC0) === 0x80;
}

function sliceStringByBytes(str, sliceLength) {
  const uint8Array = encoder.encode(str);
  let slices = [];
  let start = 0;

  while (start < uint8Array.length) {
    let end = start + sliceLength;
    if (end > uint8Array.length) {
      end = uint8Array.length;
    } else {
      // 确保不在多字节字符中间断开
      while (end > start && isUTF8MultiByteContinuation(uint8Array[end - 1])) {
        end--;
      }
      // 如果我们在多字节字符的起始处中止，则再次前移
      if (end > start && isUTF8MultiByteStart(uint8Array[end - 1])) {
        end--;
      }
    }

    const slice = uint8Array.subarray(start, end);
    slices.push(decoder.decode(slice));
    start = end; // 设置下次分片的起始位置
  }

  return slices;
}

class Base {
  constructor() {
    ;[`win`, `fsys`].forEach((key) => {
      this[key] = mockObj(key)
    })
  }
  get form() {
    return this.win.form._forms[this.hwnd]
  }
}

/**
 * 创建一个模拟的 js 对象来调用 exe 中的对象
 * @param {*} namespaces exe 暴露的对象, 例如 win
 * @returns
 */
function mockObj(namespaces) {
  const obj = new DeepProxy(
    {},
    {
      get(target, path, receiver) {
        const fullPath = [...this.path, path]
          .filter((item) => typeof item === `string`)
          .join(`.`)
        if (typeof target === `function` && fullPath.endsWith(`.then`)) {
          const prePath = fullPath.replace(/\.then$/, ``)
          return ws.call(`${namespaces}.getVal`, [prePath])
        } else {
          return this.nest(() => {})
        }
      },
      set(target, path, receiver) {
        const keyPath = [...this.path, path]
          .filter((item) => typeof item === `string`)
          .join(`.`)
        return ws.call(`${namespaces}.setVal`, [keyPath, receiver])
      },
      apply(target, thisArg, argList) {
        const keyPath = [...this.path]
          .filter((item) => typeof item === `string`)
          .join(`.`)
        if (keyPath === `form`) {
          return new Promise(async (resolve) => {
            const raw = await ws.call(`${namespaces}.callFn`, [
              keyPath,
              ...argList,
            ])
            const [ok, { hwnd }] = raw
            const form = obj.form._forms[hwnd]
            resolve([ok, form])
          })
        } else {
          return ws.call(`${namespaces}.callFn`, [keyPath, ...argList])
        }
      },
    }
  )
  return obj
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
  constructor(_ws) {
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
        const [code, ...more] = arg
        const strArg = JSON.stringify(more)
        const uuid = `fn${crypto.randomUUID().replace(/-/g, ``)}`
        const limit = 1024 * 63
        // 如果代码体积超出限制时，抛出错误
        const codeLen = getStringByteLength(code)
        const argLen = Math.ceil(getStringByteLength(strArg) / limit)
        // 如果代码和参数体积和小于限制时，直接运行
        if(argLen + codeLen < limit && argLen <= 1) {
          return call.bind(ws)(action, arg)
        }
        const chunkList = sliceStringByBytes(strArg, limit)
        const chunkListSize = chunkList.length
        console.log({chunkListSize})
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
            [uuid, chunk]
          ])
        }
        // 函数拦截参考 lib/util/_.aardio apply 的实现
        arg = [
          `
            var arg = global.G["${uuid}"] ? web.json.parse(global.G["${uuid}"]) : null;
            global.G["${uuid}"] = null
            var ${uuid} = function(...){
              ${code}
            }
            var ret = {call(${uuid}, owner, table.unpack(arg, table.range(arg)))}
            if( !ret[1] ) error(ret[2], 2)
            table.remove(ret)
            return table.unpack( ret,table.range(ret) );
          `
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
