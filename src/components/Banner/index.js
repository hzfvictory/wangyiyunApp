import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Carousel, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';
//loading组件
import Loading from '../../components/Loading';
import Immutable from "seamless-immutable"

import NameContext from '../../components/Context';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgHeight: props.imgHeight,
    };
  }


  static defaultProps = { banner: [] };
  static propTypes = {
    banner: PropTypes.array,
    imgHeight: PropTypes.number,
  };

  render() {
    const { banner } = this.props;
    return (
      <Fragment>
        <NameContext.Consumer>
          {banner => banner.length ? <Carousel
            autoplay={banner && banner.length > 1}
            infinite
            selectedIndex={0}
            afterChange={() => {
            }}
            dots={banner && banner.length > 1}
            // dotStyle={{backgroundColor:'red'}}
            dotActiveStyle={{ backgroundColor: 'red' }}
          >
            {!!banner.length ? (banner.map((item, index) => {
              return (
                <Link to={item['url']}
                      style={{
                        display: 'inline-block',
                        width: '100%',
                        height: '43.8vw',
                        boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                        // backgroundImage:`url('${item['backgroundUrl']}')`
                        backgroundColor: '#fff',
                      }}
                      key={item['targetId']}>
                  <img
                    src={item['picUrl']}
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </Link>
              );
            })) : ''}
          </Carousel> : <Loading/>}
        </NameContext.Consumer>
      </Fragment>

    );
  }
}

export default connect()(index);
