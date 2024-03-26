<script lang="ts" setup>
const leftWidth = ref('50%')
const scrollAreaEl = ref<HTMLDivElement>()
const isDragging = ref(false)

function dragStart() {
  isDragging.value = true
}

function dragMove(e: MouseEvent) {
  if (isDragging.value)
    leftWidth.value = `${e.clientX}px`
}

function dragEnd() {
  isDragging.value = false
}
</script>

<template>
  <div
    class="playground-layout-wrapper flex"
    :class="{ dragging: isDragging }"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mouseleave="dragEnd"
  >
    <div class="wrapper-left flex playground" :style="`width: ${leftWidth}`">
      <div class="wrapper-content-wrap">
        <slot name="left" />
      </div>
      <div ref="scrollAreaEl" class="scroll-area" @mousedown.prevent="dragStart" />
    </div>
    <div class="wrapper-right playground flex-1">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.playground-layout-wrapper {
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-top: 50px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.wrapper-content-wrap {
  flex: 1;
}
.dragging {
  cursor: ew-resize;
}
.scroll-area {
  width: 20px;
  cursor: ew-resize;
  position: relative;
  &::after {
    position: absolute;
    content: "";
    width: 1px;
    height: 100%;
    background: #ccc;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
}
</style>
