<script setup lang="ts">
import { useTheme } from './hooks/useTheme'

const { antTheme } = useTheme()
onMounted(() => {

})
</script>

<template>
  <a-config-provider
    :theme="antTheme"
  >
    <div class="app">
      <nav-header />
      <router-view />
    </div>
  </a-config-provider>
</template>

<style scoped>

</style>
