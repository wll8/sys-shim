<template>
  <div class="page p20px">
    <h3 text-center>主配置</h3>
    <avue-crud
      :data="data"
      :option="option"
      @rowUpdate="rowUpdate"
      @rowSave="rowSave"
      @rowDel="rowDel"
    >
      <template #menu="{ row }">
        <el-button @click="next(row)" text type="primary" :disabled="!row.卡密">使用</el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'
import { getUserToken } from '@/util.js'
import http from '@/http.js'
import { useRouter } from 'vue-router'
const shim = globalThis.shim
const native = globalThis.shim.native
const ws = globalThis.shim.ws
const router = useRouter()

const data = ref([])

function getData() {
  http.get(`/config`).then((res) => {
    data.value = res
  })
}
getData()

const option = ref({
  column: [
    { label: `配置名称`, prop: `名称` },
    { label: `卡密`, prop: `卡密` },
  ],
})

function next(row) {
  router.push({
    path: `/page2`,
    query: {
      configId: row.id,
    },
  })
}

async function rowSave(row, done, loading) {
  await http
    .post(`/config`, {
      ...row,
      id: undefined,
    })
    .then((res) => {})
  getData()

  done()
}
async function rowDel(row, index) {
  await http.delete(`/config/${row.id}`).then((res) => {})
  getData()
}
async function rowUpdate(row, index, done, loading) {
  await http.patch(`/config/${row.id}`, row).then((res) => {})
  getData()

  done()
}
</script>

<style scoped lang="less">
.page {
  // background-color: #ccc;
}
</style>
