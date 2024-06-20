import { describe, expect, test } from 'vitest'
import Sys from '@/node'

await new Sys({log: false, wsUrl: `ws://127.0.0.1:10005?token=tokentokentoken`}).then(async shim => {
  const native = shim.native
  const ws = shim.ws
  describe(`调用内部函数`, () => {
    test(`调用函数`, async () => {
      const [err] = await native.table.unpack()
      expect(err).toStrictEqual(undefined)
    })
    test(`函数传参`, async () => {
      const [, ...arg] = await native.table.unpack([1, 2, 3])
      expect(arg).toStrictEqual([1, 2, 3])
    })
    test(`向函数传入稀疏数组`, async () => {
      const obj = [1, 1, null, null, 1]
      const [, min, max] = await native.table.range(obj)
      expect([min, max]).toStrictEqual([1, 5])
    })
    test.todo(`调用 loadcode 函数 -- 参数未正确传递`, async () => {
      const res = await native.loadcode(`return ...`)(1, 2, 3)
      console.log(`res`, res)
    })
    test(`函数传参，多个参数`, async () => {
      // 返回第 2 到 4 项
      const [, ...arg] = await native.table.unpack([1, 2, 3, 4, 5], 2, 4)
      expect(arg).toStrictEqual([2, 3, 4])
    })
  })
  describe(`执行代码片段`, () => {
    test(`接收片段中的返回值`, async () => {
      const [, ...arg] = await ws.call(`run`, [`return 1,2,3`])
      expect(arg).toStrictEqual([1, 2, 3])
    })
    test.skip(`接收片段中的返回值 null`, async () => {
      const [, ...arg] = await ws.call(`run`, [`return 1,null,3`])
      expect(arg).toStrictEqual([1, null, 3])
    })
    test(`向片段中传入数字`, async () => {
      const [, ...arg] = await ws.call(`run`, [`return ...`, 1, 2, 3])
      expect(arg).toStrictEqual([1, 2, 3])
    })
    test(`向片段中传入字符串`, async () => {
      const [, ...arg] = await ws.call(`run`, [`return ...`, `hello`])
      expect(arg).toStrictEqual([`hello`])
    })
    test(`向片段中传入 json 对象`, async () => {
      const obj = [`hello`, {msg: `hello`}]
      const [, ...arg] = await ws.call(`run`, [`return ...`, obj, 1, 2])
      expect(arg).toStrictEqual([obj, 1, 2])
    })
    test(`向片段中传入 null 值`, async () => {
      const obj = [1, null, 3]
      const [, ...arg] = await ws.call(`run`, [`
        var args = {...}
        return args[1] = 1, args[2] = null, args[3] = 3
      `, ...obj])
      expect(arg).toStrictEqual([true, true, true])
    })
    test(`向片段中传入含有 null 的对象 -- aar 会自动过滤掉 null 值`, async () => {
      const obj = {a: 1, b: null, c: 3}
      // 获取表的成员数量
      const [, ...arg] = await ws.call(`run`, [`return table.count(...)`, obj])
      expect(arg).toStrictEqual([2])
    })
  })
})
