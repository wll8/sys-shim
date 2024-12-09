<template>
  <div class="page p20px">
    <h3 text-center>平台配置</h3>
    <avue-crud
      :data="data"
      :option="option"
      @rowUpdate="rowUpdate"
      @rowSave="rowSave"
      @rowDel="rowDel"
    >
      <template #menu-left>
        <el-button icon="el-icon-back" @click="router.back()">返回</el-button>
      </template>
      <template #menu="{ row }">
        <el-button @click="next(row)" text type="primary">使用</el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'
import http from '@/http.js'
import { getUserToken } from '@/util.js'
import { useRouter } from 'vue-router'
const shim = globalThis.shim
const native = globalThis.shim.native
const ws = globalThis.shim.ws
const router = useRouter()

const option = ref({
  column: [
    { label: `配置名称`, prop: `名称` },
    {
      label: `脚本文件`,
      prop: `脚本文件`,
      type: `upload`,
      action: `/upload/file`,
      dataType: `object`,
      render({ row }) {
        const list = row.脚本文件.map((item) => item.label)
        return list.join(`, `)
      },
      accept: `text/javascript, application/javascript`,
      limit: 1,
      multiple: false,
    },
    { label: `数据目录`, prop: `数据目录` },
  ],
})

const data = ref([])

const additional = {
  ...router.currentRoute.value.query,
}
function getData() {
  http
    .get(`/devicePlatformConfig`, {
      params: {
        ...additional,
      },
    })
    .then((res) => {
      data.value = res
    })
}
getData()

function next(row) {
  router.push({
    path: `/page4`,
    query: {
      ...additional,
      devicePlatformConfigId: row.id,
    },
  })
}

async function rowSave(row, done, loading) {
  await http
    .post(`/devicePlatformConfig`, {
      ...additional,
      ...row,
      id: undefined,
    })
    .then((res) => {})
  getData()

  done()
}
async function rowDel(row, index) {
  await http.delete(`/devicePlatformConfig/${row.id}`).then((res) => {})
  getData()
}
async function rowUpdate(row, index, done, loading) {
  await http
    .patch(`/devicePlatformConfig/${row.id}`, {
      ...additional,
      ...row,
    })
    .then((res) => {})
  getData()

  done()
}
</script>

<style scoped lang="less">
.page {
  // background-color: #ccc;
}
</style>
