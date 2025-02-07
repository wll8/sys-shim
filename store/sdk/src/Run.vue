<template>
  <div>
    <vue-monaco-editor
      @keydown.ctrl.e.prevent="runCode"
      @keydown.ctrl.s.prevent="() => {}"
      :options="{
        tabSize: 2, // tab 缩进长度
      }"
      class="editor"
      v-model:value="code"
    />
  </div>
</template>

<script>
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'

export default {
  components: { VueMonacoEditor },
  name: 'Run',
  data() {
    return {
      code: ``,
    }
  },
  created() {
    this.code = localStorage.getItem(`code`) || this.code
  },
  methods: {
    runCode() {
      globalThis.ws.call(`run`, [this.code])
    },
    insertInputTxt(insertTxt = `  `) {
      let elInput = this.$refs.myRef
      let startPos = elInput.selectionStart
      let endPos = elInput.selectionEnd
      if (startPos === undefined || endPos === undefined) return
      let txt = elInput.value
      let result = txt.substring(0, startPos) + insertTxt + txt.substring(endPos)
      elInput.value = result
      elInput.focus()
      elInput.selectionStart = startPos + insertTxt.length
      elInput.selectionEnd = startPos + insertTxt.length
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
