import { createPinia } from 'pinia'
import type { App } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import useLocalData from '@/hooks/useLocalData'

const pinia = createPinia()

function registerPinia(app: App<Element>) {
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
  // 加载本地数据
  useLocalData()
}
export default registerPinia
