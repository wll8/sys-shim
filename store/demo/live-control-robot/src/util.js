import { useStore } from '@/stores/index.js'

/**
 * 生成 guid
 * @param {string} format 格式
 */
export function guid(format = `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`) {
  return format.replace(/[x]/g, function (c) {
    // eslint-disable-next-line
    const r = (Math.random() * 16) | 0,
      v = c === `x` ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 获取指定范围内的随机数
 * @param {*} m 包含 m
 * @param {*} n 包含 n
 * @returns
 */
export function randomNumBoth(Min, Max) {
  let Range = Max - Min
  let Rand = Math.random()
  let num = Min + Math.round(Rand * Range) // 四舍五入
  return num
}

export function seededRandom(min, max, seed) {
  let maxInt = Math.pow(2, 32)
  let x = Math.sin(seed) * maxInt
  x = x - Math.floor(x)
  return Math.floor(x * (max - min + 1) + min)
}

export function randomWithToken(a, b, token = `x`.repeat(32)) {
  if (token !== undefined) {
    // 创建一个简单的哈希来用作种子
    let hash = 0
    for (let i = 0; i < token.length; i++) {
      let char = token.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash |= 0 // 转换为32位整数
    }
    return seededRandom(a, b, hash)
  } else {
    // 如果没有提供token，就生成一个真正的随机数
    return Math.floor(Math.random() * (b - a + 1)) + a
  }
}

/**
 * 删除左边空格
 * @param {*} str
 * @returns
 */
export function removeLeft(str) {
  const lines = str.split(`\n`)
  // 获取应该删除的空白符数量
  const minSpaceNum = lines
    .filter((item) => item.trim())
    .map((item) => item.match(/(^\s+)?/)[0].length)
    .sort((a, b) => a - b)[0]
  // 删除空白符
  const newStr = lines.map((item) => item.slice(minSpaceNum)).join(`\n`)
  return newStr
}

/**
 * 获取用户 id
 */
export async function getUserToken() {
  const store = useStore()
  store.userId = store.userId || guid()
  const [, computerName] = await globalThis.native.sys.getComputerName()
  const [, userName] = await globalThis.native.sys.getUserName()
  const [, globalGitName] = await globalThis.native.process
    .popen(`git config --global user.name`)
    .readAll()
  const [, globalGitEmail] = await globalThis.native.process
    .popen(`git config --global user.email`)
    .readAll()
  const [, gitName] = await globalThis.native.process.popen(`git config user.name`).readAll()
  const [, gitEmail] = await globalThis.native.process.popen(`git config user.email`).readAll()
  const time = Date.now()
  const data = {
    time,
    userId: store.userId,
    computerName,
    userName,
    globalGitName,
    globalGitEmail,
    gitName,
    gitEmail,
  }
  const originalString = JSON.stringify(data)
  const base64String = btoa(originalString)
  return base64String
}

/**
 * 判断数据是否为 type, 或返回 type
 * @param {*} data
 * @param {*} type
 * @returns
 */
export function isType(data, type = undefined) {
  const dataType = Object.prototype.toString
    .call(data)
    .match(/\s(.+)]/)[1]
    .toLowerCase()
  return type ? dataType === type.toLowerCase() : dataType
}

/**
 * 深层获取对象值
 * @param {*} object
 * @param {*} keys
 * @param {*} defaultValue
 * @returns
 */
export function deepGet(object, keys = [], defaultValue) {
  // 深层获取对象值
  let res = (
    !Array.isArray(keys) ? keys.replace(/\[/g, `.`).replace(/\]/g, ``).split(`.`) : keys
  ).reduce((o, k) => (o || {})[k], object)
  return res !== undefined ? res : defaultValue
}

/**
 * 拍平对象
 * @param {*} value
 * @param {*} currentKey
 * @returns
 */
export function flatObj(value, currentKey) {
  // 展开对象
  let result = {}
  Object.keys(value).forEach((key) => {
    const tempKey = currentKey ? `${currentKey}.${key}` : key
    if (typeof value[key] !== `object`) {
      result[tempKey] = value[key]
    } else {
      result = { ...result, ...flatObj(value[key], tempKey) }
    }
  })
  return result
}
