import { routerRedux } from 'dva/router';
import { getMusicDetail } from '../services/music';
import router from "umi/router"
export default {
  namespace: 'global',
  state: {
    currentMusic:{},
    isPlay:false,
    recommend:[]
    },
  reducers: {
    save(state, { payload }) {
      return {
        ...state, ...payload,
      };
    },

  },
  effects: {
    * getMusic({ payload }, { call, put }) {
      const { code, songs, privileges } = yield call(getMusicDetail, payload);
      if (parseInt(code, 10) === 200) {
        yield put({
          type: 'save',
          payload: { songs, privileges },
        });
      }

    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/') {
          router.push("/home")
        }
      });
    },
  },
};
