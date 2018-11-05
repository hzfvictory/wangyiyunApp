import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank, Carousel } from 'antd-mobile';
//组件
import Banner from '../../components/Banner';
import MHeader from './components/MHeader';
import Menu from './components/Menu';
//上下文
import NameContext from '../../components/Context';
import styles from './index.less';

const mapStateToProps = (state) => (state);

@connect(mapStateToProps)

class index extends Component {
  state = {
    banner: [],
  };

  render() {
    const { props: { home: { banner } }, openDrawer } = this;
    return (
      <Fragment>
        <MHeader onOpen={openDrawer}/>
        <div className={styles.bg}>
          <NameContext.Provider value={banner}>
          </NameContext.Provider>
          <Banner banner={banner} imgHeight={176}/>
        </div>
        <Menu/>
      </Fragment>
    );
  }

  openDrawer = state => {
    this.setState({
      isDrawer: state,
    });
  };
}


export default index;
