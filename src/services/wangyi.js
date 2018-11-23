import axios from './index';

const bastUrl = 'music';

//获取轮播
export function getBanner() {
  return axios.get(`${bastUrl}/banner`);
}

//搜索推荐歌单
export function getHotList(data) {
  const url = `${bastUrl}/search/hot`;
  return axios.get(url);
}

//搜索单曲
export function getSearchList(data) {
  const url = `${bastUrl}/search`;
  return axios.get(url, {
    params: data,
  });
}

//播放音乐
export function getMusicDetail(ids) {
  const url = `${bastUrl}/song/detail`;
  return axios.get(url, {
    params: ids,
  });
}

//获取每日推荐歌单
export function personalized() {
  const url = `${bastUrl}/personalized`;
  return axios.get(url);
}

//获取排行榜
export function getTopListDetail() {
  const url = `${bastUrl}/toplist/detail`;
  return axios.get(url);
}
