module.exports = {
  baseUrl: '/gp/', // 发布目录
  outputDir: 'dist', // 生成文件目录
  // assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,
  pages: {
    index: {
      entry: 'src/entry/index.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '校园社团Online',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
  lintOnSave: false,
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  crossorigin: undefined,
  integrity: false,
  configureWebpack: () => {},
  chainWebpack: config => {

  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    modules: false
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8086,
    https: false,
    hot: true,
    index: '',
    proxy: {
      '/api/': {
        // target: 'http://192.168.3.36/php/public/index.php',
        target: 'http://localhost/work/JTZ_git/gp/php/public/index.php',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '/api/': '/'
        }
      },
    }
  },
  parallel: require('os').cpus().length > 1,
  pwa: {
    // ...
  },
  pluginOptions: {
    // ...
  }
}
