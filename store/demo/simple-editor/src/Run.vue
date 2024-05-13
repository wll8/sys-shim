<template>
  <div>
    <vue-monaco-editor
      theme="vs-dark"
      class="editor"
      language="lua"
      v-model:value="code"
    />
  </div>
  <div id="container"></div>
</template>

<script>
import 'luna-command-palette/luna-command-palette.css'
import { VueMonacoEditor, loader } from '@guolao/vue-monaco-editor'
import LunaCommandPalette from 'luna-command-palette'
import * as monaco from "monaco-editor"
import {
  removeLeft,
 } from '@/util.js'

loader.config({ 
  monaco,
 })
 
export default {
  components: { VueMonacoEditor },
  name: 'Run',
  data() {
    return {
      code: removeLeft(`
        var winform = win.form(text="使用说明";right=800;bottom=469;bgcolor=16777215)
        winform.add()

        var wb = web.view(winform);

        wb.html = /**
        <!doctype html>
        <html>
        <pre>
        基于 sys-shim 开发的简易编辑器，<a href="https://github.com/wll8/sys-shim">点击查看源码</a>。

        - 按 ctrl+p 打开命令面板
        - 按 f12 打开控制台查看日志
        - 按 ctrl+e 运行原生代码
          - 你也可以复制 IDE 中的示例至此查看运行情况，例如 范例程序/7) Web 界面/1) web.view/1.view.aardio

        </pre>

        </html>
        **/
        winform.show();
        win.loopMessage();
      `),
    }
  },
  async created() {
    this.code = localStorage.getItem(`code`) || this.code
  },
  async mounted() {
    const vm = this
    const container = document.getElementById('container')
    const commandPalette = new LunaCommandPalette(container, {
      placeholder: '运行命令',
      shortcut: 'Ctrl+P',
      commands: [
        {
          title: '运行此代码',
          shortcut: 'Ctrl+E',
          async handler(e) {
            const [, res] = await globalThis.ws.call(`run`, [vm.code])
            res && alert(res)
          }
        },
        {
          title: '打开控制台',
          async handler(e) {
             const [, res] = await native.key.press(`f12`)
             res && alert(res)
          }
        },
        {
          title: '打开文件',
          shortcut: 'Ctrl+O',
          async handler(e) {
             const [, res] = await native.fsys.dlg.open("aardio 代码文件|*.aardio", "选择 aardio 代码文件")
             if(res) {
              ; [, vm.code] = await native.string.load(res)
             }
          }
        },
        {
          title: '返回CPU商标信息',
          async handler(e) {
             const [, res] = await native.sys.cpu.getBrand()
             res && alert(res)
          }
        },
        {
          title: '打开记事本',
          async handler(e) {
             const [, res] = await native.process.execute("notepad")
             res && alert(res)
          }
        },
        {
          title: '锁定计算机',
          async handler(e) {
             const [, res] = await native.sys.lock()
             res && alert(res)
          }
        },
        {
          title: '查看本项目源码',
          async handler(e) {
             const [, res] = await native.process.execute("https://github.com/wll8/sys-shim")
             res && alert(res)
          }
        },
        {
          title: '查看 sys-shim 使用文档',
          async handler(e) {
             const [, res] = await native.process.execute("https://wll8.github.io/sys-shim-doc/docs/getting-started/introduction.html")
             res && alert(res)
          }
        },
      ]
    })
  },
  methods: {
    runCode() {
      globalThis.ws.call(`run`, [this.code])
    },
  },
  watch: {
    code(newVal) {
      localStorage.setItem(`code`, newVal)
    }
  },
}
</script>
<style scoped>
.editor,
textarea {
  width: 100%;
  min-height: 100vh;
}
</style>
