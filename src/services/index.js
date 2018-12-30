/*
 * API：包含了当前项目中所有对后台的数据请求方法
 */
import axios from 'axios';
import {Toast} from "antd-mobile"
const URL_NO_MUSIC = ['/score'];

const baseURIMap = {
  'development': 'http://localhost:8000/api',
  'product': 'http://www.jing999.cn:8000',

  'score': 'http://47.93.15.83/thinkphp5/public/index/index/faceapi',
  'default': 'http://120.79.229.197:8000',
};

const score = URL_NO_MUSIC.includes(window.location.pathname);



axios.defaults.baseURL = baseURIMap[process.env.NODE_ENV] || (score ? baseURIMap['score'] : baseURIMap['product']);
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;


// 请求拦截（配置发送请求的信息）
// axios.interceptors.request.use(
//   config => {
//     // Do something with request
//     const con = { ...config };
//     con.headers['X-Requested-With'] = 'XMLHttpRequest';
//     return con;
//   },
//   err =>{
//     Toast.fail('加载超时');
//     return  Promise.reject(err)
//   }
// );


// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(

  response => {
    return response.data;
  },
  err => {
    console.log(err.response.status);
    switch (err.response.status) {
      case 400:
        err.message = '请求错误';
        break;

      case 401:
        err.message = '未授权，请登录';
        break;

      case 403:
        err.message = '拒绝访问';
        break;

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`;
        break;

      case 408:
        err.message = '请求超时';
        break;

      case 500:
        err.message = '服务器内部错误';
        break;

      case 501:
        err.message = '服务未实现';
        break;

      case 502:
        err.message = '网关错误';
        break;

      case 503:
        err.message = '服务不可用';
        break;

      case 504:
        err.message = '网关超时';
        break;

      case 505:
        err.message = 'HTTP版本不受支持';
        break;

      default:
    }
    return Promise.reject(err)

  }
);



// axios.defaults.baseURL = ' http://192.168.43.169:8000/api';


export default axios;
