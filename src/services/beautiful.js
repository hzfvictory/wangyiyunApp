import axios from './index';
import qs from 'querystring';

const bastUrl = 'beautiful';

export function getImageDetail(data) {
  return axios.post(bastUrl, qs.stringify(data));
}
