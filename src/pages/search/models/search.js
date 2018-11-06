import { routerRedux } from 'dva/router';
import { getSearchList, getHotList } from '../../../services/wangyi.js';

export default {
  namespace: 'search',
  state: { result: [], hot: [] },
  reducers: {
    save(state, { payload: { result, hot } }) {
      return {
        ...state,
        result,
        hot,
      };
    },
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      const { code, result } = yield call(getSearchList, payload);

      if (parseInt(code, 10) === 200) {
        yield put({
          type: 'save',
          payload: { result: result['songs'] },
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
