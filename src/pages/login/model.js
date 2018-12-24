import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { signInMusic ,loginStatus} from '../../services/music.js';
import router from 'umi/router';
import  {getToken,setToken} from "../../utils/token"
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
    * signIn({ payload }, { call, put }) {
      const { code, profile:{userId} ,msg='登录成功！'} = yield call(signInMusic, payload);
      Toast.info(msg);
      if (parseInt(code, 10) === 200) {
        setToken(userId);
        yield put({
          type: 'save',
          payload: {
            loginLoading: true,
          },
        });
        setTimeout(() => {
          router.push('/home');
        }, 500);
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


