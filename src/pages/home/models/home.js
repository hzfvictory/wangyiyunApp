import { routerRedux } from 'dva/router';
import { getBanner, getTopListDetail, personalized } from '../../../services/music.js';

export default {
  namespace: 'home',
  state: {
    count: 0,
    banner: [],
    result: [],
  },
  reducers: {
    save(state, { payload: { banner, result } }) {
      return {
        ...state,
        banner,
        result,
      };
    },
  },
  effects: {
    * add({ payload }, { call, put }) {
      const { banners } = yield call(getBanner);
      const { result, code } = yield call(personalized);

      if (parseInt(code, 10) === 200) {
        yield put({
          type: 'save',
          payload: { banner: banners, result },
        });
      }
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
