/*
 * API：包含了当前项目中所有对后台的数据请求方法
 */
import axios from 'axios';

const URL_NO_MUSIC = ['/score'];

const baseURIMap = {
  'development': 'http://172.20.10.6:8000/api',
  'product': 'http://120.79.229.197:8000',

  'score': 'http://47.93.15.83/thinkphp5/public/index/index/faceapi',
  'default': 'http://120.79.229.197:8000',
};

const score = URL_NO_MUSIC.includes(window.location.pathname);



axios.defaults.baseURL = baseURIMap[process.env.NODE_ENV] || (score ? baseURIMap['score'] : baseURIMap['product']);
// axios.defaults.baseURL = ' http://192.168.43.169:8000/api';
axios.defaults.withCredentials = true;
axios.interceptors.response.use(result => {
  //=>把axios响应部分重新设置:以后基于axios获取的数据中,我们只解析出来了DATA,用的时候不需要自己在通过DATA查找了
  return result.data;
});

export default axios;
