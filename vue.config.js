// vue.config.js
module.exports = {
  publicPath: '/',
  assetsDir: 'assets',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    allowedHosts: 'all', // Vue CLI 5.x+版本
    // 修正后的 allowedHosts 配置（只使用字符串）
    allowedHosts: [
      'localhost',
      '.ngrok.io', // 注意：移除了正则表达式，改用字符串模式
    ],
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws',
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    https: false, // 如果不需要 HTTPS
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    hot: true,
    liveReload: true,
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.use((req, res, next) => {
        req.headers.host = 'localhost:8080'
        next()
      })
      return middlewares
    },
  },
  configureWebpack: {
    // 可添加其他Webpack配置
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/css/global.css";`,
      },
    },
  },
}
