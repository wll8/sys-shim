<script lang="ts" setup>
const test = ref('test auto import')
</script>

<template>
  <div class="home">
    <div class="header m-1">
      home
      {{ test }}
      <hello-world />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  background-color: red;
  .header {
    color: yellow;
  }
}
</style>
