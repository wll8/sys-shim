import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDllStore = defineStore('dll', () => {
  const list = ref([])

  return { list }
})
