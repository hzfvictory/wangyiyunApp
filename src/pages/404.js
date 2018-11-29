import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { NavBar, Toast, Steps } from 'antd-mobile';
import classnames from 'classnames';
import styles from './404.less';
import { throttle, debounce } from 'utils';


const Step = Steps.Step;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stop: throttle(),
    };
  }

  customIcon = (type) => {

    return (
      <div className={classnames([styles.borderBox], { [styles.borderfocus]: type })}>
        <span className={classnames([styles.itemrBox], { [styles.itemrBoxfocus]: type })}></span>
      </div>
    );
  };

  handleKeyDown = (options) => {
    Toast.success('函数防抖');
  };

  handleScroll = () => {
    console.log(1111);
  };


  render() {
    console.log('%cHellow','color:green;background:yellow;');
    return (
      <Fragment>
        <Link to={{
          pathname: '/home',
          state: { id: 23456789 },
        }}>
          首页
        </Link>
        <div style={{ position: 'sticky', height: '30px' }}>
          这是404页面!!!!!
        </div>
        <br/>
        <input style={{ width: '200px', height: '50px', backgroundColor: '#E1E1CE', color: 'block', fontSize: '20px' }}
               type="text" onKeyDown={debounce(() => this.handleKeyDown([1, 2, 3, 4]), 1000)}/>
        <br/>
        <div style={{
          position: 'absolute',
          height: '100%',
          paddingTop: '.97rem',
          boxSizing: 'border-box',
          width: '100%',
        }}>
          <div style={{ width: '100vw', height: '50px', backgroundColor: '#d3d3d3' }} onScroll={this.handleScroll}>

          </div>
        </div>
        <div className={styles.stops} style={{ textAlign: 'left', padding: ' 200px 30px' }}>
          <Steps size="small">
            <Step status="error" title="Step 1" description="This is description" icon={this.customIcon(1)}/>
            <Step title="Error" description="This is description" icon={this.customIcon()}/>
            <Step title="Step 3" description="This is description" icon={this.customIcon()}/>
          </Steps>
        </div>
      </Fragment>
    );
  }
}

export default index;
