const path = require('path');

export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      title: '不知道起什么名字',
      dll: true,
      polyfills: ['ie9'],
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
          /_components/,
          /_pages/,
        ],
      },
      hardSource: true,
      dynamicImport: {
        //webpackChunkName，是否通过 webpackChunkName 实现有意义的异步文件名
        // loadingComponent，指定加载时的组件路径
        webpackChunkName: true,
        loadingComponent: './components/Loading',
      },
      fastClick: true,
    }],
  ],
  alias: {
    music: path.resolve(__dirname, './src/services/wangyi'),
    components: path.resolve(__dirname, './src/components'),
    utils: path.resolve(__dirname, './src/components/common/utils'),
    services: path.resolve(__dirname, './src/services'),
    assets: path.resolve(__dirname, './src/assets'),
    src: path.resolve(__dirname, './src'),
  },
  proxy: {
    '/api': {
      'target': 'http://120.79.229.197:8000',
      'changeOrigin': true,
      'pathRewrite': { '/api': '/' },
    }
  },

  urlLoaderExcludes: [
    /\.svg$/,
  ],
};
