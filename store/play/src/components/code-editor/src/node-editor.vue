<script lang="ts" setup>
import type * as monaco from 'monaco-editor'
import MonacoEditor from '@/components/monaco-editor'

interface IProps {
  modelValue?: string
  isDark?: boolean
  height?: number | string
  width?: number | string
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  isDark: false,
  height: '100%',
  width: '100%',
})
const emit = defineEmits(['update:modelValue'])
function changeValue(value: string) {
  emit('update:modelValue', value)
}
const options = computed<monaco.editor.IStandaloneEditorConstructionOptions>(() => {
  return {
    theme: props.isDark ? 'vs-dark' : 'vs',
    language: 'javascript',
    minimap: {
      enabled: false,
    },
    automaticLayout: true,
  }
})
</script>

<template>
  <MonacoEditor
    :width="width"
    :height="height"
    :options="options"
    :model-value="modelValue"
    @update:model-value="changeValue"
  />
</template>

<style lang="scss" scoped></style>
