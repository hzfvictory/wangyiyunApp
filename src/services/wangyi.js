import axios from './index';

const base = 'music';

//获取轮播
export function getBanner() {
  return axios.get(`${base}/banner`);
}

//搜索推荐歌单
export function getHotList(data) {
  const url = `${base}/search/hot`;
  return axios.get(url);
}

//搜索单曲
export function getSearchList(data) {
  const url = `${base}/search`;
  return axios.get(url, {
    params: data,
  });
}

//播放音乐
export function getMusicDetail(ids) {
  const url = `${base}/song/detail`;
  return axios.get(url, {
    params: ids,
  });
}

//获取每日推荐歌单
export function personalized() {
  const url = `${base}/personalized`;
  return axios.get(url);
}

//获取排行榜
export function getTopListDetail() {
  const url = `${base}/toplist/detail`;
  return axios.get(url);
}
