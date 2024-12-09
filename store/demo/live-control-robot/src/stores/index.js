import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import mockjs from 'mockjs'

export const useStore = defineStore(
  `index`,
  () => {
    const data = mockjs.mock({
      userId: `@uuid`,
      // 配置
      config: [
        {
          id: 1,
          名称: `默认`,
          卡密: `@uuid`,
          激活时间: `@date`,
          过期时间: `@date`,
        },
        {
          id: 2,
          名称: `测试`,
        },
      ],
      // 平台
      platform: [
        {
          id: 1,
          名称: `抖音`,
          封面: `@image().jpg`,
          网址: `https://buyin.jinritemai.com/mpa/account/login`,
          状态: `可使用`,
          // 动作
          action: {
            'id|+1': 1,
            智能客服: {
              文字回复: {
                频率: `@integer(1, 10)`,
                启用: `@boolean`,
                '配置|1-5': [
                  {
                    关键词: `@ctitle`,
                    回复: `@ctitle`,
                  },
                ],
              },
              语音回复: {
                频率: `@integer(1, 10)`,
                启用: `@boolean`,
                '配置|1-5': [
                  {
                    关键词: `@ctitle`,
                    回复: `@ctitle`,
                  },
                ],
              },
            },
            场控助手: {
              直播间发言: {
                频率: `@integer(1, 10)`,
                启用: `@boolean`,
                '配置|1-5': [
                  {
                    回复: `@ctitle`,
                  },
                ],
              },
              评论上墙: {
                频率: `@integer(1, 10)`,
                启用: `@boolean`,
                '配置|1-5': [
                  {
                    回复: `@ctitle`,
                  },
                ],
              },
            },
            商品助手: {
              商品管理: {
                卖点: {
                  最小序号: `@integer(1, 5)`,
                  最大序号: `@integer(1, 5)`,
                },
                删除: {
                  最小序号: `@integer(1, 5)`,
                  最大序号: `@integer(1, 5)`,
                },
              },
              上下车: {
                自动: `@boolean`,
                在线低于: `@integer(1, 5)`,
                在线高于: `@integer(1, 5)`,
                定时: `@boolean`,
                上车保持: `@integer(1, 5)`,
                过: `@integer(1, 5)`,
                生效: `@boolean`,
              },
              弹窗过品: {
                启用: `@boolean`,
                商品弹窗: `@boolean`,
                顺序开始: `@integer(1, 5)`,
                顺序结束: `@integer(1, 5)`,
                自动过品: `@boolean`,
                指定商品: ``,
              },
            },
          },
        },
        {
          id: 2,
          名称: `测试`,
        },
      ],
    })
    const dataRef = Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = ref(value)
      return acc
    }, {})

    return dataRef
  },
  {
    // persist: true,
  },
)
