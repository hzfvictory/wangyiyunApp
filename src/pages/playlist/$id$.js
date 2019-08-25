import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';
import { Tag, List, Button, NavBar, Icon, WhiteSpace } from 'antd-mobile';


import styles from './index.less';

const mapStateToProps = (state) => (state);

@connect(mapStateToProps)

class playlist extends Component {
  state = {};

  render() {
    const { props, state } = this;
    return (
      <Fragment>
      </Fragment>
    );
  }

}


export default playlist;
