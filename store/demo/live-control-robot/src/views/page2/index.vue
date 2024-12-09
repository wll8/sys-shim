<template>
  <div class="page p20px">
    <h3 text-center>平台选择</h3>
    <avue-crud
      :data="data"
      :option="option"
      @rowUpdate="rowUpdate"
      @rowSave="rowSave"
      @rowDel="rowDel"
    >
      <template #menu="{ row }">
        <el-button @click="next(row)" text type="primary" :disabled="row.状态 !== `可使用`"
          >使用</el-button
        >
      </template>
      <template #menu-left>
        <el-button icon="el-icon-back" @click="router.back()">返回</el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/http.js'
const shim = globalThis.shim
const native = globalThis.shim.native
const ws = globalThis.shim.ws
const router = useRouter()

const data = ref([])

const additional = {
  ...router.currentRoute.value.query,
}
function getData() {
  http.get(`/platform`).then((res) => {
    data.value = res
  })
}
getData()

const option = ref({
  column: [
    { label: `名称`, prop: `名称` },
    {
      label: `logo`,
      prop: `封面`,
      type: `upload`,
      action: `/upload/file`,
      dataType: `object`,
      accept: `image/png, image/jpeg`,
      limit: 1,
      multiple: false,
    },
    { label: `网址`, prop: `网址` },
    {
      label: `状态`,
      prop: `状态`,
      type: `select`,
      dicData: [
        {
          label: `可使用`,
          value: `可使用`,
        },
        {
          label: `开发中`,
          value: `开发中`,
        },
      ],
    },
  ],
})
function next(row) {
  router.push({
    path: `/page3`,
    query: {
      ...additional,
      platformId: row.id,
    },
  })
}

async function rowSave(row, done, loading) {
  await http
    .post(`/platform`, {
      ...row,
      id: undefined,
    })
    .then((res) => {})
  getData()

  done()
}
async function rowDel(row, index) {
  await http.delete(`/platform/${row.id}`).then((res) => {})
  getData()
}
async function rowUpdate(row, index, done, loading) {
  await http.patch(`/platform/${row.id}`, row).then((res) => {})
  getData()

  done()
}
</script>

<style scoped lang="less">
.page {
  // background-color: #ccc;
}
</style>
