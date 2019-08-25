/*
* title: 每日推荐单曲
*/
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank, List, WhiteSpace, Button } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';
import NavBack from '../../components/NavBack';
import styles from './index.less';

const Item = List.Item;
const Brief = Item.Brief;
const mapStateToProps = ({ recommendList }) => ({ recommend: recommendList.recommend });

@connect(mapStateToProps)

class index extends Component {
  state = {};
  onItemClick = (id) => {
    console.log(id);
  };
  palyAllMusic = () => {
    let audio = document.getElementById('audio');
    audio.loop = false;//取消循环播放
    const { props: { recommend } } = this;
    this.props.dispatch({
      type: `global/save`,
      payload: {
        currentMusic: recommend,
        isPlay: true,
      },
    });

  };

  render() {
    const { props: { recommend }, state } = this;
    // console.log(recommend,234567);

    return (
      <Fragment>
        <NavBack title={'每日推荐'}/>
        {!!recommend.length &&
        <List className="my-list">
          <Item extra={

            <Button icon={<i className={'iconfont'}>&#xe60c;</i>} type="warning" size="small" inline
                    onClick={this.palyAllMusic}>播放全部</Button>
          }>
            {'每日推荐 (' + recommend.length + ')'}
          </Item>
        </List>}

        <div className={styles.songWrapper}>
          {
            !!recommend.length && recommend.map((item, index) => (
              <div
                className={styles.songItem}
                onClick={() => this.onItemClick(item.id)}
                key={item.id}
              >
                <div className={styles.songInfo}>
                  <h2>{item.name}</h2>
                  <p>
                    {item['fee'] !== 0 && <i> </i>}
                    <span>{item.name}</span>
                    &nbsp;-&nbsp;
                    <span>{item.album}</span>
                  </p>
                  <p>
                    <em className={'iconfont'}>&#xe6f0;</em>
                    <span>{item['reason']}</span>
                  </p>
                </div>
                {index === 0 && <i className={'iconfont pr100'}>&#xe61c;</i>}
              </div>
            ))
          }
        </div>
      </Fragment>

    );
  }

}


export default index;
