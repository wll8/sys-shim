<template>
  <div class="progress-page flex flex-col items-centerflex justify-center items-center h-screen">
    <div text-left class="w-8/10">

      <slot name="title">
        标题
      </slot>

      <slot name="des">
        描述
      </slot>

      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progressBarStyle + '%' }"> </div>
      </div>

      <slot name="logName">
        日志名称
      </slot>

      <ul class="bg-gray-100 p-2 log-box">
        <li v-for="(item, index) in list" :key="index" :class="{'color-red-500': item.isErr}">{{ item.name }}</li>
      </ul>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 进度位置
    cur: {
      type: Number,
      default: 0,
    },
    // 目标最大日志量
    total: {
      type: Number,
      default: 100,
    },
    // 当前日志列表
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
    };
  },
  computed: {
    // 当前进度条
    progressBarStyle() {
      return parseInt(this.cur / this.total * 100) || 0
    },
  },
  watch: {
  },
  methods: {
  },
  async created() {
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