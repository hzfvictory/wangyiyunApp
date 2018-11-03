import axios from './index'
//获取轮播
export function getBanner() {
  return axios.get('/banner')
}
//获取排行榜（完整版）
export function getTopListDetail() {
  const url = `/toplist/detail`;
  return axios.get(url)
}
