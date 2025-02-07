<template>
  <div :class="[`pageMain`, { min: isExpand }]">
    <div>
      <el-button v-if="isExpand" @click="toggle" circle :icon="DArrowRight"></el-button>
      <el-button v-if="!isExpand" @click="toggle" circle :icon="DArrowLeft"></el-button>
    </div>
    <router-view />
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { DArrowRight, DArrowLeft } from '@element-plus/icons-vue'

const isExpand = ref(false)

function toggle() {
  isExpand.value = !isExpand.value
  if (isExpand.value) {
    globalThis.ws.call(
      `run`,
      [
        ``,
      ],
      {
        runType: `main`,
      },
    )
  } else {
    globalThis.ws.call(
      `run`,
      [
        ``,
      ],
      {
        runType: `main`,
      },
    )
  }
}
</script>
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
.pageMain {
  background-color: #fff;
  border-radius: 10px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
  &.min {
    width: 30px;
    height: 30px;
    overflow: hidden;
  }
  // background-color: #ccc;
}
</style>
