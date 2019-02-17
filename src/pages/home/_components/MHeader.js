import React from 'react';
import router from 'umi/router';
import { NavLink, withRouter } from 'dva/router';
import PropTypes from 'prop-types';
import Loading from '../../../components/Loading';

import styles from './MHeader.less';

const MHeader = props => {

  const showHeader = /music|home|video/.test(props.location.pathname);
  const open = function mmHeaderOpenDrawer() {
    props.onOpen();
  };
  const openSearch = function mmHeaderOpenDrawer() {
    router.push('/search');
  };
  return (
    showHeader && (
      <header className={styles.head}>
        <div className={styles.header} id='header'>
          <div className={styles.headerLeft} onClick={open}/>
          <div className={styles.headerTitle}>
            <NavLink className={styles.headerItem} to="/home"/>
          </div>
          <div className={styles.headerRight} onClick={openSearch}/>
        </div>
      </header>
    )
  );
};
MHeader.defaultProps = {
  text: '',
};

MHeader.propTypes = {
  text: PropTypes.string,
  onOpen: PropTypes.func,
};
export default withRouter(MHeader);
