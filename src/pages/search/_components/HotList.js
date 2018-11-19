import React from 'react';
import PropTypes from 'prop-types';
import ronter from 'umi/router';
import withRouter from 'umi/withRouter';
import styles from './HotList.less';


const HotList = (props) => {
  const  {hots,tit,onClickInput} =props;
  return (
    <div className={styles.searchHots}>
      <h3>{tit}</h3>
      <ul>
        {hots && !!hots.length  &&
        hots.map((itme, index) => (
          <li
            onClick={()=>onClickInput(itme.first)}
            key={index}
          >
            {itme.first}
          </li>
        ))}
      </ul>
    </div>
  );
};
HotList.defaultProps = {
  tit:"热门搜索",
};
HotList.propTypes = {
  tit:PropTypes.string,
  hots:PropTypes.array.isRequired,
  onClickInput:PropTypes.func,
};

export default withRouter(HotList);



