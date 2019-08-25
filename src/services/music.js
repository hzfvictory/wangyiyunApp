import axios from './index';

let base = '';
if (process.env.NODE_ENV === 'development') {
  base = '/music';
}

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

//手机号登录
export function signInMusic(user) {
  const url = `${base}/login/cellphone`;
  return axios.get(url, {
    params: user,
  });
}


//登录状态 （不能用）
export function loginStatus(user) {
  const url = `${base}/login/status`;
  return axios.get(url);
}

//获取用户详情
export function userDetail(id) {
  const url = `${base}/user/detail`;
  return axios.get(url, {
      params: id,
    },
  );
}

//退出登录 （不能用）
export function logout(id) {
  const url = `${base}/logout`;
  return axios.get(url);
}

//每日推荐
export function recommendList() {
  const url = `${base}/recommend/songs`;
  return axios.get(url);
}





export function login(data) {
  const url = `https://xueyuan.jianmoapp.com/_api/xpmsns/user/user/login`;
  return axios.post(url, {
    ...data,
  });
}

export function loginIcon() {
  const url = `https://xueyuan.jianmoapp.com/_api/xpmsns/user/user/vcode`;
  return axios.get(url);
}
