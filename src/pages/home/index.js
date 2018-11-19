import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank, Carousel, Icon } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';

//组件
import Banner from '../../components/Banner';
import MHeader from './_components/MHeader';
import Menu from './_components/Menu';
import NavBack from '../../components/NavBack';
import ColumnList from './_components/ColumnList';
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
    const { props: { home: { banner, result } }, openDrawer } = this;
    return (
      <Fragment>
        <MHeader onOpen={openDrawer}/>
        <div className={styles.bannerBox}>
          <div className={classnames({ [styles.bg]: banner.length })}></div>
          <NameContext.Provider value={banner}>
          </NameContext.Provider>
          <Banner banner={banner} imgHeight={176}/>
        </div>
        {/*展示栏*/}
        <Menu/>
        <div className={styles.songSheet}>
          <h3>推荐歌单</h3>
          <Link to='/sheetlist'>
            <Icon type="right"/>
          </Link>
        </div>
        {/*推荐歌单*/}
        <ColumnList result={result}
                    onItemClick={this.handleClick}/>
      </Fragment>
    );
  }

  openDrawer = state => {
    this.setState({
      isDrawer: state,
    });
  };
  handleClick = (id) => {
    router.push(`/playlist/${id}`);
  };
}


export default index;
