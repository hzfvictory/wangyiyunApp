import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { NavBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { Button } from 'antd-mobile';

const mapStateToProps = ({ count: { count }}) =>({ count });
@connect(mapStateToProps)
class index extends Component {
  state = {};
  static defaultProps = {};
  static propTypes = {};

  onClickAddBtn = () => {
    this.props.dispatch({
      type: 'score/add',
    }).then(response=>console.log(response))
  };

  render() {
    const { onClickAddBtn, props: { count}} = this;
    return (
      <IntlProvider locale="en">
        <div>
          <span>{count}</span>
          <Button
            onClick={onClickAddBtn}
          >
            +
          </Button>
        </div>
      </IntlProvider>
    );
  }
}



export default index;
