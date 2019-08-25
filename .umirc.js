import { resolve } from 'path';

// const fs = require('fs');
// const lessToJs = require('less-vars-to-js');
// const color = lessToJs(fs.readFileSync('./public/variable.less', 'utf8'));

const { version } = require('./package');

export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      title: '不知道起什么名字',
      dll: true,
      // polyfills: ['ie11'],
      hd: true,
      chunks: ['vendors', 'antdesigns', 'umi'],
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
      // history: 'hash',
      dynamicImport: {
        //webpackChunkName，是否通过 webpackChunkName 实现有意义的异步文件名
        // loadingComponent，指定加载时的组件路径
        webpackChunkName: true,
        loadingComponent: './components/Loading',
      },
      fastClick: true,
    }],
  ],
  define: {
    // BGCOLOR:color['@bg-color'], // 应用类型
  },
  chainWebpack(config, { webpack }) {
    config.optimization.splitChunks({
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|lodash|lodash-decorators|redux-saga|re-select|dva|moment|react-transition-group|react-virtualized)[\\/]/,
          priority: -10,
        },
        antdesigns: {
          name: 'antdesigns',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](@ant-design|antd|antd-mobile)[\\/]/,
          priority: -20,
        },
      },
    });
  },
  alias: {
    music: resolve(__dirname, './src/services/music'),
    components: resolve(__dirname, './src/components'),
    utils: resolve(__dirname, './src/utils'),
    services: resolve(__dirname, './src/services'),
    assets: resolve(__dirname, './src/assets'),
    src: resolve(__dirname, './src'),
  },
  proxy: {
    '/api/music': {
      'target': 'http://120.79.229.197:8000',
      'changeOrigin': true,
      'pathRewrite': { '/api/music': '' },
    },
    '/api/beautiful': {
      'target': 'http://47.93.15.83/thinkphp5/public/index/index/faceapi',
      'changeOrigin': true,
      'pathRewrite': { '/api/beautiful': '' },
    },
    '/api/manage': {
      'target': 'https://elm.cangdu.org',
      'changeOrigin': true,
      'pathRewrite': { '/api/manage': '' },
    },
  },
  //【链接】{"address":"上海市黄浦区人民大道
  // v2/pois/31.22967,121.4762
  // publicPath: `/${version}/`,
  // outputPath: `./dist/${version}`,
  // theme: { "@primary-color": "#e5473c",}
  urlLoaderExcludes: [
    /\.svg$/,
  ],
};
