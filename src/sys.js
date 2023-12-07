import DeepProxy from 'proxy-deep'

let ws = undefined

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
    return ws.on(key, fn)
  }
  off(key) {
    return ws.off(key)
  }
  emit(...arg) {
    return ws.call(`base.publish`, arg)
  }
}
class Sys extends Base {
  constructor(_ws) {
    ws = _ws
    super()
    this.ws = _ws
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
