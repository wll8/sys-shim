const path = require(`path`)
const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  resolve: {
    // 设置别名
    alias: {
      "@": resolve(`src`), // 这样配置后 @ 可以指向 src 目录
    },
  },
}
