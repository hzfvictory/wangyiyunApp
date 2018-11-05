import React from 'react'
import PropTypes from 'prop-types'

import styles from "./index.less"

// Loading组件

const Loading = (props) => {
  const {show, text} = props;
  return (
    <div className={styles.loadingBox} style={{display: show ? 'block' : 'none'}}>
      <span className={styles.loading}>{text}</span>
    </div>
  )
};

Loading.defaultProps = {
  text: '努力加载中...',
  show: true
};

Loading.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string
};

export default Loading
