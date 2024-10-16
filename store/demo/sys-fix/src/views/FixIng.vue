<template>
  <div>
    <ProgressCom
      :cur="itemsOkList.length"
      :total="items.length"
      :list="itemsOkList.slice(0, 500)"
    >
      <template #title>
        <h1 text-2xl>正在修复电脑异常错误文件，已修复 <span text-red-500>{{ fixNumEd }} / {{ fixNum }} </span> 个异常项</h1>
      </template>
      <template #des>
        <p>正在修复错误的DLL资源库...</p>
      </template>
      <template #logName>
        <div class="tip pt-7">日志：</div>
      </template>
    </ProgressCom>
  </div>
</template>

<script>
import { randomNumBoth, randomWithToken } from '@/util.js'
import ProgressCom from './Progress.vue'
import { useDllStore } from '@/stores/dll.js'
import pLimit from 'p-limit';

export default {
  components: {
    ProgressCom,
  },
  data() {
    return {
      fixNum: 0, // 应修复数
      fixList: [], // 应修复列表
      items: [ // 需要扫描的内容
      ],
      itemsOkList: [ // 已扫描的内容
      ],
    };
  },
  computed: {
    // 已修复数
    fixNumEd() {
      return parseInt(this.itemsOkList.length / this.items.length * this.fixNum) || 0
    },
  },
  async created() {
    let { fixNum, fixList } = this.$route.query
    this.fixNum = Number(fixNum)
    fixList = JSON.parse(fixList)
    this.fixList = fixList
    this.doFix()
  },
  methods: {
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
    async doFix() {
      this.items = await this.getDllList()
      const limit = pLimit(5);
      const input = this.items.map(item => limit(async () => {
        const cmd = `regsvr32.exe /s ${item}`
        await sys.native.process.popen.cmd(cmd)
        this.itemsOkList.unshift({
          name: cmd,
          isErr: false,
        })
      }))
      await Promise.all(input);
      localStorage.setItem(`sys-fix`, JSON.stringify({
        fixNum: 0,
        fixEd: true,
        fixList: [],
      }, null, 2))
      this.$router.push({
        path: `/ScanRes`,
        query: {
          fixNum: 0,
          fixList: JSON.stringify([]),
        },
      })
    },
    // 判断是否修复成功
    checkOk() {
      
    },
  },
};
</script>

<style scoped lang="less">

</style>