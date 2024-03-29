<script lang="ts" setup>
import { javascript } from '@codemirror/lang-javascript'
import BaseEditor from './base-editor.vue'

interface IProps {
  modelValue?: string
}
withDefaults(defineProps<IProps>(), {
  modelValue: '',
})
const emit = defineEmits(['update:modelValue'])
function changeValue(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <BaseEditor
    :config="{ extensions: [javascript()] }"
    :model-value="modelValue"
    @update:model-value="changeValue"
  />
</template>

<style lang="scss" scoped></style>
