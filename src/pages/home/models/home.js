import { routerRedux } from 'dva/router';
import { getBanner ,getTopListDetail} from '../../../services/wangyi.js';
export default {
  namespace: 'home',
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
    * add({ payload }, { call, put }) {
      const {list} = yield call(getTopListDetail);
      console.log(list);
    },
  },
};
