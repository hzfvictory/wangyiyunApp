import { resolve } from 'path';

export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      title: '不知道起什么名字',
      dll: true,
      polyfills: ['ie11'],
      hd: true,
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
      history: 'hash',
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
    music: resolve(__dirname, './src/services/wangyi'),
    components: resolve(__dirname, './src/components'),
    utils: resolve(__dirname, './src/components/common/utils'),
    services: resolve(__dirname, './src/services'),
    assets: resolve(__dirname, './src/assets'),
    src: resolve(__dirname, './src'),
  },
  proxy: {
    '/api/music': {
      'target': 'http://120.79.229.197:8000',
      'changeOrigin': true,
      'pathRewrite': { '/api/music': '/' },
    },
    '/api/beautiful': {
      'target': 'http://47.93.15.83/thinkphp5/public/index/index/faceapi',
      'changeOrigin': true,
      'pathRewrite': { '^/api/beautiful': '/' },
    },
  },

  urlLoaderExcludes: [
    /\.svg$/,
  ],
};
