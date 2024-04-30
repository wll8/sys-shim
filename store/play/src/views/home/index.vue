<script lang="ts" setup>
import type { IChoiceTabChangeValue } from '@/components/environmental-choice/type'
import type { IExecInfoActionOptions, RunCodeType } from '@/store/main/type'
import useMainStore from '@/store/main/main'
import { base64ToObject } from '@/utils/base64'
import MonacoEditorVue3 from '@/components/monaco-editor-vue3/index'

const runOption = reactive<IExecInfoActionOptions>({
  type: 'node',
  code: {
    browser: '',
    native: '',
    node: '',
  },
})

const route = useRoute()
const mainStore = useMainStore()
// 改变代码执行类型
function onTabChange(tabInfo: IChoiceTabChangeValue) {
  runOption.type = tabInfo.value.value
  mainStore.changeExecInfoAction(runOption)
}
// 当代码发生改变绑定回去
watch(() => runOption.code.browser, () => {
  mainStore.changeExecInfoAction(runOption)
})
watch(() => runOption.code.native, () => {
  mainStore.changeExecInfoAction(runOption)
})
watch(() => runOption.code.node, () => {
  mainStore.changeExecInfoAction(runOption)
})
// 监听变化修改代码
watch(() => mainStore.execInfo, () => {
  const execInfo = mainStore.execInfo
  const type = Object.keys(execInfo.code)[0] as RunCodeType
  if (type !== runOption.type)
    runOption.type = type
  if (execInfo.code[type] !== runOption.code)
    runOption.code[type] = execInfo.code[type]
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
      const type = Object.keys(value.code)[0] as RunCodeType
      runOption.type = type as RunCodeType
      runOption.code[type] = value.code[type]
    }
  }
}
dataToExecInfo(route.params.data)

/**
 * 运行代码
 */
function runCode() {

}
const editWidth = ref('100%')
function changeEditWidth(width: number) {
  editWidth.value = `${width - 2}px`
}
setTimeout(() => {
  runOption.code.node = 'console.log(1)'
}, 5000)
</script>

<template>
  <div class="home">
    <playground-layout-wrapper @update:left-width="changeEditWidth">
      <template #left>
        <div class="playground-left-wrap flex">
          <EnvironmentalChoice v-model="runOption.type" @tab-change="onTabChange" @run="runCode" />
          <div class="code-content">
            <template v-if="runOption.type === 'node'">
              <node-editor v-model="runOption.code.node" :is-dark="true" :width="editWidth" />
            </template>
            <template v-else-if="runOption.type === 'browser'">
              <!-- <BasicEdit v-model="runOption.code.browser" /> -->
            </template>
            <template v-else-if="runOption.type === 'native'">
              <!-- <BasicEdit v-model="runOption.code.native" /> -->
            </template>
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
  height: 100%;
}
.code-content {
  width: 100%;
  flex: 1;
  background: transparent;
}
</style>
