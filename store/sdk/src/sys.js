// 模块代码
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD 环境下的模块导入
    define([], factory);
  } else if (typeof exports === 'object') {
    // CommonJS / Node.js 环境下的模块导入
    module.exports =  factory();
  } else {
    // 浏览器全局变量导入
    factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  // 模块代码
  class Base {
    constructor(ws) {
      this.ws = ws
    }
    exit(hwnd) {
      return this.ws.call(`base.exit`, [this.hwnd || hwnd])
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
          resolve(this)
        })
      })
    }
  }
  return Sys;
}));
