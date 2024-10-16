<script setup lang="ts">
import { useTheme } from './hooks/useTheme'

const { antTheme } = useTheme()

onMounted(() => {
  // 注入
  if (globalThis.Sys) {
    new globalThis.Sys({ log: true, wsUrl: import.meta.env.VITE_SERVER_BASEURL }).then(async (main: any) => {
      // globalThis.Neutralino = await main.api.neutralino()
      globalThis.main = main
      globalThis.native = main.native
      globalThis.msg = new main.Msg()
    })
  }
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
