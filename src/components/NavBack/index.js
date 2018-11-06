import React from 'react';
import PropTypes from 'prop-types';
import ronter from 'umi/router';
import withRouter from 'umi/withRouter';
import styles from './index.less';

// 页面导航栏组件
const NavBack = (props) => {
  const { title } = props;
  return (
    <nav className={styles.nav}>
      <div className={styles.navLeft} onClick={ronter.goBack}/>
      <div className={styles.navTitle}>{title}</div>
      <div className={styles.navRight}/>
    </nav>
  );
};
NavBack.defaultProps = {
  title: '歌单',
};
NavBack.propTypes = {
  title: PropTypes.string,
};

export default withRouter(NavBack);
