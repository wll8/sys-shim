import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore(
  `index`,
  () => {
    const userId = ref(``)
    const indexConfig = ref([
      {
        name: `默认配置`, // 配置名称
        key: ``, // 卡密
      },
    ])

    return { userId }
  },
  {
    persist: true,
  },
)
