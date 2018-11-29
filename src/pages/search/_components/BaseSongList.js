import React from 'react';
import PropTypes from 'prop-types';
import ronter from 'umi/router';
import withRouter from 'umi/withRouter';
import classnames from 'classnames';
import Loading from '../../../components/Loading';

import styles from './BaseSongList.less';

const PlaceHolder = (props) => {
  return (
    <div className={styles.placeHolder}>
      {props.tit}
    </div>
  );
};
const BaseSongList = (props) => {
  const { list, songCount, onItemClick, activeId, value } = props;
  const hghLight = (name) => {
      let reg = new RegExp(value, 'ig');
      name = name.replace(reg, `<span class="highlight">${value}</span>`); //进行替换，并定义高亮的样式
      return name;
    }
  ;
  return (
    <div className={styles.songWrapper}>
      {
        !!list.length && songCount ? list.map((item, index) => (
            <div
              className={classnames([styles.songItem], { [styles.active]: item.id === activeId })}
              onClick={() => onItemClick(item.id, index ,item)}
              key={item.id}
            >
              <div className={styles.songInfo}>
                <h2 dangerouslySetInnerHTML={{ __html: hghLight(item.name) }}/>
                <p>
                  {item['fee'] !== 0 && <i> </i>}
                  <span dangerouslySetInnerHTML={{ __html: hghLight(item['artists'][0].name) }}/>
                  &nbsp;-&nbsp;
                  <span dangerouslySetInnerHTML={{ __html: hghLight(item['album']['name']) }}/>
                </p>
              </div>
              <div className={styles.songBtnPlay}>
                {item.id !== activeId && <i className="iconfont"> &#xe60c;</i>}
                {item.id === activeId && <i className="iconfont"> &#xe606;</i>}
              </div>
            </div>
          )) :
          songCount === 0 ? <PlaceHolder tit="暂无此音乐"/> : <Loading text={''}/>
      }
    </div>

  );
};
BaseSongList.defaultProps = {
  list: [],
};
BaseSongList.propTypes = {
  list: PropTypes.array,
  onItemClick: PropTypes.func,
  activeId: PropTypes.any,
};

export default withRouter(BaseSongList);



