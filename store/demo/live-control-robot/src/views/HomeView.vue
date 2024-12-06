<template>
  <div class="page p20px">
    <avue-crud :data="data" :option="option"></avue-crud>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'
import { getUserToken } from '@/util.js'
const shim = globalThis.shim
const native = globalThis.shim.native
const ws = globalThis.shim.ws
const store = storeToRefs(useStore())

const data = ref([
  { name: `张三`, sex: `男` },
  { name: `李四`, sex: `女` },
  { name: `张三`, sex: `男` },
  { name: `李四`, sex: `女` },
  { name: `张三`, sex: `男` },
  { name: `李四`, sex: `女` },
  { name: `张三`, sex: `男` },
  { name: `李四`, sex: `女` },
])

const option = ref({
  height: 300,
  column: [
    { label: `姓名`, prop: `name`, fixed: true },
    { label: `性别`, prop: `sex` },
    { label: `日期`, prop: `datetime` },
    { label: `地址`, prop: `address` },
  ],
})
</script>

<style scoped lang="less">
.page {
  // background-color: #ccc;
}
</style>
