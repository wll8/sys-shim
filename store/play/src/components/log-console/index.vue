<script lang="ts" setup>
import eruda from 'eruda'
import { useTheme } from '@/hooks/useTheme'

const { isDark } = useTheme()
const logEl = ref<HTMLDivElement>()

function setTheme() {
  (eruda as any)._devTools._setTheme(
    isDark.value ? 'Dark' : 'Light',
  )
}

onMounted(() => {
  eruda.init({
    container: logEl.value,
    tool: ['console'],
    useShadowDom: false,
  })
  nextTick(() => {
    // 移除all属性
    logEl!.value!.style.all = ''
    setTheme()
    // 展示
    eruda.show()
  })
})

// 更新主题
watch(() => isDark.value, () => {
  if (logEl.value)
    setTheme()
})
// 销毁
onUnmounted(() => {
  eruda.destroy()
})
</script>

<template>
  <div ref="logEl" class="log-console w-full h-full" />
</template>

<style lang="scss" scoped>
.log-console {
  transform:translate(0,0);
  position: relative;

  :deep(.eruda-container) {
    position: absolute;
    // 隐藏显示器
    .luna-tab-tabs {
     display: none;
    }
    // 设置高度100%
    .eruda-dev-tools {
      height: 100% !important;
       padding-top: 0 !important;
    }
    // 隐藏打开console按钮
    .eruda-entry-btn {
       display: none;
    }
  }
}
:host {
  all: unset !important;
}
</style>
