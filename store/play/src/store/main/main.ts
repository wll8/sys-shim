import { defineStore } from 'pinia'
import useSettingStore from '../setting/setting'
import type { IExecInfo } from './type'

interface IMainState {
  execInfo: IExecInfo
}
interface IInitInfo {
  execInfo: IExecInfo
}

const initInfo: IInitInfo = {
  execInfo: {
    type: 'node',
    env: {
      'node-sys.js': '0.0.1',
      'browser-sys.js': '0.0.1',
      'main.exe': '0.0.1',
    },
    code: {
      node: '',
      browser: '',
      native: '',
    },
  },
}

const useMainStore = defineStore('Main', {
  state: (): IMainState => ({
    execInfo: JSON.parse(JSON.stringify(initInfo.execInfo)),
  }),
  persist: true,
  actions: {
    urlDataToExecInfoAction(data: IExecInfo) {
      this.execInfo = data
      // 将data数据设置到settingStore
      const settingStore = useSettingStore()
      const settingInfo = settingStore.settingInfo
      settingInfo.nodeV = data!.env['node-sys.js']!
      settingInfo.browserV = data!.env['browser-sys.js']!
      settingInfo.appV = data!.env['main.exe']!
      settingStore.changeSettingInfoAction(settingInfo)
    },
    // 重置信息
    resetAction() {
      const execInfo = JSON.parse(JSON.stringify(initInfo.execInfo))
      this.execInfo = execInfo
      const settingStore = useSettingStore()
      settingStore.resetAction()
    },
  },
})

export default useMainStore
