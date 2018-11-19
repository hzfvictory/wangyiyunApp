import React, { Fragment } from 'react';
import router from 'umi/router';
import { Link, withRouter } from 'dva/router';
import PropTypes from 'prop-types';

import { formatPlayCount } from '../../../components/common/utils';
import Loading from '../../../components/Loading';
import styles from './ColumnList.less';


const ColumnList = (props) => {
  const { result, onItemClick } = props;
  return (
    <div className={styles.columnWrapper}>
      {
        !!result.length && result.map(item => {
            return (
              <div
                className={styles.columnItem}
                onClick={() => onItemClick(item['id'])}
                key={item.id}
              >
                <div className={styles.columnImg} data-play={formatPlayCount(item['playCount'])}>
                  < img width='100%' height='100%' src={`${item['picUrl']}?param=200y200`} alt={item['description']}/>
                </div>
                <p className={styles.columnTitle}>{item.name.replace(/\s/g, ' ')}</p>
              </div>
            );
          },
        )
      }
    </div>
  );
};
ColumnList.defaultProps = {
  result: [],
};

ColumnList.propTypes = {
  result: PropTypes.array,
  onItemClick: PropTypes.func,
};
export default withRouter(ColumnList);
