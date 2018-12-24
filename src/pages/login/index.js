/*
*title: 登录
*/
import React, { Component } from 'react';
import { Flex, InputItem, NavBar, Icon, Button, Modal, Toast } from 'antd-mobile';
import Link from 'umi/link';
import { createForm } from 'rc-form';
import formValid from '../../utils/formValid';
import { connect } from 'dva';
import { CSSTransition } from 'react-transition-group';


import styles from './index.less';

@createForm()
@connect(({ login }) => ({
  loginLoading: login.loginLoading,
}))
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      phoneIsFocus: false,
      passwordIsFocus: false,
    };
  }

  login = () => {
    const { form, dispatch } = this.props;
    form.validateFields((error, value) => {
      if (error) {
        return;
      }
      value.phone = value.phone.replace(/ /g, '');
      dispatch({
        type: 'login/signIn',
        payload: value,
      });
    });
  };

  render() {
    const { phoneIsFocus, passwordIsFocus } = this.state;
    const { form: { getFieldProps, getFieldError, getFieldValue }, loginLoading } = this.props;
    console.log(loginLoading , 'loginLoading');


    const errFormVal = getFieldValue('password');

    const errFormObj = getFieldError(['phone', 'password']) || {};

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
          <Flex direction='column'>
            <div className='form-item form-item-input'>
              <InputItem
                {...getFieldProps('phone', {
                  rules: [
                    formValid.require('请输入正确的手机号'),
                    formValid.phone(),
                  ],
                })}
                clear
                error={!!getFieldError('phone')}
                onErrorClick={() => {
                  const err = getFieldError('phone').join('、');
                  Toast.info(err, 1);
                }}

                onFocus={() => {
                  this.setState({ phoneIsFocus: true });
                }}
                onBlur={() => {
                  this.setState({ phoneIsFocus: false });
                }}

                className='form-item-phone'
                type='phone'
                placeholder='请输入手机号'
              />
              <Line show={phoneIsFocus}/>
            </div>
            <div className='form-item form-item-input'>
              <InputItem
                {...getFieldProps('password', {
                  rules: [
                    formValid.require('请输入密码'),
                    formValid.password(),
                  ],
                })}
                clear
                error={!!getFieldError('password')}
                onErrorClick={() => {
                  const err = getFieldError('password');
                  Toast.info(err, 1);
                }}
                onFocus={() => {
                  this.setState({ passwordIsFocus: true });
                }}
                onBlur={() => {
                  this.setState({ passwordIsFocus: false });
                }}
                type='password'
                placeholder='请输入密码'
              />
              <Line show={passwordIsFocus}/>
            </div>
            <div className='form-item form-item-button'>
              <Button
                activeStyle={false}
                type='warning'
                disabled={isDisable}
                onClick={this.login}
                loading={loginLoading}
              >进入网易云</Button>
            </div>

          </Flex>
        </div>


        <p className={styles['agree-wrap']} onClick={(e) => {
          this.showProtocol();
        }}>登录或注册即代表您已同意<span className={styles['agree']}>《用户注册协议》</span></p>
        {/*----协议----*/}
        <Modal
          popup
          visible={this.state.visible}
          animationType="slide-up"
          className="modal-service"
          platform={'android'}
          onClose={this.onClose('visible')}
          footer={[{
            text: '确 定', onPress: () => {
              console.log('ok');
              this.onClose('visible')();
            },
          }]}
        >
          <div className={styles['modal-coupon-center']}>
            <iframe
              width="100%"
              height="100%"
              frameBorder={0}
              src="https://umijs.org/zh/guide/"
            />
          </div>
        </Modal>
      </div>
    );
  }

  // 协议弹窗
  showProtocol() {
    this.setState({
      visible: true,
    });
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  };
}

// 分割线动画组件
const Line = (props) => {
  return (
    <div className='line-wrap'>
      <CSSTransition
        in={props.show}
        timeout={1000}
        classNames="line"
      >
        <div className='line'>
        </div>
      </CSSTransition>
    </div>
  );
};


export default Login;
