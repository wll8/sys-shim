// / <reference path="../types/global.d.ts" />
// / <reference path="../types/typings.d.ts" />

import { sleep } from '@/util'
import Run from '@/Run.vue'

export default {
  name: `App`,
  components: {
    Run,
  },
  created() {
    const msg = new window.main.Msg()
    msg.on(`pipe`, (out, err) => {
      console.log(`pipe`, out)
    })
  },
  data() {
    const main = globalThis.main
    const ws = main.ws
    globalThis.ws = ws
    const vm = this
    return {
      code: `win.msgbox(runid)`,
      list: [
        {
          name: `管道`,
          fn: async function () {
            const cmd = `ping baidu.com -t`
            ;[, vm.processId] = await ws.call(`run`, [
              ``,
              cmd,
            ])
            console.log(`processId`, vm.processId)
          },
        },
        {
          name: `调用原生方法`,
          fn: async function () {
            await main.native.win.msgbox(1234, null, 3)
          },
        },
        {
          name: `读取本地文件为 buffer`,
          fn: async function () {
            let [, read] = await ws.call(
              `run`,
              [
                ``,
              ],
            )
            let [writeErr, write] = await ws.call(
              `run`,
              [
                ``,
                read,
              ],
            )
            console.log(111, {write, read, writeErr})
          },
        },
        {
          name: `大体积参数`,
          fn: async function () {
            const arg = `👨‍👩‍👦‍👦`.repeat(9e5)
            const [, res] = await ws.call(
              `run`,
              [
                ``,
                arg,
              ],
            )
            await main.native.win.msgbox(JSON.stringify(res).length)
            console.log(111, res)
          },
        },
        {
          name: `大体积代码`,
          fn: async function () {
            const x = `中文`.repeat(9e5)
            const [, res] = await ws.call(
              `run`,
              [
                ``,
                1,
                2,
                3,
              ],
            )
            await main.native.win.msgbox(JSON.stringify(res).length)
            console.log(111, res)
          },
        },
        {
          name: `js 读取线上文件为 buffer`,
          fn: async function () {
            const response = await fetch(`http://baidu.com/favicon.ico`)
            const reader = response.body.getReader()
            // eslint-disable-next-line no-constant-condition
            while (true) {
              const { done, value } = await reader.read()
              console.log(`value`, value)
              if(value) {
                const json = {
                  type: `Buffer`,
                  data: [...new Int8Array(value.buffer)],
                }
                console.log(`json`, json)
                let [writeErr, write] = await ws.call(
                  `run`,
                  [
                    ``,
                    json,
                  ],
                )
                console.log(111, {write, writeErr})
              }
              if (done) {
                break
              }
            }

          },
        },
        {
          name: `创建目录`,
          async fn() {
            const dir = `C:/my/`
            await ws.call(`run`, [
              ``,
              dir,
            ])
          },
        },
        {
          name: `下载文件`,
          async fn() {
            const url =
              `https://download.microsoft.com/download/7/4/A/74A33AB3-B6F3-435D-8E3E-0A9FD574347F/services-on-server-install-worksheet.xlsx`
            await ws.call(`run`, [
              ``,
              url,
            ])
          },
        },
        {
          name: `定位文件`,
          async fn() {
            const url = `C:/my/services-on-server-install-worksheet.xlsx`
            await ws.call(`run`, [
              ``,
              url,
            ])
          },
        },
        {
          name: `上传文件`,
          async fn() {
            await ws.call(`run`, [
              ``,
            ])
          },
        },
        {
          name: `打开文件`,
          async fn() {
            await ws.call(`run`, [
              ``,
            ])
          },
        },
        {
          name: `打开记事本`,
          async fn() {
            await ws.call(`run`, [
              ``,
            ])
          },
        },
        {
          name: `删除目录`,
          async fn() {
            await ws.call(`run`, [
              ``,
            ])
          },
        },
        {
          name: `弹窗`,
          async fn() {
            main.native.win.msgbox(`hello`)
          },
        },
        {
          name: `退出`,
          async fn() {
            main.nativeMain.G.killAll()
          },
        },
        /* test the writeText method of Api.clipboard */
        {
          name: `writeText`,
          async fn() {
            await Neutralino.clipboard.writeText(`write test`)
          },
        },
        {
          name: `readText`,
          async fn() {
            const text = await Neutralino.clipboard.readText()
            console.log(text)
          },
        },
        {
          name: `filesystem.createDirectory`,
          async fn() {
            const value =  await Neutralino.filesystem.createDirectory(`./newDirectory`)
            // const value =  await Neutralino.filesystem.createDirectory("./newDirectory/a/b")
            console.log(value)
          },
        },
        {
          name: `filesystem.remove`,
          async fn(){
            const value = await Neutralino.filesystem.remove(`./newDirectory`)
            console.log(value)
          },
        },
        {
          name: `filesystem.writeFile`,
          async fn(){
           await Neutralino.filesystem.writeFile(`test.txt`, `123`)

          },
        },
        {
          name: `filesystem.appendFile`,
          async fn(){
            const data = await Neutralino.filesystem.appendFile(`test.txt`, `456`)
            console.log(data)
          },
        },
        {
          name: `filesystem.readFile`,
          async fn(){
            const data = await Neutralino.filesystem.readFile(`test.txt`)
            console.log(data)
          },
        },
        {
          name: `filesystem.readBinaryFile`,
          async fn(){
            const data = await Neutralino.filesystem.readBinaryFile(`test.txt`)
            let view = new Uint8Array(data)
            console.log(`Binary content: `, view)
          },
        },
        {
          name: `filesystem.writeBinaryFile`,
          async fn(){
            let rawBin = new ArrayBuffer(1)
            let view = new Uint8Array(rawBin)
            view[0] = 64 // 将 ASCII '@' 保存到二进制文件中
            await Neutralino.filesystem.writeBinaryFile(`test.txt`, rawBin)
            const readRes = await Neutralino.filesystem.readFile(`test.txt`)
            console.log(`readRes`, readRes)
          },
        },
        {
          name: `os.open`,
          async fn(){
            const res = await Neutralino.os.open(`https://baidu.com`)
            console.log(`res`, res)
          },
        },
        {
          name: `多线程异步 sleep`,
          async fn(){
            console.time()
            await main.native.sleep(5000)
            console.timeEnd()
            console.time()
            main.native.sleep(5000)
            console.timeEnd()
          },
        },
        {
          name: `遍历文件`,
          fn: async function () {
            let num = 0
            let list = []
            await main.native.fsys.enum( `C:/`, `*.*`, async function (dir, filename, fullpath, findData) {
                num = num + 1
                list.push(fullpath || dir)
                if(num >= 20) {
                  return false
                }
              },
              true,
            )
            console.log(list)
          },
        },

      ],
    }
  },
  methods: {
    runCode() {
      globalThis.ws.call(`run`, [this.code], {runType: `main`})
    },
  },
  watch: {
  },
}
