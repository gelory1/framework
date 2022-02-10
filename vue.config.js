const path = require('path')
module.exports = {
  configureWebpack: config => {
    // 目录引用简写
    const srcDir = path.resolve(__dirname, 'src')
    const aliasExt = {
      '@assets': path.resolve(srcDir, 'assets'),
      '@components': path.resolve(srcDir, 'components'),
      '@constants': path.resolve(srcDir, 'constants'),
      '@utils': path.resolve(srcDir, 'utils'),
      '@store': path.resolve(srcDir, 'store')
    }
    Object.assign(config.resolve.alias, aliasExt)

    // 警告 webpack 的性能提示
    config.performance = {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
    // 区分环境配置入口
    if (process.env.NODE_ENV === 'production') {
      console.log(process.env.VUE_APP_ISFILE === 'true')
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      // console.log(process.npm_config_env);// npm run serve --env=some  npm_config_env
      console.log(process.env.VUE_APP_ISFILE)// come from .env.[mode] 文件
      console.log(process.env.NODE_ENV)
      // console.log(process.env);//come from .env.[mode] 文件
    }
  },
  productionSourceMap: false,
  publicPath: '',
  devServer: {
    proxy: {
      '/aaa/bbb/': {
        target: 'https://xxx.com', // 目标地址
        ws: true, // // 是否启用websockets
        changeOrigin: true
      }
    },
    open: true,
    disableHostCheck: true
    // port: 8081
    // 开启，方便调试源码
    // sourceMap: true
  }
}
