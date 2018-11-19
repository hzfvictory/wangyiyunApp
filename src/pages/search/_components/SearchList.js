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

const mapStateToProps = (state) => (state);

@connect(mapStateToProps)

class SearchList extends Component {

  state = {
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

  render() {
    const { props: { query, type, value }, state: { tabData } } = this;
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
  addPlay = (id, index) => {
    const { dispatch } = this.props;
    dispatch({
      type: `search/getMusic`,
      payload: {
        ids: id,
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
