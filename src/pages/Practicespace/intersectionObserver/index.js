/**
 * title: 滚动监听设备的可视区域
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { NavBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { Button, Toast } from 'antd-mobile';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';

const dat = [...Array(50).keys()];

class index extends Component {
  state = {};
  static defaultProps = {};
  static propTypes = {};

  componentDidMount() {
    try {
      let observer = new IntersectionObserver(this.handleObserver, {});
      let demoArea = ReactDOM.findDOMNode(this.ref);
      const ids = document.getElementById('fff').children;
      [...ids].forEach(function(item) {
        observer.observe(item);
      });

    } catch (e) {
      Toast.fail('貌似不支持IntersectionObserver方法哦，建议使用chrome（PC端）的浏览器试试吧~');
    }
  }

  handleObserver = (changes) => {
    console.log(changes[0]);
    console.log(changes[0].boundingClientRect);
    console.log(changes[0].isIntersecting);
  };

  render() {
    return (
      <div>
        <div id='fff'>
          {
            dat.map(item => {
              return (
                <ReactPlaceholder key={item} showLoadingAnimation={true} rows={10} ready={false}>
                  123457
                </ReactPlaceholder>
              );
            })
          }
        </div>


      </div>


    );
  }
}


export default index;
