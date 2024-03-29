<script lang="ts" setup>
import type { EditorView } from 'codemirror'

import type { EditorState, EditorStateConfig } from '@codemirror/state'
import { creatEditorState, createEditorView, getEditorTools } from './utils'

interface IProps {
  modelValue?: string
  config?: EditorStateConfig
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
})
const emit = defineEmits(['update:modelValue'])

const el = ref<HTMLDivElement>()
const editorView = ref<EditorView>()
const editorState = ref<EditorState>()
// 获取工具方法
const editorTools = ref<ReturnType<typeof getEditorTools>>()

onMounted(() => {
  const codeEl = el!.value!
  const config = props.config ?? {}
  const state = creatEditorState({
    doc: props.modelValue,
    ...config,
    // 指自定义封装绑定事件
    onChange: (value) => {
      emit('update:modelValue', value)
    },
  })
  editorState.value = state
  const view = createEditorView({
    state,
    parent: codeEl,
  })
  editorTools.value = getEditorTools(view)
  editorView.value = view
})

// 监听代码变化更新代码内容
watch(() => props.modelValue, () => {
  if (editorTools.value)
    editorTools.value.setDoc(props.modelValue)
})
// 抛出方法
defineExpose({
  editorView,
  editorState,
  editorTools,
})
</script>

<template>
  <div ref="el" class="base-editor" />
</template>

<style lang="scss" scoped>
.base-editor {
  width: 100%;
  height: 100%;
  :deep(.cm-editor) {
    font-size: var(--code-size);
    font-family: Consolas, "Courier New", monospace;
    &.cm-focused {
      outline: var(--code-outline);

    }
    .cm-activeLine {
      background: var(--code-activeLine-color);
    }
    .cm-gutters {
      background: var(--code-gutters-bg-color);
      border-right: var(--code-gutters-border-right);
      color: var(--code-gutters-color);
    }
    .cm-activeLineGutter {
      background: var(--code-gutters-activeLine-bg-color);
    }
  }
}
</style>
