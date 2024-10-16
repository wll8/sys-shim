<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { execCode } from '@/utils/exec-code'
import type { IChoiceTabChangeValue } from '@/components/environmental-choice/type'
import useMainStore from '@/store/main/main'
import { base64ToObject } from '@/utils/base64'

const route = useRoute()

const mainStore = useMainStore()
const { execInfo } = storeToRefs(mainStore)
// 改变代码执行类型
function onTabChange(tabInfo: IChoiceTabChangeValue) {
  execInfo.value.type = tabInfo.value.value
}

/**
 * 加载代码，通过分享加载代码
 */
function dataToExecInfo(data: string | string[]) {
  if (data && typeof data === 'string') {
    const value = base64ToObject(data)
    // 不是特殊数据在加载数据
    if (value && value.env)
      mainStore.urlDataToExecInfoAction(value)
  }
}
dataToExecInfo(route.params.data)

/**
 * 运行代码
 */
function runCode() {
  // 1. 得到代码
  const code = execInfo.value.code[execInfo.value.type]
  // 2. 执行代码
  if (main && code) {
    switch (execInfo.value.type) {
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
          <EnvironmentalChoice v-model="execInfo.type" @tab-change="onTabChange" @run="runCode" />
          <div class="code-content">
            <template v-if="execInfo.type === 'node'">
              <node-editor v-model="execInfo.code.node" />
            </template>
            <template v-else-if="execInfo.type === 'browser'">
              <node-editor v-model="execInfo.code.browser" />
            </template>
            <template v-else-if="execInfo.type === 'native'">
              <native-editor v-model="execInfo.code.native" />
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
