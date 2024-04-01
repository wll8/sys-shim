import { defineStore } from 'pinia'
import { CACHE_SETTING_INFO } from './constants'
import { localCache } from '@/utils/cache'
import type { IPublicOption } from '@/types'

export interface ISettingInfo {
  ws: string
  nodeV: string
  browserV: string
  appV: string
  // 风格
  styleMode: 'dark' | 'light'
  // 日志模式
  logMode: 'simple' | 'detailed' // simple: 简洁模式 detailed: 详细模式
}

interface ISettingState {
  // 设置信息
  settingInfo: ISettingInfo
  // 风格模式列表
  styleModeOptions: IPublicOption<ISettingInfo['styleMode']>[]
  // 日志模式列表
  logModeOptions: IPublicOption<ISettingInfo['logMode']>[]
  // 版本配置列表
  versionOptions: {
    node: IPublicOption<string>[]
    browser: IPublicOption<string>[]
    app?: IPublicOption<string>[]
  }
}
interface IInitInfo {
  settingInfo: ISettingInfo
}
const initInfo: IInitInfo = {
  settingInfo: {
    ws: '',
    nodeV: '0.0.1',
    browserV: '0.0.1',
    appV: '0.0.1',
    styleMode: 'light',
    logMode: 'simple',
  },
}

const useSettingStore = defineStore('setting', {
  state: (): ISettingState => ({
    settingInfo: initInfo.settingInfo,
    // 风格模式
    styleModeOptions: [
      {
        label: '日间模式',
        value: 'light',
      },
      {
        label: '夜间模式',
        value: 'dark',
      },
    ],
    // 日志模式
    logModeOptions: [
      {
        label: '简洁模式',
        value: 'simple',
      },
      {
        label: '详细模式',
        value: 'detailed',
      },
    ],
    // 版本模式
    versionOptions: {
      node: [
        {
          label: 'node-sys.js@v0.01',
          value: '0.0.1',
        },
      ],
      browser: [
        {
          label: 'browser-sys.js@v0.01',
          value: '0.0.1',
        },
      ],
      app: [
        {
          label: 'main.exe@v0.01',
          value: '0.0.1',
        },
      ],
    },
  }),
  actions: {
    changeSettingInfoAction(info: ISettingInfo) {
      this.settingInfo = info
      // 存入本地
      localCache.setCache(CACHE_SETTING_INFO, info)
    },

    // 加载本地settingInfo数据
    loadLocalSettingInfoAction() {
      const settingInfo = localCache.getCache(CACHE_SETTING_INFO)
      if (settingInfo)
        this.settingInfo = settingInfo
    },
    // 重置
    resetAction() {
      this.changeSettingInfoAction(initInfo.settingInfo)
    },
  },
})

export default useSettingStore
