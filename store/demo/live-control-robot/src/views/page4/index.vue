<template>
  <div class="page">
    <el-button icon="el-icon-back" @click="back">返回</el-button>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="智能客服" name="first">
        <crud
          v-model="devicePlatformConfig.action.智能客服.文字回复"
          title="文字回复"
          :option="{
            column: [
              { label: `关键词`, prop: `关键词` },
              { label: `回复`, prop: `回复` },
            ],
          }"
        />
        <crud
          mt10px
          v-model="devicePlatformConfig.action.智能客服.语音回复"
          title="语音回复(mp3,wav)"
          :option="{
            column: [
              { label: `关键词`, prop: `关键词` },
              {
                label: `回复`,
                prop: `回复`,
                type: `upload`,
                action: `/upload/file`,
                dataType: `object`,
                accept: `audio/mpeg, audio/wav`,
                multiple: true,
                render({ row }) {
                  const list = row.回复.map((item) => item.label)
                  return list.join(`, `)
                },
              },
            ],
          }"
        />
      </el-tab-pane>
      <el-tab-pane label="场控助手" name="second">
        <crud
          v-model="devicePlatformConfig.action.场控助手.直播间发言"
          title="直播间发言"
          :option="{
            column: [{ label: `话术`, prop: `话术` }],
          }"
        />
        <crud
          mt10px
          v-model="devicePlatformConfig.action.场控助手.评论上墙"
          title="评论上墙"
          :option="{
            column: [{ label: `话术`, prop: `话术` }],
          }"
        />
      </el-tab-pane>
      <el-tab-pane label="商品采集/讲解" name="third">商品采集</el-tab-pane>
      <el-tab-pane label="常见问题" name="fourth">
        <ol>
          <li>挂贴片太快会提示频繁，建议120秒</li>
          <li>用其他的浏览器去看数据,本工具不能离开中控台</li>
        </ol>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'
import http from '@/http.js'
import { flatObj, deepGet } from '@/util.js'
import { useRouter } from 'vue-router'
import merge from 'lodash.merge'
import crud from './crud.vue'
import debounce from 'lodash.debounce'

const store = useStore()
const activeName = ref(`first`)

const router = useRouter()

const getBase = () => {
  return {
    action: {
      智能客服: {
        文字回复: {
          频率: 1,
          启用: false,
          配置: [],
        },
        语音回复: {
          频率: 1,
          启用: false,
          配置: [],
        },
      },
      场控助手: {
        直播间发言: {
          频率: 1,
          启用: false,
          配置: [],
        },
        评论上墙: {
          频率: 1,
          启用: false,
          配置: [],
        },
      },
      商品助手: {
        商品管理: {
          卖点: {
            最小序号: 1,
            最大序号: 4,
          },
          删除: {
            最小序号: 1,
            最大序号: 4,
          },
        },
        上下车: {
          自动: false,
          在线低于: 1,
          在线高于: 4,
          定时: false,
          上车保持: 1,
          过: 4,
          生效: false,
        },
        弹窗过品: {
          启用: false,
          商品弹窗: false,
          顺序开始: 1,
          顺序结束: 4,
          自动过品: false,
          指定商品: `1 2 4 5`,
        },
      },
    },
  }
}

const keyList = Object.keys(flatObj(getBase()))
console.log(`keyList`, keyList)

const update = debounce((data) => {
  http.patch(`/devicePlatformConfig/${additional.devicePlatformConfigId}`, data)
})

const devicePlatformConfig = ref(getBase())

const keyByValueUpdate = debounce((key, newVal, oldVal) => {
  const ws = globalThis.ws
  const arg = [key, newVal, oldVal, devicePlatformConfig.value]
  ws.call(`run`, [
    `
      thread.command.publish(...);
      `,
    ...arg,
  ])
})

const additional = {
  ...router.currentRoute.value.query,
}
function getData() {
  http.get(`/devicePlatformConfig/${additional.devicePlatformConfigId}`).then((res) => {
    devicePlatformConfig.value = merge(getBase(), res)
  })
}
getData()

async function back() {
  const hwnd = store.devicePlatformConfigIdByHwnd[devicePlatformConfig.value.id] || 0
  const [, form] = await globalThis.shim.nativeMain.win._form.getForm(hwnd)
  if (form) {
    const ws = globalThis.ws
    ws.call(
      `run`,
      [
        `
          win.close(global.G.winformSub.wbPage.hwndChrome)
        `,
      ],
      {
        runType: `main`,
      },
    )
    globalThis.shim.nativeMain.win.close(hwnd)
    router.back()
  }
}

const handleClick = (tab, event) => {
  console.log(tab, event)
}

keyList.forEach((key) => {
  watch(
    () => {
      return deepGet(devicePlatformConfig.value, key)
    },
    (newVal, oldVal) => {
      keyByValueUpdate(key, newVal, oldVal)
    },
    {
      immediate: true,
    },
  )
})

watch(
  devicePlatformConfig,
  (newVal, oldVal) => {
    update(newVal)
  },
  {
    deep: true,
  },
)
</script>

<style scoped lang="less">
.page {
  padding-top: 20px;
}
</style>
