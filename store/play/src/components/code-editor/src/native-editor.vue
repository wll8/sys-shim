<script lang="ts" setup>
import type * as monaco from 'monaco-editor'
import MonacoEditor from '@/components/monaco-editor'
import { useTheme } from '@/hooks/useTheme'

interface IProps {
  modelValue?: string
  height?: number | string
  width?: number | string
}
withDefaults(defineProps<IProps>(), {
  modelValue: '',
  height: '100%',
  width: '100%',
})
const emit = defineEmits(['update:modelValue'])
const { isDark } = useTheme()

function changeValue(value: string) {
  emit('update:modelValue', value)
}
const options = computed<monaco.editor.IStandaloneEditorConstructionOptions>(() => {
  return {
    language: '',
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
    :theme="isDark ? 'vs-dark' : 'vs'"
    @update:model-value="changeValue"
  />
</template>

<style lang="scss" scoped></style>
