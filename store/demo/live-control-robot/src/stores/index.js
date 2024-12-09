import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import mockjs from 'mockjs'

export const useStore = defineStore(
  `index`,
  () => {
    const data = mockjs.mock({
      // devicePlatformConfigId 句柄表
      devicePlatformConfigIdByHwnd: {},
      // 用户 id
      userId: `@uuid`,
    })
    const dataRef = Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = ref(value)
      return acc
    }, {})

    return dataRef
  },
  {
    persist: true,
  },
)
