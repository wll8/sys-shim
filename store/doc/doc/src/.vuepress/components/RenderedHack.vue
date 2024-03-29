<template>
  <!-- RenderedHack -->
</template>
<script>
import { onMounted } from 'vue'
export default {
   setup () {
     onMounted(() => {
       window.RenderedHack && window.RenderedHack()
     })
   }
}
</script>