import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';
import PropTypes from 'prop-types';

import BaseSongList from './BaseSongList';
import SheetList from './SheetList';

import styles from './SearchList.less';

const mapStateToProps = ({ search, global }) => ({ search, global });

@connect(mapStateToProps)

class SearchList extends Component {

  state = {
    activeId:'',
    tabData: [
      {
        title: '单曲',
        type: 1,
      }, {
        title: '歌单',
        type: 1000,
      },
    ], //Tab数据
    songs: [], //搜索的歌曲
    playlists: [], //搜索的歌单
    loading: true,
  };

  componentWillReceiveProps(nextprops){
    const {  global: { isPlay ,currentMusic:{id} } } = nextprops;
    if(isPlay&&id){
      this.setState({
        activeId: id,
      })
    }else{
      this.setState({
        activeId: '',
      })
    }
  }

  render() {
    const { props: { query, type, value }, state: { tabData, activeId } } = this;

    return (
      <div className={styles.searchList}>
        <header className={styles.clearFlort}>
          <ul className={styles.searchTab}>
            {
              tabData.map(item => (
                <li className={classnames([styles.searchTabItem], { [styles.active]: type === item.type })}
                    onClick={() => this.toggleTab(item.type)} key={item.type}>
                  <span>{item.title}</span>
                </li>
              ))
            }
          </ul>
        </header>
        {/*单曲 1 --歌单 1000*/}
        {type == 1 ?
          <BaseSongList
            list={query['songs']}
            songCount={query['songCount']}
            onItemClick={this.addPlay}
            value={value}
            activeId={activeId}
          /> :
          <SheetList
            list={query['playlists']}
            playlistCount={query['playlistCount']}
            onItemClick={this.openPlayList}
            value={value}
          />
        }


      </div>
    );
  }

  //切换tab
  toggleTab = tabType => {
    const { type } = this.props;
    const { onClick } = this.props;
    if (parseInt(type, 10) === parseInt(tabType, 10)) return;
    onClick(tabType);
  };
  //播放音乐
  addPlay = (id, index, item) => {
    const { dispatch, global: { isPlay } } = this.props;
    this.setState({
      activeId: !isPlay && id,
    });
    //详情页面
    // dispatch({
    //   type: `global/getMusic`,
    //   payload: {
    //     ids: id,
    //   },
    // });
    let obj = {};
    obj.id = item.id;
    obj.name = item.name;
    obj.duration = item.duration / 1000;
    obj.singer = item.artists[0].name;
    obj.image = item.artists[0].img1v1Url;
    obj.album = item.album.name;
    obj.alias = item.alias;
    dispatch({
      type: `global/save`,
      payload: {
        currentMusic: obj,
        isPlay: !isPlay,
      },
    });
  };
  //跳转到歌单
  openPlayList = () => {

  };

}


SearchList.defaultProps = {
  type: 1,
};
SearchList.propTypes = {
  type: PropTypes.number,
  query: PropTypes.any.isRequired,//必须有
};


export default SearchList;
