import { routerRedux } from 'dva/router';
import { recommendList } from '../../services/music.js';
import { getToken } from 'utils/token';
import router from "umi/router"
import {Toast} from "antd-mobile"
export default {
  namespace: 'recommendList',
  state: {
    recommend: [],
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state, ...payload,
      };
    },
  },
  effects: {
    * add({ payload }, { call, put }) {
      let is_token = getToken();
      if (is_token) {
        const { code, recommend } = yield call(recommendList);
        let ary = [];
        recommend.forEach((item, index) => {
          let obj = {};
          obj.id = item.id;
          obj.name = item.name;
          obj.duration = item.duration / 1000;
          obj.singer = item.artists[0].name;
          obj.image = item.artists[0].img1v1Url;
          obj.album = item.album.name;
          obj.alias = item.alias;
          obj.fee = item['fee'];
          obj.reason = item.reason;
          ary.push(obj);
        });

        if (parseInt(code, 10) === 200) {
          yield put({
            type: 'save',
            payload: { recommend: ary },
          });
        }
      }else{
        Toast.info("未登录不能查看每日推荐！");
        router.replace("/login")
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/recommendlist') {
          dispatch({
            type: 'add',
          });
        }
      });
    },
  },
};
