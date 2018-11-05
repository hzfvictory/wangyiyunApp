import { routerRedux } from 'dva/router';
import { getBanner ,getTopListDetail} from '../../../services/wangyi.js';
export default {
  namespace: 'home',
  state: {
    count: 0,
    banner:[]
  },
  reducers: {
    save(state,{payload}) {
      return {
        ...state,
        banner: payload,
      };
    },
  },
  effects: {
    * add({ payload }, { call, put }) {
      const {banners} = yield call(getBanner);
      yield put({
        type: 'save',
        payload: banners
      })
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({ pathname, search }) => {
        if (pathname == "/home") {
          dispatch({
            type: "add",
          })
        }
      })
    }
  },
};
