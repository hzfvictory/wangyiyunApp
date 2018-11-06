import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ronter from 'umi/router';
import withRouter from 'umi/withRouter';
import styles from './index.less';

// 页面导航栏组件
class index extends Component {
  state = { value: '' };

  searchChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  onEnter = e => {
    if (e.keyCode === 13) {
      this.setState({
        value: e.target.value,
      }, () => {
        this.props.onItemSearch(this.state.value);
      });
    }
  };

  render() {
    const { state: { value } } = this;
    return (
      <nav className={styles.nav}>
        <div className={styles.navLeft} onClick={ronter.goBack}/>
        <div className={styles.searchHead}>
          <input
            className={styles.searchInp}
            type="text"
            placeholder="搜索你喜欢的"
            value={value}
            autoFocus="autofocus"
            onChange={this.searchChange}
            onKeyDown={this.onEnter}
          />
        </div>
      </nav>
    );
  }

}


export default withRouter(index);



