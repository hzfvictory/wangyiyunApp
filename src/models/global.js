import { routerRedux } from 'dva/router';
import { getMusicDetail } from '../services/music';

export default {
  namespace: 'global',
  state: {
    currentMusic:{},
    isPlay:false
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
};
