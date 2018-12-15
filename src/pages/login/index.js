/*
*title: 登录
*/
import React, { Component } from 'react';
import { Flex, InputItem, NavBar, Icon, Button, Toast } from 'antd-mobile';
import Link from 'umi/link';
import { createForm } from 'rc-form';
import formValid from 'common/formValid';
import { connect } from 'dva';
import styles from './index.less';

@createForm()
@connect(({ login }) => ({
  loginLoading: login.loginLoading,
}))
class Login extends Component {

  login = () => {
    const { form, dispatch } = this.props;
    form.validateFields((error, value) => {
      if (error) {
        return;
      }
      value.account = value.account.replace(/ /g, '');
      dispatch({ type: 'user/login', payload: value });
    });
  };

  render() {
    const { form: { getFieldProps, getFieldError, getFieldValue }, loginLoading } = this.props;
    const errFormVal = getFieldValue('password');

    const errFormObj = getFieldError(['account', 'password']) || {};

    let isDisable = true;
    if (errFormVal !== undefined) {
      isDisable = Object.keys(errFormObj).some(s => {
        return errFormObj[s] !== undefined;
      });
    }
    return (
      <div className='login-bg'>
        <NavBar
          className="fixed"
          mode="dark"
          icon={<Icon type="left"/>}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
          rightContent={[]}
        />
        <div className={styles.login}>
          <Flex justify='center' className={styles.loginTitle}>登录网易云，精彩永不丢失</Flex>
          <Flex direction='column'>
            <div className='form-item form-item-input'>
              <Flex>
                <InputItem
                  {...getFieldProps('account', {
                    rules: [
                      formValid.require('请输入手机号'),
                      formValid.phone(),
                    ],
                  })}
                  clear
                  error={!!getFieldError('account')}
                  onErrorClick={() => {
                    const err = getFieldError('account').join('、');
                    Toast.info(err, 1);
                  }}
                  className='form-item-phone'
                  type='phone'
                  placeholder='手机号'
                />
                <span className='form-item-line'/>
                <span className='code'>发送验证码</span>
              </Flex>
            </div>
            <div className='form-item form-item-input'>
              <InputItem
                {...getFieldProps('password', {
                  rules: [
                    formValid.require('请输入验证码'),
                    formValid.verifyCode(),
                  ],
                })}
                clear
                error={!!getFieldError('password')}
                onErrorClick={() => {
                  const err = getFieldError('password').join('、');
                  Toast.info(err, 1);
                }}
                placeholder='请输入验证码'
              />
            </div>
            <div className='form-item form-item-button'>
              <Button
                activeStyle={false}
                type='warning'
                disabled={isDisable}
                // onClick={this.login}
                loading={loginLoading}
              >进入网易云</Button>
            </div>
            <Link to="/" className='form-item-a'>账号注册</Link>
          </Flex>
        </div>
      </div>
    );
  }
}


export default Login;
