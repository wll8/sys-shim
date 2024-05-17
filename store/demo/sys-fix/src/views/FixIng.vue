<template>
  <div class="progress-page flex flex-col items-centerflex justify-center items-center h-screen">
    <div text-left class="w-8/10">

      <h1 text-2xl>正在扫描电脑异常错误文件，发现 <span text-red-500>{{ fixNum }}</span> 个异常项</h1>

      <p>正在检索系统缺失DLL资源库...</p>

      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progressBarStyle + '%' }"> </div>
      </div>

      <div class="tip pt-7 color-red-500">正在扫描以下错误项</div>

      <ul class="bg-gray-100 p-2 log-box">
        <li v-for="(item, index) in itemsOkList" :key="index" v-show="index <= cur" :class="{'color-red-500': item.isErr}">{{ item.name }}</li>
      </ul>

    </div>
  </div>
</template>

<script>
import { randomNumBoth, randomWithToken } from '@/util.js'
import { useDllStore } from '@/stores/dll.js'

export default {
  data() {
    return {
      cur: 0, // 当前已经扫描的数量
      items: [ // 需要扫描的内容
      ],
      itemsOkList: [ // 已扫描的内容
      ],
    };
  },
  computed: {
    // 当前进度条
    progressBarStyle() {
      return parseInt(this.cur / this.items.length * 100) || 0
    },
    // 当前错误数量
    fixNum() {
      return this.itemsOkList.filter(item => item.isErr).length
    },
  },
  watch: {
    progressBarStyle: {
      immediate: true,
      handler(newValue, oldValue) {
        if(newValue >= 100) {
          setTimeout(() => {
            this.$router.push({
              path: `/FixRes`,
              query: {
                fixNum: this.fixNum,
                itemsOkListLength: this.itemsOkList.length,
              },
            })
          }, 1000);
        }
      },
    },
  },
  methods: {
    // 验证 dll 是否错误，模拟
    async checkErrMock(dll) {
      const timeout = randomNumBoth(200, 500)
      return new Promise(async (resolve, reject) => {
        const num = randomWithToken(1, 100, dll.repeat(32))
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
    const [, getSysDir] = await sys.native.fsys.getSysDir()
    const [, curDir] = await sys.native.io.curDir()
    let [, list] = await sys.native.fsys.list(getSysDir, `*?`, `*.dll`)
    // this.items = list
    this.items = list.slice(0, 200)
    this.items.forEach(async (item, index) => {
      const isErr = await this.checkErrMock(item)
      this.itemsOkList.unshift({
        name: item,
        isErr,
      })
      this.cur = this.cur + 1
    })
  },
};
</script>

<style scoped lang="less">
.log-box {
  height: calc(100vh - 280px);
  overflow-y: auto;
}

.progress-page {
  font-family: 'Roboto', sans-serif;
  text-align: center;
}

.progress-page h1,
.progress-page p {
  line-height: 1.5;
}

.progress-page ul {
  list-style-type: none;
}

.progress-page li {
  font-size: 14px;
  line-height: 1.5;
}

.progress-bar-container {
  position: relative;
  margin: 20px auto;
  height: 20px;
  background-color: #f5f5f5;
  overflow: hidden;
  border-radius: 10px;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  line-height: 20px;
  box-sizing: border-box;
  padding: 0 5px;
  color: #333;
  font-size: 12px;
  background-color: #00bfff;
  transition: width 0.5s;
}
</style>