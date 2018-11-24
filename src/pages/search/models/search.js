import { routerRedux } from 'dva/router';
import { getSearchList, getHotList, getMusicDetail } from '../../../services/wangyi.js';

export default {
  namespace: 'search',
  state: { result: [], hot: [], songs: [], privileges: [] },
  reducers: {
    save(state, { payload }) {
      return {
        ...state, ...payload,
      };
    },
    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const { code, result } = yield call(getSearchList, payload);

      if (parseInt(code, 10) === 200) {
        yield put({
          type: 'save',
          payload: { result },
        });
      }
    },
    * add({ payload }, { call, put }) {
      const { code, result } = yield call(getHotList);
      if (parseInt(code, 10) === 200) {
        yield put({
          type: 'save',
          payload: { hot: result },
        });
      }
    },
    * getMusic({ payload }, { call, put }) {
      const { code, songs, privileges } = yield call(getMusicDetail, payload);
      if (parseInt(code, 10) === 200) {
        yield put({
          type: 'save',
          payload: { songs, privileges },
        });
      }

    },
    * clearQuery({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: { result: [] },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname == '/search') {
          dispatch({
            type: 'add',
          });
        }
      });
    },
  },
};
