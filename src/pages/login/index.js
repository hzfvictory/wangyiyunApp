import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { NavBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { Button } from 'antd-mobile';
import styles from './index.less';
@connect(state=>({
  count:state.count.count
}))

export default class index extends Component {
  constructor(props) {
    super(props);
  }

  add = () => {
    this.props.dispatch({
      type: 'count/add',
    }).then(response=>console.log(response))
  };

  render() {
    return (
      <IntlProvider locale="en">
        <div>
          <span>{this.props.count}</span>
          <Button
            onClick={this.add}
          >
            +
          </Button>
        </div>
      </IntlProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count.count,
    newProp: state.count.newProp,
  };
}

