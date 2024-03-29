<script lang="ts" setup>
import type { IChoiceTabChangeValue } from '@/components/environmental-choice/type'
import type { IExecInfoActionOptions, RunCodeType } from '@/store/main/type'
import useMainStore from '@/store/main/main'
import { base64ToObject } from '@/utils/base64'

const runOption = reactive<IExecInfoActionOptions>({
  type: 'node',
  code: '',
})
const route = useRoute()
const mainStore = useMainStore()
// 改变代码执行类型
function onTabChange(tabInfo: IChoiceTabChangeValue) {
  runOption.type = tabInfo.value.value
  mainStore.changeExecInfoAction(runOption)
}
// 当代码发生改变绑定回去
watch(() => runOption.code, () => {
  mainStore.changeExecInfoAction(runOption)
})
/**
 * 加载代码
 */
function dataToExecInfo(data: string | string[]) {
  if (data && typeof data === 'string') {
    const value = base64ToObject(data)
    // 不是特殊数据在加载数据
    if (value && value.env) {
      mainStore.urlDataToExecInfoAction(value)
      // 得到渲染数据
      const [type] = Object.keys(value.code)
      runOption.type = type as RunCodeType
      runOption.code = value.code[type]
    }
  }
}
dataToExecInfo(route.params.data)

/**
 * 运行代码
 */
function runCode() {

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
