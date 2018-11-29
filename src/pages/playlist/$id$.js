import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';

import styles from './index.less';

const mapStateToProps = (state) => (state);

@connect(mapStateToProps)

class playlist extends Component {
  state = {
  };

  render() {
    const { props , state } = this;
    return (
      <Fragment>
        playlist
      </Fragment>
    );
  }

}


export default playlist;
