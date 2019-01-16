import { routerRedux } from 'dva/router';
import { getBanner, getTopListDetail, personalized, userDetail, logout } from '../../../services/music.js';
import { getToken, setToken } from '../../../utils/token';
import immutable from "seamless-immutable"

export default {
  namespace: 'home',
  state: {
    count: 0,
    banner: immutable([]),
    result: [],
    profile: {},
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    * add({ payload }, { call, put ,all }) {
      let   data_home=  yield all([
        call(getBanner),
        call(personalized)
      ]);
      const {0:{banners},1:{result,code}} = data_home;
      const isToken = getToken();
      if (parseInt(code, 10) === 200) {
        yield put({
          type: 'save',
          payload: { banner:immutable(banners) , result },
        });
      }
      //用户信息
      if (isToken) {
        const data = yield call(userDetail, { 'uid': isToken });
        const { profile } = data;
        yield put({
          type: 'save',
          payload: { profile: profile },
        });
      }
    },
    * logout({ payload }, { call, put }) {
      yield call(logout);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/home' || pathname === '/') {
          dispatch({
            type: 'add',
          });
        }
      });
    },
  },
};
