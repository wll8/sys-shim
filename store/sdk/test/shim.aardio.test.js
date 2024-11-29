import { describe, expect, test } from 'vitest'
import Sys from '@/node'
import fetch from 'node-fetch'
import fs from 'node:fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { sleep, getCodeId } from '@/util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const curInt8Array = [...new Int8Array(fs.readFileSync(__filename))]
const curStr = Buffer.from(curInt8Array).toString(`utf8`)

/**
 * 测试原生 shim.aardio 提供的方法
 * 例如 shim.aardio.native
 */

await new Sys({ log: false, wsUrl: `ws://127.0.0.1:10005?token=tokentokentoken` }).then(async shim => {
  const native = shim.native
  const nativeMain = shim.nativeMain
  const ws = shim.ws
  describe(`访问属性`, () => {
    test(`根属性`, async () => {
      const [err, res] = await native.win
      expect(Object.keys(res).length).gt(1)
    })
    test(`子属性`, async () => {
      const [err, res] = await native.win.version.buildNumber
      expect(typeof(res)).toStrictEqual(`number`)
    })
  })
  describe(`调用内部函数`, () => {
    test(`不传入参数`, async () => {
      const [err] = await native.table.unpack()
      expect(err).toStrictEqual()
    })
    test(`传入数组`, async () => {
      const [, ...arg] = await native.table.unpack([1, 2, 3])
      expect(arg).toStrictEqual([1, 2, 3])
    })
    test(`传入大体积参数`, async () => {
      const [, ...arg] = await native.table.unpack([1, 2, 3])
      expect(arg).toStrictEqual([1, 2, 3])
    })
    test(`传入结构体`, async () => {
      const [, res1] = await native.sys.cpu.getInfo(0x80000002, {_struct: `BYTE str[16]` })
      expect(typeof(res1.str)).toStrictEqual(`string`)
    })
    test(`传入同步函数`, async () => {
      const list = [`a`, `b`, `c`]
      const [, key, val] = await native.table.find(list, (val, key, obj) => {
        return val === `b`
      })
      expect([key, val]).toStrictEqual([2, `b`])
    })
    test(`传入异步函数`, async () => {
      const list = [`a`, `b`, `c`]
      const [, key, val] = await native.table.find(list, async (val, key, obj) => {
        await sleep(Math.random() * 500)
        return val === `b`
      })
      expect([key, val]).toStrictEqual([2, `b`])
    })
    test(`传入稀疏数组`, async () => {
      const obj = [1, 1, null, null, 1]
      const [, min, max] = await native.table.range(obj)
      expect([min, max]).toStrictEqual([1, 5])
    })
    test.todo(`传入稀疏数组 -- null 值在中间`, async () => {
      const obj = [1, null, 3]
      const [, ...res] = await native.table.unpack(obj)
      expect(res).toStrictEqual(obj)
    })
    test(`传入稀疏数组 -- null 值在深层`, async () => {
      const obj = [[[[[[1, null, 3, {arr: [null, null, null, {}, []]}]]]]]]
      const [, ...res] = await native.table.unpack(obj)
      expect(res).toStrictEqual(obj)
    })
    test(`接收 buffer`, async () => {
      const [, buf1] = await native.string.loadBuffer(__filename)
      const nativeStr = Buffer.from(buf1.data).toString(`utf8`)
      expect(nativeStr).toStrictEqual(curStr)
    })
    test(`传入 buffer`, async () => {
      const json = {
        type: `Buffer`,
        data: curInt8Array,
      }
      const [, nativeStr] = await ws.call(`run`, [
        `return raw.tostring(raw.buffer(...))`, json,
      ])
      expect(nativeStr).toStrictEqual(curStr)
    })
    test(`大体积数据传输`, async () => {
      const str1 = `x`.repeat(9e6) // `x`.repeat(9e6) => 9mb
      const [, str2] = await native.string.concat(str1)
      expect(str1.length).toStrictEqual(str2.length)
    }, 1e3 * 60)
    test.todo(`调用 loadcode 函数 -- 参数未正确传递`, async () => {
      const res = await native.loadcode(`return ...`)(1, 2, 3)
      console.log(`res`, res)
    })
    test(`函数传参，多个参数`, async () => {
      // 返回第 2 到 4 项
      const [, ...arg] = await native.table.unpack([1, 2, 3, 4, 5], 2, 4)
      expect(arg).toStrictEqual([2, 3, 4])
    })
    test(`调用函数返回的函数`, async () => {
      const [, res] =  await native.sys.info().isX64()
      expect(typeof(res)).toStrictEqual(`boolean`)
    })
    test(`函数返回的属性`, async () => {
      const [err, res] = await native.sys.cpu.getInfoByWmi().Name
      expect(typeof(res)).toStrictEqual(`string`)
    })
    /**
     * 使用 await 同步运行 native 方法
     * 也可以不使用，异步运行 native 方法
     */
    test(`同步和异步`, async () => {
      let time = []
      time.push(Date.now())
      await native.sleep(1e3)
      time.push(Date.now())
      native.sleep(1e3).then(() => {
        time.push(Date.now())
      })
      time.push(Date.now())
      await sleep(1e3 * 2)
      const timeDiff = [
        time[1] - time[0] >= 1e3,
        time[2] - time[1] < 1e3,
        time[3] - time[2] >= 1e3,
      ]
      expect(timeDiff).toStrictEqual([true, true, true])
    }, 1e3 * 60)
  })
  describe(`执行代码片段`, () => {
    test(`管道`, async () => {
      const cmd = `ping www.baidu.com`
      const log = []
      const msg = new shim.Msg()
      const tag = getCodeId()
      msg.on(tag, (out, err) => {
        log.push(out || err)
      })
      await ws.call(`run`, [`
        var prcs = process.popen(...)
        for( all,out,err in prcs.each() ){
          thread.command.publish("${tag}", out, err)
        }
      `, cmd])
      msg.off(tag)
      expect(log.join(``)).toMatch(` = `)
    })
    test(`接收片段中的返回值`, async () => {
      const [, ...arg] = await ws.call(`run`, [`return 1,2,3`])
      expect(arg).toStrictEqual([1, 2, 3])
    })
    test(`接收片段中的返回值 null`, async () => {
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
      const obj = [`hello`, { msg: `hello` }]
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
      const obj = { a: 1, b: null, c: 3 }
      // 获取表的成员数量
      const [, ...arg] = await ws.call(`run`, [`return table.count(...)`, obj])
      expect(arg).toStrictEqual([2])
    })
  })
  describe(`主线程和子线程`, () => {
    /**
     * 由于在主线程中进行 sleep 3 秒，
     * 所以 3 秒后 table.unpack 方法才得到执行
     */
    test(`让主线程阻塞`, async () => {
      let time = []
      nativeMain.sleep(1e3 * 3)
      time.push(Date.now())
      await sleep(500)
      nativeMain.table.unpack([1, 2, 3]).then(res => {
        time.push(Date.now())
      })
      await sleep(1e3 * 5)
      expect(time[1] - time[0]).gte(1e3 * 3)
    }, 1e3 * 60)
    /**
     * 由于是在子线程中进行 sleep 3 秒，
     * 新运行的函数是在新的线程中，并不会受影响，
     * 不用等于 3 秒后就能得到执行
     */
    test(`子线程`, async () => {
      let time = []
      native.sleep(1e3 * 3)
      time.push(Date.now())
      await sleep(500)
      native.table.unpack([1, 2, 3]).then(res => {
        time.push(Date.now())
      })
      await sleep(1e3 * 3)
      expect(time[1] - time[0]).lt(1e3 * 3)
    }, 1e3 * 60)
  })
  describe(`获取错误`, () => {
    test(`调用不存在的函数`, async () => {
      const [err, res] = await native.win.msgboxErrErr()
      expect(err).includes(`msgboxErrErr`)
    })
    test(`语法错误`, async () => {
      const [err, res] = await ws.call(`run`, [`var "err" = "err"`])
      expect(err).includes(`err`)
    })
  })
})
