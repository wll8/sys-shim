import { defineStore } from 'pinia'
import { CACHE_SETTING_INFO } from './constants'
import { localCache } from '@/utils/cache'

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

interface IGroupRadioOption<T = any> {
  label: string
  value: T
}

interface ISettingState {
  // 设置信息
  settingInfo: ISettingInfo
  // 风格模式列表
  styleModeOptions: IGroupRadioOption<ISettingInfo['styleMode']>[]
  // 日志模式列表
  logModeOptions: IGroupRadioOption<ISettingInfo['logMode']>[]
  // 版本配置列表
  versionOptions: {
    node: IGroupRadioOption<string>[]
    browser: IGroupRadioOption<string>[]
    app?: IGroupRadioOption<string>[]
  }
}

const useSettingStore = defineStore('setting', {
  state: (): ISettingState => ({
    settingInfo: {
      ws: '',
      nodeV: '',
      browserV: '',
      appV: '',
      styleMode: 'light',
      logMode: 'simple',
    },
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
          value: 'v0.01',
        },
      ],
      browser: [
        {
          label: 'browser-sys.js@v0.01',
          value: 'v0.01',
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
  },
})

export default useSettingStore
