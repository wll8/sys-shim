<script setup lang="ts">
const checked = ref([])

const checkList = [
  { label: '成功', value: 'success' },
  { label: '失败', value: 'fail' },
  { label: '发送', value: 'send' },
  { label: '接收', value: 'receive' },
  { label: '原始', value: 'native' },
  { label: '环境', value: 'env' },
]
</script>

<template>
  <a-checkbox-group v-model:value="checked" :options="checkList" />
</template>

<style lang="scss" scoped>
.ant-checkbox-group {
  flex-direction: column;
  gap: 10px;
}
</style>
