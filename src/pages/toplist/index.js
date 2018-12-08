import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';
import ScrollTop from '../../components/ScrollTop';
import { throttle } from '../../components/common/utils';

import NavBack from '../../components/NavBack';
import styles from './index.less';

const dataArray = Array.from(Array(500), (v, k) => k);
const mapStateToProps = (state) => (state);

@connect(mapStateToProps)

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
    this.sc.addEventListener('scroll', throttle(this.handler, 30), false);
  }

  componentWillUnmount() {
    this.sc.removeEventListener('scroll', this.handler, false);

  }

  handler = () => {
    if (this.sc.scrollTop >= document.body.clientHeight * 1.5) {

      this.is_go_top.style.WebkitTransform='translateY(0)';
    } else {
      this.is_go_top.style.WebkitTransform='translateY(7vh)';
    }
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.is_hide === this.state.is_hide) return false;
  //   return true;
  // }

  render() {
    const { props, state } = this;
    return (
      <Fragment>
        <div id='gotop'>
          <NavBack/>
          <div className={styles.scrollBar} id='go_top' ref={x => this.sc = x}>
            {dataArray.map(item => {
              return <div key={item} onClick={this.handleClick}>
                {item}
                <WhiteSpace style={{ background: '#f4f5f7' }} size='sm'/>
              </div>;
            })}
          </div>
        </div>
        <div className={styles.fixedRight} ref={t => this.is_go_top = t}>
          <ScrollTop dom_scroll={'go_top'}/>
        </div>
      </Fragment>
    );
  }

}


export default index;
