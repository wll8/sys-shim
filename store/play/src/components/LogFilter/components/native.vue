<script setup lang="ts">
import { aarHighlight } from '@/utils/aarHighlighter.js'

const props = defineProps({
  codeText: {
    type: String,
    default: '',
  },
})

const coderef = ref()

nextTick(() => {
  if (!coderef.value)
    return
  aarHighlight(coderef.value, props.codeText)
})
</script>

<template>
  <pre class="relative"><code ref="coderef" class="lang-aau">{{ codeText }}</code>
    <small class="bg-black/50 absolute top-0 right-0 text-xs rounded-bl-md px2 py1 text-white">aar</small>
  </pre>
</template>

<style scoped></style>
