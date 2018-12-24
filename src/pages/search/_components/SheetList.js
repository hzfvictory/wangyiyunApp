import React from 'react';
import PropTypes from 'prop-types';
import ronter from 'umi/router';
import withRouter from 'umi/withRouter';
import Loading from '../../../components/Loading';

import { formatPlayCount } from '../../../utils/common';
import styles from './SheetList.less';


const SheetList = (props) => {
  const { list, playlistCount, onItemClick, value } = props;
  const hghLight = (name) => {
    let reg = new RegExp(value, 'ig');
    name = name.replace(reg, `<span class="highlight">${value}</span>`); //进行替换，并定义高亮的样式
    return name;
  };
  return (
    <div className={styles.rowWrapper}>
      {
        !!list.length  && playlistCount ? list.map((item, index) => (
            <div
              className={styles.rowItem}
              onClick={() => onItemClick(item.id, index)}
              key={item.id}
            >
              <div className={styles.rowHd}>
                <img src={`${item.coverImgUrl}?param=70y70`} alt=""/>
              </div>
              <div className={styles.rowBd}>
                <h2 dangerouslySetInnerHTML={{ __html: hghLight(item.name) }}/>
                <p>{item.trackCount}首&nbsp;by {item.creator.nickname}，&nbsp;播放{formatPlayCount(item.playCount)}次</p>
              </div>
            </div>
          )) :
          <Loading text={''}/>
      }
    </div>

  );
};
SheetList.defaultProps = {
  list: [],
};
SheetList.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  list: PropTypes.array,
};

export default withRouter(SheetList);



