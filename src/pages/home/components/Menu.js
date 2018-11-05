import React, { Fragment } from 'react';
import router from 'umi/router';
import { Link, withRouter } from 'dva/router';
import PropTypes from 'prop-types';

import styles from './Menu.less';


const Menu = (props) => {
  const data = [
    { tit: '私人FM', route: '' },
    { tit: '每日推荐', route: '' },
    { tit: '歌单', route: '/sheetlist' },
    { tit: '排行榜', route: '/toplist' },
  ];
  return (
    <div className={styles.menu}>
      {data.map((item, index) => {
        return (
          <div className={styles.menuItem}>
            <div className={styles.menuIcon}/>
            <p>{item['tit']}</p>
          </div>
        );
      })}
    </div>
  );
};
Menu.defaultProps = {
  text: '',
};

Menu.propTypes = {
  text: PropTypes.string,
  onOpen: PropTypes.func,
};
export default withRouter(Menu);
