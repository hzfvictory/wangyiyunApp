import React from 'react';
import PropTypes from 'prop-types';


class ReactScroll extends React.Component {
  state = {};

  componentDidMount() {
    var ctx = document.getElementById('wapper');
    let el = ctx.firstElementChild || ctx.firstChild;
    console.log(ctx,el);
  }

  render() {
    const { props, state } = this;
    return (
      <div id='wapper' style={{ 'height': '100vh' }}>
          {props.children}
      </div>
    );
  }

}


export default ReactScroll;
