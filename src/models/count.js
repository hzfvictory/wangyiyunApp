import { routerRedux } from 'dva/router';
import { getBanner ,getTopListDetail} from '../services/wangyi.js';
export default {
  namespace: 'count',
  state: {
    count: 0,
  },
  reducers: {
    save(state) {
      return {
        ...state,
        count: state.count + 1,
      };
    },
  },
  effects: {
    * addBanner({ payload }, { call, put }) {
      yield call({
        type: 'save',
      });
      return 666;
      // yield put(routerRedux.push("/admin"))
    },
    * add({ payload }, { call, put }) {
      const {list} = yield call(getTopListDetail);
      console.log(list);
    },
  },
};
