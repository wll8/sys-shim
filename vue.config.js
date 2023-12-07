const { defineConfig } = require(`@vue/cli-service`)
module.exports = defineConfig({
  configureWebpack: {
    devtool: `eval-source-map`,
    // devtool: `eval-cheap-module-source-map`,
    // devtool: false,
    externals: {
      'vue': 'Vue'
    }
  },
  // lintOnSave: `warning`,
  lintOnSave: false,
  productionSourceMap: true,
  // transpileDependencies: true,
})
