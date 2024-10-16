<script lang="ts" setup>
import * as monaco from 'monaco-editor'

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

import { fetchSize } from './utils/fetch-size.ts'

interface IProps {
  modelValue?: string
  options?: monaco.editor.IStandaloneEditorConstructionOptions
  width?: number | string
  height?: number | string
  theme?: string
}
defineOptions({
  name: 'MonacoEditor',
})

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  options: () => ({
    // 默认值为false
    automaticLayout: true,
  }),
  width: '100%',
  height: '100%',
  theme: 'vs',
})

const emit = defineEmits(['update:modelValue'])
const cssArr = ['css', 'scss', 'less']
const jsonArr = ['json']
const htmlArr = ['html', 'handlebars', 'razor']
const tsArr = ['typescript', 'javascript']
const se: any = globalThis

const el = ref<HTMLDivElement>()
const codeEditor = ref<monaco.editor.IStandaloneCodeEditor>()

// 获取编辑器实例
function getCodeEditorOrigin() {
  if (codeEditor.value)
    return toRaw(codeEditor.value)
}
// 值发生变化
function changeModelValue() {
  const value = getCodeEditorOrigin()!.getValue()
  if (value)
    emit('update:modelValue', value)
  else
    emit('update:modelValue', props.modelValue)
}

onMounted(() => {
// 高亮及提示
  se.MonacoEnvironment = {
    getWorker(_: any, label: any) {
      if (jsonArr.includes(label))
        return new JsonWorker()

      if (cssArr.includes(label))
        return new CssWorker()

      if (htmlArr.includes(label))
        return new HtmlWorker()

      if (tsArr.includes(label))
        return new TsWorker()

      return new EditorWorker()
    },
  }

  // 挂载到dom上
  codeEditor.value = monaco.editor.create(el.value!, {
    language: 'javascript',
    value: props.modelValue,
    theme: 'vs',
    ...props.options,
  })
  // 监听内容变化
  getCodeEditorOrigin()!.onDidChangeModelContent(() => {
    changeModelValue()
  })
})

// 获取容器样式
const editorCodeWrapperStyle = computed(() => {
  return {
    width: fetchSize(props.width!),
    height: fetchSize(props.height!),
  }
})

// 监听字段改变改变编辑器内容
watch(() => props.modelValue, (newValue) => {
  if (codeEditor.value) {
    const codeEditorOrigin = getCodeEditorOrigin()!
    if (codeEditorOrigin.getValue() !== newValue) {
      codeEditorOrigin
        .setValue(newValue)
    }
  }
})

// 更新主题
watchEffect(() => {
  if (codeEditor.value)
    monaco.editor.setTheme(props.theme)
})
onUnmounted(() => {
  // 注销编辑器实例
  if (codeEditor.value)
    getCodeEditorOrigin()!.dispose()
})

defineExpose({
  // 获取编辑器实例
  getCodeEditor() {
    return getCodeEditorOrigin()
  },
})
</script>

<template>
  <div ref="el" class="monaco-editor" :style="editorCodeWrapperStyle" />
</template>

<style lang="scss" scoped>
.monaco-editor {
  resize: vertical;
  overflow: auto;
}
.no-suggestion {
  .suggest-widget {
    display: none !important;
  }
}
.editor-scrollable .lines-content {
  width: 100% !important;
  height: 100% !important;
}
</style>
