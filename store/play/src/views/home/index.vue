<script lang="ts" setup>
import { execCode } from '@/utils/exec-code'
import type { IChoiceTabChangeValue } from '@/components/environmental-choice/type'
import type { IExecInfoActionOptions, RunCodeType } from '@/store/main/type'
import useMainStore from '@/store/main/main'
import { base64ToObject } from '@/utils/base64'

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

// 监听变化修改代码，代码重置时修改显示内容
watch(() => mainStore.execInfo, () => {
  const execInfo = mainStore.execInfo
  const type = execInfo.type
  if (type !== runOption.type)
    runOption.type = type
  if (execInfo.code[type] !== runOption.code)
    runOption.code[type] = execInfo.code[type]
}, {
  immediate: true,
  deep: true,
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
      const type = value.type as RunCodeType
      runOption.type = type
      runOption.code[type] = value.code[type]
    }
  }
}
dataToExecInfo(route.params.data)

/**
 * 运行代码
 */
function runCode() {
  // 1. 得到代码
  const code = runOption.code[runOption.type]
  // 2. 执行代码
  if (main && code) {
    switch (runOption.type) {
      case 'node':
        // node执行
        return
      case 'browser':
        // 浏览器执行
        execCode(code, true)
        return
      // native执行
      case 'native':
        main.ws.call('run', [code])
    }
  }
}
</script>

<template>
  <div class="home">
    <playground-layout-wrapper>
      <template #left>
        <div class="playground-left-wrap flex">
          <EnvironmentalChoice v-model="runOption.type" @tab-change="onTabChange" @run="runCode" />
          <div class="code-content">
            <template v-if="runOption.type === 'node'">
              <node-editor v-model="runOption.code.node" />
            </template>
            <template v-else-if="runOption.type === 'browser'">
              <node-editor v-model="runOption.code.browser" />
            </template>
            <template v-else-if="runOption.type === 'native'">
              <native-editor v-model="runOption.code.native" />
            </template>
          </div>
        </div>
      </template>
      <template #right>
        <section class="playground-right-content h-full flex flex-col">
          <!-- <section class="right-content-header flex justify-end">
            <LogFilter />
          </section> -->
          <section class="log-content h-full flex-1">
            <LogConsole />
          </section>
        </section>
      </template>
    </playground-layout-wrapper>
  </div>
</template>

<style lang="scss" scoped>
.playground-left-wrap {
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.code-content {
  width: 100%;
  flex: 1;
  background: transparent;
}

/*
 * playground-right-content
 */
// right-content-header
.right-content-header {
  padding: 5px 10px;
  border-bottom: 1px solid var(--border-color);
}
</style>
