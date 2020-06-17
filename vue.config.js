module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    host: "localhost",
    port: 9999,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        // target: 'http://localhost:2000/',
        target: 'http://47.93.234.220/:2000/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}