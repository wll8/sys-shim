<template>
  <div>
    <ProgressCom :cur="itemsOkList.length" :total="items.length" :list="itemsOkList.slice(0, 500)">
      <template #title>
        <h1 text-2xl>正在扫描电脑异常错误文件，发现 <span text-red-500>{{ fixNum }}</span> 个异常项</h1>
      </template>
      <template #des>
        <p>正在检索系统缺失DLL资源库...</p>
      </template>
      <template #logName>
        <div class="tip pt-7 color-red-500">正在扫描以下错误项</div>
      </template>
    </ProgressCom>
  </div>
</template>

<script>
import { randomNumBoth, randomWithToken } from '@/util.js'
import ProgressCom from './Progress.vue'
import { useDllStore } from '@/stores/dll.js'

export default {
  components: {
    ProgressCom,
  },
  data() {
    return {
      items: [ // 需要扫描的内容
      ],
      itemsOkList: [ // 已扫描的内容
      ],
    };
  },
  computed: {
    // 当前错误数量
    fixNum() {
      return this.itemsOkList.filter(item => item.isErr).length
    },
  },
  methods: {
    // 上次处理结果
    getStore() {
      return JSON.parse(localStorage.getItem(`sys-fix`) || `{}`)
    }, 
    // 要处理的 dll 列表
    async getDllList() {
      const [, getSysDir] = await sys.native.fsys.getSysDir()
      const [, sysRoot] = await sys.native.string.getenv("SystemRoot")
      let [, list] = await sys.native.fsys.list(getSysDir, `*?`, `*.dll`)
      list = list.map(item => `${getSysDir}\\${item}`)

      const sysDllPath = `${sysRoot}\\system32`
      let [, sysDllList] = await sys.native.fsys.list(sysDllPath, `*?`, `*.dll`)
      sysDllList = sysDllList.map(item => `${sysDllPath}\\${item}`)

      const items = [...list, ...sysDllList]
      return items
    },
    // 验证 dll 是否错误，模拟
    async checkErrMock(dll) {
      const timeout = randomNumBoth(200, 500)
      return new Promise(async (resolve, reject) => {
        const num = this.getStore().fixEd ? 100 : randomWithToken(1, 100, dll.repeat(32))
        setTimeout(() => {
          resolve(num <= 1)
        }, timeout);
      })
    },
    // 验证 dll 是否已注册，很慢
    async checkErr(dll) {
      const [, dumpbin] = await sys.ws.call(`run`, [`return process.popen("reg query HKCR\\CLSID /s /f ${dll}").readAll()`])
      return dumpbin.includes(`0 匹配`)
    },
  },
  async created() {
    this.items = await this.getDllList()
    await Promise.all(this.items.map(async (item, index) => {
      const isErr = await this.checkErrMock(item)
      this.itemsOkList.unshift({
        name: item,
        isErr,
      })
    }))
    this.$router.push({
      path: `/ScanRes`,
      query: {
        fixNum: this.fixNum,
        fixList: JSON.stringify(this.itemsOkList.filter(item => item.isErr).map(item => item.name)),
      },
    })
  },
};
</script>

<style scoped lang="less"></style>