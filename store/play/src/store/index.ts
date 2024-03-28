import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLocalData from '@/hooks/useLocalData'

const pinia = createPinia()

function registerPinia(app: App<Element>) {
  app.use(pinia)
  // 加载本地数据
  useLocalData()
}
export default registerPinia
