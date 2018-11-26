import React, { Component, Fragment } from 'react';
import BaseLayout from './baseLayout';
import connect from 'dva';

import styles from './index.css';

const URL_NO_LAYOUT = ['/login', '/score'];

class Index extends Component {


  renderBody = () => {
    const { location: { pathname }, children } = this.props;
    if (URL_NO_LAYOUT.includes(pathname)) {
      return (<Fragment> {children} </Fragment>);
    }
    return (<BaseLayout {...this.props} />);
  };

  render() {
    return (
      <Fragment>
        {this.renderBody()}
      </Fragment>
    );
  }
}

export default Index;

