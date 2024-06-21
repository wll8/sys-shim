import { DeepProxy } from './proxy-deep.js'
const KEYS_MAP = new Map()
export function get([key]) {
  return KEYS_MAP.get(key) || key
}

/**
 * 获取 `/**` 中 `*` 号的数量
 * @param {*} inputStr
 * @returns
 */
export function getCodeLine(inputStr) {
  // 使用正则表达式匹配以 `/` 开头，后面跟着连续的 `*` 号的模式，使用贪婪匹配
  const pattern = /\/\*{1,}/g
  const matches = inputStr.match(pattern)

  // 如果没有匹配到任何 '/**'，返回0或者其他默认值
  if (!matches) {
    return 0
  }

  // 初始化最大 '**' 数量和对应的 '/**' 字符串
  let maxAsterisks = 0
  let maxAsterisksMatch = ``

  // 遍历所有匹配结果，找出包含最多 '*' 号的那一个
  for (const match of matches) {
    const asterisksCount = match.length - 1 // 减去前面的 '/'
    if (asterisksCount > maxAsterisks) {
      maxAsterisks = asterisksCount
      maxAsterisksMatch = match
    }
  }

  // 返回最多的 '*' 号数量
  return maxAsterisks
}

export const sleep = (time = 1e3) => new Promise(resolve => setTimeout(resolve, time))
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
  function getRecords(context = {}) {
    return context.records || []
  }
  // 代理处理程序
  const handler = {
    get(target, key, receiver) {
      let records = getRecords(this)
      if (keys.includes(key)) {
        let promise = cb(records)
        records.hackRun = true // 已运行过
        return promise[key].bind(promise)
      } else {
        records.push({ type: `get`, key: get([key]) })
        let newTarget = function () { }
        return this.nest(newTarget, { userData: { records } })
      }
    },
    apply(target, thisArg, args) {
      let records = getRecords(this)
      setTimeout(() => {
        let recordsEnd = getRecords(this)
        !recordsEnd.hackRun && (cb(recordsEnd), recordsEnd.hackRun = true)
      }, 0)
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

/**
 * 删除左边空格
 * @param {*} str
 * @returns
 */
export function removeLeft(str) {
  const lines = str.split(`\n`)
  // 获取应该删除的空白符数量
  const minSpaceNum = lines.filter(item => item.trim())
    .map(item => item.match(/(^\s+)?/)[0].length)
    .sort((a, b) => a - b)[0]
  // 删除空白符
  const newStr = lines
    .map(item => item.slice(minSpaceNum))
    .join(`\n`)
  return newStr
}

/**
 * 简单的模板功能
 * @param {*} template
 * @param {*} data
 * @returns
 */
export function simpleTemplate(template, data) {
  return template.replace(/#\{(\w+)\}/g, (match, key, pos) => {
    const lineStr = getLineContainingChar(template, pos)
    const spaceNum = getMinSpaceNum(lineStr)
    const val = data[key] || ``
    const newVal = addSpace(val, {num: spaceNum})
    return newVal
  })
}

/**
 * 返回字符所在位置的整行文本
 * @param {*} text
 * @param {*} charPosition
 * @returns
 */
export function getLineContainingChar(text, charPosition) {
  // 将多行文本分割成行数组
  const lines = text.split(`\n`)

  // 遍历行数组，找到包含给定字符位置的行
  for (let i = 0; i < lines.length; i++) {
      // 计算当前行的字符位置
      const lineLength = lines[i].length
      if (charPosition < lineLength) {
          // 如果字符位置在当前行内，返回该行
          return lines[i]
      } else {
          // 否则，减去当前行的长度，继续检查下一行
          charPosition -= lineLength + 1 // +1 是为了减去换行符
      }
  }

  // 如果没有找到包含给定字符位置的行，返回null或适当的错误信息
  return null
}

/**
 * 获取最小空白符数量
 * @param {*} str
 * @returns
 */
export function getMinSpaceNum(str) {
  const lines = str.split(`\n`)
  const minSpaceNum = lines.filter(item => item.trim())
    .map(item => item.match(/(^\s+)?/)[0].length)
    .sort((a, b) => a - b)[0]
  return minSpaceNum
}

/**
 * 添加空白符
 * @param {*} str
 * @param {*} opt
 * @returns
 */
export function addSpace(str, opt = {}) {
  opt = {
    num: 0, // 字符符数量
    space: ` `,
    skip: 0, // 要跳过设置的索引
    ...opt,
  }
  const lines = str.split(`\n`)
  const newStr = lines
    .map((item, index) => index <= opt.skip ? item : opt.space.repeat(opt.num) + item)
    .join(`\n`)
  return newStr
}

/**
 * 获取 uuid
 * @returns
 */
export function getUuid () {
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
 * 获取 uuid
 * @returns
 */
export function getCodeId () {
  return `c_${getUuid()}`.replace(/[_-]/g, ``)
}

export function isUTF8MultiByteStart(byte) {
  // 如果字节的高位为11，则是多字节字符的起始字节
  return (byte & 0xC0) === 0xC0
}

export function isUTF8MultiByteContinuation(byte) {
  // 如果字节的高位为10，则是多字节字符的延续字节
  return (byte & 0xC0) === 0x80
}


/**
 * 根据字节长度分割字符串
 * @param {*} param0
 * @returns
 */
export function sliceStringByBytes({lib, str, sliceLength}) {
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

export function isType(data, type = undefined) { // 判断数据是否为 type, 或返回 type
  const dataType = Object.prototype.toString.call(data).match(/\s(.+)]/)[1].toLowerCase()
  return type ? (dataType === type.toLowerCase()) : dataType
}

/**
 * 判断是否为空值
 * @param {*} value 要判断的值
 */
export function isEmpty(value) {
  return [NaN, null, undefined, ``, [], {}].some((emptyItem) =>
    typeof value === `string` && value
      ? false
      : JSON.stringify(value) === JSON.stringify(emptyItem),
  )
}

/**
 * 删除空值
 * @param {object} obj 要处理的数据
 */
export function removeEmpty(obj) {
  return JSON.parse(JSON.stringify(obj), (key, value) => {
    if (isEmpty(value) === false && Array.isArray(value)) {
      value = value.filter((v) => !isEmpty(v))
    }
    return isEmpty(value) ? undefined : value
  })
}

/**
 * 函数缓存器，相同参数只会执行一次
 * @param {*} fn
 * @returns
 */
export function memoize(fn) {
  const cache = new Map() // 使用Map来存储缓存结果

  function memoized(...args) {
    const key = JSON.stringify(args) // 将参数转换为字符串作为缓存的键
    if (cache.has(key)) {
      return cache.get(key) // 如果缓存中已存在，直接返回缓存的结果
    }

    const result = fn.apply(this, args) // 否则，调用函数并存储结果
    cache.set(key, result)
    return result
  }

  // 添加一个方法来清除缓存
  memoized.clearCache = function() {
    cache.clear()
  }

  return memoized
}
