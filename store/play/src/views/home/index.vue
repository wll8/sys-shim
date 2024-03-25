<script lang="ts" setup>
const test = ref('test auto import')
</script>

<template>
  <div class="home">
    <div class="header m1">
      {{ test }}
      <LogFilter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
