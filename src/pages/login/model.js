import { Toast } from 'antd-mobile';
import router from 'umi/router';

export default {
  namespace: 'login',
  state: {
    regLoading: false,
    loginLoading: false,
    user: null,
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
        if (pathname === 'login') {
          dispatch({
            type: 'add',
          });
        }
      });
    },
  },
};

