import { routerRedux } from 'dva/router';
import { getImageDetail } from '../services/beautiful.js';
import { Toast } from 'antd-mobile';

import axios from 'axios';
import qs from 'querystring';

export default {
  namespace: 'count',
  state: {
    result: {},
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state, ...payload,
      };
    },
  },
  effects: {
    * banner({ payload }, { call, put }) {
      yield call(
        axios.post('http://localhost:8000/img', qs.stringify({ image: payload['image'] })).then((data) => {
          console.log(data);
        }),
      );
    },
    * getImage({ payload }, { call, put }) {
      const { error_code, result, error_msg } = yield call(getImageDetail, payload);
      if (parseInt(error_code, 10) === 0) {
        yield put({
          type: 'save',
          payload: {
            result,
          },
        });
      } else {
        Toast.fail(error_msg, 2);
      }

    },
  },
};
