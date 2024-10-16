import { theme } from 'ant-design-vue'

function useAntTheme() {
  const { useToken } = theme

  const { token } = useToken()

  const customToken = reactive({
    colorPrimary: '',
  })
  watchEffect(() => {
    customToken.colorPrimary = token.value.colorPrimary
  })
  function fetchToken() {
    return toRefs(useAntTheme().customToken)
  }
  return {
    token,
    customToken,
    fetchToken,
  }
}
export default useAntTheme
