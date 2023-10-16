import DeepProxy from "proxy-deep"

class Base {
  constructor(ws) {
    this.ws = ws
  }
  exit(hwnd) {
    return this.ws.call(`base.exit`, [this.hwnd || hwnd])
  }
  /**
   * 创建一个模拟的 js 对象来调用 exe 中的对象
   * @param {*} namespaces exe 暴露的对象, 例如 win
   * @returns 
   */
  mockObj(namespaces) {
    const ws = this.ws
    const obj = new DeepProxy({}, {
      get(target, path, receiver) {
        const fullPath = [...this.path, path].filter(item => typeof(item) === `string`).join(`.`)
        if(typeof(target) === `function` && fullPath.endsWith(`.then`)) {
          const prePath = fullPath.replace(/\.then$/, ``)
          return ws.call(`${namespaces}.getVal`, [prePath])
        } else {
          return this.nest(() => {})
        }
      },
      set(target, path, receiver) {
        const keyPath = [...this.path, path].filter(item => typeof(item) === `string`).join(`.`)
        return ws.call(`${namespaces}.setVal`, [keyPath, receiver])
      },
      apply(target, thisArg, argList) {
        const keyPath = [...this.path].filter(item => typeof(item) === `string`).join(`.`)
        return ws.call(`${namespaces}.callFn`, [keyPath, ...argList])
      }
    })
    return obj
  }
}

function getClass(ws) {
  class Tray extends Base {
    constructor(...arg) {
      super(ws)
      this.key = `tray`
      return new Promise(async (resolve) => {
        const hwnd = await ws.call(`${this.key}.create`, arg)
        this.hwnd = hwnd
        this.form = this.win.form._forms[hwnd]
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
      super(ws)
      this.key = `view`
      return new Promise(async (resolve) => {
        const hwnd = await ws.call(`${this.key}.create`, arg)
        this.hwnd = hwnd
        this.form = this.win.form._forms[hwnd]
        resolve(this)
      })
    }
  }
  class Msg extends Base {
    constructor(...arg) {
      super(ws)
      return this
    }
    on(key, fn) {
      return this.ws.on(key, fn)
    }
    off(key) {
      return this.ws.off(key)
    }
    emit(...arg) {
      return this.ws.call(`base.publish`, arg)
    }
  }
  return {
    Msg,
    Tray,
    View,
  }
}

class Sys extends Base {
  constructor(ws) {
    super(ws)
    return new Promise(async (resolve, reject) => {
      if (typeof Sys.instance === 'object') {
        return Sys.instance;
      }
      Sys.instance = this;
      ws.on(`open`, async () => {
        const myClass = getClass(ws)
        this.Tray = myClass.Tray
        this.View = myClass.View
        this.Msg = myClass.Msg
        ;[
          `win`,
        ].forEach(key => {
          this[key] = this.mockObj(key)
        })
        try {
          // webview 句柄
          const hwnd = await global.ext.hwnd
          this.form = this.win.form._forms[hwnd]
        } catch (error) {
          // ...
        }
        resolve(this)
      })
    })
  }
}

export default Sys