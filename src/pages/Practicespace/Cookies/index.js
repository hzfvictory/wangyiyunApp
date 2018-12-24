/**
 * title: Cookies
 */
import React, { Component, Fragment } from 'react';
import { NavBar, Icon, Modal, List, InputItem, WhiteSpace, WingBlank } from 'antd-mobile';
import { setCookie, getCookie, removeCookie, generateExpires } from 'utils/cookie';
import classnames from 'classnames';
import { createForm } from 'rc-form';

import styles from './index.less';

@createForm()

class index extends Component {
  state = { visible: false };

  componentDidMount() {
    this.onMount(-1);
  }

  componentWillUnmount() {
    removeCookie('first-visit');
  }

  onMount = (userId) => {
    const firstVisit = getCookie('first-visit');
    console.log(firstVisit, 'cookie');

    if (!firstVisit) {
      const getExpires = generateExpires(1);

      if (userId) {
        setCookie('first-visit', userId, getExpires);
      } else {
        setCookie('first-visit', true, getExpires);
      }

      this.setState({ visible: true });
    }
  };
  handleClick = () => {
    const { form: { validateFields }, dispatch } = this.props;
    validateFields((error, value) => {
      if (error) {
        return;
      }
      console.log(value);
    });
  };

  render() {
    const { props: { form: { getFieldProps, getFieldError } }, state: { visible } } = this;

    return (
      <Fragment>
        <NavBar
          className="fixed"
          mode="dark"
          icon={<Icon type="left"/>}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
          rightContent={[]}
        />

        <Modal
          visible={visible}
          closable={false}
          wrapClassName={classnames(styles.popup, styles.adpopup)}
        >
          <div className={styles.adpopupContainer}>
            <div className={styles.adpopupMask}>

              <div className={styles.adpopupClose} onClick={() => this.setState({ visible: false })}>
                <i className={'iconfont'}>&#xe6f2;</i>
              </div>


              <div className={styles.adpopupBg}>
                <WingBlank>
                  <List renderHeader={() => ''}>
                    <InputItem
                      {...getFieldProps('username')}
                      clear
                      placeholder="请输入你的账号！"
                      ref={el => this.autoFocusInst = el}
                    >账号：
                    </InputItem>
                    <InputItem
                      {...getFieldProps('password')}
                      clear
                      placeholder="请输入你的密码！"
                      ref={el => this.inputRef = el}
                    >密码：
                    </InputItem>
                    <List.Item>
                      <div
                        style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                        onClick={this.handleClick}
                      >
                        登录
                      </div>
                    </List.Item>
                  </List>
                </WingBlank>
              </div>

            </div>
          </div>
        </Modal>


      </Fragment>
    );
  }

}


export default index;
