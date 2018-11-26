import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ronter from 'umi/router';
import withRouter from 'umi/withRouter';
import { debounce } from 'utils';

import { Icon } from 'antd-mobile';
import styles from './index.less';

// 页面导航栏组件
class index extends Component {
  searchChange = e => {
    const { onItemSearch } = this.props;
    onItemSearch(this.inps.value);
  };
  clearInput=()=>{
    const { onItemSearch } = this.props;
    onItemSearch('');
  };
  render() {
    const { props: { value } } = this;
    return (
      <header className={styles.clearFlort}>
        <nav className={styles.nav}>
          <div className={styles.navLeft} onClick={ronter.goBack}/>
          <div className={styles.searchHead}>
            <input
              className={styles.searchInp}
              type="text"
              placeholder="搜索歌曲、歌手、专辑"
              value={value}
              autoFocus="autofocus"
              ref={x => this.inps = x}
              onChange={this.searchChange}
              // onKeyDown={debounce(this.onEnter, 500)}
            />
            {value && <Icon onClick={this.clearInput} type='cross-circle' size='xxs' color={ 'rgba(255, 255, 255, .5)'}/>}
          </div>
        </nav>
      </header>
    );
  }

}


export default withRouter(index);



