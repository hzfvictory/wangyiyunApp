import { routerRedux } from 'dva/router';

export default {
  namespace: 'indexedDB',
  state: {},
  reducers: {
    save(state, { payload }) {
      return {
        ...state, ...payload,
      };
    },
  },
  effects: {
    * add({ payload }, { call, put }) {
      const { code } = yield call();

      if (parseInt(code, 10) === 200) {
        yield put({
          type: 'save',
          payload: {},
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === 'IndexedDB') {
          dispatch({
            type: 'add',
          });
        }
      });
    },
  },
};
