<script lang="ts" setup>
import type { IChoiceTabChangeValue, TabOptionType } from './type'
import { Run } from '@/assets/svg'

interface IProps {
  modelValue?: string
}
const props = defineProps<IProps>()
const emit = defineEmits(['run', 'tabChange', 'update:modelValue'])
const tabs = ref<TabOptionType[]>([
  {
    label: 'nodejs',
    value: 'node',
  },
  {
    label: 'browser.js',
    value: 'browser',
  },
  {
    label: 'native',
    value: 'native',
  },
])
const currentIndex = ref(0)
watchEffect(() => {
  // 设置激活
  const index = tabs.value.findIndex(item => item.value === props.modelValue)
  currentIndex.value = index
})
// 切换tab栏
function tabChange(value: IChoiceTabChangeValue) {
  emit('tabChange', value)
}
// 运行
function runClick() {
  emit('run')
}
</script>

<template>
  <div class="environmental-choice flex justify-between items-center">
    <div class="choice-left">
      <w-easy-tabs :tabs="tabs" @change="tabChange" />
    </div>
    <div class="choice-right flex items-center run" @click="runClick">
      运行
      <Run width="30px" height="30px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.environmental-choice {
  border-bottom: 1px solid var(--border-color);
  padding: 5px 10px;
  background: var(--bg);
}
.run {
  cursor: pointer;
}
</style>
