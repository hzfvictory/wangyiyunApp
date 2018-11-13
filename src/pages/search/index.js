import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';
import SearchNav from '../../components/SearchNav';


import styles from './index.less';

const mapStateToProps = (state) => (state.search);

@connect(mapStateToProps)

class index extends Component {
  static defaultProps = {};
  state = {};

  render() {
    const { props: { result, hot: { hots }  } } = this;

    return (
      <Fragment>
        <SearchNav onItemSearch={this.onEnterSearch}/>
        <div className={styles.searchHots}>
          <h3>热门搜索</h3>
          <ul>
            {hots && hots.length > 0 &&
            hots.map((itme, index) => (
              <li
                onClick={() => {
                  this.setState({ query: itme.first, value: itme.first });
                }}
                key={index}
              >
                {itme.first}
              </li>
            ))}
          </ul>
        </div>
      </Fragment>
    );

  }

  onEnterSearch = keywords => {
    if (String(keywords).length) {
      this.props.dispatch({
        type: `search/fetch`,
        payload: {
          keywords,
          offset: 0,
          type: 1,
          limit: 20,
        },
      });
    }
  };

}


export default index;
