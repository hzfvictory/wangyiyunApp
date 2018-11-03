export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: '不知道起什么名字',
      dll: true,
      routes: {
        exclude: [],
      },
      hardSource: true,
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
