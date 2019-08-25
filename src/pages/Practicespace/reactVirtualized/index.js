/*
* title: 虚拟加载（可视窗口加载）
*/
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';


const mapStateToProps = (state) => (state);

@connect(mapStateToProps)

class index extends Component {
  state = {};

  render() {
    const { props, state } = this;
    return (
      <Fragment>
        IndexDB
      </Fragment>
    );
  }

}


export default index;
