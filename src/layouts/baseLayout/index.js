import React, { Component, Fragment } from 'react';
import { TabBar, Icon } from 'antd-mobile';
import router from 'umi/router';
import classnames from 'classnames';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from './baseLayout.less';

const currentMusic = {
  id: 368727,
  name: '明天，你好',
  singer: '牛奶咖啡',
  album: 'Lost & Found 去寻找',
  image: 'http://p1.music.126.net/LQ2iUKlZwqGMysGkeCR4ww==/27487790697969.jpg',
  duration: 271,
  url: 'https://music.163.com/song/media/outer/url?id=368727.mp3',
};

@withRouter
@connect(({ global }) => ({ global }))

class BaseLayout extends Component {
  state = {
    isFull: false, // 是否全屏显示Player
    isPlay: false, // 是否播放
    showMusicList: false, // 是否显示播放列表
    currentTime: 0, // 当前播放时间
  };

  // 切换播放列表显示
  toggleShow = (e, showMusicList = true) => {
    this.setState({ showMusicList });
    e.stopPropagation();
  };
  // 播放暂停
  play = e => {
    const { global: { isPlay } } = this.props;
    if (isPlay) {
      // 暂停
      this.audioEle.pause();
    } else {
      // 播放
      this.audioEle.play();
    }
    e.stopPropagation();
    this.props.dispatch({
      type: `global/save`,
      payload: {
        isPlay: !isPlay,
      },
    });
  };


  componentDidUpdate() {
    const { global: { isPlay } } = this.props;
    if (!!Object.keys(currentMusic).length) {
      if (isPlay) {
        this.audioEle.play();
      } else {
        this.audioEle.pause();
      }

    }
  }

  render() {
    const { global: { isPlay, currentMusic = {} }, location } = this.props;
    const { showMusicList } = this.state;
    const isList = Object.keys(currentMusic).length;
    return (
      <Fragment>
        {this.props.children}
        <footer className={styles.player}>
          <div className={styles.playerFull}>
            3456789
          </div>
          {!!isList && <div className={styles.playerMin} onClick={() => this.setState({ isFull: true })}>
            <div className={styles.playerMinImg}>
              <img src={`${currentMusic.image}?param=100y100`} alt="" width="100%" height="100%"/>
            </div>
            <div className={styles.playerMinInfo}>
              <h2>{currentMusic.name}</h2>
              <p>{currentMusic.singer}</p>
            </div>
            <div className={styles.playerMinPlay} onClick={this.play}>
              {!isPlay && <i className="iconfont">&#xe60c;</i>}
              {isPlay && <i className="iconfont">&#xe606;</i>}
            </div>
            <div className={styles.playerMinList} onClick={this.toggleShow}>
              <i className="iconfont">&#xe66f;</i>
            </div>
          </div>}

          <audio ref={x => this.audioEle = x}
                 src={`https://music.163.com/song/media/outer/url?id=${currentMusic['id']}.mp3`}/>

        </footer>

      </Fragment>
    );
  }
}

export default BaseLayout;
