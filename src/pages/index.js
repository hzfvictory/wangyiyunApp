import { Button } from 'antd';
import { connect } from 'dva';
import Redirect from 'umi/redirect';

import Link from 'umi/link';

export default connect()(({ dispatch }) => {
  return (
    <div>
      <h1>Login Page</h1>
      <Button
        onClick={() => {
          dispatch({
            type: 'global/login',
          });
        }}
      >
        Login
      </Button>
      {/*重定向*/}
      <Redirect to="/home" />;
      <Link to="/Login">Go to /Login</Link>
      <Link to="/count">Go to /count</Link>
      <a href="/search?keywords=海阔天空">搜索</a>
    </div>
  );
});
