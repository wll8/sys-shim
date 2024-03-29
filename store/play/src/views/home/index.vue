<script lang="ts" setup>
import type { IChoiceTabChangeValue } from '@/components/environmental-choice/type'
import type { IExecInfoActionOptions } from '@/store/main/type'
import useMainStore from '@/store/main/main'

const runOption = reactive<IExecInfoActionOptions>({
  type: 'node',
  code: '',
})

// 改变代码执行类型
function onTabChange(tabInfo: IChoiceTabChangeValue) {
  runOption.type = tabInfo.value.value
}
const mainStore = useMainStore()
// 运行代码
function runCode() {
  // 生成执行内容
  mainStore.changeExecInfoAction(runOption)
}
</script>

<template>
  <div class="home">
    <playground-layout-wrapper>
      <template #left>
        <div class="playground-left-wrap flex">
          <EnvironmentalChoice @tab-change="onTabChange" @run="runCode" />
          <div class="code-content">
            <node-editor v-model="runOption.code" />
          </div>
        </div>
      </template>
      <template #right>
        <LogFilter />
      </template>
    </playground-layout-wrapper>
  </div>
</template>

<style lang="scss" scoped>
.playground-left-wrap {
  flex-direction: column;
}
.code-content {
  width: 100%;
  flex: 1;
  background: transparent;
}
</style>
