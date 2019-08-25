import React from 'react';
import PropTypes from 'prop-types';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import { WingBlank, Carousel, Drawer, List, NavBar, Icon, WhiteSpace } from 'antd-mobile';

import styles from './Sidebar.less';

const Item = List.Item;

const Sidebar = (props) => {
  const { followeds, follows, gender, avatarUrl, nickname } = props.data;

  return (
    <React.Fragment>


      <List>
        <div className={styles['tab_title']}>
          <img src={avatarUrl} alt={nickname}/>
          {nickname ? <span>{nickname}</span> :
            <span
              onClick={
                () => {
                  router.push('/login');
                }
              }>去登录
            </span>}

        </div>
        <div className={styles['user_info']}>
          <span data-num={followeds}>动态</span>
          <span data-num={follows}>关注</span>
          <span data-num={gender}>粉丝</span>
        </div>
        <WhiteSpace style={{ background: '#f2f6f9' }} size='sm'/>
        <Item arrow='horizontal' extra='未订购'>会员中心</Item>
        <Item arrow='horizontal'>个人信息设置</Item>
        <Item arrow='horizontal'>绑定社交账号</Item>
      </List>
      <WhiteSpace style={{ background: '#f2f6f9' }} size='sm'/>
      <List>
        <Item arrow='horizontal'>我的主题</Item>
        <Item arrow='horizontal' extra='免费领取流量福利'>免流量专区</Item>
      </List>
      <WhiteSpace style={{ background: '#f1f5f8' }} size='sm'/>
      <List>
        <Item arrow='horizontal'>用户反馈</Item>
        <Item arrow='horizontal'
              onClick={
                () => {
                  props.onclickRemover();
                }
              }>退出系统
        </Item>
      </List>
    </React.Fragment>

  );
};
Sidebar.defaultProps = {};
Sidebar.propTypes = {};

export default withRouter(Sidebar);



