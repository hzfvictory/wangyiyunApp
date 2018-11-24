import axios from './index';
import qs from 'querystring';

const base = 'beautiful';

export function getImageDetail(data) {
  return axios.post(base, qs.stringify(data));
}
