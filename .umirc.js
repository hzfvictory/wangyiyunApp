export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      title: '不知道起什么名字',
      dll: true,
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ],
      },
      hardSource: true,
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './components/Loading',
      },
    }],
  ],
  proxy: {
    '/api': {
      'target': 'http://120.79.229.197:8000',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    },
  },

  urlLoaderExcludes: [
    /\.svg$/,
  ],
};
