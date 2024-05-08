import { useDark, useToggle } from '@vueuse/core'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { theme } from 'ant-design-vue'

export function useTheme() {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)
  const antTheme = ref<ThemeConfig>({

  })
  watchEffect(() => {
    antTheme.value = {
      algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }
  })
  return {
    isDark,
    toggleDark,
    antTheme,
  }
}
