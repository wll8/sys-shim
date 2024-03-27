import { DeepProxy } from './proxy-deep.js'
const KEYS_MAP = new Map()
export function get([key]) {
  return KEYS_MAP.get(key) ?? key
}
export function deepProxy({
  keys = [`then`, `catch`],
  cb = (records) => {
    return new Promise(async (res, rej) => {
      // 模拟异步操作
      setTimeout(() => {
        res(records)
      }, Math.random() * 1000)
    })
  },
} = {}) {
  keys.forEach(key => {
    let _val = Symbol(key)
    KEYS_MAP.set(key, _val)
    KEYS_MAP.set(_val, key)
  })
  function getRecords(context) {
    return context?.records ?? []
  }
  // 代理处理程序
  const handler = {
    get(target, key, receiver) {
      let records = getRecords(this)
      if (keys.includes(key)) {
        let promise = cb(records)
        return promise[key].bind(promise)
      } else {
        records.push({ type: `get`, key: get([key]) })
        let newTarget = function () { }
        return this.nest(newTarget, { userData: { records } })
      }
    },
    apply(target, thisArg, args) {
      let records = getRecords(this)
      const key = records[records.length - 1].key
      records[records.length - 1] = { type: `apply`, key, arg: args }
      let newTarget = function () { }
      return this.nest(newTarget, { userData: { records } })
    },
    construct(target, args) {
      let records = getRecords(this)
      records.push({ type: `construct`, arg: args })
      let newTarget = function () { }
      return this.nest(newTarget, { userData: { records } })
    },
    defineProperty(target, key, args) {
      let records = getRecords(this)
      records.push({ type: `defineProperty`, key, arg: args })
      let newTarget = function () { }
      return this.nest(newTarget, { userData: { records } })
    },
    deleteProperty(target, key) {
      let records = getRecords(this)
      records.push({ type: `deleteProperty`, key })
      let newTarget = function () { }
      return this.nest(newTarget, { userData: { records } })

    },
    set(target, key, value) {
      let records = getRecords(this)
      records.push({ type: `set`, key, arg: value })
      let newTarget = function () { }
      return this.nest(newTarget, { userData: { records } })
    },
    getOwnPropertyDescriptor(target, prop) {
      let records = getRecords(this)
      records.push({ type: `getOwnPropertyDescriptor`, key: prop })
      let newTarget = function () { }
      return { configurable: true, enumerable: true, value: this.nest(newTarget) }
    },
    getPrototypeOf(target) {
      let records = getRecords(this)
      records.push({ type: `getPrototypeOf` })
      let newTarget = function () { }
      return this.nest(newTarget, { userData: { records } })
    },
    has(target, prop) {
      let records = getRecords(this)
      records.push({ type: `has`, key: prop })
      return true
    },
    isExtensible(target) {
      let records = getRecords(this)
      records.push({ type: `isExtensible` })
      return true
    },
    setPrototypeOf(target, prototype) {
      let records = getRecords(this)
      records.push({ type: `setPrototypeOf`, arg: prototype })
      return true
    },
    ownKeys(target) {
      let records = getRecords(this)
      records.push({ type: `ownKeys` })
      return Reflect.ownKeys(target)
    },
    preventExtensions(target) {
      let records = getRecords(this)
      records.push({ type: `preventExtensions` })
      Object.preventExtensions(target)
      return true
    },
  }

  // 返回初始对象的代理
  return new DeepProxy({}, handler)
}

export function binaryArrayToBuffer(binaryArray) {
  let buffer = new ArrayBuffer(binaryArray.length)
  let view = new Uint8Array(buffer)
  for (let i = 0; i < binaryArray.length; i++) {
    view[i] = binaryArray[i]
  }
  return buffer
}
