import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';
import SearchNav from '../../components/SearchNav';


import styles from './index.less';

const mapStateToProps = (state) => (state);

@connect(mapStateToProps)

class index extends Component {
  state = {};

  render() {
    const { props: { search: { result , hot} } } = this;
    return (
      <Fragment>
        <SearchNav onItemSearch={this.onEnterSearch}/>
        {
          result && result.map(item => {
            return (
              <div key={item['id']}>
                {item['name']}
              </div>
            );
          })
        }
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
