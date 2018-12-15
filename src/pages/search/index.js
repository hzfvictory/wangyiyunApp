import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';
import SearchNav from '../../components/SearchNav';
import HotList from './_components/HotList';
import SearchList from './_components/SearchList';

import styles from './index.less';

const reg = /^\s+|\s+$/g;
const mapStateToProps = (state) => (state.search);

@connect(mapStateToProps)

class index extends Component {
  static defaultProps = {};
  state = {
    value: '',
    query: [],
    type: 1,//默认单曲
  };

  render() {
    const { props: { result, hot: { hots = [] }, songs, privileges }, state: { value, query, type }, onEnterSearch, handleTabClick } = this;
    const musicId = !!privileges.length && privileges[0]['id'];
    return (
      <Fragment>
        <SearchNav onItemSearch={onEnterSearch} value={value}/>
        <main>
          {value.length <= 0 ?
            <Fragment>
              <HotList hots={[{ first: '薛之谦' }, { first: '大' }]} tit={'历史记录'} onClickInput={onEnterSearch}/>
              <HotList hots={hots} onClickInput={onEnterSearch}/>
            </Fragment> :
            <SearchList query={result} type={type} onClick={handleTabClick} value={value}/>
          }
        </main>

      </Fragment>
    );

  }

  //TODO: 搜索
  onEnterSearch = (keywords) => {
    const { type } = this.state;
    this.setState({
      value: keywords,
    });
    keywords = keywords.replace(reg, '');
    if (keywords === this.state.value.replace(reg, '')) return;
    //不为空才调接口
    if (String(keywords).length) {
      this.queryList(keywords, type);
    } else {
      this.props.dispatch({
        type: `search/save`,
        payload: {
          result: {},
        },
      });

    }
  };
  //TODO: 切换tab
  handleTabClick = type => {
    const { value } = this.state;
    this.setState({
      type,
    });
    this.queryList(value, type);
  };
  queryList = (keywords, type) => {
    this.props.dispatch({
      type: `search/fetch`,
      payload: {
        keywords,
        offset: 0,
        type,
        limit: 20,
      },
    });
  };

}


export default index;
