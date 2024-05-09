<script setup lang="ts">
import Filter from './components/filter.vue'
import Native from './components/native.vue'

const visible = ref(false)

type OpenType = 'filter' | 'showCode'

const type = ref<OpenType>()

function open(_type: OpenType) {
  type.value = _type
  visible.value = true
}

const component = computed(() => type.value === 'filter' ? Filter : Native)

const codeText = `
import win
import console

var num = console.getNumber("请输入数值:")
console.log("111", num)

win.msgbox('hello')

process.popen('node --version')
`
</script>

<template>
  <div>
    <a-space>
      <a-button @click="open('filter')">
        筛选
      </a-button>
      <!-- <a-button @click="open('showCode')">
        native
      </a-button> -->
    </a-space>
    <a-drawer v-model:open="visible" :title="type === 'filter' ? '筛选' : 'native'">
      <component :is="component" :code-text="codeText" />
    </a-drawer>
  </div>
</template>

<style scoped></style>
