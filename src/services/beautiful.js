import axios from './index';
import qs from 'querystring';

let base='';
if(process.env.NODE_ENV==='development'){
   base = '/beautiful';
}

export function getImageDetail(data) {
  return axios.post(base, qs.stringify(data));
}
