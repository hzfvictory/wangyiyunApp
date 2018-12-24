/**
 * title: 移动端滚动
 */
import React, { Component, Fragment } from 'react';
import ReactScroll from './_components/index';


import styles from './index.less';

const mockAry = [...new Array(100).keys()];

class index extends Component {
  state = {};

  componentDidMount() {
    // let scroll_wapper = document.getElementById('content');
    // new BScroll(scroll_wapper);
  }

  render() {
    return (
      <Fragment>
        <ReactScroll>
          <div id='content' className={styles['content']}>

            {mockAry.map((item, index) => {
              return <div key={index}>{item}</div>;
            })
            }
          </div>
        </ReactScroll>
      </Fragment>
    );
  }

}


export default index;
