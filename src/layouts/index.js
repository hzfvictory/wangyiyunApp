import React, { Component, Fragment } from 'react';
import BaseLayout from './baseLayout';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './index.css';

const URL_NO_LAYOUT = ['/login', '/score'];


class Index extends Component {

  renderBody = () => {
    const { location: { pathname }, children } = this.props;
    if (URL_NO_LAYOUT.includes(pathname)) {
      return (<div> {children} </div>);
    }
    return (<BaseLayout {...this.props} />);
  };

  render() {
    const { location: { pathname } } = this.props;
    return (
      <TransitionGroup>
        <CSSTransition
          appear={true}
          classNames="fade"
          timeout={600}
          key={pathname}
        >
          {this.renderBody()}
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default Index;

