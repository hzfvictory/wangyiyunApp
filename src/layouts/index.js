import React, { Component, Fragment } from 'react';
import BaseLayout from './baseLayout';
import pathToRegexp from 'path-to-regexp';
import './index.css';

const URL_NO_LAYOUT = ['/login', '/score', '/practiceSpace/:foo?'];


class Index extends Component {

  renderBody = () => {
    const { location: { pathname }, children } = this.props;
    const pathKey = pathToRegexp(URL_NO_LAYOUT).test(pathname);
    if (pathKey) {
      return (<Fragment> {children} </Fragment>);
    }
    return (<BaseLayout {...this.props} />);
  };

  render() {
    return (
      this.renderBody()
    );
  }
}

export default Index;

