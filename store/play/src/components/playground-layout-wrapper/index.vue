<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'update:leftWidth', width: number): void
}>()
const leftWidth = ref('50%')
const scrollAreaEl = ref<HTMLDivElement>()
const isDragging = ref(false)
function dragStart() {
  isDragging.value = true
}
// 最小宽度
const minWidth = ref(300)
// const maxWidth = ref()
function dragMove(e: MouseEvent) {
  if (isDragging.value) {
    if (e.clientX >= minWidth.value) {
      leftWidth.value = `${e.clientX}px`
      emit('update:leftWidth', e.clientX)
    }
  }
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
    <div class="wrapper-left  playground" :style="`width: ${leftWidth}`">
      <div class="playground-content" flex>
        <div class="wrapper-content-wrap">
          <slot name="left" />
        </div>
        <div ref="scrollAreaEl" class="scroll-area" @mousedown.prevent="dragStart" />
      </div>
    </div>
    <div class="wrapper-right playground flex-1">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.playground-layout-wrapper {
  overflow: auto;
  position: fixed;
  padding-top: 50px;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
}
.playground {
  height: 100%;
}

.wrapper-left {
  min-width: 300px;
}

.playground-content {
  display: flex;
  width: 100%;
  height: 100%;
}
.dragging {
  cursor: ew-resize;
}
.wrapper-content-wrap {
  flex: 1;
  width: 100%;
}

.scroll-area {
  width: 2px;
  cursor: ew-resize;
  position: relative;
  height: 100%;
  background: var(--border-color);
}
</style>
