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
    api: {},
  }
}
