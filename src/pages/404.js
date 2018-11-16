import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { NavBar } from 'antd-mobile';

class index extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
       这是404页面!!!!!!
      </div>
    );
  }
}


export default (index);
