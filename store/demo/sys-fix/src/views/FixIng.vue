<template>
  <div class="progress-page flex flex-col items-centerflex justify-center items-center h-screen">
    <div text-left class="w-8/10">

      <h1 text-2xl>正在扫描电脑异常错误文件，发现 <span text-red-500>{{ fixNum }}</span> 个异常项</h1>

      <p>正在检索系统缺失DLL资源库...</p>

      {{ progressBarStyle }}
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progressBarStyle + '%' }"></div>
      </div>

      <div class="tip pt-7 color-red-500">正在扫描以下错误项</div>

      <ul class="bg-gray-100 p-2 log-box">
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
      </ul>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fixNum: 2, // 错误数量
      cur: 7, // 当前已经扫描的数量
      items: [ // 需要扫描的内容
        '正在分析 iernonce.dll...',
        '正在分析 iepeers.dll...',
        '正在分析 iernonce.dll...',
        '正在分析 iepeers.dll...',
        '正在分析 iernonce.dll...',
        '正在分析 iepeers.dll...',
        '正在分析 icarosCache.dll...'
      ],
    };
  },
  computed: {
    progressBarStyle() {
      return parseInt(this.cur / this.items.length * 100)
    },
  },
  watch: {
    progressBarStyle: {
      immediate: true,
      handler(newValue, oldValue) {
        if(newValue >= 100) {
          setTimeout(() => {
            this.$router.push(`/FixRes`)
          }, 1000);
        }
      },
    },
  },
  created() {
  },
};
</script>

<style scoped lang="less">
.log-box {
  max-height: calc(100vh - 280px);
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
  color: #999;
  font-size: 14px;
  line-height: 1.5;
}

.progress-bar-container {
  position: relative;
  margin: 14px auto;
  height: 14px;
  background-color: #f5f5f5;
  overflow: hidden;
  border-radius: 10px;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #00bfff;
  transition: width 0.5s;
}
</style>