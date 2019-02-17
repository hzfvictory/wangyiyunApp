import { routerRedux } from 'dva/router';
import  loginStatus  from '../services/music.js';

export default {
  namespace: 'common',
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
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname == '/home') {
          dispatch({
            type: 'add',
          });
        }
      });
    },
  },
};
