import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Carousel, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';

//loading组件
import Loading from '../../components/Loading';

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
        {banner.length ? <Carousel
          autoplay={banner && banner.length > 1}
          infinite
          selectedIndex={0}
          afterChange={() => {
          }}
          dots={banner && banner.length > 1}
        >
          {banner.length > 0 ? (banner.map((item, index) => {
            return (
              <Link to={item['url']}
                    style={{
                      display: 'block',
                      position: 'relative',
                      width: '100%',
                      height: this.state.imgHeight,
                      boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                      backgroundColor: item['backgroundUrl'],
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
      </Fragment>

    );
  }
}

export default connect()(index);
