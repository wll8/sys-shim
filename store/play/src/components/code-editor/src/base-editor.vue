<script lang="ts" setup>
import { basicSetup } from 'codemirror'
import { EditorState, type EditorStateConfig } from '@codemirror/state'
import { EditorView, type EditorViewConfig } from '@codemirror/view'

interface IProps {
  modelValue?: string
  config?: EditorStateConfig
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
})
const emit = defineEmits(['update:modelValue'])
// 创建配置
const createEditorView = (config: EditorViewConfig) => new EditorView(config)
// 生成状态
const creatEditorState = (config: EditorStateConfig) => EditorState.create(config)
const el = ref<HTMLDivElement>()
const editor = ref<EditorView>()
onMounted(() => {
  const codeEl = el!.value!
  const config = props.config ?? {}
  const state = creatEditorState({
    doc: props.modelValue,
    ...config,
    extensions: [
      basicSetup,

      ...(Array.isArray(config.extensions) ? config.extensions : [config.extensions]),
      // 添加时间监听
      EditorView.updateListener.of((viewUpdate) => {
        // 监听代码变化并绑定
        if (viewUpdate.docChanged)
          emit('update:modelValue', viewUpdate.startState.doc.toString())
      }),
    ],
  })
  editor.value = createEditorView({
    state,
    parent: codeEl,
  })
})
defineExpose({
  editor,
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
