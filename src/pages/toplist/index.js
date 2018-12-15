import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';
import ScrollTop from '../../components/ScrollTop';
import { throttle } from '../../components/common/utils';

import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { List as VList } from 'react-virtualized/dist/commonjs/List';


import NavBack from '../../components/NavBack';
import styles from './index.less';

const dataArray = Array.from(Array(5000), (v, k) => k);
const mapStateToProps = (state) => (state);

@connect(mapStateToProps)

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityArr: [],
    };
  }


  // componentDidMount() {
  //   this.sc.addEventListener('scroll', throttle(this.handler, 30), false);
  // }
  //
  // componentWillUnmount() {
  //   this.sc.removeEventListener('scroll', this.handler, false);
  //
  // }
  //
  // handler = () => {
  //   console.log(1);
  //
  //   if (this.sc.scrollTop >= document.body.clientHeight * 1.5) {
  //
  //     this.is_go_top.style.WebkitTransform = 'translateY(0)';
  //   } else {
  //     this.is_go_top.style.WebkitTransform = 'translateY(10vh)';
  //   }
  // };
  handleClick = (index) => {
    const { activityArr } = this.state;
    activityArr.push(index);
    this.setState({
      activityArr,
    }, () => {
      console.log(this.state.activityArr);
    });

    // this.setState({
    //   activityArr
    // },()=>{
    //   console.log(this.state.activityArr,555);
    // })
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.is_hide === this.state.is_hide) return false;
  //   return true;
  // }


  render() {
    const { props, state } = this;
    const renderRow = (item) => {
      const { index, key, style } = item;
      if (style.top >= document.body.clientHeight * 1.5) {

        this.is_go_top.style.WebkitTransform = 'translateY(0)';
      } else {
        this.is_go_top.style.WebkitTransform = 'translateY(10vh)';
      }
      return (
        <div key={key} style={style} onClick={() => {
          this.handleClick(index);
        }}>
          <div className={classnames({ [styles.bgActivity]: this.state.activityArr.includes(index) })}>
            {index}
          </div>
          <WhiteSpace style={{ background: '#f4f5f7' }} size='sm'/>
        </div>
      );
    };
    const dpi = window.devicePixelRatio;
    return (
      <Fragment>
        <div id='gotop'>
          <NavBack/>
          <div className={styles.scrollBar} id='go_top' ref={x => this.sc = x}>
            {/*{this.list.map(this.renderRow.bind(this))}*/}


            <AutoSizer>
              {({ width, height }) => (
                <VList
                  id='go_topww'
                  width={width}
                  height={height}
                  rowHeight={25*dpi}
                  overscanRowCount={10}
                  rowCount={dataArray.length}
                  rowRenderer={renderRow}
                />
              )}
            </AutoSizer>


          </div>
        </div>
        <div className={styles.fixedRight} ref={t => this.is_go_top = t}>
          <ScrollTop dom_scroll={'go_topww'}/>
        </div>
      </Fragment>
    );
  }

}


export default index;
