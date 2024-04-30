// / <reference path="../types/global.d.ts" />
// / <reference path="../types/typings.d.ts" />

const sleep = time => new Promise(resolve => setTimeout(resolve,time))
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
              `
              var cmd = ...
              var node = process.popen(cmd)
              // node.codepage = 936
              var winform = win.form({})
              winform.messageOnly()
              var timer = winform.setInterval(function(){
                var s = string.concat(node.peek(0));
                var e = string.concat(node.peekErr(0));
                if(s || e) thread.command.publish("pipe", s, e)
                if( !( node.process && node.process.stillActive() ) ) {
                  timer = null;
                  return 0;
                }
              }, 500)
              // 由于有了 win.loopMessage 所以不能使用 return ，需要使用 publish 手动返回
              thread.command.publish(runid, false, node.process.id);
              win.loopMessage()
              `,
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
                `
                var data = string.loadBuffer("D:/git2/sys-ui/win-api/favicon-48.ico")
                return data
                `,
              ],
            )
            let [writeErr, write] = await ws.call(
              `run`,
              [
                `
                var data = ...
                var buffer = raw.buffer(data)
                string.save("D:/git2/sys-ui/win-api/dist/out-1.ico", buffer)
                return buffer
                `,
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
                `
                return ...
                `,
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
                ` 
                  return table.concat({...}, {"${x}", 9, 9, 9})
                `,
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
                    `
                    var buffer = raw.buffer(...)
                    string.save("D:/git2/sys-ui/win-api/dist/out-2.ico", buffer)
                    return buffer
                    `,
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
              `
                        var arg = ...
                        fsys.createDir(arg)
                        `,
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
              `
                        var arg = ...
                        var remoteFile = inet.httpFile(arg ,"C:/my/")
                        return remoteFile.download()
                        `,
              url,
            ])
          },
        },
        {
          name: `定位文件`,
          async fn() {
            const url = `C:/my/services-on-server-install-worksheet.xlsx`
            await ws.call(`run`, [
              `
                        var arg = ...
                        process.exploreSelect(arg);
                        `,
              url,
            ])
          },
        },
        {
          name: `上传文件`,
          async fn() {
            await ws.call(`run`, [
              `
                        var http = inet.http(); 
                        http.addHeaders = "Name1:value1";  
                        var formData = web.multipartFormData();
                        formData.add("file1","@C:/my/services-on-server-install-worksheet.xlsx") 
                        var data = http.post("http://httpbin.org/post" 
                          , formData.readAll()
                          , formData.contentHeader() 
                        );
                        return data
                        `,
            ])
          },
        },
        {
          name: `打开文件`,
          async fn() {
            await ws.call(`run`, [
              `
                        process.execute("C:/my/services-on-server-install-worksheet.xlsx")
                        `,
            ])
          },
        },
        {
          name: `打开记事本`,
          async fn() {
            await ws.call(`run`, [
              `
                        process.execute("notepad")
                        `,
            ])
          },
        },
        {
          name: `删除目录`,
          async fn() {
            await ws.call(`run`, [
              `
                        import process.popen
                        process.popen("cmd /k rd /s /q C:\\my")
                        `,
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
