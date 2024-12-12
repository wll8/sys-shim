const path = require(`path`)
const fs = require(`fs`)
const rootDir = process.cwd()
const uploadDir = `${rootDir}/public/upload/`
fs.existsSync(uploadDir) === false && fs.mkdirSync(uploadDir, { recursive: true })

/**
 * @see: https://www.hongqiye.com/doc/mockm/config/option.html
 * @type {import('mockm/@types/config').Config}
 */
module.exports = (util) => {
  return {
    port: 7800,
    testPort: 7805,
    replayPort: 7801,
    // 自己编写的接口
    api() {
      const configFn = {
        live() {
          return {
            fileUrlPrefix: ``,
          }
        },
        dev() {
          return {
            fileUrlPrefix: `http://127.0.0.1:${global.config.port}`,
          }
        },
      }[global.config[`--live`] ? `live` : `dev`]
      const config = configFn ? configFn() : {}
      return {
        async 'use /'(req, res, next) {
          // 不用自动注入用户信息的接口, 一般是系统接口, 例如公用字典
          const publicList = [`/platform`]
          const defaultObj =
            !publicList.includes(req.path) &&
            Object.entries({ ...req.headers }).reduce((acc, [key, value]) => {
              const [, name] = key.match(/^default-(.*)$/) || []
              if (name) {
                const k2 = name.replace(/-([a-z])/g, (match, group) => group.toUpperCase())
                acc[k2] = value
              }
              return acc
            }, {})
          if (req.method !== `GET`) {
            req.body = {
              ...defaultObj,
              ...req.body,
            }
          }
          req.query = {
            ...defaultObj,
            ...req.query,
          }
          next()
        },
        async '/upload/file'(req, res) {
          const multiparty = await util.toolObj.generate.initPackge(`multiparty`)
          const form = new multiparty.Form({
            uploadDir,
          })
          form.parse(req, async (err, fields = [], files) => {
            const file = files.file[0]
            let url = `${config.fileUrlPrefix}/public/upload/${path.parse(file.path).base}`
            res.json(
              wrapApiData({
                data: {
                  data: { url, name: file.originalFilename },
                },
              }),
            )
          })
        },
      }
    },
    dbCover: true,
    db: util.libObj.mockjs.mock({
      // 设备
      'device|3-5': [
        {
          'id|+1': 1,
          电脑名: `@cname`,
        },
      ],
      // 主配置
      'config|10': [
        {
          'id|+1': 1,
          deviceId() {
            const max = 3
            return this.id % max || 3
          },
          名称: `@ctitle`,
          卡密: `@uuid`,
          激活时间: `@date`,
          过期时间: `@date`,
        },
      ],
      // 平台
      platform: [
        {
          id: 1,
          封面: [
            {
              label: `@ctitle`,
              value: `@image().jpg`,
            },
          ],
          网址: `https://buyin.jinritemai.com/mpa/account/login`,
          状态: `可使用`,
          脚本文件: [
            {
              label: `@ctitle().js`,
              value: `@url().js`,
            },
          ],
          名称: `抖音`,
        },
        {
          id: 2,
          封面: undefined,
          网址: ``,
          状态: `开发中`,
          名称: `快手`,
        },
        {
          id: 3,
          封面: undefined,
          网址: ``,
          状态: `开发中`,
          名称: `腾讯`,
        },
        {
          id: 4,
          封面: undefined,
          网址: ``,
          状态: `开发中`,
          名称: `其他`,
        },
      ],
      'devicePlatformConfig|1-3': [
        {
          'id|+1': 1,
          名称: `默认`,
          deviceId() {
            const max = 3
            return this.id % max || 3
          },
          platformId() {
            const max = 3
            return this.id % max || 3
          },
          configId() {
            const max = 3
            return this.id % max || 3
          },
          数据目录() {
            return `data/${this.id}`
          },
          // 动作
          action: {
            智能客服: {
              文字回复: {
                频率: `@integer(1, 5)-@integer(6, 10)`,
                启用: `@boolean`,
                '配置|1-5': [
                  {
                    关键词: `@ctitle`,
                    回复: `@ctitle`,
                  },
                ],
              },
              语音回复: {
                频率: `@integer(1, 5)-@integer(6, 10)`,
                启用: `@boolean`,
                '配置|1-5': [
                  {
                    关键词: `@ctitle`,
                    '回复|1-3': [
                      {
                        label: `@ctitle().mp3`,
                        value: `@url().mp3`,
                      },
                    ],
                  },
                ],
              },
            },
            场控助手: {
              直播间发言: {
                频率: `@integer(1, 5)-@integer(6, 10)`,
                启用: `@boolean`,
                '配置|1-5': [
                  {
                    话术: `@ctitle`,
                  },
                ],
              },
              评论上墙: {
                频率: `@integer(1, 5)-@integer(6, 10)`,
                启用: `@boolean`,
                '配置|1-5': [
                  {
                    话术: `@ctitle`,
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
                频率: `@integer(1, 5)-@integer(6, 10)`,
                商品弹窗: `@boolean`,
                顺序开始: `@integer(1, 5)`,
                顺序结束: `@integer(1, 5)`,
                自动过品: `@boolean`,
                指定商品: ``,
              },
            },
          },
        },
      ],
    }),
    static: [
      {
        fileDir: `${__dirname}/dist/`,
        mode: `history`,
        path: `/live`,
      },
      {
        list: true,
        fileDir: `${rootDir}/public/`,
        path: `/public`,
      },
    ],
  }
}

/**
 * 包裹 api 的返回值
 * @param {*} param0
 * @param {object} param0.data - 原始数据
 * @param {number|string} [param0.code=200] - http状态码
 * @returns
 */
function wrapApiData({ data, code = 200, ...arg }) {
  code = String(code)
  return {
    code,
    success: Boolean(code.match(/^[2]/)), // 如果状态码以2开头则为 true
    data,
    ...arg,
  }
}
