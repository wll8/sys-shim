import { defineStore } from 'pinia'
import useSettingStore from '../setting/setting'
import type { IExecInfo, IExecInfoActionOptions } from './type'

interface IMainState {
  execInfo: IExecInfo
}
interface IInitInfo {
  execInfo: IExecInfo
}
const initInfo: IInitInfo = {
  execInfo: {
    env: {
      'node-sys.js': '0.0.1',
      'browser-sys.js': '0.0.1',
      'main.exe': '0.0.1',
    },
    code: {
      browser: '',
    },
  },
}

const useMainStore = defineStore('Main', {
  state: (): IMainState => ({
    execInfo: initInfo.execInfo,
  }),
  actions: {
    changeExecInfoAction(options: IExecInfoActionOptions) {
      // 获取环境信息
      const settingStore = useSettingStore()
      const settingInfo = settingStore.settingInfo
      const execInfo = { ...this.execInfo }
      // 设置环境
      execInfo.env['node-sys.js'] = settingInfo.nodeV
      execInfo.env['browser-sys.js'] = settingInfo.browserV
      execInfo.env['main.exe'] = settingInfo.appV
      // 设置代码
      const { type = 'node', code = '' } = options
      execInfo.code = { [type]: code }
      // 设置到环境中
      this.execInfo = execInfo
    },
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
      this.execInfo = initInfo.execInfo
      const settingStore = useSettingStore()
      settingStore.resetAction()
    },
  },
})

export default useMainStore
