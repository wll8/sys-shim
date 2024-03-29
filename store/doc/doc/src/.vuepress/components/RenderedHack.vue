<template>
  <!-- RenderedHack -->
</template>
<script>
import { onMounted, onUnmounted } from 'vue'
export default {
   setup () {
    let removeEvents = null
     onMounted(() => {
       if(window.RenderedHack) removeEvents = window.RenderedHack()
     })
     onUnmounted(()=>{
      removeEvents && removeEvents()
     })
   },
}
</script>
