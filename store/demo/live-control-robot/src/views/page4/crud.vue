<template>
  <div class="com">
    <div>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>{{ props.title }}</span>
          </div>
        </template>
        <div></div>
        <avue-crud
          :data="model.配置"
          :option="props.option"
          @rowUpdate="rowUpdate"
          @rowSave="rowSave"
          @rowDel="rowDel"
        >
          <template #menu-left>
            <el-switch v-model="model.启用" size="large" mx20px />
            <span>回复频率(秒): </span>
            <el-input v-model.number="model.频率" style="width: 70px"> </el-input>
          </template>
        </avue-crud>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, getCurrentInstance } from 'vue'
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'
import http from '@/http.js'
import { getUserToken } from '@/util.js'
import { useRouter } from 'vue-router'
import merge from 'lodash.merge'
import debounce from 'lodash.debounce'
const cur = getCurrentInstance()

const router = useRouter()
const props = defineProps([`option`, `title`])

const model = defineModel()

async function rowSave(row, done, loading) {
  model.value.配置.push(row)

  done()
}
async function rowDel(row, index) {
  model.value.配置.splice(index, 1)
}
async function rowUpdate(row, index, done, loading) {
  model.value.配置[index] = row
  done()
}
</script>

<style scoped lang="less">
.page {
  // background-color: #ccc;
}
</style>
