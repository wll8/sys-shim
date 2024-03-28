import useSettingStore from '@/store/setting/setting'
function useLocalData() {
  // 加载settingInfo
  useSettingStore().loadLocalSettingInfoAction()
}
export default useLocalData
