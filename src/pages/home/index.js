import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank, Carousel, Drawer, List, NavBar, Icon, WhiteSpace, Toast } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';

//滚动插件
import ZScroller from 'zscroller';
import 'zscroller/assets/index.css';


//组件
import Banner from '../../components/Banner';
import MHeader from './_components/MHeader';
import Menu from './_components/Menu';
import NavBack from '../../components/NavBack';
import ColumnList from './_components/ColumnList';
import Sidebar from './_components/Sidebar';
//上下文
import NameContext from '../../components/Context';
import { removeToken, getToken } from '../../utils/token';

import styles from './index.less';

const Item = List.Item;
const mapStateToProps = (state) => (state);

@connect(mapStateToProps)

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
      open: false,
    };
  }

  componentDidMount() {
    this.zscroller = new ZScroller(this.main, {
      scrollbars: true,
      zooming: false,//缩放
      animationDuration:5000,
      animating: true,
      bouncing:false,
      scrollingX: false,
      snapping: true,
      locking: true,
      scrollingY: true,
      onScroll :this.handelScroll,
    }).scroller;
    // this.zscroller.scrollTo(0,0,false)
  }

  handelScroll = () => {
    console.log(this.zscroller.getValues());
  };

  render() {
    const { props: { home: { banner, result, profile }, location } } = this;
    return (
      <Fragment>
        <MHeader onOpen={this.openDrawer}/>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          sidebar={<Sidebar data={profile} onclickRemover={this.onclickRemover}/>}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          <main ref={x=>this.main=x}>
            <div className={classnames({ [styles.bannerBox]: banner.length })}>
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
          </main>
        </Drawer>

      </Fragment>
    );
  }

  //侧边内容
  openDrawer = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  };
  //退出登录
  onclickRemover = () => {
    this.props.dispatch({
      type: `home/logout`,
    });

    this.setState({ open: false }, () => {
      this.props.dispatch({
        type: `home/save`,
        payload: {
          profile: {},
        },
      });
      if (getToken()) {
        removeToken();
        Toast.success('退出登录成功');
      } else {
        Toast.fail('你还未登录');
      }
    });

  };
  handleClick = (id) => {
    router.push(`/playlist/${id}`);
  };
}


export default index;
